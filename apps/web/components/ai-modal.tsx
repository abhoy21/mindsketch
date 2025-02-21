"use client";

import Button from "@repo/ui/button";
import Logo from "./logo";
import { useRef, useState } from "react";
import axios from "axios";
import { ShapeType } from "@repo/common/types";
import { usePathname } from "next/navigation";
import { CanvasShapeManager } from "../draw/canvas-draw-utils";

interface DiagramData {
  shapes: ShapeType[];
}

export default function AIModal({
  setAiModal,
}: {
  setAiModal: (s: boolean) => void;
}): React.JSX.Element {
  const pathname = usePathname();

  const roomCode = pathname.split("/canvas/")[1];
  const [loading, setLoading] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const promptRef = useRef<HTMLTextAreaElement | null>(null);

  const drawDiagramWithAI = async () => {
    try {
      console.log("Prompt: ", promptRef.current?.value);
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/ai/generate-diagram`,
        { prompt: promptRef.current?.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data: DiagramData = JSON.parse(response.data.response);

        drawDiagram(data.shapes);
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
          drawDiagramWithAI();
        }
      }
    } catch (error) {
      console.error("Error generating diagram:", error);
    } finally {
      setLoading(false);
    }
  };

  const drawDiagram = (shapes: ShapeType[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasShapeManager = new CanvasShapeManager(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      canvasShapeManager.drawShape(shape);
    });

    setShapes(shapes);
  };

  const saveToDB = async () => {
    try {
      setIsInserting(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/diagram-to-canvas`,
        {
          diagram: shapes,
          roomId: roomCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Response:", response.data);
        setIsInserting(false);
        setAiModal(false);
        window.location.reload();
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
          saveToDB();
        }
      }
    } catch (error) {
      console.error("Error pushing to canvas", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center z-[999] bg-[#232329] bg-opacity-20 backdrop-blur-md w-screen h-screen"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setAiModal(false);
        }
      }}
    >
      <div className="flex p-9 m-2 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/45 rounded-xl w-full max-w-7xl h-full max-h-[80vh]">
        {/* Left Column */}
        <div className="flex flex-col w-1/2 pr-4">
          <Logo />
          <h1 className="text-2xl font-semibold text-amethyst-200">
            Generate with AI
          </h1>
          <p className="text-gray-400 text-start text-sm mb-6">
            Enter a prompt and generate a diagram with AI!
          </p>

          <div className="relative mb-4">
            <textarea
              ref={promptRef}
              placeholder="E.g. Draw a flow chart for authentication or a diagram of a system architecture"
              className="pr-16 text-base w-full rounded-xl bg-[#141414] py-2 px-4 my-4 h-[45vh] focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none text-gray-400"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 text-red-500"
              onClick={() => setAiModal(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={loading || isInserting}
              variant="primary"
              size="sm"
              className="w-full mt-4"
              onClick={drawDiagramWithAI}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2 flex flex-col">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="bg-[#121212] flex-grow"
            style={{ background: "#121212" }}
          />
          <Button
            disabled={loading || isInserting}
            variant="primary"
            size="sm"
            className="mt-4 self-center w-full"
            onClick={() => saveToDB()}
          >
            {isInserting ? "Inserting..." : "Insert"}
          </Button>
        </div>
      </div>
    </div>
  );
}
