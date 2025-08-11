import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";

export const useDeletePlaylist = () => {
  const deleteIds: string[] = useAppSelector(
    (state) => state.playlist.deletePlaylistIds
  );

  const dispatch = useDispatch();

  const setDeleteIds = async (value: string[]) => {
    const { setDeletePlaylistIds } = await import("redux/slice/PlaylistSlice");
    dispatch(setDeletePlaylistIds(value));
  };

  return { deleteIds, setDeleteIds };
};
