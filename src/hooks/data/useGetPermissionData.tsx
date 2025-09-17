import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPermission,
  handleChangeQuery,
} from "@/redux/slice/PermissionSlice";
import { IMeta, IPermission } from "@/types/backend";
import { useEffect } from "react";

export const useGetPermissionData = (isFetch: boolean) => {
  const permissions: IPermission[] = useAppSelector(
    (state) => state.permission.data
  );
  const isFetching: boolean = useAppSelector(
    (state) => state.permission.isFetching
  );
  const meta: IMeta = useAppSelector((state) => state.permission.meta);
  const query: string = useAppSelector((state) => state.permission.query);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPermissionPaginate = () => {
      dispatch(fetchPermission(query));
    };

    if (isFetch) fetchPermissionPaginate();
  }, [query]);

  const setQuery = (value: string) => {
    dispatch(handleChangeQuery(value));
  };

  return { permissions, isFetching, meta, setQuery };
};
