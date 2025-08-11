import ArtistList from "@/components/client/artist/ArtistList";
import { screenPadding } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { EUser, useGetUserData } from "@/hooks/data/useGetUserData";
import { useScrollToTop } from "@/hooks/layout/useScrollToTop";
import { defaultStyles } from "@/styles";
import React, { useRef } from "react";
import { ScrollView, View } from "react-native";

const ArtistsScreen = () => {
  const { handleScroll } = useScroll();

  const { artists, isFetchingArtist } = useGetUserData(EUser.ARTIST);

  const scrollRef = useRef<ScrollView>(null);

  useScrollToTop(scrollRef);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        decelerationRate="fast"
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <ArtistList
          isFetchingArtist={isFetchingArtist ?? true}
          artists={artists ?? []}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default ArtistsScreen;
