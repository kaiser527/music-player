import { colors } from "@/constants/tokens";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

interface IPlayerControlsProps {
  style?: ViewStyle;
}

interface IPlayerButtonProps {
  style?: ViewStyle;
  iconSize?: number;
}

export const PlayerControls = (props: IPlayerControlsProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.row}>
        <SkipToPreviousButton />
        <PlayerPauseButton />
        <SkipToNextButton />
      </View>
    </View>
  );
};

export const PlayerPauseButton = (props: IPlayerButtonProps) => {
  const { playing } = useIsPlaying();

  return (
    <View style={[{ height: props.iconSize }, props.style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={props.iconSize ?? 32}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = (props: IPlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <FontAwesome6
        name="forward"
        size={props.iconSize ?? 30}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = (props: IPlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <FontAwesome6
        name="backward"
        size={props.iconSize ?? 30}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  container: {
    width: "100%",
  },
});
