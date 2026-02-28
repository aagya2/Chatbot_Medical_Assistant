// app/profile.tsx

import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { images } from "../src/assets/assets";

export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backTxt}>←</Text>
          </Pressable>

          <Text style={styles.title}>My Profile</Text>

          <View style={{ width: 44 }} />
        </View>

        {/* User Card */}
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Image source={images.logo} style={styles.avatar} />
          </View>

          <Text style={styles.name}>Test User</Text>
          <Text style={styles.sub}>testuser@gmail.com</Text>
        </View>

        {/* Menu Items */}
        <Pressable style={styles.item} onPress={() => router.push("/medical-history" as any)}>
          <Text style={styles.itemText}>Past Medical History</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={() => router.push("/reports" as any)}>
          <Text style={styles.itemText}>Medical Reports</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={() => router.push("/allergies" as any)}>
          <Text style={styles.itemText}>Allergy History</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={() => router.push("/tests" as any)}>
          <Text style={styles.itemText}>Lab Tests</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        {/* Logout */}
        <Pressable
          style={[styles.item, { marginTop: 26 }]}
          onPress={() => router.replace("/login" as any)}
        >
          <Text style={[styles.itemText, { color: "#D11A2A" }]}>Logout</Text>
        </Pressable>
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
  title: { fontSize: 18, fontWeight: "900", color: colors.text },

  card: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
  },

  avatarWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: { width: 56, height: 56, resizeMode: "contain" },

  name: { fontSize: 18, fontWeight: "900", color: colors.text },
  sub: { marginTop: 6, fontSize: 13, fontWeight: "800", color: colors.mutedText },

  item: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: { fontSize: 15, fontWeight: "900", color: colors.text },
  chev: { fontSize: 22, fontWeight: "900", color: "#2E6FE8" },
});