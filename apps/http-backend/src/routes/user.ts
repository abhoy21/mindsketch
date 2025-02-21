import { JWT_SECRET } from "@repo/backend-common/config";
import { SignInSchema, SignUpSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessTokenWithRefreshToken } from "../helper";
import { AuthReqProps, middleware } from "../middleware";

const router: Router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const validation = SignUpSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }
    const { name, email, password } = validation.data;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists", existingUser });
      return;
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedpassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    res.status(200).json({ message: "Signup successful", user });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error signing up user!, please try again" });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const validation = SignInSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }
    const { email, password } = validation.data;

    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "No user found!" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenWithRefreshToken(user.id);

    if (!accessToken || !refreshToken) {
      res.status(401).json({ message: "Error signing in user!" });
      return;
    }

    res
      .status(200)
      .json({ message: "Signin successful", accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Error signing in user! Please try again with proper credentials!",
    });
  }
});

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

router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const oldRefreshToken = req.body.refreshToken;
    const decoded = jwt.verify(oldRefreshToken, JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded.userId) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (user.refreshToken !== oldRefreshToken) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenWithRefreshToken(user.id);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    if (!updatedUser) {
      res.status(400).json({ message: "Error refreshing token!" });
      return;
    }

    res
      .status(200)
      .json({ message: "Token refreshed", accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error refreshing token!" });
  }
});

export const userRouter: Router = router;
