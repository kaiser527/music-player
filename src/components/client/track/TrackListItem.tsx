import { colors, fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { defaultStyles } from "@/styles";
import FastImage from "@d11/react-native-fast-image";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

interface IProps {
  track: {
    title: string;
    image: string;
    artist: string;
  };
}

const TrackListItem = (props: IProps) => {
  const isActiveTrack = false;

  return (
    <TouchableHighlight>
      <View style={styles.trackItemContainer}>
        <View>
          <FastImage
            source={{
              uri: `${REACT_BACKEND_URL}/api/v1/images/track/${props.track.image}`,
              priority: FastImage.priority.normal,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
        </View>
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
});

export default TrackListItem;
