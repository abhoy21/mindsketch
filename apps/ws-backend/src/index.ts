import { JWT_SECRET } from "@repo/backend-common/config";
import { decode } from "@repo/backend-common/encoder-decoder";
import { prisma } from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";

interface User {
  ws: WebSocket;
  userId: string;
  rooms: number[];
}

const wss = new WebSocketServer({ port: 8080 });

const users: User[] = [];

function checkUser(token: string) {
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

wss.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) return;

  const queryparams = new URLSearchParams(url.split("?")[1]);
  const token = queryparams.get("token") || "";
  const userId = checkUser(token);
  if (userId === null) {
    ws.close();
    return;
  }

  users.push({
    ws: ws,
    userId: userId,
    rooms: [],
  });

  ws.on("message", async function message(data: string) {
    const parsedData = JSON.parse(data);
    if (parsedData.type === "join") {
      try {
        const roomId = decode(parsedData.roomId);
        console.log(roomId);
        const user = users.find((u) => u.ws === ws);

        if (!user) {
          return;
        }

        const existingRoom = await prisma.room.findFirst({
          where: {
            id: roomId.id,
            slug: roomId.slug,
          },
        });

        if (!existingRoom) {
          console.log(existingRoom);
          console.log("no such rooms exist");
          return;
        }
        user.rooms.push(roomId.id);
      } catch (error) {
        console.log(error);
      }
    }
    if (parsedData.type === "leave") {
      try {
        const user = users.find((u) => u.ws === ws && u.userId === userId);
        if (!user) {
          return;
        }
        const roomId = decode(parsedData.roomId);
        user.rooms = user.rooms.filter((r) => r !== roomId.id);
      } catch (error) {
        console.log(error);
      }
    }
    if (parsedData.type === "chat") {
      console.log("chat", parsedData);
      try {
        const user = users.find((u) => u.ws === ws && u.userId === userId);
        if (!user) {
          return;
        }
        const message = parsedData.message;
        if (!message) {
          return;
        }

        const roomId = decode(parsedData.roomId);
        let recipients = users.filter((u) => u.rooms.includes(roomId.id));

        await prisma.chat.create({
          data: {
            message,
            user: {
              connect: {
                id: userId,
              },
            },
            room: {
              connect: {
                id: roomId.id,
              },
            },
          },
        });

        recipients.forEach((u) => {
          try {
            u.ws.send(
              JSON.stringify({
                type: "chat",
                message: message,
                roomId: roomId.id,
              }),
            );
          } catch (sendError) {
            console.error(
              `Error sending message to user ${u.userId}:`,
              sendError,
            );
          }
        });
      } catch (error) {
        console.error("An error occurred while processing chat:", error);
      }
    } else {
      console.log("Unknown message type:", parsedData.type);
    }
  });
});
