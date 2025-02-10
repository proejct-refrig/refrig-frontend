import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image'
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

const AppLogo = require('@/assets/images/refrig_logo.png')
const kakaoLogo = require('@/assets/images/logo_kakaotalk.png')

export default function Index() {
  const router = useRouter();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    // TODO : 로그인 로직 추가
    router.replace("/main");
  }

  useEffect(() => {
    const startRotation = () => {
      Animated.timing(rotateAnim, {
        toValue: 1, // 360도 회전
        duration: 3000, // 3초 동안 회전
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        // 회전이 끝나면 0도로 복귀
        rotateAnim.setValue(0);
        
        // 2초 대기 후 다시 회전 시작
        setTimeout(startRotation, 3000);
      });
    };

    startRotation(); // 애니메이션 시작
  }, []);



  const rotateStyle = {
    transform: [
      {
        rotateY: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        {/* 로고 */}
        <Animated.View style={rotateStyle}>
          <Image source={AppLogo} style={styles.image}/>
        </Animated.View>
        {/* 로그인 제목 */}
        <Text style={styles.mainText}>우리집 냉장고를 스마트하게 관리하세요!</Text>
        {/* 소셜 로그인 버튼 */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Image source={kakaoLogo} style={styles.loginImage} />
            <Text>카카오톡으로 로그인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  loginBox: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  mainText: {
    fontSize: 16,
    marginTop: 20
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  loginImage: {
    width: 30,
    height: 30,
    borderRadius: 5
  },
  buttonContainer: {
    marginVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 5,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ccc",
  }
})
