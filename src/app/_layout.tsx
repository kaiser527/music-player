import PlaylistModal from "@/components/client/playlist/PlaylistModal";
import LayoutApp from "@/components/share/LayoutApp";
import { colors } from "@/constants/tokens";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { useLogTrackPlayerState } from "@/hooks/track/useLogTrackPlayerState";
import { useSetupTrackPlayer } from "@/hooks/track/useSetupTrackPlayer";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "redux/store";

React.useInsertionEffect = useEffect;

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LayoutApp>
            <ThemeProvider value={DarkTheme}>
              <SafeAreaProvider>
                <ScrollProvider>
                  <RootNavigation />
                  <StatusBar style="light" />
                  <FlashMessage position="bottom" />
                  <PlaylistModal />
                </ScrollProvider>
              </SafeAreaProvider>
            </ThemeProvider>
          </LayoutApp>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const RootNavigation = () => (
  <Stack>
    <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    <Stack.Screen name="player" options={{ headerShown: false }} />
    <Stack.Screen
      name="(modals)/addToPlaylist"
      options={{
        headerTitle: "Add to Playlist",
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    />
  </Stack>
);

export default RootLayout;
