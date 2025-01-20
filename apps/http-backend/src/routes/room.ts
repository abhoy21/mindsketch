import { decode, encode } from "@repo/backend-common/encoder-decoder";
import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Response, Router } from "express";
import { AuthReqProps } from "../middleware";

const router: Router = Router();

interface RoomProps extends AuthReqProps {
  body: {
    slug: string;
  };
}

interface ChatProps extends AuthReqProps {
  params: {
    roomId: string;
  };
}

router.post("/room", async (req: RoomProps, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const validation = CreateRoomSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const slug = validation.data.name;

    const existingRoom = await prisma.room.findFirst({
      where: {
        slug: slug,
      },
    });

    if (existingRoom) {
      const roomId = encode({ id: existingRoom.id, slug: existingRoom.slug });
      res.status(200).json({ message: "Room created", response: roomId });
      return;
    }

    const response = await prisma.room.create({
      data: {
        slug,
        admin: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const roomId = encode({ id: response.id, slug: response.slug });

    res.status(200).json({ message: "Room created", response: roomId });
  } catch (error) {
    res.status(500).json({ message: "Error creating room" });
  }
});

router.get("/chats/:roomId", async (req: ChatProps, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const roomId = decode(req.params.roomId ?? "");

    if (!roomId) {
      res.status(400).json({ message: "Invalid roomId" });
      return;
    }

    const chats = await prisma.chat.findMany({
      where: {
        roomId: roomId.id,
        userId: userId,
      },
      orderBy: {
        id: "desc",
      },
      take: 100,
    });

    res.status(200).json({ message: "Chat retrieved", chats });
  } catch (error) {
    res.status(500).json({ message: "Error getting chat" });
  }
});

export const useRoom: Router = router;
