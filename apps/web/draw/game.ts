import { SelectedTool, ShapeType } from "@repo/common/types";
import { CanvasShapeManager } from "./canvas-draw-utils";
import getExistingShapes from "./http-function";
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
  private canvasShapeManager: CanvasShapeManager;
  onScaleChange?: (scale: number) => void;
  private strokeColor: string = "#a7a7ac";
  private bgColor: string = "transparent";
  private strokeWidth: number = 1;
  private fontSize: number = 14;
  private strokeStyle: string = "solid";

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.startX = 0;
    this.startY = 0;
    this.canvasShapeManager = new CanvasShapeManager(this.ctx);
    this.points = [];
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
    this.textInputHandler = new TextInputHandler(socket, roomId);
    this.bgColor = "transparent";
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownhandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("wheel", this.mouseWheelHandler);
    this.textInputHandler.removeTextInput();
  }

  setTool(tool: SelectedTool) {
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

    if (this.onScaleChange) this.onScaleChange(newScale);

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

  setStrokeColor(color: string) {
    this.strokeColor = color;
  }

  setBgColor(color: string) {
    this.bgColor = color;
  }

  setStrokeWidth(width: number) {
    this.strokeWidth = width;
  }

  setFontSize(size: string) {
    switch (size) {
      case "small":
        this.fontSize = 12;
        break;
      case "medium":
        this.fontSize = 14;
        break;
      case "large":
        this.fontSize = 20;
        break;
      case "xlarge":
        this.fontSize = 28;
        break;
      default:
        this.fontSize = 14;
    }
  }

  setStrokeStyle(style: string) {
    this.strokeStyle = style;
  }

  sendDeleteShape() {
    if (this.selectedShape) {
      this.existingShapes = this.existingShapes.filter(
        (shape) => shape !== this.selectedShape
      );
      this.socket.send(
        JSON.stringify({
          type: "delete",
          message: JSON.stringify(this.selectedShape),
          roomId: this.roomId,
        })
      );
      this.selectedShape = null;
      this.displayCanvas();
    }
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

    if (this.existingShapes) {
      this.existingShapes.forEach((shape) => {
        this.canvasShapeManager.drawShape(shape);
      });
    }

    if (this.selectedShape && this.selectedTool === "Pointer") {
      const bounds = this.getSelectionBounds(this.selectedShape);
      this.drawSelectionBox(bounds.x, bounds.y, bounds.width, bounds.height);
    }
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

      case "text": {
        const textHeight = shape.fontSize || this.fontSize;
        return (
          x >= shape.startX &&
          x <= shape.startX + this.textLength(shape.text) &&
          y >= shape.startY - textHeight &&
          y <= shape.startY
        );
      }

      case "pencil":
        if (!shape.points.length) return false;

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

  drawSelectionBox(x: number, y: number, width: number, height: number) {
    this.ctx.save();

    this.ctx.strokeStyle = "#6082B6";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 3]); // Optional: adds dashed line effect
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.setLineDash([]);

    const handleRadius = 4;
    this.ctx.fillStyle = "#a85fed";
    this.ctx.strokeStyle = "#6082B6";
    this.ctx.lineWidth = 1;

    const drawHandle = (handleX: number, handleY: number) => {
      this.ctx.beginPath();
      this.ctx.arc(handleX, handleY, handleRadius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    };

    drawHandle(x, y);
    drawHandle(x + width, y);
    drawHandle(x, y + height);
    drawHandle(x + width, y + height);

    drawHandle(x + width / 2, y);
    drawHandle(x + width, y + height / 2);
    drawHandle(x + width / 2, y + height);
    drawHandle(x, y + height / 2);

    this.ctx.restore();
  }

  private getSelectionBounds(shape: ShapeType): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    switch (shape.type) {
      case "rect":
        return {
          x: shape.startX,
          y: shape.startY,
          width: shape.width,
          height: shape.height,
        };
      case "circle":
        return {
          x: shape.centerX - shape.radius,
          y: shape.centerY - shape.radius,
          width: shape.radius * 2,
          height: shape.radius * 2,
        };
      case "line":
      case "arrow": {
        const minX = Math.min(shape.startX, shape.endX);
        const minY = Math.min(shape.startY, shape.endY);

        const width = Math.abs(shape.endX - shape.startX) + 20;
        const height = Math.abs(shape.endY - shape.startY) + 20;

        return {
          x: minX,
          y: minY,
          width: width,
          height: height,
        };
      }
      case "diamond":
        return {
          x: shape.startX,
          y: shape.startY,
          width: shape.width,
          height: shape.height,
        };
      case "text": {
        const textHeight = shape.fontSize || this.fontSize;
        return {
          x: shape.startX,
          y: shape.startY - textHeight,
          width: this.textLength(shape.text),
          height: textHeight,
        };
      }
      case "pencil": {
        if (!shape.points.length) return { x: 0, y: 0, width: 0, height: 0 };

        let minPencilX = shape.points[0]?.x || 0;
        let minPencilY = shape.points[0]?.y || 0;
        let maxPencilX = shape.points[0]?.x || 0;
        let maxPencilY = shape.points[0]?.y || 0;

        for (const point of shape.points) {
          minPencilX = Math.min(minPencilX, point.x);
          minPencilY = Math.min(minPencilY, point.y);
          maxPencilX = Math.max(maxPencilX, point.x);
          maxPencilY = Math.max(maxPencilY, point.y);
        }

        return {
          x: minPencilX,
          y: minPencilY,
          width: maxPencilX - minPencilX,
          height: maxPencilY - minPencilY,
        };
      }
      default:
        return { x: 0, y: 0, width: 0, height: 0 };
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
        case "text":
          this.selectedShape.startX = newX;
          this.selectedShape.startY = newY;
          break;
        case "pencil":
          if (
            this.selectedShape.points &&
            this.selectedShape.points.length > 0
          ) {
            const offsetX = newX - this.selectedShape.points[0]!.x;
            const offsetY = newY - this.selectedShape.points[0]!.y;

            this.selectedShape.points = this.selectedShape.points.map(
              (point) => ({
                x: point.x + offsetX,
                y: point.y + offsetY,
                lineWidth: point.lineWidth,
              })
            );
          }
          break;

        default:
          return;
      }
    }

    this.displayCanvas();
  }

  mouseDownhandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    let selectedShape: ShapeType | undefined;
    if (this.existingShapes) {
      selectedShape = this.existingShapes.find((shape) =>
        this.isPointInShape(e.clientX, e.clientY, shape)
      );
    }
    if (selectedShape) {
      this.selectedShape = selectedShape;

      if (this.selectedTool === SelectedTool.Delete) {
        this.sendDeleteShape();
        this.displayCanvas();
      } else if (this.selectedTool === SelectedTool.Pointer) {
        this.oldShape = this.deepCopyShape(selectedShape);

        this.moveObjects(e);
      }
    } else {
      this.selectedShape = null;
    }

    if (this.selectedTool === SelectedTool.Hand) {
      this.previousX = e.clientX;
      this.previousY = e.clientY;
      return;
    }
    if (this.selectedTool === SelectedTool.Pointer) {
      this.previousX = e.clientX;
      this.previousY = e.clientY;
      return;
    }

    if (this.selectedTool === SelectedTool.Text) {
      this.textInputHandler.handleTextInput(
        e,
        this.startX,
        this.startY,
        (shape: Extract<ShapeType, { type: "text" }>) => {
          this.existingShapes.push(shape);
          this.displayCanvas();
        },
        this.strokeColor,
        this.fontSize
      );
    }

    if (this.selectedTool === SelectedTool.Pencil) {
      this.points = [];
      const pressure = 0.1;
      const x = e.clientX;
      const y = e.clientY;
      const lineWidth = Math.log(pressure + 1) * 40;
      this.ctx.lineWidth = lineWidth;
      this.points.push({ x, y, lineWidth });
      this.canvasShapeManager.drawShape({
        type: "pencil",
        points: this.points,
        color: "#fff",
      });
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    if (this.selectedTool === SelectedTool.Pencil) {
      const shape = this.canvasShapeManager.createPencilShape(
        this.points,
        this.strokeColor
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

      this.points = [];
    } else if (this.selectedTool === SelectedTool.Pointer) {
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
      const shape = this.canvasShapeManager.createAndDrawShape(
        this.selectedTool,
        this.startX,
        this.startY,
        endX,
        endY,
        this.strokeWidth,
        this.strokeColor,
        this.bgColor,
        this.strokeStyle
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
    if (this.selectedTool === SelectedTool.Delete && this.clicked) {
      const x = e.clientX;
      const y = e.clientY;
      let shapeToDelete: ShapeType | undefined;
      if (this.existingShapes) {
        shapeToDelete = this.existingShapes.find((shape) =>
          this.isPointInShape(x, y, shape)
        );
      }

      if (shapeToDelete) {
        this.selectedShape = shapeToDelete;
        this.sendDeleteShape();
      }
    } else if (this.clicked && this.selectedTool !== SelectedTool.Text) {
      if (this.selectedTool === SelectedTool.Hand) {
        return this.updatePanning(e);
      }

      if (this.selectedTool === SelectedTool.Pointer) {
        this.moveObjects(e);
      }

      this.displayCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

      const endX = e.clientX;
      const endY = e.clientY;
      const pressure = 0.1;

      const x = e.clientX;
      const y = e.clientY;
      const lineWidth = Math.log(pressure + 1) * 40;
      switch (this.selectedTool) {
        case SelectedTool.Rectangle:
          this.canvasShapeManager.drawShape({
            type: "rect",
            startX: this.startX,
            startY: this.startY,
            width: endX - this.startX,
            height: endY - this.startY,
            color: this.strokeColor,
            backgroundColor: this.bgColor,
            lineWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle,
          });
          break;
        case SelectedTool.Ellipse:
          this.canvasShapeManager.drawShape({
            type: "circle",
            centerX: this.startX + (endX - this.startX) / 2,
            centerY: this.startY + (endY - this.startY) / 2,
            radius:
              Math.max(
                Math.abs(endX - this.startX),
                Math.abs(endY - this.startY)
              ) / 2,
            color: this.strokeColor,
            backgroundColor: this.bgColor,
            lineWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle,
          });
          break;
        case SelectedTool.Line:
          this.canvasShapeManager.drawShape({
            type: "line",
            startX: this.startX,
            startY: this.startY,
            endX: endX,
            endY: endY,
            color: this.strokeColor,
            lineWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle,
          });
          break;
        case SelectedTool.Arrow:
          this.canvasShapeManager.drawShape({
            type: "arrow",
            startX: this.startX,
            startY: this.startY,
            endX: endX,
            endY: endY,
            color: this.strokeColor,
            lineWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle,
          });
          break;
        case SelectedTool.Diamond:
          this.canvasShapeManager.drawShape({
            type: "diamond",
            startX: this.startX,
            startY: this.startY,
            width: endX - this.startX,
            height: endY - this.startY,
            color: this.strokeColor,
            backgroundColor: this.bgColor,
            lineWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle,
          });
          break;
        case SelectedTool.Pencil:
          if (!this.points) {
            this.points = [];
          }
          this.points.push({ x, y, lineWidth });
          this.canvasShapeManager.drawShape({
            type: "pencil",
            points: this.points,
            color: this.strokeColor,
          });
          break;
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownhandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("wheel", this.mouseWheelHandler);
  }

  mouseWheelHandler = (e: WheelEvent) => {
    this.updateZooming(e);
  };
}
