import { useAppSelector } from "@/redux/hooks";
import { ITrack } from "@/types/backend";

export const useGetFavoriteSlice = () => {
  const tracks: ITrack[] = useAppSelector((state) => state.favorite.track);
  const filter: string = useAppSelector((state) => state.favorite.filter);

  return { tracks, filter };
};
