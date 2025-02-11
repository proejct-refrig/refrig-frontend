import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";

const ProfileScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>여긴 마이페이지 화면입니다.</Text>
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

export default ProfileScreen;