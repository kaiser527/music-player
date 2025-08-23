import PlaylistList from "@/components/client/playlist/PlaylistList";
import { screenPadding } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { convertUrl } from "@/helpers/convertTrack";
import { useGetPlaylistData } from "@/hooks/data/useGetPlaylistData";
import { useScrollToTop } from "@/hooks/layout/useScrollToTop";
import { useTrackQueue } from "@/hooks/track/useTrackQueue";
import { defaultStyles } from "@/styles";
import { IPlaylist } from "@/types/backend";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import TrackPlayer from "react-native-track-player";

const PlaylistsScreen = () => {
  const { isFetching, playlists } = useGetPlaylistData(true, true);
  const { activeQueue } = useTrackQueue();
  const { handleScroll } = useScroll();

  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  useScrollToTop(scrollRef);

  const handlePlaylistPress = async (playlist: IPlaylist) => {
    let passedPlaylist: IPlaylist = { ...playlist };

    if (activeQueue === `playlists-detail-${playlist.id}`) {
      const trackQueue = await TrackPlayer.getQueue();

      const queueUrls = trackQueue.map((t) => t.url);

      passedPlaylist.track = [...playlist.track].slice().sort((a, b) => {
        const indexA = queueUrls.indexOf(convertUrl(a.url));
        const indexB = queueUrls.indexOf(convertUrl(b.url));

        // If a track is not in queue, push it to the end
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });
    }

    router.push({
      pathname: "/(drawer)/(tabs)/playlists/detail",
      params: { playlist: JSON.stringify(passedPlaylist) },
    });
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        decelerationRate="fast"
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <PlaylistList
          handlePlaylistPress={handlePlaylistPress}
          isFetching={isFetching}
          playlists={playlists}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default PlaylistsScreen;
