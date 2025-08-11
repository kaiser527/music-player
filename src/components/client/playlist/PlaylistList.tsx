import { useDeletePlaylist } from "@/hooks/playlist/useDeletePlaylist";
import { useTogglePlaylistModal } from "@/hooks/playlist/useTogglePlaylistModal";
import { IPlaylist } from "@/types/backend";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import ItemDivider from "../ItemSeparator";
import ListEmpty from "../ListEmpty";
import PlaylistListItem from "./PlaylistListItem";
import PlaylistModal from "./PlaylistModal";
import PlaylistSkeleton from "./PlaylistSkeleton";

type Props = Partial<FlatListProps<IPlaylist>> & {
  isFetching: boolean;
  playlists: IPlaylist[];
};

const PlaylistList = (props: Props) => {
  const { isShowModal } = useTogglePlaylistModal();
  const { setDeleteIds } = useDeletePlaylist();

  const [dataInit, setDataInit] = useState<IPlaylist | null>(null);
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
        <>
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
                handleChecked={handleChecked}
                setDataInit={setDataInit}
                playlist={item}
              />
            )}
            {...props}
          />
          <PlaylistModal
            dataInit={dataInit}
            setDataInit={setDataInit}
            modalVisible={isShowModal}
          />
        </>
      )}
    </>
  );
};

export default PlaylistList;
