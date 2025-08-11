import ItemDivider from "@/components/client/ItemSeparator";
import ListEmpty from "@/components/client/ListEmpty";
import { convertTrack, convertUrl } from "@/helpers/convertTrack";
import { ITrack } from "@/types/backend";
import React from "react";
import { FlatList, FlatListProps } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import QueueControls from "../QueueControls";
import TrackListItem from "./TrackListItem";
import TrackListSkeleton from "./TrackListSkeleton";

type Props = Partial<FlatListProps<Track>> & {
  tracks: ITrack[];
  isFetching: boolean;
  filter?: string;
  hideQueueControls?: boolean;
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

    if (trackQueue.length === 1) await TrackPlayer.setQueue(props.tracks);

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
          ItemSeparatorComponent={() => (
            <ItemDivider marginLeft={60} marginVertical={9} />
          )}
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
          ListEmptyComponent={() => (
            <ListEmpty text="No songs found" screen="TRACK" />
          )}
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
