import { colors } from "@/constants/tokens";
import React from "react";
import { StyleSheet, View } from "react-native";

const ArtistSkeleton = () => {
  const renderSkeletonItems = () => {
    const skeletons = [];
    for (let i = 0; i < 12; i++) {
      skeletons.push(
        <View key={`artist-skeleton-${i}`} style={styles.itemContainer}>
          <View style={styles.imageSkeleton} />
          <View style={styles.textSkeleton} />
        </View>
      );
    }
    return skeletons;
  };

  return <>{renderSkeletonItems()}</>;
};

export default ArtistSkeleton;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 14,
    marginBottom: 20,
  },
  imageSkeleton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.maximumTrackTintColor,
  },
  textSkeleton: {
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.maximumTrackTintColor,
    width: "60%",
  },
});
