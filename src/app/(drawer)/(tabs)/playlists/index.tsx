import PlaylistList from "@/components/client/playlist/PlaylistList";
import { screenPadding } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { sortTrack } from "@/helpers/convertTrack";
import { useGetPlaylistData } from "@/hooks/data/useGetPlaylistData";
import { useScrollToTop } from "@/hooks/layout/useScrollToTop";
import { useTrackQueue } from "@/hooks/track/useTrackQueue";
import { defaultStyles } from "@/styles";
import { IPlaylist } from "@/types/backend";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import TrackPlayer from "react-native-track-player";

const PlaylistsScreen = () => {
  const [convertedPlaylists, setConvertedPlaylists] = useState<IPlaylist[]>([]);

  const { isFetching, playlists } = useGetPlaylistData(true, true);
  const { activeQueue } = useTrackQueue();
  const { handleScroll } = useScroll();

  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  useScrollToTop(scrollRef);

  useEffect(() => {
    const convertPlaylist = async (playlists: IPlaylist[]) => {
      const trackQueue = await TrackPlayer.getQueue();
      return playlists.map((item) => ({
        ...item,
        track:
          activeQueue === `playlists-detail-${item.id}`
            ? sortTrack(item.track, trackQueue)
            : item.track,
      }));
    };

    if (playlists && playlists.length > 0)
      convertPlaylist(playlists).then(setConvertedPlaylists);
    else setConvertedPlaylists([]);
  }, [playlists, activeQueue]);

  const handlePlaylistPress = useCallback(async (playlist: IPlaylist) => {
    router.push({
      pathname: "/(drawer)/(tabs)/playlists/detail",
      params: { playlist: JSON.stringify(playlist) },
    });
  }, []);

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
          playlists={convertedPlaylists}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default PlaylistsScreen;
