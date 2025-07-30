import CustomDrawerContent from "@/components/share/custom/CustomDrawerContent";
import { useGetAccount } from "@/hooks/useGetAccount";
import { useAppDispatch } from "@/redux/hooks";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useGetAccount();

  const pathname = usePathname();

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

    if (access_token && refresh_token) dispatch(fetchAccount());
    else dispatch(setLogoutAction({}));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            user={user}
            isAuthenticated={isAuthenticated}
            isAdmin={false}
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
          name="(admin)"
          options={{
            headerShown: false,
            drawerItemStyle: {
              display:
                isAuthenticated &&
                (user.role.name === "ADMIN" || user.role.name === "TESTER")
                  ? "flex"
                  : "none",
            },
            title: "Admin",
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="gear" size={20} color={color} />
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
