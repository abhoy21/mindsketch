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
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("Token expired, refreshing...");
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/auth/refresh`,
          {
            refreshToken: localStorage.getItem("refresh_token"),
          }
        );

        if (refreshResponse.status === 200) {
          localStorage.setItem(
            "access_token",
            refreshResponse.data.accessToken
          );
          localStorage.setItem(
            "refresh_token",
            refreshResponse.data.refreshToken
          );
          // Recursively call the function with new token
          return await getExistingShapes(roomId);
        }
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);
        throw refreshError; // Handle or propagate the error as needed
      }
    } else {
      console.log("Error:", error);
      throw error; // Handle or propagate other errors
    }
  }
}
