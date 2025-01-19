import { JWT_SECRET } from "@repo/backend-common/config";
import { AuthReqProps } from "@repo/common/types";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(
  req: AuthReqProps,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.get("Authorization") ?? "";

    await jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      } else {
        const decodedPayload = decoded as JwtPayload;
        req.userId = decodedPayload.userId;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
