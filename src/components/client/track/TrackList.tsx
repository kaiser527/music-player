import { REACT_BACKEND_URL } from "@/constants/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { utilsStyles } from "@/styles";
import { ITrack } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import React, { useEffect } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import TrackListItem from "./TrackListItem";
import TrackListSkeleton from "./TrackListSkeleton";

type Props = Partial<FlatListProps<ITrack>> & {
  track: Track;
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
  const tracks: ITrack[] = useAppSelector((state) => state.track.data);
  const isFetching: boolean = useAppSelector((state) => state.track.isFetching);
  const query: string = useAppSelector((state) => state.track.query);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchListTrack();
  }, [query]);

  const fetchListTrack = async () => {
    const { fetchTrack } = await import("@/redux/slice/TrackSlice");
    dispatch(fetchTrack(`pageSize=100&pageNumber=1&title=${query}`));
  };

  const handleTrackSelect = async (track: Track) => {
    const newUrl = track.url.replace("localhost:3000", "10.0.2.2:3000");

    await TrackPlayer.load({ ...track, url: newUrl });
    await TrackPlayer.play();
  };

  return (
    <>
      {isFetching ? (
        <TrackListSkeleton />
      ) : (
        <FlatList
          data={tracks}
          ItemSeparatorComponent={ItemDivider}
          contentContainerStyle={{
            paddingBottom: 73,
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
