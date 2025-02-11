import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 사용자 상태 slice 정의
interface UserState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
};

const initialState: UserState = {
  token: null,
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoading = false;
    },
  },
});

// store 생성
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  }
});

// Action Export
export const { setToken, setUser, setLoading, logout } = userSlice.actions;

// 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;