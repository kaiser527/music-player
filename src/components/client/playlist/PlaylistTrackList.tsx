import { fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL, unKnownTrackImage } from "@/constants/utils";
import { defaultStyles } from "@/styles";
import { IPlaylist } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
        ListHeaderComponent={
          <View>
            <View style={styles.artworkImageContainer}>
              <FastImage
                source={{
                  uri:
                    props.playlist.track.length > 0
                      ? `${REACT_BACKEND_URL}/api/v1/images/track/${props.playlist.track[0]?.artwork}`
                      : unKnownTrackImage,
                  priority: FastImage.priority.high,
                }}
                style={styles.artworkImage}
              />
            </View>
            <Text numberOfLines={1} style={styles.playlistNameText}>
              {props.playlist.name}
            </Text>
            {search.length === 0 && props.playlist.track.length > 0 && (
              <QueueControls
                style={{ paddingTop: 24 }}
                tracks={props.playlist.track}
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
