import CustomDrawerContent from "@/components/client/custom/CustomDrawerContent";
import { EModule, useViewAdmin } from "@/hooks/layout/useViewAdmin";
import { FontAwesome6 } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";

const AdminLayout = () => {
  const { isPermit } = useViewAdmin();

  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} isAdmin={true} />
      )}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
      }}
    >
      <Drawer.Protected guard={isPermit(EModule.USER)}>
        <Drawer.Screen
          name="ListUser"
          options={{
            title: "Manage User",
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="user" size={16} color={color} />
            ),
          }}
        />
      </Drawer.Protected>
      <Drawer.Protected guard={isPermit(EModule.ROLE)}>
        <Drawer.Screen
          name="ListRole"
          options={{
            title: "Manage Role",
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="shield" size={16} color={color} />
            ),
          }}
        />
      </Drawer.Protected>
      <Drawer.Protected guard={isPermit(EModule.PERMISSION)}>
        <Drawer.Screen
          name="ListPermission"
          options={{
            title: "Manage Permission",
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="lock" size={16} color={color} />
            ),
          }}
        />
      </Drawer.Protected>
    </Drawer>
  );
};

export default AdminLayout;
