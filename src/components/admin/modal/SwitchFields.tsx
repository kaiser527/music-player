import { colors, fontSize } from "@/constants/tokens";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface IProps {
  switchs?: {
    name: string;
    value: boolean;
    setValue: (v: boolean) => void;
  }[];
}

const SwitchFields = (props: IProps) => {
  return (
    <>
      {props.switchs &&
        props.switchs.length > 0 &&
        props.switchs.map((item, index) => (
          <View key={`switch-${index}`}>
            <View style={styles.container}>
              <Text style={styles.inputLabel}>{item.name}</Text>
              <Switch
                style={{ marginTop: 10 }}
                trackColor={{
                  false: "#767577",
                  true: "rgba(252, 60, 68, 0.15)",
                }}
                thumbColor={item.value ? colors.primary : "#f4f3f4"}
                onValueChange={item.setValue}
                value={item.value}
              />
            </View>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.primary,
    fontSize: fontSize.xs + 1.5,
    fontWeight: "600",
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default SwitchFields;
