import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRefreshTokenAction } from "@/redux/slice/AccountSlice";
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
    dispatch(
      setRefreshTokenAction({
        status: false,
        message: "Your login session is ended, please login",
      })
    );
    if (pathName.includes("detail") || pathName.includes("(admin)")) {
      showMessage({
        message: "Error occurred",
        description: errorRefreshToken,
        type: "danger",
      });
      router.replace("/(drawer)/auth/login");
    }
  };

  return <>{props.children}</>;
};

export default LayoutApp;
