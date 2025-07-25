import TrackList from "@/components/client/track/TrackList";
import { screenPadding } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { defaultStyles } from "@/styles";
import React from "react";
import { ScrollView, View } from "react-native";

const SongsScreen = () => {
  const { handleScroll } = useScroll();

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        onScroll={handleScroll}
        decelerationRate="fast"
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList scrollEnabled={false} />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
