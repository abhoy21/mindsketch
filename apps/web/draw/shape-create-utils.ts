import { SelectedTool, ShapeType } from "@repo/common/types";

export function createShape(
  selectedTool: SelectedTool,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  lineWidth: number = 1,
  color: string = "#fff",
  backgroundColor: string = "transparent",
  strokeStyle?: string
): ShapeType | null {
  const width = endX - startX;
  const height = endY - startY;
  let radius = 0.0;
  switch (selectedTool) {
    case SelectedTool.Rectangle:
      return {
        type: "rect",
        startX,
        startY,
        width,
        height,
        color,
        backgroundColor,
        lineWidth,
        strokeStyle,
      };

    case SelectedTool.Ellipse:
      radius = Math.max(width, height) / 2;
      return {
        type: "circle",
        centerX: startX + radius,
        centerY: startY + radius,
        radius,
        color,
        backgroundColor,
        lineWidth,
        strokeStyle,
      };

    case SelectedTool.Line:
      return {
        type: "line",
        startX,
        startY,
        endX,
        endY,
        color,
        lineWidth,
        strokeStyle,
      };

    case SelectedTool.Arrow:
      return {
        type: "arrow",
        startX,
        startY,
        endX,
        endY,
        color,
        lineWidth,
        strokeStyle,
      };

    case SelectedTool.Diamond:
      return {
        type: "diamond",
        startX,
        startY,
        width,
        height,
        color,
        backgroundColor,
        lineWidth,
        strokeStyle,
      };

    default:
      return null;
  }
}

export function createPencilShape(
  points: Array<{
    x: number;
    y: number;
    lineWidth: number;
  }>,
  color: string = "#fff"
): ShapeType {
  return {
    type: "pencil",
    points: Array.from(points),
    color,
  };
}

export function createTextShape(
  startX: number,
  startY: number,
  text: string,
  color: string = "#fff",
  backgroundColor: string = "transparent",
  fontSize: number = 14
): ShapeType {
  return {
    type: "text",
    startX,
    startY,
    text,
    color,
    fontSize,
    backgroundColor,
  };
}
