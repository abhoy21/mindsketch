import { JWT_SECRET } from "@repo/backend-common/config";
import { SignInSchema, SignUpSchema } from "@repo/common/types";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router: Router = Router();

router.get("/signup", (req, res) => {
  try {
    const validation = SignUpSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }
    const { username, email, password } = validation.data;
    const user = "";
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error signing up user!, please try again" });
  }
});

router.post("/signin", (req, res) => {
  try {
    const validation = SignInSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }
    const { email, password } = validation.data;

    const user = "";
    const passwordVerify = "";

    const token = jwt.sign({ user }, JWT_SECRET);

    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message:
        "Error signing in user!, please try again with proper credentials!",
    });
  }
});

export const userRouter: Router = router;
