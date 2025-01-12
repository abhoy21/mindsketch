import { CreateRoomSchema } from "@repo/common/types";
import { Router } from "express";

const router: Router = Router();

router.post("/room", (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  // db call

  res.json({
    roomId: 123,
  });
});
