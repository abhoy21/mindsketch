import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocket } from "ws";

interface User {
  ws: WebSocket;
  userId: string;
  rooms: number[];
}

export class UserManager {
  private static instance: UserManager;
  private users: User[] = [];
  private RoomUserMap: Map<number, User[]> = new Map();

  private constructor() {}

  static getInstance() {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }

    return UserManager.instance;
  }

  addUser(ws: WebSocket, userId: string) {
    this.users.push({ ws, userId, rooms: [] });
  }

  addUserToRoom(roomId: number, userId: string, ws: WebSocket) {
    const user = this.users.find((u) => u.userId === userId && u.ws === ws);
    if (!user) {
      return;
    }
    if (!this.RoomUserMap.has(roomId)) {
      this.RoomUserMap.set(roomId, []);
    }
    this.RoomUserMap.get(roomId)?.push(user);
    user.rooms.push(roomId);
  }

  removeUser(roomId: number, userId: string, ws: WebSocket) {
    const user = this.users.find((u) => u.ws === ws && u.userId === userId);
    if (!user) {
      return;
    }
    this.users = this.users.filter((u) => u.ws !== ws);
    const usersInRoom = this.RoomUserMap.get(roomId);
    if (usersInRoom) {
      const updatedUsersInRoom = usersInRoom.filter(
        (u) => u.ws !== ws && u.userId !== userId,
      );

      this.RoomUserMap.set(roomId, updatedUsersInRoom);
    }
  }

  findUserByWS(ws: WebSocket): User | undefined {
    return this.users.find((u) => u.ws === ws);
  }

  getUsersInRoom(roomId: number): User[] {
    return this.RoomUserMap.get(roomId) || [];
  }

  checkUser(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      if (!decoded || !decoded.userId) {
        return null;
      }
      return decoded.userId;
    } catch (error) {
      return null;
    }
  }
}
