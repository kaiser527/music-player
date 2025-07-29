import { fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { useAppDispatch } from "@/redux/hooks";
import { callLogout } from "@/services/api";
import { IUser } from "@/types/backend";
import FastImage from "@d11/react-native-fast-image";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CustomDrawerProps = DrawerContentComponentProps & {
  user: IUser;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const textColor = "rgba(255, 255, 255, 0.75)";

const CustomDrawerContent = (props: CustomDrawerProps) => {
  const { top, bottom } = useSafeAreaInsets();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await callLogout();

    const { setLogoutAction } = await import("redux/slice/AccountSlice");
    dispatch(setLogoutAction({}));
    await AsyncStorage.removeItem("refresh_token");

    showMessage({
      message: "Logout success",
      type: "success",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        {props.isAdmin && <Text style={styles.title}>Admin Side</Text>}
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
        {props.isAdmin && (
          <DrawerItem
            icon={({ color }) => (
              <FontAwesome name="home" size={20} color={color} />
            )}
            label={"Back to Home"}
            onPress={() => router.push("/")}
          />
        )}
        {props.isAuthenticated && !props.isAdmin && (
          <DrawerItem
            icon={({ color }) => (
              <FontAwesome name="sign-out" size={20} color={color} />
            )}
            label={"Logout"}
            onPress={handleLogout}
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
  title: {
    color: textColor,
    alignSelf: "center",
    fontSize: fontSize.base - 2,
    fontWeight: 600,
  },
});

export default CustomDrawerContent;
