import TrackList from "@/components/client/track/TrackList";
import { screenPadding } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { useGetTrackData } from "@/hooks/data/useGetTrackData";
import { useScrollToTop } from "@/hooks/layout/useScrollToTop";
import { defaultStyles } from "@/styles";
import React, { useEffect, useRef } from "react";
import { ScrollView, View } from "react-native";

const SongsScreen = () => {
  const { handleScroll } = useScroll();

  const { tracks, isFetching, setQuery, titleFilter } = useGetTrackData(true);

  const scrollRef = useRef<ScrollView>(null);

  useScrollToTop(scrollRef);

  useEffect(() => {
    let query = "pageSize=100&pageNumber=1";
    if (titleFilter && titleFilter.length > 0) {
      query += `&title=${titleFilter}`;
    }
    setQuery(query);
  }, [titleFilter]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        ref={scrollRef}
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
