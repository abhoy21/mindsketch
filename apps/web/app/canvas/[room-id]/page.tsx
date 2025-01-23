"use client";
import { useEffect, useRef } from "react";

export default function Canvas(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      let clicked = false;
      let startX = 0;
      let startY = 0;

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
        console.log("mouse down", e.clientX, e.clientY);
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        console.log("mouse up", e.clientX, e.clientY);
      });

      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeRect(startX, startY, width, height);
          ctx.strokeStyle = "#fff";
        }
      });
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        className='bg-[#1f1f1f]'
        ref={canvasRef}
        width={500}
        height={500}
      ></canvas>
    </div>
  );
}
