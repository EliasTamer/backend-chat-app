interface Room {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  isPrivate: boolean;
  maxUser?: number;
}

export class RoomService {
  public rooms: Map<string, Room> = new Map();

  createRoom(name: string, userId: string, isPrivate: boolean = false) {
    const roomId = name.toLowerCase().replace(/\s+/g, "-");

    const room: Room = {
      id: roomId,
      name,
      createdBy: userId,
      createdAt: new Date(),
      isPrivate,
    };

    this.rooms.set(roomId, room);
    return room;
  }
  getRoom(roomId: string) {
    return this.rooms.get(roomId) || null;
  }
}
