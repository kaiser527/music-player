import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useToggleDeletePlaylist = () => {
  const isDeleteMode: boolean = useAppSelector(
    (state) => state.playlist.isDelete
  );

  const dispatch = useAppDispatch();

  const setIsDeleteMode = async (value: boolean) => {
    const { setIsDelete } = await import("redux/slice/PlaylistSlice");
    dispatch(setIsDelete(value));
  };

  return { isDeleteMode, setIsDeleteMode };
};
