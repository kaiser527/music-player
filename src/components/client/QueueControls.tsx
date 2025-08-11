import { colors } from "@/constants/tokens";
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
}

const QueueControls = (props: IProps) => {
  const handlePlay = async () => {
    const trackQueue = await TrackPlayer.getQueue();

    if (trackQueue.length === 1) {
      await TrackPlayer.setQueue(props.tracks);
    }

    if (trackQueue.length === 0 || props.tracks.length !== trackQueue.length) {
      await TrackPlayer.setQueue(props.tracks);
    }

    await TrackPlayer.skip(0);
    await TrackPlayer.play();
  };

  const handleShufflePlay = async () => {
    const trackQueue = await TrackPlayer.getQueue();

    const shuffleTracks = _.cloneDeep(props.tracks).sort(
      () => Math.random() - 0.5
    );

    if (trackQueue.length === 1) {
      await TrackPlayer.setQueue(props.tracks);
    }

    if (trackQueue.length === 0 || props.tracks.length !== trackQueue.length) {
      await TrackPlayer.setQueue(props.tracks);
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
