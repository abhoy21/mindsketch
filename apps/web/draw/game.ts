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
  private textInput: HTMLInputElement | null = null;

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

  removeTextInput() {
    if (this.textInput) {
      this.textInput.remove();
      this.textInput = null;
    }
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

  displayCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.existingShapes);
    this.existingShapes.map((shape) => {
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
      } else if (shape.type === "text") {
        this.ctx.fillStyle = shape.color;
        this.ctx.font = `${shape.fontSize}px Arial`;
        this.ctx.fillText(shape.text, shape.startX, shape.startY);
      } else if (shape.type === "arrow") {
        this.ctx.strokeStyle = shape.color;
        this.drawArrow(shape.startX, shape.startY, shape.endX, shape.endY);
      } else if (shape.type === "diamond") {
        this.ctx.strokeStyle = shape.color;
        console.log(shape);
        this.drawDiamond(shape.startX, shape.startY, shape.width, shape.height);
      }
    });
  }

  mouseDownhandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

    if (this.selectedTool === SelectedTool.Text) {
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

      this.textInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const text = this.textInput!.value;
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
      });

      document.body.appendChild(this.textInput);
      this.textInput.focus();
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    if (this.selectedTool !== SelectedTool.Text) {
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
      } else if (selectedTool === SelectedTool.Arrow) {
        shape = {
          type: "arrow",
          startX: this.startX,
          startY: this.startY,
          endX: e.clientX,
          endY: e.clientY,
          color: "#fff",
        };
      } else if (selectedTool === SelectedTool.Diamond) {
        shape = {
          type: "diamond",
          startX: this.startX,
          startY: this.startY,
          width: width,
          height: height,
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
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked && this.selectedTool !== SelectedTool.Text) {
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
      } else if (selectedTool === SelectedTool.Arrow) {
        this.drawArrow(this.startX, this.startY, e.clientX, e.clientY);
      } else if (selectedTool === SelectedTool.Diamond) {
        this.drawDiamond(this.startX, this.startY, width, height);
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownhandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  drawArrow(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    t = 0.9,
  ) {
    const dx = endX - startX;
    const dy = endY - startY;

    // Calculate the length of the line
    const length = Math.sqrt(dx * dx + dy * dy);

    // Normalized direction vector
    const unitX = dx / length;
    const unitY = dy / length;

    // Calculate the midpoint
    const midX = startX + dx * t;
    const midY = startY + dy * t;

    // Perpendicular vector for arrowhead
    const perpX = -unitY;
    const perpY = unitX;

    // Arrowhead size (proportional to line length)
    const arrowSize = Math.min(length * 0.1, 10);

    this.ctx.beginPath();
    // Main line
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);

    // Arrowhead
    this.ctx.moveTo(midX + perpX * arrowSize, midY + perpY * arrowSize);
    this.ctx.lineTo(endX, endY);
    this.ctx.lineTo(midX - perpX * arrowSize, midY - perpY * arrowSize);

    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawDiamond(x: number, y: number, width: number, height: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - height / 2);
    this.ctx.lineTo(x + width / 2, y);
    this.ctx.lineTo(x, y + height / 2);
    this.ctx.lineTo(x - width / 2, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  scaleCanvas(scale: number) {
    this.canvas.width = this.canvas.width * scale;
    this.canvas.height = this.canvas.height * scale;
    this.canvas.style.width = `${this.canvas.width}px`;
    this.canvas.style.height = `${this.canvas.height}px`;
    this.ctx.scale(scale, scale);
  }
}
