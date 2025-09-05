import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAccount } from "@/redux/slice/AccountSlice";
import { IUser } from "@/types/backend";
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

  const fetchUserAccount = () => {
    if (pathName.includes("auth") || !isAuthenticated) return;

    dispatch(fetchAccount());
  };

  return { user, isAuthenticated, isLoading };
};
