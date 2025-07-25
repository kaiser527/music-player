import LayoutApp from "@/components/share/LayoutApp";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "redux/store";

const RootLayout = () => {
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
