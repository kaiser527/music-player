import { colors } from "@/constants/tokens";
import { compareArray } from "@/helpers/compareArray";
import { useTrackQueue } from "@/hooks/track/useTrackQueue";
import { defaultStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";

interface IProps {
  style: ViewStyle;
  tracks: Track[];
  queueId?: string;
}

const QueueControls = (props: IProps) => {
  const { setActiveQueue } = useTrackQueue();

  const handlePlay = async () => {
    setActiveQueue(props.queueId ?? "");

    const trackQueue = await TrackPlayer.getQueue();

    console.log(
      "check different queue",
      !compareArray(trackQueue, props.tracks)
    );

    if (trackQueue.length === 0 || !compareArray(trackQueue, props.tracks)) {
      await TrackPlayer.setQueue(props.tracks);
      console.log("set queue play");
    }

    await TrackPlayer.skip(0);
    await TrackPlayer.play();
  };

  const handleShufflePlay = async () => {
    setActiveQueue(props.queueId ?? "");

    const trackQueue = await TrackPlayer.getQueue();

    console.log(
      "check different queue",
      !compareArray(trackQueue, props.tracks)
    );

    const shuffleTracks = _.cloneDeep(props.tracks).sort(
      () => Math.random() - 0.5
    );

    if (trackQueue.length === 0 || !compareArray(trackQueue, props.tracks)) {
      await TrackPlayer.setQueue(props.tracks);
      console.log("set queue shuffle");
    }

    const randomIndex = Math.floor(Math.random() * shuffleTracks.length);

    await TrackPlayer.skip(randomIndex);
    await TrackPlayer.play();
  };

  return (
    <View style={[{ flexDirection: "row", columnGap: 15 }, props.style]}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={handlePlay}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name="play" size={22} color={colors.primary} />
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={handleShufflePlay}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QueueControls;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "rgba(47, 47, 47, 0.5)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  buttonText: {
    ...defaultStyles.text,
    color: colors.primary,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
