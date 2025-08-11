import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface IProps {
  color?: string;
  size?: number;
}

const LoadingSpinner = (props: IProps) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1
    );

    return () => cancelAnimation(rotation);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value % 360}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <FontAwesome
        name="circle-o-notch"
        size={props.size ?? 22}
        color={props.color ?? "#fff"}
      />
    </Animated.View>
  );
};

export default LoadingSpinner;
