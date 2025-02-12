import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter, useSegments } from "expo-router";
import { FC, useEffect, useRef } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { getJWT, storeJWT } from "@/app/auth/token";
import { fetchUserInfo, sendTokenToBackend } from "@/app/auth/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLoading, setToken, setUser } from "./store";
import { handleLogin } from '@/utils/auth';

const AppLogo = require("@/assets/images/refrig_logo.png");
const kakaoLogo = require("@/assets/images/logo_kakaotalk.png");

WebBrowser.maybeCompleteAuthSession();

const LoginScreen: FC = () => {
  const router = useRouter();
  const segments = useSegments(); // 현재 url 경로 가져옴
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector((state: RootState) => state.user);
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

  // // ✅ 카카오 OAuth2 엔드포인트 설정
  // const discovery = {
  //   authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
  //   tokenEndpoint: "https://kauth.kakao.com/oauth/token",
  // };

  // // ✅ 카카오 로그인 요청 설정
  // const [request, response, promptAsync] = AuthSession.useAuthRequest(
  //   {
  //     clientId: "카카오 REST API 키",
  //     redirectUri: AuthSession.makeRedirectUri({ scheme: "myapp" }),
  //     responseType: "code",
  //     scopes: ["profile", "account_email"],
  //   },
  //   discovery
  // );

  // // ✅ 로그인 상태 확인 및 로그인 처리 통합
  // useEffect(() => {
  //   if (response?.type === 'success' && response.params.code) {
  //     handleLogin(dispatch, router, response.params.code);
  //   }
  // }, [response]);

  // // ✅ 🚀 Redux에 `token`이 있으면 로그인 페이지를 랜더링하지 않고 바로 이동!
  // useEffect(() => {
  //   if (token && segments[0] === 'login') {
  //     router.replace("/"); // ✅ 로그인 상태면 즉시 이동
  //     return;
  //   }
  // }, [token, segments]);

  // 임시로 메인페이지 보내는 코드
  const fakeLogin = (): void => {
    dispatch(setToken("fake_token")); // 임시 가짜 토큰 저장
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Animated.View style={rotateStyle}>
          <Image source={AppLogo} style={styles.image} />
        </Animated.View>
        <Text style={styles.mainText}>우리집 냉장고를 스마트하게 관리하세요!</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => fakeLogin()}>
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