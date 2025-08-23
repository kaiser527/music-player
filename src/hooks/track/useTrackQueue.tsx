import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveQueueId } from "@/redux/slice/TrackSlice";
import { usePathname } from "expo-router";

export const useTrackQueue = () => {
  const activeQueue: string = useAppSelector(
    (state) => state.track.activeQueueId
  );

  const dispatch = useAppDispatch();

  const pathName = usePathname();

  const setActiveQueue = (queueId?: string) => {
    switch (pathName) {
      case "/":
        dispatch(setActiveQueueId("songs"));
        break;

      case "/favorites":
        dispatch(setActiveQueueId("favorites"));
        break;

      case "/playlists/detail":
        dispatch(setActiveQueueId(`playlists-detail-${queueId}`));
        break;

      case "/artists/detail":
        dispatch(setActiveQueueId(`artists-detail-${queueId}`));
        break;

      default:
        dispatch(setActiveQueueId("songs"));
        break;
    }
  };

  return { activeQueue, setActiveQueue };
};
