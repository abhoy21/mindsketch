"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Canvas from "./canvas";

export function RoomCanvas({ roomId }: { roomId: string }): React.JSX.Element {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${localStorage.getItem("access_token")}`
    );

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: "join",
        roomId,
      });

      ws.send(data);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "error" && data.code === "ROOM_NOT_FOUND") {
          setError("The requested room does not exist");

          router.push("/room/join");
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
      setError("Failed to connect to server");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        const leaveData = JSON.stringify({
          type: "leave",
          roomId,
        });
        ws.send(leaveData);
        ws.close();
      }

      setSocket(null);
    };
  }, [roomId, router]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <p className="text-gray-600 mt-2">Redirecting to rooms page...</p>
        </div>
      </div>
    );
  }

  if (!socket) {
    return <div>Connecting to server....</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
