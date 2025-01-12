import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) return;

  const queryparams = new URLSearchParams(url.split("?")[1]);
  const token = queryparams.get("token") || "";
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (!decoded || !decoded.userId) {
    ws.close();
    return;
  }

  ws.on("message", function message(data) {
    ws.send("pong");
  });
});
