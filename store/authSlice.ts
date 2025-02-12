import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { setToken } from '@/app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState ={
  accessToken: null,
  refreshToken: null,
};

// 슬라이스 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;

// AsyncStoreage에 토큰 저장
export const storeTokens = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem("access_token", accessToken);
  await AsyncStorage.setItem("refresh_token", refreshToken);
};

// AsyncStoreage에서 토큰 가져오는 함수
export const getStoredTokens = async () => {
  const accessToken = await AsyncStorage.getItem("access_token");
  const refreshToken = await AsyncStorage.getItem("refresh_token");
  return { accessToken, refreshToken };
};