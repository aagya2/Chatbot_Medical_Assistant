import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { BottomNav } from "../src/components/BottomNav";
import { images, icons } from "../src/assets/assets";

type Recent = {
  id: string;
  name: string;
  type: "Outgoing" | "Missed call" | "Cancelled";
  time: string;
  image?: ImageSourcePropType;
  emoji?: string;
};

const RECENTS: Recent[] = [
  { id: "1", name: "Hospital Reception", type: "Outgoing", time: "10m ago", emoji: "🏥" },
  { id: "2", name: "Appointment Desk", type: "Outgoing", time: "2h ago", emoji: "📅" },
  { id: "3", name: "Nurse Helpline", type: "Missed call", time: "Yesterday", emoji: "🩺" },
  { id: "4", name: "Billing & Insurance", type: "Outgoing", time: "Dec 7, 2025", emoji: "💳" },
  { id: "5", name: "Pharmacy Support", type: "Outgoing", time: "Nov 4, 2025", image: icons.pharmacy },
  { id: "6", name: "Pharmacy Delivery", type: "Cancelled", time: "Nov 4, 2025", image: icons.pharmacy },
  { id: "7", name: "Lab Reports Desk", type: "Outgoing", time: "Oct 28, 2025", emoji: "🧪" },
  { id: "8", name: "Emergency Hotline", type: "Missed call", time: "Oct 10, 2025", emoji: "🚑" },
];

function RecentCard({ item }: { item: Recent }) {
  const isMissed = item.type === "Missed call";

  return (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        {item.image ? (
          <Image source={item.image} style={styles.avatarImg} />
        ) : (
          <View style={styles.avatarEmoji}>
            <Text style={{ fontSize: 20 }}>{item.emoji ?? "📞"}</Text>
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.type, isMissed && styles.typeMissed]}>{item.type}</Text>
      </View>

      <Text style={styles.time}>{item.time}</Text>
    </View>
  );
}

export default function Recents() {
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

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Recents</Text>
        </View>

        {/* List */}
        <View style={{ marginTop: spacing.md }}>
          {RECENTS.map((r) => (
            <RecentCard key={r.id} item={r} />
          ))}
        </View>
      </ScrollView>

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
  scrollContent: { paddingBottom: 100 },

  headerBlue: {
    height: 93,
    backgroundColor: "#4FA3F7",
    paddingTop: 30,
    paddingHorizontal: spacing.xl,
  },

  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandLogo: { width: 40, height: 40, resizeMode: "contain" },
  brandText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0B1B2B",
    letterSpacing: 0.2,
  },

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
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: -2,
  },

  whiteCurve: {
    height: 50,
    backgroundColor: "#4FA3F7",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    transform: [{ scaleX: 1.2 }],
    marginTop: -18,
  },

  titleRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  pageTitle: { fontSize: 28, fontWeight: "900", color: colors.text },

  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
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
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: { width: "100%", height: "100%", resizeMode: "cover" },
  avatarEmoji: { width: "100%", height: "100%", alignItems: "center", justifyContent: "center" },

  name: { fontSize: 14, fontWeight: "900", color: colors.text },
  type: { marginTop: 4, fontSize: 12.5, fontWeight: "800", color: colors.mutedText },
  typeMissed: { color: "#D11A2A" },

  time: { fontSize: 12, fontWeight: "900", color: "#2E6FE8" },
});