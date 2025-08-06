import MovingText from "@/components/client/MovingText";
import { PlayerControls } from "@/components/client/player/PlayerControls";
import PlayerProgressBar from "@/components/client/player/PlayerProgressBar";
import PlayerRepeatToggle from "@/components/client/player/PlayerRepeatToggle";
import PlayerVolumeBar from "@/components/client/player/PlayerVolumeBar";
import BackToPreviousIcon from "@/components/share/BackToPreviousIcon";
import { colors as clrs, fontSize, screenPadding } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { defaultStyles, utilsStyles } from "@/styles";
import FastImage from "@d11/react-native-fast-image";
import { FontAwesome } from "@expo/vector-icons";
import { getAverageColor } from "@somesoap/react-native-image-palette";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ColorValue,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";

const PlayerScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  const track = useActiveTrack();
  const imageUrl = track
    ? `${REACT_BACKEND_URL}/api/v1/images/track/${track.artwork}`
    : "";

  const [colors, setColors] = useState<ColorValue[]>(["transparent", "black"]);

  const isFavorite = false;

  useEffect(() => {
    if (track) getImageColors();
  }, [track]);

  if (!track || !track.title) {
    return (
      <View style={[defaultStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={clrs.icon} />
      </View>
    );
  }

  const getImageColors = async () => {
    const image = imageUrl;
    const avg = await getAverageColor(image, { pixelSpacingAndroid: 2 });
    setColors(["#1a1a1a", avg, avg]);
  };

  const toggleFavorite = () => {};

  return (
    <LinearGradient style={styles.overlayContainer} colors={[...colors] as any}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackToPreviousIcon />
        <DismissPlayerSymbol />
        <View style={{ flex: 1, marginTop: top - 10, marginBottom: bottom }}>
          <View style={styles.artworkImageContainer}>
            <FastImage
              source={{
                uri: imageUrl,
                priority: FastImage.priority.high,
              }}
              resizeMode="cover"
              style={styles.artworkImage}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: "auto" }}>
              <View style={{ height: 60 }}>
                <View style={styles.trackInfo}>
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      animationThreshold={30}
                      text={track.title}
                      style={styles.trackTitleText}
                    />
                  </View>
                  <FontAwesome
                    name={isFavorite ? "heart" : "heart-o"}
                    size={20}
                    color={isFavorite ? clrs.primary : clrs.icon}
                    style={{ marginHorizontal: 14 }}
                    onPress={toggleFavorite}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={[styles.trackArtistTrack, { marginTop: 6 }]}
                >
                  {track.artist}
                </Text>
              </View>
              <PlayerProgressBar style={{ marginTop: 32 }} />
              <PlayerControls style={{ marginTop: 40 }} />
            </View>
            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
            <View style={utilsStyles.centeredRow}>
              <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ ...styles.dismissPlayerSymbolContainer, top: top + 8 }}
    ></View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
  },
  dismissPlayerSymbolContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  artworkImageContainer: {
    elevation: 33,
    borderRadius: 11,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: 700,
  },
  trackArtistTrack: {
    ...defaultStyles.text,
    fontSize: fontSize.base - 1.5,
    opacity: 0.8,
    maxWidth: "90%",
  },
});

export default PlayerScreen;
