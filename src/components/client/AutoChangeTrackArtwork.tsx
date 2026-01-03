import { REACT_BACKEND_URL, unKnownTrackImage } from "@/constants/utils";
import { ITrack } from "@/types/backend";
import FastImage, { ImageStyle } from "@d11/react-native-fast-image";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleProp } from "react-native";

interface IProps {
  tracks: ITrack[];
  style: StyleProp<ImageStyle>;
}

const AutoChangeTrackArtwork = ({ tracks, style }: IProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!tracks.length) return;

    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setImageIndex((prev) => (prev + 1) % tracks.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [tracks.length]);

  return (
    <Animated.View style={[style, { opacity: fadeAnim }]}>
      <FastImage
        source={{
          uri: tracks.length
            ? `${REACT_BACKEND_URL}/api/v1/images/track/${tracks[imageIndex]?.artwork}`
            : unKnownTrackImage,
          priority: FastImage.priority.normal,
        }}
        style={{ width: "100%", height: "100%", borderRadius: 12 }}
      />
    </Animated.View>
  );
};

export default AutoChangeTrackArtwork;
