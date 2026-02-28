// src/components/BottomNav.tsx

import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../themes/colors";
import { spacing } from "../themes/spacing";

export type TabKey = "home" | "notify" | "phone" | "message";

type Props = {
  active: TabKey;
  onPress: (key: TabKey) => void;
};

export function BottomNav({ active, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      <NavItem
        icon="home-outline"
        activeIcon="home"
        active={active === "home"}
        onPress={() => onPress("home")}
      />

      <NavItem
        icon="notifications-outline"
        activeIcon="notifications"
        active={active === "notify"}
        onPress={() => onPress("notify")}
      />

      <NavItem
        icon="call-outline"
        activeIcon="call"
        active={active === "phone"}
        onPress={() => onPress("phone")}
      />

      <NavItem
        icon="chatbubble-ellipses-outline"
        activeIcon="chatbubble-ellipses"
        active={active === "message"}
        onPress={() => onPress("message")}
      />
    </View>
  );
}

function NavItem({
  icon,
  activeIcon,
  active,
  onPress,
}: {
  icon: any;
  activeIcon: any;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Ionicons
        name={active ? activeIcon : icon}
        size={24}
        color={active ? "#fff" : "rgba(255,255,255,0.7)"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: spacing.xl,
    right: spacing.xl,
    bottom: spacing.lg,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },

  item: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});