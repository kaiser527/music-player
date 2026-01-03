import { colors, fontSize } from "@/constants/tokens";
import { sortTrack } from "@/helpers/convertTrack";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { useGetFavoriteSlice } from "@/hooks/data/useGetFavoriteSlice";
import { useTrackQueue } from "@/hooks/track/useTrackQueue";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserPlaylist } from "@/redux/slice/PlaylistSlice";
import { callUpdatePlaylist } from "@/services/api";
import { IPlaylist, ITrack } from "@/types/backend";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React, { PropsWithChildren, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import Popover from "react-native-popover-view";
import TrackPlayer, { Track } from "react-native-track-player";
import { match } from "ts-pattern";

type Props = PropsWithChildren<{ track: Track }>;

const TrackShortCutsPopup = ({ track, children }: Props) => {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const { activeQueue } = useTrackQueue();
  const { isAuthenticated } = useGetAccount(false);
  const { tracks, toggleTrackFavorite } = useGetFavoriteSlice();
  const { playlist } = useLocalSearchParams<{ playlist: string }>();

  const parsedPlaylist: IPlaylist = useMemo(() => {
    try {
      return JSON.parse(playlist ?? "{}");
    } catch {
      return {} as IPlaylist;
    }
  }, [playlist]);
  const favorite = tracks.find((item) => item.url === track.url);

  const hasForbiddenIcon = ["🎵", "🎤", "🌱"].some((icon) =>
    parsedPlaylist.name?.includes(icon)
  );

  const handlePressAction = async (id: string) => {
    setVisible(false);
    await match(id)
      .with("add-to-favorites", async () => {
        toggleTrackFavorite(track as ITrack, "add-to-favorites");

        if (activeQueue === "favorites") {
          await TrackPlayer.add(track);
        }
      })
      .with("remove-from-favorites", async () => {
        toggleTrackFavorite(track as ITrack, "remove-from-favorites");
        if (activeQueue === "favorites") {
          const queue = await TrackPlayer.getQueue();
          const index = queue.findIndex((i) => i.url === track.url);
          if (index > -1) await TrackPlayer.remove(index);
        }
      })
      .with("add-to-playlist", async () => {
        if (pathName === "/playlists/detail" && parsedPlaylist.id) {
          const res = await callUpdatePlaylist(parsedPlaylist.id, {
            name: parsedPlaylist.name,
            action: "REPLACE",
            trackIds: parsedPlaylist.track
              .filter((item) => item.id !== track.id)
              .map((item) => item.id ?? ""),
          });
          if (res.result) {
            dispatch(fetchUserPlaylist("pageSize=100&pageNumber=1&name="));
            if (activeQueue === `playlists-detail-${parsedPlaylist.id}`) {
              const queue = await TrackPlayer.getQueue();
              const index = queue.findIndex((i) => i.url === track.url);
              if (index > -1) await TrackPlayer.remove(index);
              router.replace({
                pathname: "/playlists/detail",
                params: {
                  playlist: JSON.stringify({
                    ...res.result,
                    track: sortTrack(res.result.track, queue),
                  }),
                },
              });
            } else {
              router.replace({
                pathname: "/playlists/detail",
                params: { playlist: JSON.stringify(res.result) },
              });
            }
          } else {
            showMessage({
              message: "Error occurred",
              description: res.message,
              type: "danger",
            });
          }
        } else {
          router.push({
            pathname: "/addToPlaylist",
            params: { track: JSON.stringify(track) },
          });
        }
      })
      .otherwise(() => {});
  };
  return (
    <Popover
      isVisible={visible}
      onRequestClose={() => setVisible(false)}
      from={
        <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
          {children}
        </TouchableOpacity>
      }
    >
      <View style={styles.container}>
        <PopupItem
          label={favorite ? "Remove from favorites" : "Add to favorites"}
          icon={favorite ? "heart-dislike-outline" : "heart-outline"}
          onPress={() =>
            handlePressAction(
              favorite ? "remove-from-favorites" : "add-to-favorites"
            )
          }
          danger={true}
        />
        {isAuthenticated && !hasForbiddenIcon && (
          <PopupItem
            label={
              pathName !== "/playlists/detail"
                ? "Add to playlist"
                : "Remove from playlist"
            }
            icon={
              pathName !== "/playlists/detail"
                ? "add-circle-outline"
                : "trash-outline"
            }
            onPress={() => handlePressAction("add-to-playlist")}
            danger={pathName === "/playlists/detail"}
          />
        )}
      </View>
    </Popover>
  );
};

const PopupItem = ({
  label,
  onPress,
  icon,
  danger,
}: {
  label: string;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={onPress}>
    <Ionicons
      name={icon}
      size={16}
      color={danger ? colors.primary : colors.text}
    />
    <Text style={[styles.itemText, danger && { color: colors.primary }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 6,
    paddingHorizontal: 8,
    minWidth: 180,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  itemText: {
    color: colors.text,
    fontSize: fontSize.sm,
  },
});

export default TrackShortCutsPopup;
