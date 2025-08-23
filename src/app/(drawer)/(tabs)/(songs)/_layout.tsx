import CustomHeader from "@/components/client/custom/CustomHeader";
import { useScroll } from "@/contexts/ScrollContext";
import { useAppDispatch } from "@/redux/hooks";
import { handleChangeQuery } from "@/redux/slice/TrackSlice";
import { defaultStyles } from "@/styles";
import {
  StackScreenWithSearchBar,
  StackScreenWithSearchBarCollapse,
} from "constants/layout";
import { Stack } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";

const SongsScreenLayout = () => {
  const { isScrolled } = useScroll();

  const dispatch = useAppDispatch();

  const handleChangInput = useCallback((text: string) => {
    dispatch(handleChangeQuery(text));
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
