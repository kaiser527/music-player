import CustomHeader from "@/components/client/custom/CustomHeader";
import {
  StackScreenWithSearchBar,
  StackScreenWithSearchBarCollapse,
} from "@/constants/layout";
import { colors } from "@/constants/tokens";
import { useScroll } from "@/contexts/ScrollContext";
import { useAppDispatch } from "@/redux/hooks";
import { handleChangeFilter } from "@/redux/slice/PlaylistSlice";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";

const PlaylistsScreenLayout = () => {
  const { isScrolled } = useScroll();

  const dispatch = useAppDispatch();

  const handleChangInput = useCallback((text: string) => {
    dispatch(handleChangeFilter(text));
  }, []);

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
                placeholder="Find in playlists"
                title="Playlists"
                isScrolled={isScrolled}
              />
            ),
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            headerTintColor: colors.primary,
            title: "Playlists",
            headerStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
      </Stack>
    </View>
  );
};

export default PlaylistsScreenLayout;
