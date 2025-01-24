import { SelectedTool, ShapeType } from "@repo/common/types";
import getExistingShapes from "./http-function";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: ShapeType[];
  private roomId: string;
  socket: WebSocket;
  private clicked: boolean;
  private startX: number;
  private startY: number;
  private selectedTool: SelectedTool = SelectedTool.Rectangle;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.startX = 0;
    this.startY = 0;
    this.init();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownhandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: SelectedTool) {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    console.log(this.existingShapes);
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape);
        this.displayCanvas();
      }
    };
  }

  displayCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape) => {
      if (!shape) return;
      if (shape.type === "rect") {
        this.ctx.strokeStyle = shape.color;
        this.ctx.strokeRect(
          shape.startX,
          shape.startY,
          shape.width,
          shape.height,
        );
      } else if (shape.type === "circle") {
        this.ctx.strokeStyle = shape.color;
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2,
        );
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "line") {
        this.ctx.strokeStyle = shape.color;
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownhandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    const selectedTool = this.selectedTool;
    let shape: ShapeType | null = null;
    if (selectedTool === SelectedTool.Rectangle) {
      shape = {
        type: "rect",
        startX: this.startX,
        startY: this.startY,
        width: width,
        height: height,
        color: "#fff",
      };
    } else if (selectedTool === SelectedTool.Ellipse) {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        centerX: this.startX + radius,
        centerY: this.startY + radius,
        radius: radius,
        color: "#fff",
      };
    } else if (selectedTool === SelectedTool.Line) {
      shape = {
        type: "line",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY,
        color: "#fff",
      };
    }

    this.existingShapes.push(shape as ShapeType);
    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId: this.roomId,
      }),
    );
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.displayCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      const selectedTool = this.selectedTool;
      if (selectedTool === SelectedTool.Rectangle) {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === SelectedTool.Ellipse) {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (selectedTool === SelectedTool.Line) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownhandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
