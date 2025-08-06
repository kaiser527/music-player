import React, { useEffect } from "react";
import { TextStyle } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface IProps {
  text: string;
  animationThreshold: number;
  style?: TextStyle;
}

const MovingText = (props: IProps) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = props.text.length >= props.animationThreshold;
  const textWidth = props.text.length * 3;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    if (!shouldAnimate) return;

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, { duration: 5000, easing: Easing.linear }),
        -1,
        true
      )
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [
    translateX,
    props.text,
    props.animationThreshold,
    shouldAnimate,
    textWidth,
  ]);

  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        props.style,
        animatedStyle,
        shouldAnimate && { width: 9999, paddingLeft: 16 },
      ]}
    >
      {props.text}
    </Animated.Text>
  );
};

export default MovingText;
