import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDelete } from "@/redux/slice/PlaylistSlice";

export const useToggleDeletePlaylist = () => {
  const isDeleteMode: boolean = useAppSelector(
    (state) => state.playlist.isDelete
  );

  const dispatch = useAppDispatch();

  const setIsDeleteMode = (value: boolean) => {
    dispatch(setIsDelete(value));
  };

  return { isDeleteMode, setIsDeleteMode };
};
