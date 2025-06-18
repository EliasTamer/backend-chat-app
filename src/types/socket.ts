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
