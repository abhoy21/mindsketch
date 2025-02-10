import { SelectedTool, ShapeType } from "@repo/common/types";
import { CanvasDrawingUtils } from "./canvas-draw-utils";
import getExistingShapes from "./http-function";
import { createPencilShape, createShape } from "./shape-create-utils";
import { TextInputHandler } from "./text-input-handler";

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
  private selectedShape: ShapeType | null = null;
  private oldShape: ShapeType | null = null;
  private textInputHandler: TextInputHandler;

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
    this.textInputHandler = new TextInputHandler(socket, roomId);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownhandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("wheel", this.mouseWheelHandler);
    this.textInputHandler.removeTextInput();
  }

  setTool(tool: SelectedTool) {
    console.log("Setting tool", tool);
    this.selectedTool = tool;
  }

  private deepCopyShape(shape: ShapeType): ShapeType {
    return JSON.parse(JSON.stringify(shape));
  }

  updateZooming(e: WheelEvent) {
    e.preventDefault();

    const oldScale = this.viewportTransform.scale;
    const oldX = this.viewportTransform.x;
    const oldY = this.viewportTransform.y;

    const localX = e.clientX;
    const localY = e.clientY;

    const stepSize = 0.1;
    let newScale;

    if (e.deltaY < 0) {
      newScale = oldScale + stepSize;
    } else {
      newScale = Math.max(0.1, oldScale - stepSize);
    }

    const newX = localX - (localX - oldX) * (newScale / oldScale);
    const newY = localY - (localY - oldY) * (newScale / oldScale);

    console.log("New Scale", newScale);

    this.viewportTransform.scale = newScale;
    this.viewportTransform.x = newX;
    this.viewportTransform.y = newY;

    this.displayCanvas();
  }

  updatePanning(e: MouseEvent) {
    if (!this.clicked || this.selectedTool !== SelectedTool.Hand) return;

    const deltaX = e.clientX - this.previousX;
    const deltaY = e.clientY - this.previousY;

    this.viewportTransform.x += deltaX;
    this.viewportTransform.y += deltaY;

    this.displayCanvas();

    this.previousX = e.clientX;
    this.previousY = e.clientY;
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

  sendDeleteShape() {
    const selectedShape = JSON.stringify(this.selectedShape);
    console.log("selectedShape", selectedShape);
    const message = JSON.stringify({
      type: "delete",
      message: selectedShape,
      roomId: this.roomId,
    });
    this.socket.send(message);
    this.init();
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
      this.viewportTransform.y
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

  private isPointInShape(x: number, y: number, shape: ShapeType): boolean {
    switch (shape.type) {
      case "rect":
        return (
          x >= shape.startX &&
          x <= shape.startX + shape.width &&
          y >= shape.startY &&
          y <= shape.startY + shape.height
        );

      case "circle":
        return (
          x >= shape.centerX - shape.radius &&
          x <= shape.centerX + shape.radius &&
          y >= shape.centerY - shape.radius &&
          y <= shape.centerY + shape.radius
        );

      case "line":
        return this.isPointNearLine(
          x,
          y,
          shape.startX,
          shape.startY,
          shape.endX,
          shape.endY
        );

      case "arrow":
        return this.isPointNearLine(
          x,
          y,
          shape.startX,
          shape.startY,
          shape.endX,
          shape.endY
        );

      case "diamond":
        return (
          x >= shape.startX &&
          x <= shape.startX + shape.width &&
          y >= shape.startY &&
          y <= shape.startY + shape.height
        );

      case "text":
        return (
          x >= shape.startX &&
          x <= shape.startX + this.textLength(shape.text) &&
          y >= shape.startY - 14 &&
          y <= shape.startY
        );

      case "pencil":
        if (!shape.points.length) return false;
        console.log("shape.points", shape.points);
        return (
          (x >= shape.points[0]!.x &&
            x <= shape.points[shape.points.length - 1]!.x) ||
          (y >= shape.points[0]!.y &&
            y <= shape.points[shape.points.length - 1]!.y)
        );

      default:
        return false;
    }
  }

  private isPointNearLine(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): boolean {
    const lineLengthSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (lineLengthSquared === 0) return false;

    const t =
      ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / lineLengthSquared;
    const nearestX = x1 + t * (x2 - x1);
    const nearestY = y1 + t * (y2 - y1);

    if (t < 0 || t > 1) return false;

    const distanceSquared = (px - nearestX) ** 2 + (py - nearestY) ** 2;
    const tolerance = 5;
    return distanceSquared <= tolerance * tolerance;
  }

  private textLength(text: string) {
    const averageLength = 14 * 0.6;
    return averageLength * text.length;
  }

  private moveObjects(e: MouseEvent) {
    const newX = e.clientX;
    const newY = e.clientY;
    console.log("newX, newY", newX, newY);

    if (this.selectedShape) {
      switch (this.selectedShape.type) {
        case "rect":
          this.selectedShape.startX = newX;
          this.selectedShape.startY = newY;
          break;
        case "circle":
          this.selectedShape.centerX = newX;
          this.selectedShape.centerY = newY;
          break;
        case "line":
          this.selectedShape.startX = newX;
          this.selectedShape.startY = newY;
          this.selectedShape.endX = newX;
          this.selectedShape.endY = newY;
          break;
        case "arrow":
          this.selectedShape.startX = newX;
          this.selectedShape.startY = newY;
          this.selectedShape.endX = newX;
          this.selectedShape.endY = newY;
          break;
        case "diamond":
          this.selectedShape.startX = newX;
          this.selectedShape.startY = newY;
          break;

        default:
          return;
      }
    }

    this.displayCanvas();
    console.log("selectedShape inside moveObjects", this.selectedShape);
  }

  mouseDownhandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

    const selectedShape = this.existingShapes.find((shape) =>
      this.isPointInShape(e.clientX, e.clientY, shape)
    );
    console.log("mouse down selectedShape", selectedShape);
    if (selectedShape) {
      this.selectedShape = selectedShape;
      console.log("selectedShape", this.selectedShape);
      if (this.selectedTool === SelectedTool.Delete) {
        this.sendDeleteShape();
        this.displayCanvas();
      } else if (this.selectedTool === SelectedTool.Pointer) {
        this.oldShape = this.deepCopyShape(selectedShape);
        console.log("Calling moveObjects", this.oldShape);
        this.moveObjects(e);
      }
    } else {
      this.selectedShape = null;
    }
    if (this.selectedTool === SelectedTool.Pointer) {
      this.previousX = e.clientX;
      this.previousY = e.clientY;
    }

    if (this.selectedTool === SelectedTool.Text) {
      this.textInputHandler.handleTextInput(
        e,
        this.startX,
        this.startY,
        (shape) => {
          this.existingShapes.push(shape);
          this.displayCanvas();
        }
      );
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
          })
        );
      }

      this.points = [];
    } else if (this.selectedTool === SelectedTool.Pointer) {
      console.log("Mouse up Pointer selected shape", this.selectedShape);
      if (this.selectedShape && this.oldShape) {
        this.existingShapes = this.existingShapes.filter(
          (shape) => shape !== this.oldShape
        );
        this.existingShapes.push(this.selectedShape);
        this.socket.send(
          JSON.stringify({
            type: "edit",
            oldMessage: JSON.stringify(this.oldShape),
            message: JSON.stringify(this.selectedShape),
            roomId: this.roomId,
          })
        );
      }
    } else if (this.selectedTool !== SelectedTool.Text) {
      const endX = e.clientX;
      const endY = e.clientY;

      const shape = createShape(
        this.selectedTool,
        this.startX,
        this.startY,
        endX,
        endY
      );

      if (shape) {
        this.existingShapes.push(shape);
        this.socket.send(
          JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: this.roomId,
          })
        );
      }
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked && this.selectedTool !== SelectedTool.Text) {
      if (this.selectedTool === SelectedTool.Hand) {
        console.log("Calling update panning", this.selectedTool);
        return this.updatePanning(e);
      }

      if (this.selectedTool === SelectedTool.Pointer) {
        console.log("Calling moveObjects");
        this.moveObjects(e);
      }

      this.displayCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

      const endX = e.clientX;
      const endY = e.clientY;
      let diamondWidth = 0.0;
      let diamondHeight = 0.0;
      const pressure = 0.1;

      const x = e.clientX;
      const y = e.clientY;
      const lineWidth = Math.log(pressure + 1) * 40;
      switch (this.selectedTool) {
        case SelectedTool.Rectangle:
          CanvasDrawingUtils.drawRect(this.ctx, {
            type: "rect",
            startX: this.startX,
            startY: this.startY,
            width: endX - this.startX,
            height: endY - this.startY,
            color: "#fff",
          });
          break;
        case SelectedTool.Ellipse:
          CanvasDrawingUtils.drawCircle(this.ctx, {
            type: "circle",
            centerX: this.startX + (endX - this.startX) / 2,
            centerY: this.startY + (endY - this.startY) / 2,
            radius:
              Math.max(
                Math.abs(endX - this.startX),
                Math.abs(endY - this.startY)
              ) / 2,
            color: "#fff",
          });
          break;
        case SelectedTool.Line:
          CanvasDrawingUtils.drawLine(this.ctx, {
            type: "line",
            startX: this.startX,
            startY: this.startY,
            endX,
            endY,
            color: "#fff",
          });
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
