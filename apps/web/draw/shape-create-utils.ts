import { SelectedTool, ShapeType } from "@repo/common/types";

export function createShape(
  selectedTool: SelectedTool,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
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
        color: "#fff",
      };

    case SelectedTool.Ellipse:
      radius = Math.max(width, height) / 2;
      return {
        type: "circle",
        centerX: startX + radius,
        centerY: startY + radius,
        radius,
        color: "#fff",
      };

    case SelectedTool.Line:
      return {
        type: "line",
        startX,
        startY,
        endX,
        endY,
        color: "#fff",
      };

    case SelectedTool.Arrow:
      return {
        type: "arrow",
        startX,
        startY,
        endX,
        endY,
        color: "#fff",
      };

    case SelectedTool.Diamond:
      return {
        type: "diamond",
        startX,
        startY,
        width,
        height,
        color: "#fff",
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
): ShapeType {
  return {
    type: "pencil",
    points: Array.from(points),
    color: "#fff",
  };
}
