import AsyncStorage from "@react-native-async-storage/async-storage";

const JWT_KEY = "jwtToken" // key

export const storeJWT = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(JWT_KEY, token);
  } catch (error) {
    console.log("JWT 저장 실패:", error);
  }
};

export const getJWT = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(JWT_KEY);
  } catch (error) {
    console.log("JWT 토큰 가져오기 실패:", error);
    return null;
  }
};

// JWT 삭제 (로그아웃)
export const removeJWT = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(JWT_KEY);
  } catch (error) {
    console.error("JWT 삭제 실패:", error);
  }
};