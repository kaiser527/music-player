import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { showMessage } from "react-native-flash-message";

interface IProps {
  children: React.ReactNode;
}

const LayoutApp = (props: IProps) => {
  const isRefreshToken = useAppSelector(
    (state) => state.account.isRefreshToken
  );

  const errorRefreshToken = useAppSelector(
    (state) => state.account.errorRefreshToken
  );

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isRefreshToken === true) {
      handleErrorRefreshTokenRotation();
    }
  }, [isRefreshToken]);

  const handleErrorRefreshTokenRotation = async () => {
    await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
    const { setRefreshTokenAction } = await import("redux/slice/AccountSlice");
    dispatch(
      setRefreshTokenAction({
        status: false,
        message: "Your login session is ended, please login",
      })
    );
    if (pathName !== "/") {
      showMessage({
        message: "Error occurred",
        description: errorRefreshToken,
        type: "danger",
      });
      router.push("/(drawer)/auth/login");
    }
  };

  return <>{props.children}</>;
};

export default LayoutApp;
