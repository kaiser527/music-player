import SearchInput from "@/components/client/custom/SearchInput";
import PlaylistList from "@/components/client/playlist/PlaylistList";
import { screenPadding } from "@/constants/tokens";
import { useGetPlaylistData } from "@/hooks/data/useGetPlaylistData";
import { useTrackQueue } from "@/hooks/track/useTrackQueue";
import { callUpdatePlaylist } from "@/services/api";
import { defaultStyles } from "@/styles";
import { IPlaylist, ITrack } from "@/types/backend";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";

const addToPlaylist = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");

  const { activeQueue } = useTrackQueue();
  const { track } = useLocalSearchParams<{ track: string }>();
  const { playlists, isFetching } = useGetPlaylistData(true, true);

  const router = useRouter();

  const parsedTrack: ITrack = JSON.parse(track ?? "{}");
  const availablePlaylists = playlists.filter(
    (item) =>
      item.user && !item.track?.some((track) => track.id === parsedTrack.id)
  );

  const handlePlaylistPress = useCallback(async (playlist: IPlaylist) => {
    const res = await callUpdatePlaylist(playlist.id ?? "", {
      name: playlist.name,
      trackIds: [...playlist.track, parsedTrack].map((item) => item.id),
    });
    if (res.result) {
      router.replace("/");
      if (activeQueue === `playlists-detail-${playlist.id}`) {
        await TrackPlayer.add(parsedTrack);
      }
    } else {
      showMessage({
        message: "Error occurred",
        description: "You must enter your email first",
        type: "danger",
      });
    }
  }, []);

  const filteredPlaylists = useMemo(() => {
    return availablePlaylists.filter((item) =>
      search.length > 0
        ? item.name.toLowerCase().includes(search.toLowerCase())
        : true
    );
  }, [search]);

  return (
    <SafeAreaView style={[styles.modalContainer]}>
      <SearchInput
        handleChangInput={setSearch}
        placeholder="Find in playlists"
        setIsFocused={setIsFocused}
        isFocused={isFocused}
        isScrolled={false}
      />
      <PlaylistList
        handlePlaylistPress={handlePlaylistPress}
        isFetching={isFetching}
        playlists={filteredPlaylists}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    marginTop: -50,
  },
});

export default addToPlaylist;
