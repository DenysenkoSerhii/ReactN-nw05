import React, { useCallback } from "react";
import { View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import AuthContext from "./shared/AuthContext";

import { Routing } from "./shared/components/routing";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthContext>
      <View style={{flex:1}} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Routing />
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </AuthContext>
  );
}
