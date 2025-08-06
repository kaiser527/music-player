import { colors } from "@/constants/tokens";
import { useTrackPlayerVolume } from "@/hooks/track/useTrackPlayerVolume";
import { utilsStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

interface IProps {
  style: ViewStyle;
}

const PlayerVolumeBar = (props: IProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  progress.value = volume ?? 0;

  return (
    <View style={props.style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="volume-low"
          size={22}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />
        <Slider
          style={{ paddingLeft: 6.5, paddingRight: 10 }}
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
          onValueChange={(value) => updateVolume(value)}
        />
        <Ionicons
          name="volume-high"
          size={22}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />
      </View>
    </View>
  );
};

export default PlayerVolumeBar;
