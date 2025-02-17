import { SelectedTool, ShapeType } from "@repo/common/types";

export class CanvasShapeManager {
  constructor(private ctx: CanvasRenderingContext2D) {}

  createAndDrawShape(
    selectedTool: SelectedTool,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: string = "#fff"
  ): ShapeType | null {
    const shape = this.createShape(
      selectedTool,
      startX,
      startY,
      endX,
      endY,
      color
    );
    if (shape) {
      this.drawShape(shape);
    }
    return shape;
  }

  createAndDrawPencilStroke(
    points: Array<{ x: number; y: number; lineWidth: number }>,
    color: string = "#fff"
  ): ShapeType {
    const shape = this.createPencilShape(points, color);
    this.drawShape(shape);
    return shape;
  }

  private createShape(
    selectedTool: SelectedTool,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: string
  ): ShapeType | null {
    const width = endX - startX;
    const height = endY - startY;

    switch (selectedTool) {
      case SelectedTool.Rectangle:
        return {
          type: "rect",
          startX,
          startY,
          width,
          height,
          color,
        };

      case SelectedTool.Ellipse:
        const radius = Math.max(width, height) / 2;
        return {
          type: "circle",
          centerX: startX + radius,
          centerY: startY + radius,
          radius,
          color,
        };

      case SelectedTool.Line:
        return {
          type: "line",
          startX,
          startY,
          endX,
          endY,
          color,
        };

      case SelectedTool.Arrow:
        return {
          type: "arrow",
          startX,
          startY,
          endX,
          endY,
          color,
        };

      case SelectedTool.Diamond:
        return {
          type: "diamond",
          startX,
          startY,
          width,
          height,
          color,
        };

      default:
        return null;
    }
  }

  createPencilShape(
    points: Array<{ x: number; y: number; lineWidth: number }>,
    color: string
  ): ShapeType {
    return {
      type: "pencil",
      points: Array.from(points),
      color,
    };
  }

  drawShape(shape: ShapeType): void {
    switch (shape.type) {
      case "rect":
        this.drawRect(shape);
        break;
      case "circle":
        this.drawCircle(shape);
        break;
      case "line":
        this.drawLine(shape);
        break;
      case "text":
        this.drawText(shape);
        break;
      case "arrow":
        this.drawArrow(shape);
        break;
      case "diamond":
        this.drawDiamond(shape);
        break;
      case "pencil":
        this.drawPencil(shape);
        break;
    }
  }

  private drawRect(shape: Extract<ShapeType, { type: "rect" }>) {
    this.ctx.strokeStyle = shape.color;
    this.ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
  }

  private drawCircle(shape: Extract<ShapeType, { type: "circle" }>) {
    this.ctx.strokeStyle = shape.color;
    this.ctx.beginPath();
    this.ctx.arc(
      shape.centerX,
      shape.centerY,
      Math.abs(shape.radius),
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawLine(shape: Extract<ShapeType, { type: "line" }>) {
    this.ctx.strokeStyle = shape.color;
    this.ctx.beginPath();
    this.ctx.moveTo(shape.startX, shape.startY);
    this.ctx.lineTo(shape.endX, shape.endY);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawText(shape: Extract<ShapeType, { type: "text" }>) {
    this.ctx.fillStyle = shape.color;
    this.ctx.font = `${shape.fontSize}px Arial`;
    this.ctx.fillText(shape.text, shape.startX, shape.startY);
  }

  private drawArrow(shape: Extract<ShapeType, { type: "arrow" }>, t = 0.9) {
    const { startX, startY, endX, endY, color } = shape;

    this.ctx.strokeStyle = color;
    const dx = endX - startX;
    const dy = endY - startY;

    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;

    const midX = startX + dx * t;
    const midY = startY + dy * t;

    const perpX = -unitY;
    const perpY = unitX;

    const arrowSize = Math.min(length * 0.1, 10);

    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);

    this.ctx.moveTo(midX + perpX * arrowSize, midY + perpY * arrowSize);
    this.ctx.lineTo(endX, endY);
    this.ctx.lineTo(midX - perpX * arrowSize, midY - perpY * arrowSize);

    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawDiamond(shape: Extract<ShapeType, { type: "diamond" }>) {
    const { startX: x, startY: y, width, height, color } = shape;

    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - height / 2);
    this.ctx.lineTo(x + width / 2, y);
    this.ctx.lineTo(x, y + height / 2);
    this.ctx.lineTo(x - width / 2, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private drawPencil(shape: Extract<ShapeType, { type: "pencil" }>) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = shape.color;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    const stroke = shape.points;
    if (!stroke || stroke.length === 0) return;

    const firstPoint = stroke[0];
    if (!firstPoint) return;

    this.ctx.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 1; i < stroke.length - 1; i++) {
      const currentPoint = stroke[i];
      const nextPoint = stroke[i + 1];

      if (currentPoint && nextPoint) {
        const midPointX = (currentPoint.x + nextPoint.x) / 2;
        const midPointY = (currentPoint.y + nextPoint.y) / 2;

        this.ctx.lineWidth = currentPoint.lineWidth;
        this.ctx.quadraticCurveTo(
          currentPoint.x,
          currentPoint.y,
          midPointX,
          midPointY
        );
      }
    }

    const lastPoint = stroke[stroke.length - 1];
    if (lastPoint) {
      this.ctx.lineWidth = lastPoint.lineWidth;
      this.ctx.lineTo(lastPoint.x, lastPoint.y);
    }

    this.ctx.stroke();
  }
}
