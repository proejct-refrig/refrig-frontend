import { useRouter, useSegments } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkLoginAndUpdateRedux } from '@/utils/auth';
import { ActivityIndicator, View } from 'react-native';

const IndexScreen: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
  });

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