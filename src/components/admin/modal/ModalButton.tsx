import LoadingSpinner from "@/components/share/LoadingSpinner";
import { colors, fontSize } from "@/constants/tokens";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  dataInit: any;
  handleConfirm: () => Promise<void>;
  isLoading: boolean;
}

const ModalButton = (props: IProps) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={styles.confirmButton}
        activeOpacity={0.8}
        onPress={props.handleConfirm}
      >
        {props.isLoading ? (
          <View style={{ marginHorizontal: 11 }}>
            <LoadingSpinner size={18.5} />
          </View>
        ) : (
          <Text style={styles.confirmButtonText}>
            {props.dataInit ? "Update" : "Create"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
  },
  confirmButton: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    borderRadius: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: fontSize.xs + 1,
  },
});

export default ModalButton;
