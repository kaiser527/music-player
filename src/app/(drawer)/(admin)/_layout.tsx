import CustomDrawerContent from "@/components/share/custom/CustomDrawerContent";
import { useGetAccount } from "@/hooks/useGetAccount";
import { FontAwesome } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AdminLayout = () => {
  const { user, isAuthenticated } = useGetAccount();

  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};

export default AdminLayout;
