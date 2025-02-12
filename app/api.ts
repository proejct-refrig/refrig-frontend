import { store } from '@/store/store';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';
import { clearTokens, setTokens } from '@/store/authSlice';

// api 인스턴스 생성
const api = axios.create({
  baseURL: "https://your-api.com",
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 : 자동으로 Access Token 추가
api.interceptors.request.use(async (config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 : 401 발생 시 자동으로 Refresh token 사용하여 토큰 갱신함
api.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // ✅ 중복 요청 방지
      console.warn("🚨 JWT 토큰이 만료됨, Refresh Token으로 갱신 시도...");

      const refreshToken = await AsyncStorage.getItem("refresh_token");
      if (!refreshToken) {
        console.error("🚨 Refresh Token 없음. 자동 로그아웃 처리.");
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        store.dispatch(clearTokens());
        router.replace("/login"); // ✅ 로그인 페이지로 이동
        return Promise.reject(error);
      }

      try {
        // ✅ Refresh Token으로 Access Token 갱신 요청
        const response = await axios.post("https://your-api.com/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token; // 새 Refresh Token도 제공하는 경우

        await AsyncStorage.setItem("access_token", newAccessToken);
        await AsyncStorage.setItem("refresh_token", newRefreshToken);
        store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

        // ✅ 기존 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("🚨 Refresh Token 갱신 실패. 자동 로그아웃 처리.");
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        store.dispatch(clearTokens());
        router.replace("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;