import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTrack, handleChangeQuery } from "@/redux/slice/TrackSlice";
import { IMeta, ITrack } from "@/types/backend";
import { useEffect } from "react";

export const useGetTrackData = (isFetch: boolean) => {
  const tracks: ITrack[] = useAppSelector((state) => state.track.data);
  const isFetching: boolean = useAppSelector((state) => state.track.isFetching);
  const query: string = useAppSelector((state) => state.track.query);
  const meta: IMeta = useAppSelector((state) => state.track.meta);
  const titleFilter: string = useAppSelector(
    (state) => state.track.titleFilter
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchListTrack = () => {
      dispatch(fetchTrack(query));
    };

    if (isFetch) fetchListTrack();
  }, [query]);

  const setQuery = (value: string) => {
    dispatch(handleChangeQuery(value));
  };

  return { tracks, isFetching, meta, setQuery, titleFilter };
};
