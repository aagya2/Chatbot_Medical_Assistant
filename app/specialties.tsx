import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";

const SPECIALTIES = [
  { key: "general", title: "General Physician", emoji: "🩺" },
  { key: "cardiology", title: "Cardiology", emoji: "❤️" },
  { key: "dermatology", title: "Dermatology", emoji: "🧴" },
  { key: "dentistry", title: "Dentistry", emoji: "🦷" },
  { key: "neurology", title: "Neurology", emoji: "🧠" },
  { key: "pediatrics", title: "Pediatrics", emoji: "👶" },
  { key: "orthopedics", title: "Orthopedics", emoji: "🦴" },
];

export default function Specialties() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>
        <Text style={styles.title}>Specialties</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.xl, paddingBottom: 140 }}
      >
        {SPECIALTIES.map((s) => (
          <Pressable
            key={s.key}
            style={styles.card}
            onPress={() =>
              router.replace({ pathname: "/doctors", params: { speciality: s.key } })
            }
          >
            <View style={styles.iconBox}>
              <Text style={{ fontSize: 18 }}>{s.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.cardSub}>Tap to view available doctors</Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
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
  title: { fontSize: 20, fontWeight: "900", color: colors.text },

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    borderRadius: 18,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#EAF3FF",
    borderWidth: 1,
    borderColor: "#DCEBFF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 15, fontWeight: "900", color: colors.text },
  cardSub: { marginTop: 4, fontSize: 12, fontWeight: "700", color: colors.mutedText },
  chev: { fontSize: 22, fontWeight: "900", color: "#2E6FE8" },
});