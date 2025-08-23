import CloseButton from "@/components/share/CloseButton";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { colors, fontSize } from "@/constants/tokens";
import { usePlaylistInit } from "@/hooks/playlist/usePlaylistInit";
import { useTogglePlaylistModal } from "@/hooks/playlist/useTogglePlaylistModal";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserPlaylist } from "@/redux/slice/PlaylistSlice";
import { callCreatePlaylist, callUpdatePlaylist } from "@/services/api";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

const PlaylistModal = () => {
  const playlistRef = useRef("");
  const inputRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();

  const { initPlaylist, setInitPlaylist } = usePlaylistInit();
  const { isShowModal, setIsShowModal } = useTogglePlaylistModal();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initPlaylist) {
      playlistRef.current = initPlaylist.name;
      inputRef.current?.setNativeProps({ text: initPlaylist.name });
    }
  }, [initPlaylist]);

  const handleClose = () => {
    playlistRef.current = "";
    inputRef.current?.clear();
    setInitPlaylist({ id: "", name: "", track: [] });
    setIsShowModal(false);
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!playlistRef.current) {
      showMessage({
        message: "Error occurred",
        description: "Playlist name must not be empty",
        type: "danger",
      });
      return;
    }
    setIsLoading(true);
    const res =
      initPlaylist && initPlaylist.id
        ? await callUpdatePlaylist(initPlaylist.id, {
            name: playlistRef.current,
            trackIds: initPlaylist.track.map((item) => item.id ?? ""),
          })
        : await callCreatePlaylist({
            name: playlistRef.current,
            trackIds: [],
          });
    setIsLoading(false);
    if (res.result) {
      handleClose();
      dispatch(fetchUserPlaylist(`pageSize=100&pageNumber=1&name=`));
    } else {
      showMessage({
        message: "Error occurred",
        description: res.message,
        type: "danger",
      });
    }
  };

  return (
    <Modal visible={isShowModal} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <CloseButton
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={handleClose}
          />
          <Text style={styles.modalTitle}>
            {initPlaylist.id ? "Update a Playlist" : "Create a New Playlist"}
          </Text>
          <View style={styles.modalBody}>
            <Text numberOfLines={1} style={styles.playlistNameText}>
              Name
            </Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="music" color={"grey"} size={14} />
              <TextInput
                ref={inputRef}
                placeholder="Enter playlist name"
                placeholderTextColor={"grey"}
                style={styles.input}
                onChangeText={(text) => (playlistRef.current = text)}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={styles.submitButton}
            >
              {isLoading ? (
                <LoadingSpinner size={fontSize.xs + 3} color={colors.primary} />
              ) : (
                <Text style={{ color: colors.primary }}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PlaylistModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  modalContent: {
    width: "88%",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    marginTop: 240,
  },
  modalTitle: {
    fontSize: fontSize.sm - 0.5,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 14,
    marginLeft: 14,
    marginBottom: 10,
  },
  modalBody: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 8,
  },
  playlistNameText: {
    color: colors.primary,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: 31,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    height: "100%",
    paddingVertical: 0,
    fontSize: fontSize.xs + 2,
    marginLeft: 7,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(50, 50, 50, 0.5)",
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 20,
  },
});
