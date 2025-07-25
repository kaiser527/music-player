import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors } from "./tokens";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerTintColor: colors.text,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.background,
  },
};

export const StackScreenWithSearchBarCollapse: NativeStackNavigationOptions = {
  headerTintColor: colors.text,
  headerShadowVisible: false,
};
