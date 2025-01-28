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

  removeUser(ws: WebSocket) {
    this.users = this.users.filter((u) => u.ws !== ws);
  }

  findUserByWS(ws: WebSocket): User | undefined {
    return this.users.find((u) => u.ws === ws);
  }

  getUsersInRoom(roomId: number): User[] {
    return this.users.filter((u) => u.rooms.includes(roomId));
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
