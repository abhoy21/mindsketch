import { AuthReqProps } from "@repo/common/types";
import { Router } from "express";

const router: Router = Router();

router.post("/room", (req: AuthReqProps, res) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export const useRoom: Router = router;
