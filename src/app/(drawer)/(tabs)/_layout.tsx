import FloatingPlayer from "@/components/client/player/FloatingPlayer";
import PlaylistActionButton from "@/components/client/playlist/PlaylistActionButton";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { useDeletePlaylist } from "@/hooks/playlist/useDeletePlaylist";
import { useToggleDeletePlaylist } from "@/hooks/playlist/useToggleDeletePlaylist";
import { useTogglePlaylistModal } from "@/hooks/playlist/useTogglePlaylistModal";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserPlaylist } from "@/redux/slice/PlaylistSlice";
import { callBulkDeletePlaylist } from "@/services/api";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import { colors, fontSize } from "constants/tokens";
import { BlurView } from "expo-blur";
import { Tabs, usePathname } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useActiveTrack } from "react-native-track-player";

const TabsNavigation = () => {
  const { isAuthenticated } = useGetAccount();
  const { deleteIds, setDeleteIds } = useDeletePlaylist();
  const { setIsShowModal } = useTogglePlaylistModal();
  const { isDeleteMode, setIsDeleteMode } = useToggleDeletePlaylist();

  const activeTrack = useActiveTrack();
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const currentRouteName = useNavigationState((state) => {
    const drawerRoute = state.routes[state.index];
    const tabsState = drawerRoute.state;

    if (!tabsState || !tabsState.index) return null;

    const activeTab = tabsState.routes[tabsState.index];
    return activeTab.name;
  });

  const handleDeletePlaylist = async () => {
    const res = await callBulkDeletePlaylist(deleteIds);
    if (res.code === 1000) {
      await setDeleteIds([]);
      await setIsDeleteMode(false);
      dispatch(fetchUserPlaylist(`pageSize=100&pageNumber=1&name=`));
      showMessage({
        message: "Success",
        description: "Delete playlist successfully",
        type: "success",
      });
    } else {
      showMessage({
        message: "Error occurred",
        description: res.message,
        type: "danger",
      });
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            paddingTop: 8,
            backgroundColor: "transparent",
          },
          tabBarBackground: () => (
            <BlurView
              intensity={140}
              tint="dark"
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-play"
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-note-sharp" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="users-line" size={21.5} color={color} />
            ),
          }}
        />
      </Tabs>
      {isAuthenticated &&
        currentRouteName === "playlists" &&
        !pathName.includes("detail") && (
          <>
            <PlaylistActionButton
              type="CREATE"
              style={{
                position: "absolute",
                bottom: activeTrack ? 113 : 53,
                right: 8,
              }}
              onPress={async () => await setIsShowModal(true)}
            />
            {deleteIds.length > 0 && isDeleteMode && (
              <PlaylistActionButton
                type="CONFIRM"
                style={{
                  position: "absolute",
                  bottom: activeTrack ? 113 : 53,
                  left: 44,
                }}
                onPress={handleDeletePlaylist}
              />
            )}
            <PlaylistActionButton
              type="DELETE"
              style={{
                position: "absolute",
                bottom: activeTrack ? 113 : 53,
                left: 8,
              }}
              onPress={async () => await setIsDeleteMode(!isDeleteMode)}
            />
          </>
        )}
      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 73,
        }}
      />
    </>
  );
};

export default TabsNavigation;
