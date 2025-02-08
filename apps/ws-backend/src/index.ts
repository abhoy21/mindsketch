import { JWT_SECRET } from "@repo/backend-common/config";
import { DataProps, decode } from "@repo/backend-common/encoder-decoder";

import { prisma } from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { UserManager } from "./state-management";

const wss = new WebSocketServer({ port: 8080 });
const userManager = UserManager.getInstance();

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

  userManager.addUser(ws, userId);

  ws.on("message", async function message(data: string) {
    const parsedData = JSON.parse(data);
    const roomId = decode(parsedData.roomId);

    if (parsedData.type === "join") {
      handleJoin(roomId, userId, ws);
    } else if (parsedData.type === "leave") {
      handleLeave(roomId, userId, ws);
    } else if (parsedData.type === "chat") {
      console.log("chat", parsedData);
      handleChat(roomId, userId, ws, parsedData);
    } else if (parsedData.type === "delete") {
      handleDelete(roomId, userId, ws, parsedData);
    } else {
      console.log("Unknown message type:", parsedData.type);
    }
  });
});

async function handleJoin(roomId: DataProps, userId: string, ws: WebSocket) {
  try {
    console.log(roomId);
    const user = userManager.findUserByWS(ws);

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
    userManager.addUserToRoom(roomId.id, userId, ws);
  } catch (error) {
    console.log(error);
  }
}

function handleLeave(roomId: DataProps, userId: string, ws: WebSocket) {
  try {
    userManager.removeUser(roomId.id, userId, ws);
  } catch (error) {
    console.log(error);
  }
}

async function handleChat(
  roomId: DataProps,
  userId: string,
  ws: WebSocket,
  parsedData: any
) {
  try {
    const user = userManager.findUserByWS(ws);

    if (!user) {
      console.log("user not found");
      return;
    }
    const message = parsedData.message;
    if (!message) {
      console.log("message not got");
      return;
    }

    console.log("inside handleChat: message -> ", message);

    let recipients = userManager.getUsersInRoom(roomId.id);

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
          })
        );
      } catch (sendError) {
        console.error(`Error sending message to user ${u.userId}:`, sendError);
      }
    });
  } catch (error) {
    console.error("An error occurred while processing chat:", error);
  }
}

async function handleDelete(
  roomId: DataProps,
  userId: string,
  ws: WebSocket,
  parsedData: any
) {
  try {
    const user = userManager.findUserByWS(ws);

    if (!user) {
      console.log("user not found");
      return;
    }
    const message = parsedData.message;
    if (!message) {
      console.log("message not got");
      return;
    }

    const messageData = await prisma.chat.findFirst({
      where: {
        message: message,
        room: {
          id: roomId.id,
        },
      },
    });

    if (!messageData) {
      console.log("message not found");
      return;
    }

    await prisma.chat.delete({
      where: {
        id: messageData.id,
        message: message,
        room: {
          id: roomId.id,
        },
      },
    });
  } catch (error) {
    console.error("An error occurred while processing chat:", error);
  }
}
