import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchArtist,
  fetchUser,
  handleChangeQuery,
} from "@/redux/slice/UserSlice";
import { IMeta, IUser } from "@/types/backend";
import { useEffect } from "react";

export enum EUser {
  ARTIST,
  USER,
}

export const useGetUserData = (fetchType: EUser, isFetch: boolean) => {
  const artists: IUser[] = useAppSelector((state) => state.user.artists);
  const users: IUser[] = useAppSelector((state) => state.user.users);
  const isFetchingArtist: boolean = useAppSelector(
    (state) => state.user.isFetchingArtist
  );
  const isFetchingUser: boolean = useAppSelector(
    (state) => state.user.isFetchingUser
  );
  const query: string = useAppSelector((state) => state.user.query);
  const filter: string = useAppSelector((state) => state.user.filter);
  const metaArtist: IMeta = useAppSelector((state) => state.user.metaArtist);
  const metaUser: IMeta = useAppSelector((state) => state.user.metaUser);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const fetchData = () => {
        if (fetchType === EUser.ARTIST) {
          dispatch(fetchArtist(`pageSize=100&pageNumber=1&username=${filter}`));
        } else {
          dispatch(fetchUser(query));
        }
      };

      if (isFetch) fetchData();
    },
    fetchType === EUser.ARTIST ? [filter] : [query]
  );

  const setQuery = (value: string) => {
    dispatch(handleChangeQuery(value));
  };

  const result = {
    data: fetchType === EUser.ARTIST ? artists : users,
    isFetching: fetchType === EUser.ARTIST ? isFetchingArtist : isFetchingUser,
    meta: fetchType === EUser.ARTIST ? metaArtist : metaUser,
    ...(fetchType === EUser.USER && { setQuery }),
  };

  return result;
};
