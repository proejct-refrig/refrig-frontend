import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from './store';
import Header from '@/components/Header';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* ✅ 메인 페이지 (커스텀 헤더 추가) */}
        <Stack.Screen 
          name="main/index" 
          options={{ 
            headerShown: true,
            header: () => <Header />, // ✅ 커스텀 헤더 사용
          }} 
        />
      </Stack>
    </Provider>
  );
}
