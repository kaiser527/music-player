import { unKnownArtistImage, unKnownTrackImage } from "@/constants/utils";
import { utilsStyles } from "@/styles";
import FastImage from "@d11/react-native-fast-image";
import React from "react";
import { Text, View } from "react-native";

interface IProps {
  text: string;
  screen: "TRACK" | "ARTIST";
}

const ListEmpty = (props: IProps) => {
  return (
    <View>
      <Text style={utilsStyles.emptyContentText}>{props.text}</Text>
      <FastImage
        source={{
          uri:
            props.screen === "TRACK" ? unKnownTrackImage : unKnownArtistImage,
          priority: FastImage.priority.normal,
        }}
        style={utilsStyles.emptyContentImage}
      />
    </View>
  );
};

export default ListEmpty;
