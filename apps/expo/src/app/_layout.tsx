import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";
import { TouchableOpacity, useColorScheme } from "react-native";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === 'light' ? 'white' : "rgb(23, 23, 23)",
            },
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : "white",
            },
          }}
        />
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
