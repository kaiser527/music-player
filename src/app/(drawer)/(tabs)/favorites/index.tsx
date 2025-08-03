import TrackList from "@/components/client/track/TrackList";
import { screenPadding } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { useGetFavoriteSlice } from "@/hooks/useGetFavoriteSlice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { defaultStyles } from "@/styles";
import React, { useRef } from "react";
import { ScrollView, View } from "react-native";

const FavoritesScreen = () => {
  const { tracks, filter } = useGetFavoriteSlice();

  const { handleScroll } = useScroll();

  const scrollRef = useRef<ScrollView>(null);

  useScrollToTop(scrollRef);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList
          filter={filter}
          tracks={tracks.filter((item) =>
            filter ? item.title === filter : item
          )}
          isFetching={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
