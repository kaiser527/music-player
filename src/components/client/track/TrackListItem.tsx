import { colors, fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { convertUrl } from "@/helpers/convertUrl";
import { defaultStyles } from "@/styles";
import FastImage from "@d11/react-native-fast-image";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import LoaderKit from "react-native-loader-kit";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";

interface IProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
}

const TrackListItem = (props: IProps) => {
  const newTrack = {
    ...props.track,
    url: convertUrl(props.track.url),
  };

  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === newTrack.url;

  return (
    <TouchableHighlight onPress={() => props.onTrackSelect(props.track)}>
      <View style={styles.trackItemContainer}>
        <View>
          <FastImage
            source={{
              uri: `${REACT_BACKEND_URL}/api/v1/images/track/${props.track.artwork}`,
              priority: FastImage.priority.normal,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name="LineScaleParty"
                color={colors.icon}
              />
            ) : (
              <Ionicons
                style={styles.trackPausedIndicator}
                name="play"
                size={24}
                color={colors.icon}
              />
            ))}
        </View>
        <View style={styles.trackInfoContainer}>
          <View style={{ width: "100%" }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? colors.primary : colors.text,
              }}
            >
              {props.track.title}
            </Text>
            <Text numberOfLines={1} style={styles.trackArtistText}>
              {props.track.artist}
            </Text>
          </View>
          <Entypo name="dots-three-horizontal" size={20} color={colors.icon} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 60,
    height: 60,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: 600,
    maxHeight: "90%",
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 4,
  },
  trackInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackPlayingIconIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -8 }, { translateY: -8 }],
    width: 18,
    height: 18,
  },
  trackPausedIndicator: {
    position: "absolute",
    top: 18,
    left: 18,
  },
});

export default TrackListItem;
