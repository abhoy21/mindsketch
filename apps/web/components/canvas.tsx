import { useEffect, useRef, useState } from "react";
import initDraw from "../draw";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  useEffect(() => {
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      initDraw(canvas, roomId, socket);
    }
  }, [canvasRef, roomId, socket]);

  return (
    <canvas
      className='bg-[#121212] net-pattern-canvas'
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    ></canvas>
  );
}
