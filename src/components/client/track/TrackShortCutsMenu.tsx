import { sortTrack } from "@/helpers/convertTrack";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { useGetFavoriteSlice } from "@/hooks/data/useGetFavoriteSlice";
import { useTrackQueue } from "@/hooks/track/useTrackQueue";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserPlaylist } from "@/redux/slice/PlaylistSlice";
import { callUpdatePlaylist } from "@/services/api";
import { IPlaylist, ITrack } from "@/types/backend";
import { MenuView } from "@react-native-menu/menu";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React, { PropsWithChildren } from "react";
import { showMessage } from "react-native-flash-message";
import TrackPlayer, { Track } from "react-native-track-player";
import { match } from "ts-pattern";

type Props = PropsWithChildren<{ track: Track }>;

const TrackShortCutsMenu = (props: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const { activeQueue } = useTrackQueue();
  const { isAuthenticated } = useGetAccount(false);
  const { tracks, toggleTrackFavorite } = useGetFavoriteSlice();
  const { playlist } = useLocalSearchParams<{ playlist: string }>();

  const parsedPlaylist: IPlaylist = JSON.parse(playlist ?? "{}");
  const favorite = tracks.find((item) => item.url === props.track.url);
  const hasForbiddenIcon = ["🎵", "🎤", "🌱"].some((icon) =>
    parsedPlaylist.name?.includes(icon)
  );

  const handlePressAction = (id: string) => {
    match(id)
      .with("add-to-favorites", async () => {
        toggleTrackFavorite(props.track as ITrack, "add-to-favorites");

        if (activeQueue === "favorites") {
          await TrackPlayer.add(props.track);
          console.log("add-to-favorites");
        }
      })
      .with("remove-from-favorites", async () => {
        toggleTrackFavorite(props.track as ITrack, "remove-from-favorites");

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
        if (pathName === "/playlists/detail" && parsedPlaylist.id) {
          const res = await callUpdatePlaylist(parsedPlaylist.id, {
            name: parsedPlaylist.name,
            trackIds: parsedPlaylist.track
              .filter((item) => item.id !== props.track.id)
              .map((item) => item.id ?? ""),
          });
          if (res.result) {
            dispatch(fetchUserPlaylist("pageSize=100&pageNumber=1&name="));
            if (activeQueue === `playlists-detail-${parsedPlaylist.id}`) {
              const trackQueue = await TrackPlayer.getQueue();
              const index = trackQueue.findIndex(
                (item) => item.url === props.track.url
              );
              if (index > -1) await TrackPlayer.remove(index);
              router.replace({
                pathname: "/playlists/detail",
                params: {
                  playlist: JSON.stringify({
                    ...res.result,
                    track: sortTrack(res.result.track, trackQueue),
                  }),
                },
              });
            } else
              router.replace({
                pathname: "/playlists/detail",
                params: {
                  playlist: JSON.stringify(res.result),
                },
              });
          } else
            showMessage({
              message: "Error occurred",
              description: res.message,
              type: "danger",
            });
        } else
          router.push({
            pathname: "/addToPlaylist",
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
          image: favorite ? "ic_menu_delete" : "ic_menu_share",
        },
        ...(isAuthenticated && !hasForbiddenIcon
          ? [
              {
                id: "add-to-playlist",
                title:
                  pathName !== "/playlists/detail"
                    ? "Add to playlist"
                    : "Remove from playlist",
                image:
                  pathName !== "/playlists/detail"
                    ? "ic_menu_add"
                    : "ic_menu_delete",
              },
            ]
          : []),
      ]}
      themeVariant="dark"
    >
      {props.children}
    </MenuView>
  );
};

export default TrackShortCutsMenu;
