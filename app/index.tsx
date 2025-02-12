import { useRouter, useSegments } from 'expo-router'
import { AppDispatch, RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkLoginAndUpdateRedux } from '@/utils/auth';
import { ActivityIndicator, View } from 'react-native';

const IndexScreen: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const verifyLogin = async () => {
      if (!token) {
        const isLoggedIn = await checkLoginAndUpdateRedux(dispatch); // 리덕스 업데이트
        if (isLoggedIn) {
          if (segments[0] !== "(tabs)") {
            router.replace("/(tabs)");
          }
        } else {
          router.replace("/login");
        }
      } else {
        // ✅ 🚀 현재 페이지가 `/(tabs)`이면 다시 `/`로 이동하지 않도록 제한
        if (segments[0] !== "(tabs)") {
          router.replace("/(tabs)");
        }
      }
      setIsChecking(false);
    };

    verifyLogin();
  }, [token]); // ✅ `token`이 변경될 때만 실행

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // 화면 전환되기 때문에 랜더링 필요 없음
};

export default IndexScreen;