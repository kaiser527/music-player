import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAccount, setLogoutAction } from "@/redux/slice/AccountSlice";
import { IUser } from "@/types/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
import { useEffect } from "react";

export const useGetAccount = (isFetch: boolean) => {
  const user: IUser = useAppSelector((state) => state.account.user);
  const isAuthenticated: boolean = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const isLoading: boolean = useAppSelector((state) => state.account.isLoading);

  const dispatch = useAppDispatch();
  const pathName = usePathname();

  useEffect(() => {
    if (isFetch) fetchUserAccount();
  }, []);

  const fetchUserAccount = async () => {
    if (pathName.includes("auth") || !isAuthenticated) return;

    const access_token = await AsyncStorage.getItem("access_token");
    const refresh_token = await AsyncStorage.getItem("refresh_token");

    if (access_token && refresh_token) dispatch(fetchAccount());
    else dispatch(setLogoutAction({}));
  };

  return { user, isAuthenticated, isLoading };
};
