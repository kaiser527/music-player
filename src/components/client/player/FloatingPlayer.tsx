import { fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { useLastActiveTrack } from "@/hooks/track/useLastActiveTrack";
import { defaultStyles } from "@/styles";
import FastImage from "@d11/react-native-fast-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import MovingText from "../MovingText";
import { PlayerPauseButton, SkipToNextButton } from "./PlayerControls";

interface IProps {
  style: ViewStyle;
}

const FloatingPlayer = (props: IProps) => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();
  const router = useRouter();

  const displayedTrack = activeTrack ?? lastActiveTrack;

  if (!displayedTrack) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, props.style]}
      onPress={() => router.push("/player")}
    >
      <>
        <FastImage
          source={{
            uri: `${REACT_BACKEND_URL}/api/v1/images/track/${displayedTrack.artwork}`,
          }}
          style={styles.trackArtworkImage}
        />
        <View style={styles.trackTitleContainer}>
          <MovingText
            animationThreshold={25}
            style={styles.trackTitle}
            text={displayedTrack.title ?? ""}
          />
        </View>
        <View style={styles.trackControlsContainer}>
          <PlayerPauseButton iconSize={24} />
          <SkipToNextButton iconSize={22} />
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});

export default FloatingPlayer;
