import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { colors } from "../themes/colors";
import { spacing } from "../themes/spacing";

export function CategoryCard({
  title,
  subtitle,
  emoji,
  onPress,
}: {
  title: string;
  subtitle: string;
  emoji: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.icon}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#F2F7FF",
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#D9ECFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: { fontSize: 14, fontWeight: "800", color: colors.text },
  sub: { marginTop: 2, fontSize: 12, color: colors.mutedText },
});
