import { colors, fontSize } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SearchInput from "./SearchInput";

interface IProps {
  isScrolled: boolean;
  title: string;
  placeholder: string;
}

const CustomHeader = (props: IProps) => {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);

  const getTitleName = () => {
    return (
      <Text
        style={{
          fontSize: props.isScrolled ? fontSize.sm + 1 : fontSize.lg + 1,
          color: colors.text,
          fontWeight: 500,
          alignSelf: props.isScrolled ? "center" : "flex-start",
        }}
      >
        {props.title}
      </Text>
    );
  };

  return (
    <View>
      {!isFocused && (
        <>
          {props.isScrolled ? (
            getTitleName()
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {getTitleName()}
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <Ionicons name="menu" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      <SearchInput
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        isScrolled={props.isScrolled}
        placeholder={props.placeholder}
      />
    </View>
  );
};

export default CustomHeader;
