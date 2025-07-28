import { fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { IUser } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import { FontAwesome } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CustomDrawerProps = DrawerContentComponentProps & {
  handleLogout: () => void;
  user: IUser;
  isAuthenticated: boolean;
};

const textColor = "rgba(255, 255, 255, 0.75)";

const CustomDrawerContent = (props: CustomDrawerProps) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        {props.isAuthenticated && (
          <View style={{ padding: top - 25 }}>
            <FastImage
              source={{
                uri: `${REACT_BACKEND_URL}/api/v1/images/user/${props.user.image}`,
                priority: FastImage.priority.normal,
              }}
              style={styles.image}
            />
            <Text style={styles.username}>{props.user.username}</Text>
          </View>
        )}
        <DrawerItemList {...props} />
        {props.isAuthenticated && (
          <DrawerItem
            icon={({ color }) => (
              <FontAwesome name="sign-out" size={20} color={color} />
            )}
            label={"Logout"}
            onPress={() => props.handleLogout()}
          />
        )}
      </DrawerContentScrollView>
      <View
        style={{
          ...styles.footer,
          paddingBottom: 20 + bottom,
        }}
      >
        <Text style={{ color: textColor, textAlign: "center" }}>
          @ Kaiser's MusicApp
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 999,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  username: {
    color: textColor,
    fontSize: fontSize.sm,
    fontWeight: 400,
    alignSelf: "center",
    paddingTop: 10,
  },
  footer: {
    borderTopColor: textColor,
    borderTopWidth: 1,
    padding: 20,
  },
});

export default CustomDrawerContent;
