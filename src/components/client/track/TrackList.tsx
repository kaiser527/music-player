import { REACT_BACKEND_URL } from "@/constants/utils";
import { convertUrl } from "@/helpers/convertUrl";
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
    const convertedTracks = props.tracks.map((track) => ({
      url: convertUrl(track.url),
      title: track.title,
      artist: track.user.username,
      artwork: track.artwork,
    }));

    const selectedUrl = convertUrl(selectedTrack.url);
    const trackIndex = convertedTracks.findIndex(
      (item) => item.url === selectedUrl
    );
    if (trackIndex === -1) return;

    const trackQueue = await TrackPlayer.getQueue();
    if (trackQueue.length === 0) await TrackPlayer.add(convertedTracks);

    await TrackPlayer.skip(trackIndex);
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
