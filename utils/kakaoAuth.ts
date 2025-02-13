import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔸 백엔드 엔드포인트 설정
// here : 변경 요망
const BACKEND_URL = 'https://your-backend.com/api/auth/kakao';

// 🔸 서버로부터 jwt 토큰 발급
export const sendCodetoBackend = async (code: string): Promise<string | null> => {
  try {
    // here: 서버로부터 api 명세서 오면 재작성
    const { data } = await axios.post(`${BACKEND_URL}/token`, { code });

    // here: 이것도 어떤 키로 보내주냐에 따라서 달라짐!
    if (!data.access_token || !data.user) {
      console.log('백엔드에서 받은 토큰 없음:', data);
      return null;
    }

    await AsyncStorage.setItem('jwt_token', data.access_token);
    await AsyncStorage.setItem('user_info', JSON.stringify(data.user));

    return data.user;
  } catch (error) {
    console.error('카카오 로그인 요청 오류:', error);
    return null;
  }
};