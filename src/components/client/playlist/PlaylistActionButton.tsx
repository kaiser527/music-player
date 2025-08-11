import { colors, fontSize } from "@/constants/tokens";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface IProps {
  onPress: () => void;
  style?: ViewStyle;
  type: "CREATE" | "DELETE" | "CONFIRM";
}

const PlaylistActionButton = ({ onPress, style, type }: IProps) => {
  const getIconName = () => {
    let name = "";
    switch (type) {
      case "CREATE":
        name = "plus";
        break;
      case "DELETE":
        name = "trash-can";
        break;
      case "CONFIRM":
        name = "check";
        break;
    }
    return name;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, style]}
    >
      <FontAwesome6
        name={getIconName()}
        size={fontSize.sm}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
};

export default PlaylistActionButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "rgba(50, 50, 50, 0.5)",
    borderRadius: 8,
    columnGap: 6,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
});
