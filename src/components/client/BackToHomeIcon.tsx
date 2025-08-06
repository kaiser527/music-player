import { colors, fontSize } from "@/constants/tokens";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const BackToHomeIcon = () => {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconContainer,
        pressed && styles.iconPressed,
      ]}
      onPress={() => router.replace("/")}
    >
      <Feather
        name="chevron-left"
        size={fontSize.lg - 0.5}
        color={colors.text}
      />
    </Pressable>
  );
};

export default BackToHomeIcon;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#404040",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 1,
  },
  iconPressed: {
    backgroundColor: "#2a2a2a",
    transform: [{ scale: 0.96 }],
  },
});
