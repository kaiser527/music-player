import { colors, fontSize } from "@/constants/tokens";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

const CloseButton = ({ onPress, style }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      <Feather name="x" size={fontSize.xs + 1} color={colors.text} />
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#404040",
    borderRadius: 5,
    padding: 4,
    alignSelf: "flex-end",
    zIndex: 10,
  },
  buttonPressed: {
    backgroundColor: "#2a2a2a",
    transform: [{ scale: 0.96 }],
  },
});
