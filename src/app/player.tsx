import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PlayerScreen = () => {
  return (
    <View style={styles.overlayContainer}>
      <DismissPlayerSymbol />
    </View>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ ...styles.dismissPlayerSymbolContainer, top: top + 8 }}>
      <View accessible={false} style={styles.innerContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "black",
  },
  dismissPlayerSymbolContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  innerContainer: {
    width: 50,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    opacity: 0.7,
  },
});

export default PlayerScreen;
