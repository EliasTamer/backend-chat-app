import { Server, Socket } from "socket.io";
import { MessageService } from "../services/messageService";
import { RoomService } from "../services/roomService";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socket";

type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

class SocketHandler {
  private io: TypedServer;
  private roomService = new RoomService();
  private messageService = new MessageService();

  constructor(io: TypedServer) {
    this.io = io;
  }

  handleConnection(socket: TypedSocket): void {
    this.initializeSocket(socket);
    this.registerEventHandler(socket);
  }

  initializeSocket(socket: TypedSocket): void {
    const userId = socket.handshake.query.userId as string;
    const username = socket.handshake.query.username as string;

    if (!userId || !username) {
      socket.emit("error", {
        message: "Authenticate required",
        code: "404",
      });

      socket.disconnect();
      return;
    }
    socket.data.userId = userId;
    socket.data.username = username;
  }

  registerEventHandler(socket: TypedSocket): void {
    socket.on("joinRoom", async (roomId, callback) => {
      try {
        const room = this.roomService.getRoom(roomId);

        if (!room) {
          this.roomService.createRoom(roomId, socket.data.userId);
        }

        await socket.join(roomId);
        socket.rooms.add(roomId);

        socket.to(roomId).emit("userJoined", {
          userId: socket.data.userId,
          username: socket.data.username,
        });
      } catch (error) {}
    });

    socket.on("sendMessage", async (data, callback) => {
      try {
        const { roomId, content } = data;

        if (!socket.rooms.has(roomId)) {
          console.log("you must join the room first");
          return;
        }

        const message = this.messageService.sendMessage(
          content,
          socket.data.userId,
          roomId
        );

        this.io.to(roomId).emit("newMessage", {
          roomId,
          userId: message.userId,
          content,
          id: message.id,
          timestamp: message.timestamp,
          username: socket.data.username,
        });
      } catch (error) {}
    });

    socket.on("startTyping", async (roomId) => {
      try {
        this.io.to(roomId).emit("userTyping", {
          userId: socket.data.userId,
          username: socket.data.username,
          roomId,
        });
      } catch (error) {}
    });

    socket.on("stopTyping", async (roomId) => {
      try {
        this.io
          .to(roomId)
          .emit("userStoppedTyping", { userId: socket.data.userId, roomId });
      } catch (error) {}
    });
  }
}

export default SocketHandler;
