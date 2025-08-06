import { fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { defaultStyles } from "@/styles";
import { IUser } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

interface IProps {
  artist: IUser;
}

const ArtistListItem = (props: IProps) => {
  const router = useRouter();

  return (
    <TouchableHighlight
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: `/artists/detail`,
          params: { artist: JSON.stringify(props.artist) },
        })
      }
    >
      <View style={styles.artistItemContainer}>
        <View>
          <FastImage
            source={{
              uri: `${REACT_BACKEND_URL}/api/v1/images/user/${props.artist.image}`,
              priority: FastImage.priority.normal,
            }}
            style={styles.artistImage}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text numberOfLines={1} style={styles.artistNameText}>
            {props.artist.username}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ArtistListItem;

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
  },
  artistImage: {
    borderRadius: 32,
    width: 50,
    height: 50,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    maxWidth: "80%",
  },
});
