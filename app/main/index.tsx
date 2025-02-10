import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Main() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  }

  return (
    <View>
      <Text>이곳은 메인화면입니다.</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text>
          임시 백버튼
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: "#ccc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginTop: 100,
  }
})
