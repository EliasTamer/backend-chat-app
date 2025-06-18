import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  timestamp: Date;
}

class MessageService {
  private messages: Map<string, Message[]> = new Map();

  sendMessage(content: string, userId: string, roomId: string) {
    const message: Message = {
      id: uuidv4(),
      content,
      userId,
      roomId,
      timestamp: new Date(),
    };

    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, []);
    }

    this.messages.get(roomId)!.push(message);
    return message;
  }
}


export default MessageService