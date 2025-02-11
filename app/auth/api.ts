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

export const fetchUserInfo = async (jwt: string): Promise<any | null> => {
  try {
    const response = await axios.get("https://your-backend.com/user/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("사용자 정보 가져오기 실패", error);
    return null;
  }
}
