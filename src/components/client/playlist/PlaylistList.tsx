import { useDeletePlaylist } from "@/hooks/playlist/useDeletePlaylist";
import { IPlaylist } from "@/types/backend";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import ItemDivider from "../../share/ItemSeparator";
import ListEmpty from "../ListEmpty";
import PlaylistListItem from "./PlaylistListItem";
import PlaylistSkeleton from "./PlaylistSkeleton";

type Props = Partial<FlatListProps<IPlaylist>> & {
  isFetching: boolean;
  playlists: IPlaylist[];
  handlePlaylistPress: (v: IPlaylist) => Promise<void>;
};

const PlaylistList = (props: Props) => {
  const { setDeleteIds } = useDeletePlaylist();

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    if (props.playlists.length > 0)
      setPlaylists(
        props.playlists.map((item) => ({
          ...item,
          isChecked: false,
        }))
      );
  }, [props.playlists]);

  useEffect(() => {
    setDeleteIds(
      playlists
        .filter((item) => item.isChecked === true)
        .map((item) => item.id ?? "")
    );
  }, [playlists]);

  const handleChecked = (playlist: IPlaylist) => {
    const playlistsClone = _.cloneDeep(playlists);
    const index = playlistsClone.findIndex((item) => item.id === playlist.id);
    playlistsClone[index].isChecked = !playlistsClone[index].isChecked;
    setPlaylists(playlistsClone);
  };

  return (
    <>
      {props.isFetching ? (
        <PlaylistSkeleton />
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id ?? ""}
          contentContainerStyle={{ paddingBottom: 160 }}
          ItemSeparatorComponent={() => (
            <ItemDivider marginLeft={80} marginVertical={12} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty text={"No playlist found"} screen="TRACK" />
          )}
          renderItem={({ item }) => (
            <PlaylistListItem
              handlePlaylistPress={props.handlePlaylistPress}
              handleChecked={handleChecked}
              playlist={item}
            />
          )}
          {...props}
        />
      )}
    </>
  );
};

export default PlaylistList;
