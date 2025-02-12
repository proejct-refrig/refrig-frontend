import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// ✅ Access Token & Refresh Token 저장
export const storeTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.log("토큰 저장 실패:", error);
  }
};

// ✅ Access Token & Refresh Token 가져오기
export const getStoredTokens = async (): Promise<{ accessToken: string | null; refreshToken: string | null }> => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("토큰 가져오기 실패:", error);
    return { accessToken: null, refreshToken: null };
  }
};

// ✅ Access Token & Refresh Token 삭제 (로그아웃)
export const removeTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("토큰 삭제 실패:", error);
  }
};