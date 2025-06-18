import { Server, Socket } from "socket.io";

class SocketHandler {
  private io;

  constructor(io: Server) {
    this.io = io;
  }

  handleConnection(socket : Server) {
    this.registerEventHandler(socket);
  }

  registerEventHandler(socket: Server) : void {

    
  }
}

export default SocketHandler;
