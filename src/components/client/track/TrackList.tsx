import { REACT_BACKEND_URL } from "@/constants/utils";
import { utilsStyles } from "@/styles";
import { ITrack } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import React from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import TrackListItem from "./TrackListItem";
import TrackListSkeleton from "./TrackListSkeleton";

type Props = Partial<FlatListProps<Track>> & {
  tracks: ITrack[];
  isFetching: boolean;
  filter?: string;
};

const ItemDivider = () => {
  return (
    <View
      style={{
        ...utilsStyles.itemSeparator,
        marginVertical: 9,
        marginLeft: 60,
      }}
    />
  );
};

const TrackList = (props: Props) => {
  const handleTrackSelect = async (selectedTrack: Track) => {
    const newUrl = selectedTrack.url.replace("localhost:3000", "10.0.2.2:3000");
    const newTrack = { ...selectedTrack, url: newUrl };
    const trackIndex = props.tracks.findIndex(
      (item) => item.url === selectedTrack.url
    );

    if (trackIndex === -1) return;

    console.log(trackIndex);

    await TrackPlayer.load(newTrack);
    await TrackPlayer.play();
  };

  return (
    <>
      {props.isFetching ? (
        <TrackListSkeleton />
      ) : (
        <FlatList
          data={props.tracks}
          ItemSeparatorComponent={ItemDivider}
          contentContainerStyle={{
            paddingBottom: 133,
          }}
          ListEmptyComponent={
            <View>
              <Text style={utilsStyles.emptyContentText}>No songs found</Text>
              <FastImage
                source={{
                  uri: `${REACT_BACKEND_URL}/api/v1/images/track/unknown_track.png`,
                }}
                style={utilsStyles.emptyContentImage}
              />
            </View>
          }
          renderItem={({ item }) => (
            <TrackListItem
              onTrackSelect={() => handleTrackSelect(item)}
              track={{ ...item, artist: item.user.username }}
            />
          )}
          {...props}
        />
      )}
    </>
  );
};

export default TrackList;
