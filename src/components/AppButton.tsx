import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../themes/colors";
import { spacing } from "../themes/spacing";

export function AppButton({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 18,
    alignItems: "center",
  },
  txt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
