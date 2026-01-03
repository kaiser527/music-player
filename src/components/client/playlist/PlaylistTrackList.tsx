import { fontSize } from "@/constants/tokens";
import { convertTrack } from "@/helpers/convertTrack";
import { defaultStyles } from "@/styles";
import { IPlaylist } from "@/types/backend";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AutoChangeTrackArtwork from "../AutoChangeTrackArtwork";
import SearchInput from "../custom/SearchInput";
import QueueControls from "../QueueControls";
import TrackList from "../track/TrackList";

interface IProps {
  playlist: IPlaylist;
}

const PlaylistTrackList = (props: IProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchInput
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        handleChangInput={setSearch}
        isScrolled={false}
        placeholder="Find in songs"
      />
      <TrackList
        isFetching={false}
        tracks={props.playlist.track.filter((item) =>
          search.length > 0 ? item.title.toLowerCase().includes(search) : item
        )}
        scrollEnabled={false}
        ListHeaderComponentStyle={styles.playlistHeaderContainer}
        hideQueueControls
        queueId={props.playlist.id}
        ListHeaderComponent={
          <View>
            <View style={styles.artworkImageContainer}>
              <AutoChangeTrackArtwork
                tracks={props.playlist.track}
                style={styles.artworkImage}
              />
            </View>
            <Text numberOfLines={1} style={styles.playlistNameText}>
              {props.playlist.name}
            </Text>
            {search.length === 0 && props.playlist.track.length > 0 && (
              <QueueControls
                queueId={props.playlist.id}
                style={{ paddingTop: 24 }}
                tracks={convertTrack(props.playlist.track)}
              />
            )}
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 300,
  },
  artworkImage: {
    width: "85%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  playlistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
});

export default PlaylistTrackList;
