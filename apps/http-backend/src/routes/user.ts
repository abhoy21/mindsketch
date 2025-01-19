import { JWT_SECRET } from "@repo/backend-common/config";
import { SignInSchema, SignUpSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router: Router = Router();

router.post("/signup", async (req, res) => {
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

router.post("/signin", async (req, res) => {
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

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Error signing in user! Please try again with proper credentials!",
    });
  }
});

export const userRouter: Router = router;
