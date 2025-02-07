import axios from "axios";

export default async function getExistingShapes(roomId: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/chats/${roomId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
