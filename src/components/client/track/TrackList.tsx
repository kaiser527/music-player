import ItemDivider from "@/components/client/ItemSeparator";
import ListEmpty from "@/components/client/ListEmpty";
import { compareArray } from "@/helpers/compareArray";
import { convertTrack, convertUrl } from "@/helpers/convertTrack";
import { useGetFavoriteSlice } from "@/hooks/data/useGetFavoriteSlice";
import { ITrack } from "@/types/backend";
import { usePathname } from "expo-router";
import React from "react";
import { FlatList, FlatListProps } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import QueueControls from "../QueueControls";
import TrackListItem from "./TrackListItem";
import TrackListSkeleton from "./TrackListSkeleton";

type Props = Partial<FlatListProps<Track>> & {
  tracks: ITrack[];
  isFetching: boolean;
  hideQueueControls?: boolean;
};

const TrackList = (props: Props) => {
  const { setIsFavorite } = useGetFavoriteSlice();

  const pathName = usePathname();

  const convertedTracks = convertTrack(props.tracks);

  const handleTrackSelect = async (selectedTrack: Track) => {
    if (pathName === "/favorites") {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }

    const selectedUrl = convertUrl(selectedTrack.url);
    const trackIndex = convertedTracks.findIndex(
      (item) => item.url === selectedUrl
    );
    if (trackIndex === -1) return;

    const trackQueue = await TrackPlayer.getQueue();

    console.log(
      "check different queue",
      !compareArray(trackQueue, convertedTracks)
    );

    if (trackQueue.length === 0 || !compareArray(trackQueue, convertedTracks)) {
      await TrackPlayer.setQueue(convertedTracks);
      console.log("set queue");
    }

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
              {!props.hideQueueControls && props.tracks.length > 0 && (
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
