import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRole, handleChangeQuery } from "@/redux/slice/RoleSlice";
import { IMeta, IRole } from "@/types/backend";
import { useEffect } from "react";

export const useGetRoleData = (isFetch: boolean) => {
  const roles: IRole[] = useAppSelector((state) => state.role.data);
  const isFetching: boolean = useAppSelector((state) => state.role.isFetching);
  const meta: IMeta = useAppSelector((state) => state.role.meta);
  const query: string = useAppSelector((state) => state.role.query);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleFetchRole = () => {
      dispatch(fetchRole(query));
    };

    if (isFetch) handleFetchRole();
  }, [query]);

  const setQuery = (value: string) => {
    dispatch(handleChangeQuery(value));
  };

  return { roles, isFetching, meta, setQuery };
};
