import PlaylistTrackList from "@/components/client/playlist/PlaylistTrackList";
import { screenPadding } from "@/constants/tokens";
import { convertUrl } from "@/helpers/convertTrack";
import { defaultStyles } from "@/styles";
import { IPlaylist } from "@/types/backend";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const PlaylistScreen = () => {
  const { playlist } = useLocalSearchParams<{ playlist: string }>();
  const parsedPlaylist: IPlaylist = JSON.parse(playlist ?? "{}");

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <PlaylistTrackList
          playlist={{
            ...parsedPlaylist,
            track: parsedPlaylist.track.map((item) => ({
              ...item,
              url: convertUrl(item.url),
            })),
          }}
        />
      </ScrollView>
    </View>
  );
};

export default PlaylistScreen;
