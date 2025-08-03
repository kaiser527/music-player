import { REACT_BACKEND_URL } from "@/constants/utils";
import { convertTrack, convertUrl } from "@/helpers/convertTrack";
import { utilsStyles } from "@/styles";
import { ITrack } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import React from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import QueueControls from "../queue/QueueControls";
import TrackListItem from "./TrackListItem";
import TrackListSkeleton from "./TrackListSkeleton";

type Props = Partial<FlatListProps<Track>> & {
  tracks: ITrack[];
  isFetching: boolean;
  filter?: string;
  hideQueueControls?: boolean;
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
  const convertedTracks = convertTrack(props.tracks);

  const handleTrackSelect = async (selectedTrack: Track) => {
    const selectedUrl = convertUrl(selectedTrack.url);
    const trackIndex = convertedTracks.findIndex(
      (item) => item.url === selectedUrl
    );
    if (trackIndex === -1) return;

    const trackQueue = await TrackPlayer.getQueue();
    if (trackQueue.length === 0 || props.tracks.length !== trackQueue.length)
      await TrackPlayer.setQueue(convertedTracks);

    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
  };

  return (
    <>
      {props.isFetching ? (
        <TrackListSkeleton />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={props.tracks}
          ItemSeparatorComponent={ItemDivider}
          ListHeaderComponent={
            <>
              {!props.hideQueueControls && (
                <QueueControls
                  tracks={convertedTracks}
                  style={{ paddingBottom: 20 }}
                />
              )}
            </>
          }
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
