import TrackList from "@/components/client/track/TrackList";
import { screenPadding } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { useGetTrackData } from "@/hooks/useGetTrackData";
import { useAppDispatch } from "@/redux/hooks";
import { defaultStyles } from "@/styles";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

const SongsScreen = () => {
  const { handleScroll } = useScroll();

  const { tracks, isFetching, query } = useGetTrackData();

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchListTrack();
  }, [query]);

  const fetchListTrack = async () => {
    const { fetchTrack } = await import("@/redux/slice/TrackSlice");
    dispatch(fetchTrack(`pageSize=100&pageNumber=1&title=${query}`));
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        onScroll={handleScroll}
        decelerationRate="fast"
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList
          tracks={tracks}
          isFetching={isFetching}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
