import { ShapeType } from "@repo/common/types";

export class TextInputHandler {
  private textInput: HTMLInputElement | null = null;

  constructor(
    private socket: WebSocket,
    private roomId: string
  ) {}

  handleTextInput(
    e: MouseEvent,
    startX: number,
    startY: number,
    onShapeAdd: (shape: Extract<ShapeType, { type: "text" }>) => void,
    strokeColor: string = "#fff",
    fontSize: number = 14
  ) {
    this.removeTextInput();
    this.textInput = document.createElement("input");
    this.textInput.type = "text";
    this.textInput.style.position = "absolute";
    this.textInput.style.top = `${e.clientY}px`;
    this.textInput.style.left = `${e.clientX}px`;
    this.textInput.style.background = "#121212";
    this.textInput.style.border = "none";
    this.textInput.style.outline = "none";
    this.textInput.style.color = strokeColor;
    this.textInput.style.caretColor = strokeColor;
    this.textInput.style.fontSize = `${fontSize}px`;
    this.textInput.autofocus = true;
    this.textInput.placeholder = "Type your text here";

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter" && this.textInput) {
        const text = this.textInput.value;
        const textShape = {
          type: "text" as const,
          startX,
          startY,
          text,
          color: strokeColor,
          fontSize: fontSize,
        };

        onShapeAdd(textShape);
        this.socket.send(
          JSON.stringify({
            type: "chat",
            message: JSON.stringify(textShape),
            roomId: this.roomId,
          })
        );

        this.removeTextInput();
      }
    };

    this.textInput.addEventListener("keydown", handleEnter);
    document.body.appendChild(this.textInput);
    this.textInput.focus();
  }

  removeTextInput() {
    if (this.textInput) {
      this.textInput.remove();
      this.textInput = null;
    }
  }
}
