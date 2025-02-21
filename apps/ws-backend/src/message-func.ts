import { DataProps } from "@repo/backend-common/encoder-decoder";
import { prisma } from "@repo/db/client";
import { UserManager } from "./state-management";
import { WebSocket } from "ws";
import { RedisClientType } from "redis";

export async function handleJoin(
  roomId: DataProps,
  userId: string,
  ws: WebSocket,
  userManager: UserManager
) {
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

export function handleLeave(
  roomId: DataProps,
  userId: string,
  ws: WebSocket,
  userManager: UserManager
) {
  try {
    userManager.removeUser(roomId.id, userId, ws);
  } catch (error) {
    console.log(error);
  }
}

export async function handleChat(
  roomId: DataProps,
  userId: string,
  ws: WebSocket,
  parsedData: any,
  userManager: UserManager,
  client: RedisClientType
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

    const messageQueue = JSON.stringify({
      roomId,
      message,
      userId,
    });

    await client.lPush("room-chats", messageQueue);

    let recipients = userManager.getUsersInRoom(roomId.id);

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

export async function handleDelete(
  roomId: DataProps,
  userId: string,
  ws: WebSocket,
  parsedData: any,
  userManager: UserManager
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

export async function handleEdit(
  roomId: DataProps,
  userId: string,
  ws: WebSocket,
  parsedData: any,
  userManager: UserManager
) {
  try {
    const user = userManager.findUserByWS(ws);

    if (!user) {
      console.log("user not found");
      return;
    }
    console.log("Parsed data", parsedData);
    const message = parsedData.message;
    const oldMessage = parsedData.oldMessage;
    console.log("oldMessage", oldMessage);
    console.log("message", message);
    if (!message || !oldMessage) {
      console.log("message not got");
      return;
    }

    const messageData = await prisma.chat.findFirst({
      where: {
        message: oldMessage,
        room: {
          id: roomId.id,
        },
      },
    });

    console.log("messageData", messageData);

    if (!messageData) {
      console.log("message not found");
      return;
    }

    await prisma.chat.update({
      where: {
        id: messageData.id,
        message: oldMessage,
        room: {
          id: roomId.id,
        },
      },
      data: {
        message: message,
      },
    });
  } catch (error) {
    console.error("An error occurred while processing chat:", error);
  }
}
