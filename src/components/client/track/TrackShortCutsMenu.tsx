import { useGetFavoriteSlice } from "@/hooks/data/useGetFavoriteSlice";
import { useTrackQueue } from "@/hooks/track/useTrackQueue";
import { ITrack } from "@/types/backend";
import { MenuView } from "@react-native-menu/menu";
import { useRouter } from "expo-router";
import React, { PropsWithChildren } from "react";
import TrackPlayer, { Track } from "react-native-track-player";
import { match } from "ts-pattern";

type Props = PropsWithChildren<{ track: Track }>;

const TrackShortCutsMenu = (props: Props) => {
  const router = useRouter();

  const { activeQueue } = useTrackQueue();
  const { tracks, toggleTrackFavorite } = useGetFavoriteSlice();

  const favorite = tracks.find((item) => item.url === props.track.url);

  const handlePressAction = (id: string) => {
    match(id)
      .with("add-to-favorites", async () => {
        await toggleTrackFavorite(props.track as ITrack, "add-to-favorites");

        if (activeQueue === "favorites") {
          await TrackPlayer.add(props.track);
          console.log("add-to-favorites");
        }
      })
      .with("remove-from-favorites", async () => {
        await toggleTrackFavorite(
          props.track as ITrack,
          "remove-from-favorites"
        );

        const trackQueue = await TrackPlayer.getQueue();

        if (activeQueue === "favorites") {
          const index = trackQueue.findIndex(
            (item) => item.url === props.track.url
          );
          await TrackPlayer.remove(index);
          console.log("remove-from-favorites");
        }
      })
      .with("add-to-playlist", async () => {
        router.push({
          pathname: "/",
          params: { track: JSON.stringify(props.track) },
        });
      })
      .otherwise(() => console.warn(`Unknown menu action ${id}`));
  };

  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: favorite ? "remove-from-favorites" : "add-to-favorites",
          title: favorite ? "Remove from favorites" : "Add to favorites",
          image: favorite ? "ic_star" : "ic_star_border",
        },
        {
          id: "add-to-playlist",
          title: "Add to playlist",
          image: "ic_menu_add",
        },
      ]}
    >
      {props.children}
    </MenuView>
  );
};

export default TrackShortCutsMenu;
