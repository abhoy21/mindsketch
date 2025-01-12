import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, "username must be at least 3 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "username can only contain letters, numbers, and underscores",
    ),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});
