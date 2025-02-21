import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required in environment variables");
}

if (!process.env.ACCESS_TOKEN_EXPIRES_IN) {
  throw new Error(
    "ACCESS_TOKEN_EXPIRES_IN is required in environment variables"
  );
}

if (!process.env.REFRESH_TOKEN_EXPIRES_IN) {
  throw new Error(
    "REFRESH_TOKEN_EXPIRES_IN is required in environment variables"
  );
}

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required in environment variables");
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = Number(
  process.env.ACCESS_TOKEN_EXPIRES_IN
);
export const REFRESH_TOKEN_EXPIRES_IN = Number(
  process.env.REFRESH_TOKEN_EXPIRES_IN
);
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
