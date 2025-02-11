import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";

const ChatScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>여긴 채팅 화면입니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;