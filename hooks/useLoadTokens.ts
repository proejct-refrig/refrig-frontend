import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokens } from "@/store/authSlice";
import { getStoredTokens } from '../app/auth/token';

const useLoadTokens = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTokens = async () => {
      const { accessToken, refreshToken } = await getStoredTokens();
      if (accessToken && refreshToken) {
        dispatch(setTokens({ accessToken, refreshToken }));
      }
    };

    loadTokens();
  }, []);
};

export default useLoadTokens;