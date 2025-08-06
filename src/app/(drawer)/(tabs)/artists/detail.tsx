import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { IUser } from "@/types/backend";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const ArtistDetailScreen = () => {
  const { artist } = useLocalSearchParams<{ artist: string }>();
  const parsedArtist: IUser = JSON.parse(artist ?? "{}");

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        {/* <ArtistTrackList artist={parsedArtist} /> */}
      </ScrollView>
    </View>
  );
};

export default ArtistDetailScreen;
