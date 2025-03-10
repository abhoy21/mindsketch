"use client";

import { useEffect, useState } from "react";

import Canvas from "./canvas";

export function RoomCanvas({ roomId }: { roomId: string }): React.JSX.Element {
  const [socket, setSocket] = useState<WebSocket | null>(null);

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
      console.log(data);
      ws.send(data);
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
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
  }, [roomId]);

  if (!socket) {
    return <div>Connecting to server....</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
