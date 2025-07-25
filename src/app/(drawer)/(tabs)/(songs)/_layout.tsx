import CustomHeader from "@/components/client/custom/CustomHeader";
import { useScroll } from "@/contexts/ScrollContext";
import { defaultStyles } from "@/styles";
import {
  StackScreenWithSearchBar,
  StackScreenWithSearchBarCollapse,
} from "constants/layout";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const SongsScreenLayout = () => {
  const { isScrolled } = useScroll();

  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...(isScrolled
              ? StackScreenWithSearchBarCollapse
              : StackScreenWithSearchBar),
            headerTitle: () => (
              <CustomHeader
                placeholder="Find in songs"
                title="Songs"
                isScrolled={isScrolled}
              />
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default SongsScreenLayout;
