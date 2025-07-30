import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/backend";

export const useGetAccount = () => {
  const user: IUser = useAppSelector((state) => state.account.user);
  const isAuthenticated: boolean = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const isLoading: boolean = useAppSelector((state) => state.account.isLoading);

  return { user, isAuthenticated, isLoading };
};
