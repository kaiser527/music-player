import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ITrack } from "@/types/backend";
import { useEffect } from "react";

export const useGetTrackData = () => {
  const tracks: ITrack[] = useAppSelector((state) => state.track.data);
  const isFetching: boolean = useAppSelector((state) => state.track.isFetching);
  const query: string = useAppSelector((state) => state.track.query);
  const meta: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  } = useAppSelector((state) => state.track.meta);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchListTrack = async () => {
      const { fetchTrack } = await import("@/redux/slice/TrackSlice");
      dispatch(fetchTrack(`pageSize=100&pageNumber=1&title=${query}`));
    };

    fetchListTrack();
  }, [query]);

  return { tracks, isFetching, meta };
};
