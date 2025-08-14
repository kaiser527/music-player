import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ITrack } from "@/types/backend";

export const useGetFavoriteSlice = () => {
  const tracks: ITrack[] = useAppSelector((state) => state.favorite.track);
  const filter: string = useAppSelector((state) => state.favorite.filter);

  const dispatch = useAppDispatch();

  const toggleTrackFavorite = async (
    track: ITrack,
    id: "add-to-favorites" | "remove-from-favorites"
  ) => {
    const { handleAddTrack, handleRemoveTrack } = await import(
      "redux/slice/FavoriteSlice"
    );
    if (id === "add-to-favorites") {
      dispatch(handleAddTrack(track));
    } else if (id === "remove-from-favorites") {
      dispatch(handleRemoveTrack(track));
    }
  };

  return { tracks, filter, toggleTrackFavorite };
};
