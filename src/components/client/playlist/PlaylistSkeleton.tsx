import { colors } from "@/constants/tokens";
import React from "react";
import { StyleSheet, View } from "react-native";

const PlaylistSkeleton = () => {
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 12; i++) {
      skeletons.push(
        <View key={`playlist-skeleton-${i}`} style={styles.itemContainer}>
          <View style={styles.artworkSkeleton} />
          <View style={styles.textAndIcon}>
            <View style={styles.titleSkeleton} />
            <View style={styles.iconSkeleton} />
          </View>
        </View>
      );
    }
    return skeletons;
  };

  return <>{renderSkeletons()}</>;
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 14,
    paddingVertical: 10,
    paddingRight: 90,
  },
  artworkSkeleton: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.maximumTrackTintColor,
  },
  textAndIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 70,
  },
  titleSkeleton: {
    width: "100%",
    height: 18,
    borderRadius: 4,
    backgroundColor: colors.maximumTrackTintColor,
  },
  iconSkeleton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.maximumTrackTintColor,
  },
});

export default PlaylistSkeleton;
