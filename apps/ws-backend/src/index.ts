import { WebSocketServer } from "ws";
import { UserManager } from "./state-management";
import {
  handleChat,
  handleDelete,
  handleEdit,
  handleJoin,
  handleLeave,
} from "./message-func";
import { createClient, RedisClientType } from "redis";
import { decode } from "@repo/backend-common/encoder-decoder";

const wss = new WebSocketServer({ port: 8080 });
const userManager = UserManager.getInstance();

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

const onStartServer = async () => {
  try {
    await client.connect();
    console.log("Redis Client Connected");
    wss.on("connection", function connection(ws, request) {
      const url = request.url;

      if (!url) return;

      const queryparams = new URLSearchParams(url.split("?")[1]);
      const token = queryparams.get("token") || "";
      const userId = userManager.checkUser(token);
      if (userId === null) {
        ws.close();
        return;
      }

      userManager.addUser(ws, userId);

      ws.on("message", async function message(data: string) {
        const parsedData = JSON.parse(data);
        const roomId = decode(parsedData.roomId);

        if (parsedData.type === "join") {
          handleJoin(roomId, userId, ws, userManager);
        } else if (parsedData.type === "leave") {
          handleLeave(roomId, userId, ws, userManager);
        } else if (parsedData.type === "chat") {
          console.log("chat", parsedData);
          handleChat(
            roomId,
            userId,
            ws,
            parsedData,
            userManager,
            client as RedisClientType
          );
        } else if (parsedData.type === "delete") {
          handleDelete(roomId, userId, ws, parsedData, userManager);
        } else if (parsedData.type === "edit") {
          handleEdit(roomId, userId, ws, parsedData, userManager);
        } else {
          console.log("Unknown message type:", parsedData.type);
        }
      });
    });
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
};

onStartServer();
