import { colors, fontSize } from "@/constants/tokens";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface IProps {
  text: string;
  onPress: () => void;
}

const CreateButton = (props: IProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed, // apply animation style
      ]}
      onPress={props.onPress}
    >
      <FontAwesome6 name="plus" size={15} color={colors.primary} />
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 5,
  },
  buttonText: {
    color: colors.primary,
    fontSize: fontSize.xs + 2,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.7,
  },
});

export default CreateButton;
