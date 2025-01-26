import { ShapeType } from "@repo/common/types";

export class CanvasDrawingUtils {
  static drawRect(
    ctx: CanvasRenderingContext2D,
    shape: Extract<ShapeType, { type: "rect" }>,
  ) {
    ctx.strokeStyle = shape.color;
    ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
  }

  static drawCircle(
    ctx: CanvasRenderingContext2D,
    shape: Extract<ShapeType, { type: "circle" }>,
  ) {
    ctx.strokeStyle = shape.color;
    ctx.beginPath();
    ctx.arc(
      shape.centerX,
      shape.centerY,
      Math.abs(shape.radius),
      0,
      Math.PI * 2,
    );
    ctx.stroke();
    ctx.closePath();
  }

  static drawLine(
    ctx: CanvasRenderingContext2D,
    shape: Extract<ShapeType, { type: "line" }>,
  ) {
    ctx.strokeStyle = shape.color;
    ctx.beginPath();
    ctx.moveTo(shape.startX, shape.startY);
    ctx.lineTo(shape.endX, shape.endY);
    ctx.stroke();
    ctx.closePath();
  }

  static drawText(
    ctx: CanvasRenderingContext2D,
    shape: Extract<ShapeType, { type: "text" }>,
  ) {
    ctx.fillStyle = shape.color;
    ctx.font = `${shape.fontSize}px Arial`;
    ctx.fillText(shape.text, shape.startX, shape.startY);
  }

  static drawArrow(
    ctx: CanvasRenderingContext2D,
    shape: Extract<ShapeType, { type: "arrow" }>,
    t = 0.9,
  ) {
    const { startX, startY, endX, endY, color } = shape;

    ctx.strokeStyle = color;
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

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    ctx.moveTo(midX + perpX * arrowSize, midY + perpY * arrowSize);
    ctx.lineTo(endX, endY);
    ctx.lineTo(midX - perpX * arrowSize, midY - perpY * arrowSize);

    ctx.stroke();
    ctx.closePath();
  }

  static drawDiamond(
    ctx: CanvasRenderingContext2D,
    shape: Extract<ShapeType, { type: "diamond" }>,
  ) {
    const { startX: x, startY: y, width, height, color } = shape;

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - height / 2);
    ctx.lineTo(x + width / 2, y);
    ctx.lineTo(x, y + height / 2);
    ctx.lineTo(x - width / 2, y);
    ctx.closePath();
    ctx.stroke();
  }

  static drawPencil(
    ctx: CanvasRenderingContext2D,
    shape: Extract<ShapeType, { type: "pencil" }>,
  ) {
    ctx.strokeStyle = shape.color;
    ctx.beginPath();
    ctx.moveTo(shape.startX, shape.startY);
    ctx.lineTo(shape.endX, shape.endY);
    ctx.stroke();
    ctx.closePath();
  }
}
