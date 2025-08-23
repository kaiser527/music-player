import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleAddTrack, handleRemoveTrack } from "@/redux/slice/FavoriteSlice";
import { ITrack } from "@/types/backend";

export const useGetFavoriteSlice = () => {
  const tracks: ITrack[] = useAppSelector((state) => state.favorite.track);
  const filter: string = useAppSelector((state) => state.favorite.filter);

  const dispatch = useAppDispatch();

  const toggleTrackFavorite = (
    track: ITrack,
    id: "add-to-favorites" | "remove-from-favorites"
  ) => {
    if (id === "add-to-favorites") {
      dispatch(handleAddTrack(track));
    } else if (id === "remove-from-favorites") {
      dispatch(handleRemoveTrack(track));
    }
  };

  return { tracks, filter, toggleTrackFavorite };
};
