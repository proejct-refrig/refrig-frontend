import axios from "axios"

export const sendTokenToBackend = async (accessToken: string): Promise<string | null> => {
  try {
    // here : 주소 변경
    const response = await axios.post("https://your-backend.com/auth/kakao", {
      accessToken, // content-type: JSON
    });

    return response.data.token ?? null;
  } catch (error) {
    console.log("백엔드 요청 실패: ", error);
    return null;
  }
}
