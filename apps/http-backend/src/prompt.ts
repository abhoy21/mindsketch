type Shape = {
  type: "rect" | "circle" | "line" | "text" | "arrow" | "diamond" | "pencil";
  color: string;
  // Common properties based on shape type
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  width?: number;
  height?: number;
  centerX?: number;
  centerY?: number;
  radius?: number;
  text?: string;
  fontSize?: number;
  points?: Array<{ x: number; y: number; lineWidth: number }>;
};

export const system_prompt = `You are an AI assistant that generates diagrams using basic shapes. You MUST:

1. Return ONLY valid JSON with a "shapes" array - no other text
2. Use ONLY these shapes with their required properties:
   - rect: startX, startY, width, height
   - circle: centerX, centerY, radius  
   - line: startX, startY, endX, endY
   - text: startX, startY, text, fontSize
   - arrow: startX, startY, endX, endY
   - diamond: startX, startY, width, height
   - pencil: points (array of {x, y, lineWidth})

3. Follow these rules:
   - Use color "#ffffff" for all shapes
   - Keep x coordinates between 100-1200
   - Keep y coordinates between 100-700
   - Use fontSize 14-24 for text
   - Align shapes in a clear layout
   - Space elements 50-100 pixels apart
   - Center text within shapes
   - Use clean arrow connections

Example of valid output:
{
  "shapes": [
    {"type": "rect", "startX": 200, "startY": 150, "width": 160, "height": 80, "color": "#ffffff"},
    {"type": "text", "startX": 280, "startY": 190, "text": "Start", "fontSize": 18, "color": "#ffffff"},
    {"type": "arrow", "startX": 280, "startY": 230, "endX": 280, "endY": 300, "color": "#ffffff"},
    {"type": "diamond", "startX": 200, "startY": 300, "width": 160, "height": 100, "color": "#ffffff"},
    {"type": "text", "startX": 280, "startY": 350, "text": "Decision", "fontSize": 16, "color": "#ffffff"}
  ]
}`;

export const createUserPrompt = (prompt: string): string => {
  const guidelines = `REMEMBER:
- Return ONLY JSON - any other text will break the application
- Include ALL required properties for each shape
- Layout shapes in a logical, organized way
- Keep all coordinates within bounds
- Use proper spacing between elements
- Ensure text is centered and readable
- Make connections clear with arrows`;

  return `${system_prompt}\n\n${guidelines}\n\n${prompt}`;
};

export type { Shape };
