import LayoutApp from "@/components/share/LayoutApp";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "redux/store";

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LayoutApp>
          <ThemeProvider value={DarkTheme}>
            <SafeAreaProvider>
              <ScrollProvider>
                <RootNavigation />
                <StatusBar style="light" />
                <FlashMessage position="bottom" />
              </ScrollProvider>
            </SafeAreaProvider>
          </ThemeProvider>
        </LayoutApp>
      </PersistGate>
    </Provider>
  );
};

const RootNavigation = () => (
  <Stack>
    <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
  </Stack>
);

export default RootLayout;
