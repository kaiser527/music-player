import { useAppSelector } from "@/redux/hooks";
import { ITrack } from "@/types/backend";

export const useGetTrackData = () => {
  const tracks: ITrack[] = useAppSelector((state) => state.track.data);
  const isFetching: boolean = useAppSelector((state) => state.track.isFetching);
  const query: string = useAppSelector((state) => state.track.query);
  const meta: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  } = useAppSelector((state) => state.track.meta);

  return { tracks, isFetching, query, meta };
};
