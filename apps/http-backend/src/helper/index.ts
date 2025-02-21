import {
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";
import jwt from "jsonwebtoken";

type ACCESS_REFRESH_TOKEN = {
  accessToken: string;
  refreshToken: string;
};

export const generateAccessToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  return token;
};

export const generateRefreshToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  return token;
};

export const generateAccessTokenWithRefreshToken = async (
  userId: string
): Promise<ACCESS_REFRESH_TOKEN> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error Refreshing access token", error);
    return { accessToken: "", refreshToken: "" };
  }
};
