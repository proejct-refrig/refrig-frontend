import { fetchUserInfo, sendTokenToBackend } from '@/app/auth/api';
import { getJWT, storeJWT } from '@/app/auth/token';
import { AppDispatch, setLoading, setToken, setUser } from '@/app/store';
import { useRouter } from 'expo-router';


// ✅ 로그인 상태 확인 및 처리 함수
export const handleLogin = async (
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter>, // ✅ useRouter()에서 반환되는 객체 타입
  authorizationCode?: string,
): Promise<void> => {
  dispatch(setLoading(true));

  try {
    let jwt: string | null = await getJWT(); // ✅ 기존 JWT 가져오기

    if (!jwt && authorizationCode) {
      jwt = await sendTokenToBackend(authorizationCode); // ✅ 서버에서 새 JWT 가져오기
      if (jwt) await storeJWT(jwt); // ✅ 새 JWT 저장
    }

    if (jwt) {
      const user = await fetchUserInfo(jwt);
      if (user) {
        dispatch(setToken(jwt));
        dispatch(setUser(user));
        router.replace("/"); // ✅ 로그인 성공 → 메인 화면 이동
        return;
      }
    }

    // ✅ 로그인 실패 → 로그인 페이지로 이동
    dispatch(setToken(null));
    router.replace("/login");
  } catch (error) {
    console.error("로그인 처리 중 오류 발생:", error);
    dispatch(setToken(null));
    router.replace("/login");
  } finally {
    dispatch(setLoading(false)); // ✅ 로딩 상태 해제
  }
};

// 로그인 상태 확인용
export const checkLoginAndUpdateRedux = async (dispatch: AppDispatch): Promise<boolean> => {
  try {
    const token = await getJWT();
    if (token) {
      dispatch(setToken(token)); // ✅ Redux에도 토큰 저장
      return true; // ✅ 로그인 상태 유지
    }
    return false; // ❌ 로그인 안 되어 있음
  } catch (error) {
    console.log("로그인 상태 확인 오류:", error);
    return false;
  }
};