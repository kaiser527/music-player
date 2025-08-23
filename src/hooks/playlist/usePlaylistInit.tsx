import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDataInit } from "@/redux/slice/PlaylistSlice";
import { IPlaylist } from "@/types/backend";

export const usePlaylistInit = () => {
  const initPlaylist: IPlaylist = useAppSelector(
    (state) => state.playlist.dataInit
  );

  const dispatch = useAppDispatch();

  const setInitPlaylist = (value: IPlaylist) => {
    dispatch(setDataInit(value));
  };

  return { initPlaylist, setInitPlaylist };
};
