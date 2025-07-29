import { colors } from "@/constants/tokens";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TableUser = () => {
  return (
    <SafeAreaView>
      <Text style={{ color: colors.text }}>ListUser</Text>
    </SafeAreaView>
  );
};

export default TableUser;
