import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FC, useEffect, useRef } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from 'expo-auth-session';
import { sendCodetoBackend } from '../utils/kakaoAuth';

const AppLogo = require("@/assets/images/refrig_logo.png");
const kakaoLogo = require("@/assets/images/logo_kakaotalk.png");

WebBrowser.maybeCompleteAuthSession();

const LoginScreen: FC = () => {
  const router = useRouter();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // ✅ 로고 애니메이션
  useEffect(() => {
    const startRotation = () => {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        rotateAnim.setValue(0);
        setTimeout(startRotation, 3000);
      });
    };

    startRotation();
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

  // 🔸 카카오 소셜 로그인
  // ✅ 카카오 앱 키 설정
  const KAKAO_REST_API_KEY = 'YOUR_KAKAO_REST_API_KEY';

  // ✅ OAuth 2.0 엔드포인트 (카카오)
  const discovery = {
    authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
    tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
  };

  // ✅ Redirect URI 설정
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'myapp',
    path: 'redirect'
  });

  console.log('Redirect URI:', redirectUri);

  // ✅ 로그인 요청 생성
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: KAKAO_REST_API_KEY,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
    },
    discovery
  );

  // ✅ 로그인 응답 처리
  useEffect(() => {
    const processLogin = async ():Promise<void> => {
      if (response?.type === 'success' && response.params.code) {
        // here : code 확인
        const code = response.params.code;
        console.log('코드:', code);

        // 백엔드로 코드전송 -> 유저 정보 반환
        const userInfo = await sendCodetoBackend(code);
        if (!userInfo) return;
        
        console.log('카카오 로그인 성공:', userInfo);

        // 로그인 성공시 홈으로 이동
        router.replace('/(tabs)');
      }
    };

    processLogin();
  }, [response])

  // 🔸 임시 로그인 (테스트용)
  const fakeLogin = (): void => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Animated.View style={rotateStyle}>
          <Image source={AppLogo} style={styles.image} />
        </Animated.View>
        <Text style={styles.mainText}>우리집 냉장고를 스마트하게 관리하세요!</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => promptAsync()}>
            <Image source={kakaoLogo} style={styles.loginImage} />
            <Text style={styles.buttonText}>카카오톡으로 로그인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
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
    marginTop: 40,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  loginImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
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
    backgroundColor: "#FEE500",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C1E1E",
    marginLeft: 8,
  },
});

export default LoginScreen