import express from "express";
import { userRouter } from "./routes/user";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", userRouter);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
