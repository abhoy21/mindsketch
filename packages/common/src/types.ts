import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(5).max(20),
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
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9\-_@]{1,}$/,
      'Only letters, numbers, "_", "-", and "@" are allowed',
    ),
});

export const JoinRoomSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
});

export const SelectedTool = {
  Rectangle: "Rectangle",
  Ellipse: "Ellipse",
  Diamond: "Diamond",
  Text: "Text",
  Arrow: "Arrow",
  Line: "Line",
  Pencil: "Pencil",
  Eraser: "Eraser",
  Pointer: "Pointer",
  Delete: "Delete",
} as const;

export type SelectedTool = (typeof SelectedTool)[keyof typeof SelectedTool];

export type ShapeType =
  | {
      type: "rect";
      startX: number;
      startY: number;
      width: number;
      height: number;
      color: string;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      color: string;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      color: string;
    }
  | {
      type: "text";
      startX: number;
      startY: number;
      text: string;
      color: string;
      fontSize: number;
    }
  | {
      type: "arrow";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      color: string;
    }
  | {
      type: "diamond";
      startX: number;
      startY: number;
      width: number;
      height: number;
      color: string;
    }
  | {
      type: "pencil";
      points: Array<{
        x: number;
        y: number;
        lineWidth: number;
      }>;

      color: string;
    }
  | { type: "none" };
