import { fontSize } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { useAppDispatch } from "@/redux/hooks";
import { setLogoutAction } from "@/redux/slice/AccountSlice";
import { callLogout } from "@/services/api";
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
  isAdmin: boolean;
};

const textColor = "rgba(255, 255, 255, 0.75)";

const CustomDrawerContent = (props: CustomDrawerProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const { user, isAuthenticated } = useGetAccount(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const tokens = await AsyncStorage.multiGet([
      "access_token",
      "refresh_token",
    ]);
    const res = await callLogout({
      accessToken: tokens[0][1] ?? "",
      refreshToken: tokens[1][1] ?? "",
    });
    if (res.code !== 1000) {
      showMessage({
        message: "Error occurred",
        description: res.message,
        type: "danger",
      });
      return;
    }
    dispatch(setLogoutAction({}));
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        {props.isAdmin && <Text style={styles.title}>Admin Side</Text>}
        {isAuthenticated && (
          <View style={{ padding: top - 25 }}>
            <FastImage
              source={{
                uri: `${REACT_BACKEND_URL}/api/v1/images/user/${user.image}`,
                priority: FastImage.priority.normal,
              }}
              style={styles.image}
            />
            <Text style={styles.username}>{user.username}</Text>
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
        {isAuthenticated && !props.isAdmin && (
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
