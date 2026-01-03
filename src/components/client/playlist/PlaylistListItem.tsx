import { colors } from "@/constants/tokens";
import { REACT_BACKEND_URL, unKnownTrackImage } from "@/constants/utils";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { usePlaylistInit } from "@/hooks/playlist/usePlaylistInit";
import { useToggleDeletePlaylist } from "@/hooks/playlist/useToggleDeletePlaylist";
import { useTogglePlaylistModal } from "@/hooks/playlist/useTogglePlaylistModal";
import { defaultStyles } from "@/styles";
import { IPlaylist } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import { AntDesign, Feather } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";

interface IProps {
  playlist: IPlaylist;
  handleChecked: (v: IPlaylist) => void;
  handlePlaylistPress: (v: IPlaylist) => Promise<void>;
}

const PlaylistListItem = (props: IProps) => {
  const { setIsShowModal } = useTogglePlaylistModal();
  const { isAuthenticated } = useGetAccount(false);
  const { setInitPlaylist } = usePlaylistInit();
  const { isDeleteMode } = useToggleDeletePlaylist();

  const pathName = usePathname();

  const handleEditPress = (playlist: IPlaylist) => {
    setIsShowModal(true);
    setInitPlaylist(playlist);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.handlePlaylistPress(props.playlist)}
    >
      <View style={styles.playlistItemContainer}>
        {isDeleteMode && props.playlist.user && (
          <View>
            <CheckBox
              checked={props.playlist.isChecked}
              onPress={() => props.handleChecked(props.playlist)}
            />
          </View>
        )}
        <View>
          <FastImage
            source={{
              uri:
                props.playlist.track.length > 0
                  ? `${REACT_BACKEND_URL}/api/v1/images/track/${
                      props.playlist.track[
                        Math.floor(Math.random() * props.playlist.track.length)
                      ]?.artwork
                    }`
                  : unKnownTrackImage,
              priority: FastImage.priority.normal,
            }}
            style={styles.playlistArtworkImage}
          />
        </View>
        <View style={styles.playlistInfo}>
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {props.playlist.name}
          </Text>
          <View style={styles.actionGroup}>
            {isAuthenticated &&
              props.playlist.user &&
              !isDeleteMode &&
              pathName.includes("playlists") && (
                <TouchableHighlight
                  activeOpacity={0.8}
                  onPress={() => handleEditPress(props.playlist)}
                >
                  <Feather
                    name="edit-2"
                    size={17}
                    color={colors.icon}
                    style={{ opacity: 0.5 }}
                  />
                </TouchableHighlight>
              )}
            <AntDesign
              name="right"
              size={20}
              color={colors.icon}
              style={{ opacity: 0.5 }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playlistItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 90,
  },
  playlistArtworkImage: {
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  playlistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    fontWeight: "600",
    maxWidth: "80%",
  },
  playlistInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  actionGroup: {
    flexDirection: "row",
    gap: 8,
  },
});

export default PlaylistListItem;
