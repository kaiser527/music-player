import CustomDrawerContent from "@/components/client/custom/CustomDrawerContent";
import { useGetAccount } from "@/hooks/useGetAccount";
import { FontAwesome } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";

const AdminLayout = () => {
  const { user, isAuthenticated } = useGetAccount();

  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          user={user}
          isAuthenticated={isAuthenticated}
          isAdmin={true}
        />
      )}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
      }}
    >
      <Drawer.Screen
        name="user/index"
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
