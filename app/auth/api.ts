import axios from "axios";
import { getStoredTokens } from "./token"; // ✅ 변경된 토큰 관리 함수 사용

export const fetchUserInfo = async (): Promise<any | null> => {
  try {
    const { accessToken } = await getStoredTokens();
    if (!accessToken) {
      console.log("❌ Access Token 없음. 사용자 정보를 가져올 수 없음.");
      return null;
    }

    const response = await axios.get("https://your-backend.com/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("🚨 사용자 정보 가져오기 실패:", error);
    return null;
  }
};