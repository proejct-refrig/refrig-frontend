import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";

const TabsLayout: FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // ✅ 개별 화면에서 헤더 설정
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F8F8F8",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          height: 60,
        },
        tabBarActiveTintColor: "#222222",
        tabBarInactiveTintColor: "#A0A0A0",
      }}
    >
      {/* ✅ 메인 페이지를 'main/index.tsx'로 변경 */}
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ✅ 추가 버튼 */}
      <Tabs.Screen
        name="add"
        options={{
          title: "추가",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ✅ 채팅 */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ✅ 마이페이지 */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;