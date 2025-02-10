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
            <Text style={styles.buttonText}>카카오톡으로 로그인</Text>
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
    backgroundColor: "#FAFAFA"
  },
  loginBox: {
    width: 300,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  mainText: {
    fontSize: 15,
    marginTop: 40
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
    borderRadius: 8,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE500", // 카카오톡 노란색
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // 안드로이드 그림자 효과
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C1E1E", //
    marginLeft: 8, //
  },
})
