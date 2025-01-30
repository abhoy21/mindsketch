import { SelectedTool } from "@repo/common/types";
import Button from "@repo/ui/button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Game } from "../draw/game";
import CanvasNavbar from "./canvas-navbar";
import CanvasShare from "./canvas-share";

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

  const [game, setGame] = useState<Game>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      if (selectedTool === SelectedTool.Pointer) {
        canvasRef.current.style.cursor = "pointer";
      } else if (selectedTool === SelectedTool.Delete) {
        canvasRef.current.style.cursor = "default";
      } else {
        canvasRef.current.style.cursor = "crosshair";
      }
    }
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

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

      <div className='fixed top-2 left-0 right-0 bg-[#232329] max-w-md mx-auto rounded-xl '>
        <CanvasNavbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
      </div>
      <div className='fixed top-2 right-10'>
        <Button variant='outline' size='sm' onClick={() => setShowModal(true)}>
          Share
        </Button>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50'>
          <CanvasShare setShowModal={setShowModal} />
        </div>
      )}
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
