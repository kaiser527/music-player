import { ALL_PERMISSION } from "@/constants/permissions";
import { useGetAccount } from "../data/useGetAccount";

export enum EModule {
  USER = "USER",
  PLAYLIST = "PLAYLIST",
  ROLE = "ROLE",
  PERMISSION = "PERMISSION",
  TRACK = "TRACK",
}

export const useViewAdmin = () => {
  const { user } = useGetAccount(false);
  const permissions = user?.role?.permission ?? [];

  const viewModule = (module: EModule) =>
    permissions.find(
      (item) =>
        item.apiPath === ALL_PERMISSION[module].GET_PAGINATE.apiPath &&
        item.method === ALL_PERMISSION[module].GET_PAGINATE.method
    );

  const isPermit = (module: EModule) => !!viewModule(module);

  return { isPermit };
};
