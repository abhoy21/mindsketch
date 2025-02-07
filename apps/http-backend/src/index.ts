import cors from "cors";
import express from "express";
import { middleware } from "./middleware";
import { useRoom } from "./routes/room";
import { userRouter } from "./routes/user";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1", middleware, useRoom);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
