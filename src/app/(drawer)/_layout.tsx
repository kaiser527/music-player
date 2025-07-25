import CustomDrawerContent from "@/components/client/custom/CustomDrawerContent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { callLogout } from "@/services/api";
import { IUser } from "@/types/backend";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useEffect } from "react";
import { showMessage } from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  const dispatch = useAppDispatch();

  const user: IUser = useAppSelector((state) => state.account.user);
  const isAuthenticated: boolean = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const pathname = usePathname();

  console.log(user);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const refresh_token = await AsyncStorage.getItem("refresh_token");
    const { fetchAccount, setLogoutAction } = await import(
      "redux/slice/AccountSlice"
    );
    if (
      pathname.includes("login") ||
      pathname.includes("register") ||
      !isAuthenticated
    )
      return;
    console.log("access", access_token);
    console.log("refresh", refresh_token);
    if (access_token && refresh_token) dispatch(fetchAccount());
    else dispatch(setLogoutAction({}));
  };

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            handleLogout={handleLogout}
            user={user}
            isAuthenticated={isAuthenticated}
          />
        )}
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "Home",
            drawerIcon: ({ color }) => (
              <FontAwesome name="home" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="auth/login"
          options={{
            headerShown: false,
            drawerItemStyle: { display: isAuthenticated ? "none" : "flex" },
            title: "Login",
            drawerIcon: ({ color }) => (
              <FontAwesome name="sign-in" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="auth/verify"
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="auth/register"
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
