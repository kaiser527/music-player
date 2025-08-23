import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalVisible } from "@/redux/slice/PlaylistSlice";

export const useTogglePlaylistModal = () => {
  const isShowModal = useAppSelector((state) => state.playlist.modalVisible);

  const dispatch = useAppDispatch();

  const setIsShowModal = (value: boolean) => {
    dispatch(setModalVisible(value));
  };

  return { isShowModal, setIsShowModal };
};
