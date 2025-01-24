import axios from "axios";
import { HTTP_BACKEND_URL } from "../config";

export default async function getExistingShapes(roomId: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${HTTP_BACKEND_URL}/api/v1/chats/${roomId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (response.status === 200) {
      const messages = response.data.chats;
      const shapes = messages.map((m: { message: string }) => {
        const shape = JSON.parse(m.message);
        return shape;
      });

      return shapes;
    }
  } catch (error) {
    console.log(error);
  }
}
