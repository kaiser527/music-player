import { useNavigationState } from "@react-navigation/native";

export const useGetPathname = () => {
  const currentRouteName = useNavigationState((state) => {
    const drawerRoute = state.routes[state.index];
    const tabsState = drawerRoute.state;

    if (!tabsState) return drawerRoute.name;

    const activeTab = tabsState.routes[tabsState.index ?? 0];
    return activeTab.name;
  });

  return currentRouteName;
};
