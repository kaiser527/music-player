import { colors } from "@/constants/tokens";
import React from "react";
import { StyleSheet, View } from "react-native";

const TrackListSkeleton = () => {
  const renderListSkeleton = () => {
    const result = [];
    for (let i = 0; i < 12; i++) {
      result.push(
        <View key={`skeleton-${i}`} style={styles.trackItemContainer}>
          <View style={styles.artworkSkeleton} />
          <View style={styles.textContainer}>
            <View style={styles.titleSkeleton} />
            <View style={styles.artistSkeleton} />
          </View>
        </View>
      );
    }
    return result;
  };

  return <>{renderListSkeleton()}</>;
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
    marginBottom: 20,
  },
  artworkSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.maximumTrackTintColor,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  titleSkeleton: {
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.maximumTrackTintColor,
    width: "80%",
  },
  artistSkeleton: {
    height: 12,
    borderRadius: 4,
    backgroundColor: colors.maximumTrackTintColor,
    width: "60%",
  },
});

export default TrackListSkeleton;
