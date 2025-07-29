import CustomHeader from "@/components/share/custom/CustomHeader";
import { useScroll } from "@/contexts/ScrollContext";
import { useAppDispatch } from "@/redux/hooks";
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

  const dispatch = useAppDispatch();

  const handleChangInput = async (text: string) => {
    const { handleChangeQuery } = await import("redux/slice/TrackSlice");
    dispatch(handleChangeQuery(text));
  };

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
                handleChangInput={handleChangInput}
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
