import { colors, fontSize } from "@/constants/tokens";
import { colorMethod } from "@/helpers/miscellaneous";
import { IPermission } from "@/types/backend";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-gesture-handler";

interface IProps {
  permissions: IPermission[];
  module: string;
  handleSingleSwitch: (v: boolean, id: string, module: string) => void;
}

const PermissionList = (props: IProps) => {
  return (
    <View style={styles.wrapper}>
      {props.permissions.map((item, index) => (
        <View
          style={styles.permissionContainer}
          key={`module-permission-${index}`}
        >
          <View>
            <Text
              style={{ color: colorMethod(item.method), ...styles.methodText }}
            >
              {item.method}
            </Text>
            <Text style={styles.apiPathText}>{item.apiPath}</Text>
          </View>
          <Switch
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            trackColor={{
              false: "#767577",
              true: "rgba(252, 60, 68, 0.15)",
            }}
            onValueChange={(v) =>
              props.handleSingleSwitch(v, item.id ?? "", props.module)
            }
            thumbColor={item.isChecked ? colors.primary : "#f4f3f4"}
            value={item.isChecked}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 26,
    gap: 15,
  },
  permissionContainer: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#191919",
  },
  methodText: {
    fontWeight: 700,
    fontSize: fontSize.xs,
    marginBottom: 1.5,
  },
  apiPathText: {
    color: colors.text,
    fontSize: fontSize.xs - 0.5,
  },
});

export default PermissionList;
