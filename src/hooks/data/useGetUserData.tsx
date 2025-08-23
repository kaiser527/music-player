import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchArtist } from "@/redux/slice/UserSlice";
import { IUser } from "@/types/backend";
import { useEffect } from "react";

export enum EUser {
  ARTIST,
  USER,
}

export const useGetUserData = (fetchType: EUser) => {
  const artists: IUser[] = useAppSelector((state) => state.user.artists);
  const isFetchingArtist: boolean = useAppSelector(
    (state) => state.user.isFetchingArtist
  );
  const query: string = useAppSelector((state) => state.user.query);
  const metaArtist: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  } = useAppSelector((state) => state.user.metaArtist);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const fetchData = () => {
        if (fetchType === EUser.ARTIST) {
          dispatch(fetchArtist(`pageSize=100&pageNumber=1&username=${query}`));
        } else {
          //fetch user
        }
      };

      fetchData();
    },
    fetchType === EUser.ARTIST ? [query] : []
  );

  const result = { artists, isFetchingArtist, metaArtist };

  return result;
};
