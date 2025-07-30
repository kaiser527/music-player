import { formatSecondsToMinutes } from "@/helpers/miscellaneous";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { useProgress } from "react-native-track-player";

interface IProps {
  style: ViewStyle;
}

const PlayerProgressBar = (props: IProps) => {
  const { duration, position } = useProgress(250);

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(0);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={props.style}>
      <Slider maximumValue={max} minimumValue={min} progress={progress} />
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({});
