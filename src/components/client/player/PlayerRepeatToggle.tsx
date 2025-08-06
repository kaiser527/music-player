import { colors } from "@/constants/tokens";
import { useTrackPlayerRepeatMode } from "@/hooks/track/useTrackPlayerRepeatMode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { RepeatMode } from "react-native-track-player";
import { match } from "ts-pattern";

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const repeatOrder = [
  RepeatMode.Off,
  RepeatMode.Track,
  RepeatMode.Queue,
] as const;

const PlayerRepeatToggle = ({ ...iconProps }: IconProps) => {
  const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode();

  const icon = match(repeatMode)
    .returnType<IconName>()
    .with(RepeatMode.Off, () => "repeat-off")
    .with(RepeatMode.Track, () => "repeat-once")
    .with(RepeatMode.Queue, () => "repeat")
    .otherwise(() => "repeat-off");

  const toggleRepeatMode = () => {
    if (repeatMode === undefined) return;

    const currentIndex = repeatOrder.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % repeatOrder.length;

    changeRepeatMode(repeatOrder[nextIndex]);
  };

  return (
    <MaterialCommunityIcons
      name={icon}
      onPress={toggleRepeatMode}
      color={colors.icon}
      {...iconProps}
    />
  );
};

export default PlayerRepeatToggle;
