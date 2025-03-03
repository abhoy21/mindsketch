import { Response, Router } from "express";
import { AuthReqProps, middleware } from "../middleware";
import { prisma } from "@repo/db/client";

const router: Router = Router();

router.post("/logout", middleware, async (req: AuthReqProps, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).send("Unauthorized");
      return;
    }
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: "",
      },
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
