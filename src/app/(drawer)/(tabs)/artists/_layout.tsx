import CustomHeader from "@/components/share/custom/CustomHeader";
import {
  StackScreenWithSearchBar,
  StackScreenWithSearchBarCollapse,
} from "@/constants/layout";
import { useScroll } from "@/contexts/ScrollContext";
import { useAppDispatch } from "@/redux/hooks";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const ArtistsScreenLayout = () => {
  const { isScrolled } = useScroll();

  const dispatch = useAppDispatch();

  const handleChangInput = async (text: string) => {
    const { handleChangeQuery } = await import("redux/slice/UserSlice");
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
                placeholder="Find in artists"
                title="Artists"
                isScrolled={isScrolled}
              />
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default ArtistsScreenLayout;
