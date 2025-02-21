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
    this.users.map(
      (u) => u.userId === userId && u.ws === ws && u.rooms.push(roomId)
    );

    const user = this.users.find((u) => u.userId === userId && u.ws === ws);
    if (!user) {
      return;
    }

    if (!this.RoomUserMap.has(roomId)) {
      this.RoomUserMap.set(roomId, []);
    }
    this.RoomUserMap.get(roomId)!.push(user);
  }

  removeUser(roomId: number, userId: string, ws: WebSocket) {
    this.users.filter((u) => u.userId !== userId && u.ws !== ws);
    this.RoomUserMap.get(roomId)!.filter(
      (u) => u.userId !== userId && u.ws !== ws
    );
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
