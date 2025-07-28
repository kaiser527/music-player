import { colors, fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { defaultStyles } from "@/styles";
import FastImage from "@d11/react-native-fast-image";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Track, useActiveTrack } from "react-native-track-player";

interface IProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
}

const TrackListItem = (props: IProps) => {
  const newTrack = {
    ...props.track,
    url: props.track.url.replace("localhost:3000", "10.0.2.2:3000"),
  };

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
});

export default TrackListItem;
