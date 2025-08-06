import { fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { defaultStyles } from "@/styles";
import { IUser } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchInput from "../custom/SearchInput";
import QueueControls from "../queue/QueueControls";
import TrackList from "../track/TrackList";

interface IProps {
  artist: IUser;
}

const ArtistTrackList = (props: IProps) => {
  const search = useAppSelector((state) => state.track.filterArtistTrack);

  const dispatch = useAppDispatch();

  const [isFocused, setIsFocused] = useState(false);

  const handleChangInput = async (text: string) => {
    const { handleChangeFilterArtistTrack } = await import(
      "redux/slice/TrackSlice"
    );
    dispatch(handleChangeFilterArtistTrack(text));
  };

  return (
    <>
      <SearchInput
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        handleChangInput={handleChangInput}
        isScrolled={false}
        placeholder="Find in songs"
      />
      <TrackList
        isFetching={false}
        tracks={props.artist.track.filter((item) =>
          search.length > 0 ? item.title.toLowerCase().includes(search) : item
        )}
        scrollEnabled={false}
        ListHeaderComponentStyle={styles.artistHeaderContainer}
        hideQueueControls
        ListHeaderComponent={
          <View>
            <View style={styles.artworkImageContainer}>
              <FastImage
                source={{
                  uri: `${REACT_BACKEND_URL}/api/v1/images/user/${props.artist.image}`,
                  priority: FastImage.priority.normal,
                }}
                style={styles.artistImage}
              />
            </View>
            <Text numberOfLines={1} style={styles.artistNameText}>
              {props.artist.username}
            </Text>
            {search.length === 0 && (
              <QueueControls
                tracks={props.artist.track}
                style={{ paddingTop: 24 }}
              />
            )}
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  artistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 200,
  },
  artistImage: {
    width: "60%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 128,
  },
  artistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
});

export default ArtistTrackList;
