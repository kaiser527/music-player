import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useTogglePlaylistModal = () => {
  const isShowModal = useAppSelector((state) => state.playlist.modalVisible);

  const dispatch = useAppDispatch();

  const setIsShowModal = async (value: boolean) => {
    const { setModalVisible } = await import("redux/slice/PlaylistSlice");
    dispatch(setModalVisible(value));
  };

  return { isShowModal, setIsShowModal };
};
