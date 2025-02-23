import axios from "axios";

export default async function getExistingShapes(roomId: string) {
  try {
    const token = localStorage.getItem("access_token");
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
        getExistingShapes(roomId);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
