import { createClient } from "redis";
import { prisma } from "@repo/db/client";

const client = createClient({
  url: "redis://localhost:6379",
});

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");
    while (true) {
      const message = await client.brPop("room-chats", 0);
      if (message?.element) {
        console.log("Got message", message.element);
        await pushMessagesToDB(message.element);
      }
    }
  } catch (error) {
    console.log("Error starting worker", error);
    throw new Error("Error starting worker");
  }
}

async function pushMessagesToDB(messages: string) {
  const { roomId, message, userId } = JSON.parse(messages);
  console.log("Pushing to DB");
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
}

startWorker();
