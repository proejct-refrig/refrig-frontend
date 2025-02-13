import { Stack } from "expo-router";
import { Provider } from "react-redux";


export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />


        {/* ✅ 하단 네비게이션 (Tabs) 추가 */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
