import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthReqProps extends Request {
  token?: string;
  userId?: number;
}
export async function middleware(
  req: AuthReqProps,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers["authorization"] ?? "";

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
