import CustomDrawerContent from "@/components/client/custom/CustomDrawerContent";
import { FontAwesome } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";

const AdminLayout = () => {
  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} isAdmin={true} />
      )}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
      }}
    >
      <Drawer.Screen
        name="user/ListUser"
        options={{
          title: "Manage User",
          drawerIcon: ({ color }) => (
            <FontAwesome name="user" size={20} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default AdminLayout;
