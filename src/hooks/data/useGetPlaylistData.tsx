import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchGlobalPlaylist,
  fetchUserPlaylist,
} from "@/redux/slice/PlaylistSlice";
import { IMeta, IPlaylist } from "@/types/backend";
import { useEffect } from "react";

export const useGetPlaylistData = (isGlobal: boolean, isFetch: boolean) => {
  const globalPlaylists: IPlaylist[] = useAppSelector(
    (state) => state.playlist.globalPlaylist
  );
  const userPlaylists: IPlaylist[] = useAppSelector(
    (state) => state.playlist.userPlaylist
  );
  const isFetching = useAppSelector((state) => {
    if (state.account.isAuthenticated) {
      return state.playlist.isFetchingUser;
    }
    return state.playlist.isFetchingGlobal;
  });
  const isAuthenticated: boolean = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const metaUser: IMeta = useAppSelector((state) => state.playlist.metaUser);
  const filter: string = useAppSelector((state) => state.playlist.filter);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const fetchPlaylist = () => {
        if (isGlobal) {
          if (!isAuthenticated) {
            dispatch(fetchGlobalPlaylist());
          } else {
            dispatch(
              fetchUserPlaylist(`pageSize=100&pageNumber=1&name=${filter}`)
            );
          }
        } else {
          //fetch all playlist in db
        }
      };
      if (isFetch) fetchPlaylist();
    },
    isGlobal ? [filter, isAuthenticated] : []
  );

  return {
    playlists: isAuthenticated
      ? userPlaylists
      : globalPlaylists.filter((item) =>
          filter.length > 0
            ? item.name.toLocaleLowerCase().includes(filter)
            : item
        ),
    isFetching,
    meta: isAuthenticated ? metaUser : {},
  };
};
