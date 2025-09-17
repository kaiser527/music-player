import { colors, fontSize } from "@/constants/tokens";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";

type Props = PropsWithChildren<{
  handleDelete: () => Promise<void>;
  table: string;
  visiblePopup: string;
  setVisiblePopup: (v: string) => void;
  marker: string;
}>;

const DeletePopup = (props: Props) => {
  return (
    <Popover
      isVisible={props.visiblePopup === props.marker}
      from={props.children}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Confirm delete</Text>
        <Text
          style={styles.desc}
        >{`Are you sure to delete this ${props.table} ?`}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              ...styles.button,
              borderWidth: 1,
              borderColor: colors.primary,
            }}
            activeOpacity={0.8}
            onPress={() => props.setVisiblePopup("")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: colors.primary }}
            activeOpacity={0.8}
            onPress={async () => {
              await props.handleDelete();
              props.setVisiblePopup("");
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Popover>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: "#1a1a1a",
  },
  label: {
    color: colors.primary,
    fontWeight: 700,
    fontSize: fontSize.xs + 2,
  },
  desc: {
    color: colors.text,
    fontSize: fontSize.xs + 1,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
  buttonText: {
    color: colors.text,
    fontSize: fontSize.xs - 1.5,
  },
});

export default DeletePopup;
