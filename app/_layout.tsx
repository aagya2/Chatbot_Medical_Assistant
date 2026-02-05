import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        // ✅ premium transition (not right-slide)
        animation: "fade", // or "fade_from_bottom"

        // optional: disables swipe-back sliding
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="recents" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
