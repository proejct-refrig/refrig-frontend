import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Main() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  }

  return (
    <View style={styles.container}>
      <Text>이곳은 메인화면입니다.</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>
          임시 백버튼
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",     
  },
  button: {
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 300,
  },
  text: {
    fontSize: 24, 
  }
});