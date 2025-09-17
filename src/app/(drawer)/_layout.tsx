import CustomDrawerContent from "@/components/client/custom/CustomDrawerContent";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";

const DrawerLayout = () => {
  const { user, isAuthenticated } = useGetAccount(true);

  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} isAdmin={false} />
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
      <Drawer.Protected
        guard={
          isAuthenticated &&
          (user.role.name === "ADMIN" || user.role.name === "TESTER")
        }
      >
        <Drawer.Screen
          name="(admin)"
          options={{
            headerShown: false,
            title: "Admin",
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="gear" size={17} color={color} />
            ),
          }}
        />
      </Drawer.Protected>
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
  );
};

export default DrawerLayout;
