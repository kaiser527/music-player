import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IPlaylist } from "@/types/backend";
import { useEffect } from "react";

export const useGetPlaylistData = (isGlobal: boolean) => {
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
  const metaUser: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  } = useAppSelector((state) => state.playlist.metaUser);
  const query: string = useAppSelector((state) => state.playlist.query);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const fetchPlaylist = async () => {
        if (isGlobal) {
          if (!isAuthenticated) {
            const { fetchGlobalPlaylist } = await import(
              "redux/slice/PlaylistSlice"
            );
            dispatch(fetchGlobalPlaylist());
          } else {
            const { fetchUserPlaylist } = await import(
              "redux/slice/PlaylistSlice"
            );
            dispatch(
              fetchUserPlaylist(`pageSize=100&pageNumber=1&name=${query}`)
            );
          }
        } else {
          //fetch all playlist in db
        }
      };
      fetchPlaylist();
    },
    isGlobal ? [isAuthenticated && query] : []
  );

  return isGlobal
    ? {
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
      }
    : {};
};
