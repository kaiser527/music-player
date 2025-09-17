import ListEmpty from "@/components/client/ListEmpty";
import ItemDivider from "@/components/share/ItemSeparator";
import { IUser } from "@/types/backend";
import React from "react";
import { FlatList, FlatListProps } from "react-native";
import ArtistListItem from "./ArtistListItem";
import ArtistSkeleton from "./ArtistSkeleton";

type Props = Partial<FlatListProps<IUser>> & {
  artists: IUser[];
  isFetchingArtist: boolean;
};

const ArtistList = (props: Props) => {
  return (
    <>
      {props.isFetchingArtist ? (
        <ArtistSkeleton />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 133 }}
          keyExtractor={(item) => item.id ?? ""}
          data={props.artists}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <ItemDivider marginLeft={50} marginVertical={12} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty text="No artists found" screen="ARTIST" />
          )}
          renderItem={({ item }) => <ArtistListItem artist={item} />}
          {...props}
        />
      )}
    </>
  );
};

export default ArtistList;
