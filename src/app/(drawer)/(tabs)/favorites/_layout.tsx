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

const FavoritesScreenLayout = () => {
  const { isScrolled } = useScroll();

  const dispatch = useAppDispatch();

  const handleChangInput = async (text: string) => {
    const { handleChangeFilter } = await import("redux/slice/FavoriteSlice");
    dispatch(handleChangeFilter(text));
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
                title="Favorites"
                isScrolled={isScrolled}
              />
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default FavoritesScreenLayout;
