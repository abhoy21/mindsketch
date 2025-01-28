import { SelectedTool, ShapeType } from "@repo/common/types";
import { CanvasDrawingUtils } from "./canvas-draw-utils";
import getExistingShapes from "./http-function";
import { createPencilShape, createShape } from "./shape-create-utils";

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
  private textInput: HTMLInputElement | null = null;
  private previousX: number = 0;
  private previousY: number = 0;
  private viewportTransform = {
    x: 0,
    y: 0,
    scale: 1,
  };
  private points: Array<{
    x: number;
    y: number;
    lineWidth: number;
  }> = [];

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
    this.initHandlers();
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

  scaleCanvas(scale: number) {
    this.canvas.width = this.canvas.width * scale;
    this.canvas.height = this.canvas.height * scale;
    this.canvas.style.width = `${this.canvas.width}px`;
    this.canvas.style.height = `${this.canvas.height}px`;
    this.ctx.scale(scale, scale);
    this.init();
  }

  updateZooming(e: WheelEvent) {
    const oldScale = this.viewportTransform.scale;
    const oldX = this.viewportTransform.x;
    const oldY = this.viewportTransform.y;

    const localX = e.clientX;
    const localY = e.clientY;

    const newScale = (this.viewportTransform.scale += e.deltaY * -0.01);
    const newX = localX - (localX - oldX) * (newScale / oldScale);
    const newY = localY - (localY - oldY) * (newScale / oldScale);

    this.viewportTransform.scale = newScale;
    this.viewportTransform.x = newX;
    this.viewportTransform.y = newY;
    this.displayCanvas();
  }

  updatePanning(e: MouseEvent) {
    if (!this.clicked || this.selectedTool !== SelectedTool.Pointer) return;

    const deltaX = e.clientX - this.previousX;
    const deltaY = e.clientY - this.previousY;

    this.viewportTransform.x += deltaX;
    this.viewportTransform.y += deltaY;

    this.displayCanvas();

    this.previousX = e.clientX;
    this.previousY = e.clientY;
  }

  removeTextInput() {
    if (this.textInput) {
      this.textInput.remove();
      this.textInput = null;
    }
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    console.log("Existing shapes", this.existingShapes);
    this.displayCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape);
        this.displayCanvas();
      }
    };
  }

  private displayCanvas() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.setTransform(
      this.viewportTransform.scale,
      0,
      0,
      this.viewportTransform.scale,
      this.viewportTransform.x,
      this.viewportTransform.y,
    );

    this.existingShapes.forEach((shape) => {
      switch (shape.type) {
        case "rect":
          CanvasDrawingUtils.drawRect(this.ctx, shape);
          break;
        case "circle":
          CanvasDrawingUtils.drawCircle(this.ctx, shape);
          break;
        case "line":
          CanvasDrawingUtils.drawLine(this.ctx, shape);
          break;
        case "text":
          CanvasDrawingUtils.drawText(this.ctx, shape);
          break;
        case "arrow":
          CanvasDrawingUtils.drawArrow(this.ctx, shape);
          break;
        case "diamond":
          CanvasDrawingUtils.drawDiamond(this.ctx, shape);
          break;
        case "pencil":
          CanvasDrawingUtils.drawPencil(this.ctx, shape);
          break;
      }
    });
  }

  mouseDownhandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    if (this.selectedTool === SelectedTool.Pointer) {
      this.previousX = e.clientX;
      this.previousY = e.clientY;
    }

    if (this.selectedTool === SelectedTool.Text) {
      this.handleTextInput(e);
    }

    if (this.selectedTool === SelectedTool.Pencil) {
      const pressure = 0.1;
      const x = e.clientX;
      const y = e.clientY;
      const lineWidth = Math.log(pressure + 1) * 40;
      this.ctx.lineWidth = lineWidth;
      this.points.push({ x, y, lineWidth });
      CanvasDrawingUtils.drawPencil(this.ctx, {
        type: "pencil",
        points: this.points,
        color: "#fff",
      });
    }
  };

  private handleTextInput(e: MouseEvent) {
    this.removeTextInput();
    this.textInput = document.createElement("input");
    this.textInput.type = "text";
    this.textInput.style.position = "absolute";
    this.textInput.style.top = `${e.clientY}px`;
    this.textInput.style.left = `${e.clientX}px`;
    this.textInput.style.background = "#121212";
    this.textInput.style.border = "none";
    this.textInput.style.outline = "none";
    this.textInput.style.color = "white";
    this.textInput.style.caretColor = "white";
    this.textInput.autofocus = true;
    this.textInput.placeholder = "Type your text here";

    this.textInput.addEventListener("keydown", this.handleTextInputEnter);
    document.body.appendChild(this.textInput);
    this.textInput.focus();
  }

  private handleTextInputEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && this.textInput) {
      const text = this.textInput.value;
      const textShape: ShapeType = {
        type: "text",
        startX: this.startX,
        startY: this.startY,
        text: text,
        color: "#fff",
        fontSize: 14,
      };
      this.existingShapes.push(textShape);
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify(textShape),
          roomId: this.roomId,
        }),
      );

      this.ctx.fillStyle = "#fff";
      this.ctx.font = "14px Arial";
      this.ctx.fillText(text, this.startX, this.startY);

      this.removeTextInput();
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    if (this.selectedTool === SelectedTool.Pencil) {
      const shape = createPencilShape(this.points);

      if (shape) {
        this.existingShapes.push(shape);
        this.socket.send(
          JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: this.roomId,
          }),
        );
      }

      this.points = [];
    } else if (this.selectedTool !== SelectedTool.Text) {
      const endX = e.clientX;
      const endY = e.clientY;

      const shape = createShape(
        this.selectedTool,
        this.startX,
        this.startY,
        endX,
        endY,
      );

      if (shape) {
        this.existingShapes.push(shape);
        this.socket.send(
          JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: this.roomId,
          }),
        );
      }
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked && this.selectedTool !== SelectedTool.Text) {
      if (this.selectedTool === SelectedTool.Pointer) {
        return this.updatePanning(e);
      }

      this.displayCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

      const endX = e.clientX;
      const endY = e.clientY;
      let radius = 0.0;
      let centerX = 0.0;
      let centerY = 0.0;
      let diamondWidth = 0.0;
      let diamondHeight = 0.0;
      const pressure = 0.1;

      const x = e.clientX;
      const y = e.clientY;
      const lineWidth = Math.log(pressure + 1) * 40;
      switch (this.selectedTool) {
        case SelectedTool.Rectangle:
          this.ctx.strokeRect(
            this.startX,
            this.startY,
            endX - this.startX,
            endY - this.startY,
          );
          break;
        case SelectedTool.Ellipse:
          radius =
            Math.max(
              Math.abs(endX - this.startX),
              Math.abs(endY - this.startY),
            ) / 2;
          centerX = this.startX + (endX - this.startX) / 2;
          centerY = this.startY + (endY - this.startY) / 2;

          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          this.ctx.stroke();
          this.ctx.closePath();
          break;
        case SelectedTool.Line:
          this.ctx.beginPath();
          this.ctx.moveTo(this.startX, this.startY);
          this.ctx.lineTo(endX, endY);
          this.ctx.stroke();
          this.ctx.closePath();
          break;
        case SelectedTool.Arrow:
          CanvasDrawingUtils.drawArrow(this.ctx, {
            type: "arrow",
            startX: this.startX,
            startY: this.startY,
            endX: endX,
            endY: endY,
            color: "rgba(255, 255, 255, 0.5)",
          });
          break;
        case SelectedTool.Diamond:
          diamondWidth = endX - this.startX;
          diamondHeight = endY - this.startY;

          CanvasDrawingUtils.drawDiamond(this.ctx, {
            type: "diamond",
            startX: this.startX,
            startY: this.startY,
            width: diamondWidth,
            height: diamondHeight,
            color: "rgba(255, 255, 255, 0.5)",
          });
          break;
        case SelectedTool.Pencil:
          this.ctx.lineWidth = lineWidth;
          this.points.push({ x, y, lineWidth });
          CanvasDrawingUtils.drawPencil(this.ctx, {
            type: "pencil",
            points: this.points,
            color: "#fff",
          });
          break;
      }
    }
  };

  mouseWheelHandler = (e: WheelEvent) => {
    this.updateZooming(e);
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownhandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("wheel", this.mouseWheelHandler);
  }
}
