import { colors, fontSize } from "@/constants/tokens";
import { formatSecondsToMinutes } from "@/helpers/miscellaneous";
import { defaultStyles, utilsStyles } from "@/styles";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";

interface IProps {
  style: ViewStyle;
}

const PlayerProgressBar = (props: IProps) => {
  const { duration, position } = useProgress(250);

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={props.style}>
      <Slider
        maximumValue={max}
        minimumValue={min}
        progress={progress}
        containerStyle={utilsStyles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          maximumTrackTintColor: colors.maximumTrackTintColor,
          minimumTrackTintColor: colors.minimumTrackTintColor,
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async (value) => {
          const seekTo = value * duration;

          await TrackPlayer.seekTo(seekTo);

          isSliding.value = false;
        }}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>-{trackRemainingTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 12,
  },
  timeText: {
    ...defaultStyles.text,
    color: colors.text,
    opacity: 0.75,
    fontSize: fontSize.xs + 1,
    letterSpacing: 0.7,
    fontWeight: 500,
  },
});

export default PlayerProgressBar;
