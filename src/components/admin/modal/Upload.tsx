import { colors, fontSize } from "@/constants/tokens";
import { callUploadingleFile } from "@/services/api";
import FastImage from "@d11/react-native-fast-image";
import { FontAwesome6 } from "@expo/vector-icons";
import { pick } from "@react-native-documents/picker";
import React, { RefObject } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";

interface IProps {
  fileNameRef: RefObject<string>;
  previewUri: string | null;
  setPreviewUri: (v: string | null) => void;
}

const Upload = (props: IProps) => {
  const handlePickFile = async () => {
    try {
      const [pickResult] = await pick();
      props.setPreviewUri(pickResult.uri);
      const res = await callUploadingleFile(pickResult, "user", "IMAGE");
      if (res.result) {
        props.fileNameRef.current = res.result.fileName;
      } else {
        showMessage({
          message: "Error occurred",
          description: res.message,
          type: "danger",
        });
      }
    } catch (e: any) {
      showMessage({
        message: "Error occurred",
        description: "An error occurred while uploading file",
        type: "danger",
      });
    }
  };

  const handleRemoveImage = () => {
    props.setPreviewUri(null);
    props.fileNameRef.current = "";
  };

  return (
    <View>
      <Text style={styles.label}>Upload image</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={!props.previewUri ? handlePickFile : undefined}
      >
        <View style={styles.inputWrapper}>
          {props.previewUri ? (
            <FastImage
              source={{
                uri: props.previewUri,
                priority: FastImage.priority.normal,
              }}
              style={{ ...StyleSheet.absoluteFillObject, borderRadius: 10 }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <FontAwesome6 name="plus" color={colors.text} size={20} />
          )}
        </View>
      </TouchableOpacity>
      {props.previewUri && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.removeButton}
          onPress={handleRemoveImage}
        >
          <FontAwesome6 name="xmark" size={12} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2.8,
  },
  fileName: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  label: {
    color: colors.primary,
    fontWeight: 600,
    fontSize: fontSize.xs + 1.5,
    marginBottom: 10,
  },
  removeButton: {
    position: "absolute",
    top: 22,
    right: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
});

export default Upload;
