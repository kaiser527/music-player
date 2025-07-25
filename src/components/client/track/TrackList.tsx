import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { utilsStyles } from "@/styles";
import { ITrack } from "@/types/backend";
import React, { useEffect } from "react";
import { FlatList, FlatListProps, View } from "react-native";
import TrackListItem from "./TrackListItem";
import TrackListSkeleton from "./TrackListSkeleton";

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

const TrackList = (props: Partial<FlatListProps<ITrack>>) => {
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
          renderItem={({ item }) => (
            <TrackListItem
              track={{
                title: item.title,
                artist: item?.user?.username ?? "",
                image: item.artwork,
              }}
            />
          )}
          {...props}
        />
      )}
    </>
  );
};

export default TrackList;
