import CloseButton from "@/components/share/CloseButton";
import { colors, fontSize } from "@/constants/tokens";
import React, { PropsWithChildren } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import ModalButton from "./ModalButton";

type Props = PropsWithChildren<{
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  isLoading: boolean;
  handleConfirm: () => Promise<void>;
  dataInit: any;
}>;

const CustomModal = (props: Props) => {
  return (
    <Modal visible={props.isOpen} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <CloseButton
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={props.handleClose}
          />
          <Text style={styles.modalTitle}>
            {props.dataInit ? "Update" : "Create"} {props.title}
          </Text>
          <View style={styles.modalBody}>
            {props.children}
            <ModalButton
              isLoading={props.isLoading}
              handleConfirm={props.handleConfirm}
              dataInit={props.dataInit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  modalContent: {
    width: "88%",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    marginTop: 120,
  },
  modalTitle: {
    fontSize: fontSize.sm - 0.5,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 12,
    marginLeft: 14,
    marginBottom: 10,
  },
  modalBody: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
});

export default CustomModal;
