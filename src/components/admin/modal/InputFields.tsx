import { colors, fontSize } from "@/constants/tokens";
import React, { ReactNode, RefObject } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface IProps {
  fields?: {
    valueRef: RefObject<string>;
    inputRef: RefObject<TextInput | null>;
    name: string;
    icon: ReactNode;
    placeholder: string;
    disable?: boolean;
    fullWidth?: boolean;
  }[];
}

const InputFields = (props: IProps) => {
  return (
    <>
      {props.fields &&
        props.fields.length > 0 &&
        props.fields.map((item, index) => (
          <View
            style={{ width: item.fullWidth ? "100%" : "47.7%" }}
            key={`input-${index}`}
          >
            <Text style={styles.inputLabel}>{item.name}</Text>
            <View style={styles.inputContainer}>
              {item.icon}
              <TextInput
                editable={item.disable}
                ref={item.inputRef}
                style={styles.input}
                placeholderTextColor="grey"
                placeholder={item.placeholder}
                onChangeText={(text) => (item.valueRef.current = text)}
              />
            </View>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 8,
    height: 32,
    marginTop: 8,
    paddingHorizontal: 12,
    width: "100%",
    gap: 4,
  },
  input: {
    flex: 1,
    color: colors.text,
    height: "100%",
    paddingVertical: 0,
    fontSize: fontSize.xs + 0.5,
  },
  inputLabel: {
    color: colors.primary,
    fontSize: fontSize.xs + 1.5,
    fontWeight: "600",
  },
});

export default InputFields;
