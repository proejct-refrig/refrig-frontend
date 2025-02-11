import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image'
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session"
import { storeJWT } from "@/app/auth/token";
import { sendTokenToBackend } from "@/app/auth/api";

const AppLogo = require('@/assets/images/refrig_logo.png')
const kakaoLogo = require('@/assets/images/logo_kakaotalk.png')

WebBrowser.maybeCompleteAuthSession();

export default function Index(): JSX.Element {
  const router = useRouter();
  const rotateAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  // 로고 애니메이션 로직
  useEffect(() => {
    const startRotation = (): void => {
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

  // 카카오 로그인 로직
  // here : 카카오 OAuth2 엔드포인트 직접 설정 (고정이지만 변경되었을 수 있기에 공식문서 확인해야함)
  const discovery = {
    authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
    tokenEndpoint: "https://kauth.kakao.com/oauth/token",
  }

  // here: 개발자 콘솔에서 체크
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "카카오 REST API 키", // 카카오 개발자 콘솔에서 발급받은 REST API 키 입력
      redirectUri: AuthSession.makeRedirectUri({
        scheme: "myapp", // here : 카카오 개발자센터에 Redirect URI에 따라서 app.json의 scheme 달라짐!
      }),
      responseType: "code",
      /*
        "profile"	사용자의 프로필 정보 (닉네임, 프로필 이미지)
        "account_email"	사용자의 이메일 주소
        "birthday"	사용자의 생년월일
        "gender"	사용자의 성별 정보
        "age_range"	사용자의 연령대 (예: 20~30대)
        "phone_number"	사용자의 전화번호
        "friends"	사용자의 카카오톡 친구 목록
        "talk_message"	카카오톡 메시지 전송 권한
       */
      scopes: ["profile", "account_email"], // here: 로그인시 필요한 권한 체크 누나랑 협의 
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success" && response.params.code) {
      const authorizationCode = response.params.code;

      if (authorizationCode) {
        console.log("카카오 로그인 인증 코드:", authorizationCode);
      } else {
        console.log("인증코드 안왔음!")
      }

      // 백엔드로 인증코드 전달하여 액세스 토큰 발급
      sendTokenToBackend(authorizationCode).then((jwt: string | null) => {
        if (jwt) {
          storeJWT(jwt); // JWT 저장(자동 로그인용)
          router.replace("/main");
        }
      });
    }
  }, [response])

  const handleLogin = () => {
    promptAsync();
  }

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
