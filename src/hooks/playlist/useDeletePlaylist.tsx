import { useAppSelector } from "@/redux/hooks";
import { setDeletePlaylistIds } from "@/redux/slice/PlaylistSlice";
import { useDispatch } from "react-redux";

export const useDeletePlaylist = () => {
  const deleteIds: string[] = useAppSelector(
    (state) => state.playlist.deletePlaylistIds
  );

  const dispatch = useDispatch();

  const setDeleteIds = (value: string[]) => {
    dispatch(setDeletePlaylistIds(value));
  };

  return { deleteIds, setDeleteIds };
};
