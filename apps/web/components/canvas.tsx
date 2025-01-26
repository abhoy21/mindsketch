import { SelectedTool } from "@repo/common/types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Game } from "../draw/game";
import CanvasNavbar from "./canvas-navbar";
import CanvasZoomBar from "./canvas-zoom-bar";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, canvasHeight] = useWindowSize();
  const [selectedTool, setSelectedTool] = useState<SelectedTool>(
    SelectedTool.Pointer,
  );
  const [zoom, setZoom] = useState<number>(100);

  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (canvasRef.current) {
      if (selectedTool === SelectedTool.Pointer) {
        canvasRef.current.style.cursor = "default";
      } else {
        canvasRef.current.style.cursor = "crosshair";
      }
    }
    game?.setTool(selectedTool);
  }, [selectedTool, game, zoom]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvasWidth as number;
      canvas.height = canvasHeight as number;

      const g = new Game(canvas, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, roomId, socket, canvasWidth, canvasHeight]);

  return (
    <>
      <canvas
        className='bg-[#121212] net-pattern-canvas'
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>

      <div className='fixed top-2 left-0 right-0 bg-[#232329] max-w-md mx-auto rounded-xl'>
        <CanvasNavbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
      </div>

      <div className='fixed bottom-10 left-5 bg-[#232329] max-w-md mx-auto rounded-xl'>
        <CanvasZoomBar zoom={zoom} setZoom={setZoom} />
      </div>
    </>
  );
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
