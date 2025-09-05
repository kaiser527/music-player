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
  const isFetchingGlobal: boolean = useAppSelector(
    (state) => state.playlist.isFetchingGlobal
  );
  const isFetchingUser: boolean = useAppSelector(
    (state) => state.playlist.isFetchingUser
  );
  const isAuthenticated: boolean = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const metaUser: IMeta = useAppSelector((state) => state.playlist.metaUser);
  const query: string = useAppSelector((state) => state.playlist.query);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const fetchPlaylist = () => {
        if (isGlobal) {
          if (!isAuthenticated) {
            dispatch(fetchGlobalPlaylist());
          } else {
            dispatch(
              fetchUserPlaylist(`pageSize=100&pageNumber=1&name=${query}`)
            );
          }
        } else {
          //fetch all playlist in db
        }
      };
      if (isFetch) fetchPlaylist();
    },
    isGlobal ? [isAuthenticated && query] : []
  );

  return {
    playlists: isAuthenticated
      ? userPlaylists
      : globalPlaylists.filter((item) =>
          query.length > 0
            ? item.name.toLocaleLowerCase().includes(query)
            : item
        ),
    isFetching: isAuthenticated ? isFetchingUser : isFetchingGlobal,
    meta: isAuthenticated ? metaUser : {},
    query,
  };
};
