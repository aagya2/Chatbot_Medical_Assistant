// src/components/BottomNav.tsx

import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
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
      <NavItem label="🏠" active={active === "home"} onPress={() => onPress("home")} />
      <NavItem label="🔔" active={active === "notify"} onPress={() => onPress("notify")} />
      <NavItem label="📞" active={active === "phone"} onPress={() => onPress("phone")} />
      <NavItem label="💬" active={active === "message"} onPress={() => onPress("message")} />
    </View>
  );
}

function NavItem({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={[styles.icon, active && styles.active]}>{label}</Text>
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
  item: { width: 56, height: 56, alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 22, opacity: 0.85 },
  active: { opacity: 1 },
});
