// app/ambulance.tsx

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
  Linking,
} from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { images, icons } from "../src/assets/assets";

import { BottomNav } from "../src/components/BottomNav";
import { ChatbotFloating } from "../src/components/ChatbotFloating";

type Contact = {
  id: string;
  name: string;
  subtitle: string;
  phone: string;
};

const CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Medica Ambulance",
    subtitle: "Fast response • 24/7",
    phone: "102",
  },
  {
    id: "2",
    name: "Medica Emergency Desk",
    subtitle: "Triage & urgent support",
    phone: "103",
  },
  {
    id: "3",
    name: "Medica ICU Hotline",
    subtitle: "Critical care assistance",
    phone: "104",
  },
];

export default function Ambulance() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CONTACTS;
    return CONTACTS.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.subtitle.toLowerCase().includes(s) ||
        c.phone.includes(s)
    );
  }, [q]);

  const callNumber = async (phone: string) => {
    try {
      const url = `tel:${phone}`;
      const can = await Linking.canOpenURL(url);
      if (!can) {
        Alert.alert("Cannot call", "Calling is not supported on this device.");
        return;
      }
      Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Could not place the call.");
    }
  };

  const onShareLocation = () => {
    Alert.alert(
      "Share Location",
      "Demo: In real app we will request GPS permission and share your location."
    );
  };

  const onFirstAid = () => {
    Alert.alert(
      "First Aid Tips",
      "• Stay calm\n• Check breathing\n• Stop bleeding\n• Call ambulance immediately"
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerBlue}>
          <View style={styles.headerTopRow}>
            <View style={styles.brandRow}>
              <Image source={images.logo} style={styles.brandLogo} />
              <Text style={styles.brandText}>Medica</Text>
            </View>

            <Pressable style={styles.hamburger} onPress={() => router.back()}>
              <Text style={styles.hamburgerText}>←</Text>
            </Pressable>
          </View>
        </View>

        {/* Curve */}
        <View style={styles.whiteCurve} />

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Ambulance</Text>
          <Text style={styles.pageSub}>
            Emergency support when you need it most.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search contacts..."
            placeholderTextColor="#7A8CA4"
            style={styles.searchInput}
          />
        </View>

        {/* Big center image */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <Text style={styles.heroTitle}>Quick Emergency Actions</Text>
            <Text style={styles.heroQuote}>
              “Seconds matter. We’re ready 24/7.”
            </Text>
          </View>

          <Image source={icons.ambulance} style={styles.heroImg} />

          <View style={styles.quickRow}>
            <Pressable
              style={[styles.quickBtn, styles.quickPrimary]}
              onPress={() => callNumber("102")}
            >
              <Text style={styles.quickBtnText}>Call Ambulance</Text>
            </Pressable>

            <Pressable style={styles.quickBtn} onPress={onShareLocation}>
              <Text style={styles.quickBtnTextDark}>Share Location</Text>
            </Pressable>

            <Pressable style={styles.quickBtn} onPress={onFirstAid}>
              <Text style={styles.quickBtnTextDark}>First Aid</Text>
            </Pressable>
          </View>
        </View>

        {/* Emergency contacts */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <Text style={styles.smallHint}>Tap to call</Text>
        </View>

        {filtered.map((c) => (
          <Pressable
            key={c.id}
            style={styles.contactCard}
            onPress={() => callNumber(c.phone)}
          >
            <View style={styles.contactLeft}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>☎</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{c.name}</Text>
                <Text style={styles.contactSub}>{c.subtitle}</Text>
              </View>
            </View>

            <Text style={styles.contactPhone}>{c.phone}</Text>
          </Pressable>
        ))}

        {filtered.length === 0 && (
          <Text style={styles.empty}>No contacts found.</Text>
        )}
      </ScrollView>

      {/* Chatbot */}
      <ChatbotFloating
        username="User"
        promptText="Hi User! Need emergency help?"
        delayMs={4500}
        autoHideMs={4500}
        onOpen={() => {}}
      />

      {/* Bottom nav */}
      <BottomNav
        active={"phone" as any}
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

  scrollContent: {
    paddingBottom: 140, // bottom nav + chatbot
  },

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
  hamburgerText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: -2,
  },

  whiteCurve: {
    height: 52,
    backgroundColor: "#4FA3F7",
    borderBottomLeftRadius: 52,
    borderBottomRightRadius: 52,
    transform: [{ scaleX: 1.15 }],
    marginTop: -18,
  },

  titleRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
  },
  pageTitle: { fontSize: 28, fontWeight: "900", color: colors.text },
  pageSub: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "800",
    color: colors.mutedText,
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

  heroCard: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  heroTop: { marginBottom: 10 },
  heroTitle: { fontSize: 16, fontWeight: "900", color: colors.text },
  heroQuote: {
    marginTop: 6,
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.mutedText,
    lineHeight: 18,
  },
  heroImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 8,
    marginBottom: 12,
  },

  quickRow: {
    flexDirection: "row",
    gap: 10,
  },
  quickBtn: {
    flex: 1,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  quickPrimary: {
    backgroundColor: "#4FA3F7",
    borderColor: "#4FA3F7",
  },
  quickBtnText: { color: "#fff", fontWeight: "900", fontSize: 12.5 },
  quickBtnTextDark: { color: "#0B1B2B", fontWeight: "900", fontSize: 12.5 },

  sectionRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "900", color: colors.text },
  smallHint: { fontSize: 12, fontWeight: "800", color: colors.mutedText },

  contactCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  contactLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  badge: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#EAF3FF",
    borderWidth: 1,
    borderColor: "#DCEBFF",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 18, fontWeight: "900", color: "#2E6FE8" },

  contactName: { fontSize: 14.5, fontWeight: "900", color: colors.text },
  contactSub: {
    marginTop: 4,
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.mutedText,
  },
  contactPhone: { fontSize: 13, fontWeight: "900", color: "#2E6FE8" },

  empty: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    fontSize: 14,
    fontWeight: "800",
    color: colors.mutedText,
  },
});
