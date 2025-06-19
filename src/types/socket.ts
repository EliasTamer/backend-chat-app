export interface ServerToClientEvents {
  userJoined: (data: { userId: string; username: string }) => void;
  userLeft: (data: { userId: string }) => void;
  newMessage: (message: {
    id: string;
    content: string;
    userId: string;
    username: string;
    roomId: string;
    timestamp: Date;
  }) => void;
  userTyping: (data: {
    userId: string;
    username: string;
    roomId: string;
  }) => void;
  userStoppedTyping: (data: { userId: string; roomId: string }) => void;
  error: (error: { message: string; code: string }) => void;
  roomUsers: (users: Array<{ id: string; useranme: string }>) => void;
}

export interface ClientToServerEvents {
  joinRoom: (
    roomId: string,
    callback: (response: JoinRoomResponse) => void
  ) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (
    data: { roomId: string; content: string },
    callback: (response: SendMessageResponse) => void
  ) => void;
  startTyping: (roomId: string) => void;
  stopTyping: (roomId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  username: string;
  rooms: Set<string>;
}

export type JoinRoomResponse =
  | {
      success: true;
      roomId: string;
      users: Array<{ id: string; username: string }>;
    }
  | { success: false; error: string };

export type SendMessageResponse =
  | { success: true; messageId: string }
  | { success: false; error: string };
