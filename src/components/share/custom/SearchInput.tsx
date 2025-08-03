import { colors, fontSize } from "@/constants/tokens";
import { FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface IProps {
  placeholder: string;
  isScrolled: boolean;
  isFocused: boolean;
  setIsFocused: (v: boolean) => void;
  handleChangInput: (v: string) => void;
}

const SearchInput = (props: IProps) => {
  const [cancelTextWidth, setCancelTextWidth] = useState(0);

  const handleCancelTextLayout = (event: LayoutChangeEvent) => {
    setCancelTextWidth(event.nativeEvent.layout.width);
  };

  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.containerInput,
          marginBottom: props.isScrolled ? 12 : 20,
          width: props.isFocused
            ? (`calc(100% - ${cancelTextWidth}px)` as DimensionValue)
            : "100%",
        }}
      >
        <Ionicons name="search" size={fontSize.sm - 1} color={"grey"} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={"grey"}
          onChangeText={props.handleChangInput}
          placeholder={props.placeholder}
          onFocus={() => props.setIsFocused(true)}
        />
        {props.isFocused && (
          <FontAwesome6
            name="xmark"
            size={16}
            color={"grey"}
            onPress={() => {
              inputRef.current?.clear();
              props.handleChangInput("");
            }}
          />
        )}
      </View>
      {props.isFocused && (
        <Text
          style={{
            ...styles.cancelText,
            marginBottom: !props.isScrolled ? 15 : 3,
          }}
          onLayout={handleCancelTextLayout}
          onPress={() => props.setIsFocused(false)}
        >
          Cancel
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cancelText: {
    color: colors.primary,
    fontSize: 15,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    height: 34,
    marginTop: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    color: colors.text,
    height: "100%",
    paddingVertical: 0,
    fontSize: fontSize.sm - 1,
  },
});

export default SearchInput;
