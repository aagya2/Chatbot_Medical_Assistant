// app/allergies.tsx

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";

export default function Allergies() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>

        <Text style={styles.title}>Allergy History</Text>

        <View style={{ width: 44 }} />
      </View>

      {/* Content */}
      <View style={styles.card}>
        <Text style={styles.text}>No allergies added yet.</Text>
        <Text style={styles.subText}>Later we will add: food allergy, medicine allergy, etc.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  header: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  backTxt: { fontSize: 20, fontWeight: "900", color: colors.text },
  title: { fontSize: 18, fontWeight: "900", color: colors.text },

  card: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },

  text: { fontSize: 14.5, fontWeight: "900", color: colors.text },
  subText: { marginTop: 8, fontSize: 13, fontWeight: "800", color: colors.mutedText },
});