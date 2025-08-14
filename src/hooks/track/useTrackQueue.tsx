import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from "expo-router";

export const useTrackQueue = () => {
  const activeQueue: string = useAppSelector(
    (state) => state.track.activeQueueId
  );

  const dispatch = useAppDispatch();

  const pathName = usePathname();

  const setActiveQueue = async () => {
    const { setActiveQueueId } = await import("redux/slice/TrackSlice");

    switch (pathName) {
      case "/":
        dispatch(setActiveQueueId("songs"));
        break;

      case "/favorites":
        dispatch(setActiveQueueId("favorites"));
        break;

      case "/playlists/detail":
        dispatch(setActiveQueueId("playlist-detail"));
        break;

      case "/artists/detail":
        dispatch(setActiveQueueId("artists-detail"));
        break;

      default:
        dispatch(setActiveQueueId("songs"));
        break;
    }
  };

  return { activeQueue, setActiveQueue };
};
