import { JWT_SECRET } from "@repo/backend-common/config";

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthReqProps extends Request {
  userId?: string;
}

export async function middleware(
  req: AuthReqProps,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

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
