// app/pharmacy.tsx

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { BottomNav } from "../src/components/BottomNav";
import { images, icons } from "../src/assets/assets";

type PharmacyItem = {
  id: string;
  name: string;
  location: string;
  avatar: ImageSourcePropType;
};

export default function Pharmacy() {
  const [q, setQ] = useState("");

  const PHARMACIES: PharmacyItem[] = [
    {
      id: "p1",
      name: "Neelam Pharmacy",
      location: "Medica Hospital परिसर",
      avatar: icons.pharmacy3 ?? icons.pharmacy, // ✅ if pharmacy3 exists, use it
    },
    {
      id: "p2",
      name: "Yadav Pharmacy",
      location: "Medica Hospital परिसर",
      avatar: icons.pharmacy4 ?? icons.pharmacy1,
    },
    {
      id: "p3",
      name: "Veda Ayurvedic",
      location: "Medica Hospital परिसर",
      avatar: icons.pharmacy5 ?? icons.pharmacy2,
    },
  ];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PHARMACIES;
    return PHARMACIES.filter(
      (p) => p.name.toLowerCase().includes(s) || p.location.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerBlue}>
          <View style={styles.headerTopRow}>
            <View style={styles.brandRow}>
              <Image source={images.logo} style={styles.brandLogo} />
              <Text style={styles.brandText}>Medica</Text>
            </View>

            {/* ✅ Hamburger opens Profile */}
            <Pressable style={styles.hamburger} onPress={() => router.push("/profile" as any)}>
              <Text style={styles.hamburgerText}>≡</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.whiteCurve} />

        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search for Pharmacy"
            placeholderTextColor="#7A8CA4"
            style={styles.searchInput}
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Image source={images.ph} style={styles.bannerImg} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>PHARMACY</Text>
          </View>
        </View>

        {/* Nearby Pharmacy */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Nearby Pharmacy</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        {/* List */}
        <View style={{ marginTop: spacing.sm }}>
          {filtered.map((item) => (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => router.push("/chat/pharmacy" as any)}
            >
              <View style={styles.avatarWrap}>
                <Image source={item.avatar} style={styles.avatarImg} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.loc}>{item.location}</Text>
              </View>
            </Pressable>
          ))}

          {filtered.length === 0 && <Text style={styles.empty}>No pharmacy found.</Text>}
        </View>
      </ScrollView>

      <BottomNav
        active={"home" as any}
        onPress={(key) => {
          if (key === "home") router.navigate("/home" as any);
          if (key === "notify") router.navigate("/notifications" as any);
          if (key === "phone") router.navigate("/recents" as any);
          if (key === "message") router.navigate("/chat" as any);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 120 },

  headerBlue: {
    height: 110,
    backgroundColor: "#4FA3F7",
    paddingTop: 40,
    paddingHorizontal: spacing.xl,
  },

  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandLogo: { width: 40, height: 40, resizeMode: "contain" },
  brandText: { fontSize: 26, fontWeight: "900", color: "#0B1B2B" },

  hamburger: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  hamburgerText: { fontSize: 26, fontWeight: "900", color: "#fff", marginTop: -2 },

  whiteCurve: {
    height: 52,
    backgroundColor: "#4FA3F7",
    borderBottomLeftRadius: 52,
    borderBottomRightRadius: 52,
    transform: [{ scaleX: 1.15 }],
    marginTop: -18,
  },

  searchWrap: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.xl,
    height: 50,
    borderRadius: 18,
    backgroundColor: "#D9ECFF",
    borderWidth: 1,
    borderColor: "#BFDFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchIcon: { fontSize: 16, opacity: 0.7, width: 22 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#0B1B2B",
    paddingLeft: 8,
  },

  banner: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.xl,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    backgroundColor: "#EEF6FF",
  },
  bannerImg: { width: "100%", height: 150, resizeMode: "cover" },
  bannerOverlay: {
    position: "absolute",
    right: 16,
    top: 18,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  bannerTitle: { fontSize: 22, fontWeight: "900", color: "#0B1B2B", letterSpacing: 1 },

  sectionRow: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 16, fontWeight: "900", color: colors.text },
  viewAll: { fontSize: 12.5, fontWeight: "900", color: "#2E6FE8" },

  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  avatarWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: { width: "100%", height: "100%", resizeMode: "contain" },

  name: { fontSize: 14.5, fontWeight: "900", color: colors.text },
  loc: { marginTop: 4, fontSize: 12.5, fontWeight: "800", color: colors.mutedText },

  empty: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    fontSize: 14,
    fontWeight: "800",
    color: colors.mutedText,
  },
});