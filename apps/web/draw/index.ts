import axios from "axios";
import { HTTP_BACKEND_URL } from "../config";

type ShapeType =
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
      startX: number;
      startY: number;
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
    };

export default async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const existingShapes: ShapeType[] = await getExistingShapes(roomId);

  console.log("existingShapes", existingShapes);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("message", message);
    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      console.log("parsedShape", parsedShape);
      existingShapes.push(parsedShape);
      displayCanvas(existingShapes, ctx, canvas);
    }
  };

  displayCanvas(existingShapes, ctx, canvas);

  ctx.strokeStyle = "#fff";

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
    console.log("mouse down", e.clientX, e.clientY);
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;

    if (width > 0 && height > 0) {
      const shape: ShapeType = {
        type: "rect",
        startX,
        startY,
        width,
        height,
        color: "#fff",
      };
      existingShapes.push(shape);

      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify(shape),
          roomId,
        }),
      );
    }
    ctx.strokeStyle = "rgba(255, 255, 255)";
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      displayCanvas(existingShapes, ctx, canvas);

      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function displayCanvas(
  existingShapes: ShapeType[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = shape.color;
      ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${HTTP_BACKEND_URL}/api/v1/chats/${roomId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (response.status === 200) {
      const messages = response.data.chats;
      const shapes = messages.map((m: { message: string }) => {
        const shape = JSON.parse(m.message);
        return shape;
      });

      return shapes;
    }
  } catch (error) {
    console.log(error);
  }
}
