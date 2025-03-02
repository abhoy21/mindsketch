import { SelectedTool } from "@repo/common/types";
import Button from "@repo/ui/button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Game } from "../draw/game";
import CanvasNavbar from "./canvas-navbar";
import CanvasShare from "./canvas-share";
import AIModal from "./ai-modal";
import ZoomBar from "./zoom-bar";
import axios from "axios";

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
    SelectedTool.Pointer
  );

  const [game, setGame] = useState<Game>();
  const [showModal, setShowModal] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (canvasRef.current) {
      if (selectedTool === SelectedTool.Pointer) {
        canvasRef.current.style.cursor = "default";
      } else if (selectedTool === SelectedTool.Delete) {
        canvasRef.current.style.cursor = "not-allowed";
      } else if (selectedTool === SelectedTool.Hand) {
        canvasRef.current.style.cursor = "grab";
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

  useEffect(() => {
    const handleScaleChange = (newScale: number) => {
      setZoom(newScale);
    };

    if (game) {
      game.onScaleChange = handleScaleChange;
    }
  }, [game]);

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    try {
      if (token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/auth/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/auth/signin";
        } else if (response.status === 401) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/auth/refresh`,
            {
              body: {
                refreshToken: localStorage.getItem("refresh_token"),
              },
            }
          );

          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            handleLogout();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <canvas
        className="bg-[#121212] net-pattern-canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>

      <div className="fixed top-2 left-0 right-0 bg-[#232329] max-w-md mx-auto rounded-xl ">
        <CanvasNavbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
      </div>

      <div className="fixed top-3 right-[57rem]">
        <Button size="sm" className="px-2" onClick={() => setAiModal(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 64 64"
            className="w-5 h-5"
            fill="#fff"
          >
            <path d="M22.625 2c0 15.834-8.557 30-20.625 30 12.068 0 20.625 14.167 20.625 30 0-15.833 8.557-30 20.625-30-12.068 0-20.625-14.166-20.625-30M47 32c0 7.918-4.277 15-10.313 15C42.723 47 47 54.084 47 62c0-7.916 4.277-15 10.313-15C51.277 47 47 39.918 47 32zM51.688 2c0 7.917-4.277 15-10.313 15 6.035 0 10.313 7.084 10.313 15 0-7.916 4.277-15 10.313-15-6.036 0-10.313-7.083-10.313-15" />
          </svg>
          AI
        </Button>
      </div>
      <div className="fixed top-2 right-10">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowModal(true)}
          >
            Share
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleLogout()}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="fixed bottom-2 left-10  bg-[#232329] max-w-md mx-auto rounded-xl ">
        <ZoomBar zoom={zoom} setZoom={setZoom} />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50">
          <CanvasShare setShowModal={setShowModal} />
        </div>
      )}

      {aiModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50">
          <AIModal setAiModal={setAiModal} />
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
