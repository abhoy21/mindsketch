import cors from "cors";
import express from "express";
import { middleware } from "./middleware";
import { useRoom } from "./routes/room";
import { userRouter } from "./routes/user";
import { useGenerate } from "./routes/generate";
import logoutRouter from "./routes/logout";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("Server running on port 8000");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/auth", logoutRouter);
app.use("/api/v1", middleware, useRoom);
app.use("/api/v1/ai", middleware, useGenerate);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
