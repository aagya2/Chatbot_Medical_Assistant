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
import { images, doctors } from "../src/assets/assets";

type Notice = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  image?: ImageSourcePropType; // optional (doctor photo etc.)
  emoji?: string; // fallback if no image
};
const NOTICES: Notice[] = [
  {
    id: "1",
    title: "Appointment Completed",
    subtitle: "Your appointment at 11:30 AM, 21 March 2026 with Dr. Lisa has been completed.",
    time: "3m ago",
    image: doctors.lisa,
  },
  {
    id: "2",
    title: "New Message",
    subtitle: "Dr. Oliver sent you a message.",
    time: "Today at 2:29 PM",
    image: doctors.oliver,
  },
  {
    id: "3",
    title: "Password Updated",
    subtitle: "Your password has been changed successfully.",
    time: "Today at 3:00 PM",
    emoji: "🔒",
  },
  {
    id: "4",
    title: "Medicine Delivered",
    subtitle: "Your medicine has been delivered.",
    time: "December 25, 2025",
    emoji: "💊",
  },
  {
    id: "5",
    title: "Appointment Cancelled",
    subtitle: "Your appointment has been cancelled.",
    time: "December 7, 2025",
    image: doctors.elly,
  },

  // ✅ NEW notification added
  {
    id: "6",
    title: "Appointment Reminder",
    subtitle: "Reminder: Your appointment is scheduled for tomorrow at 10:00 AM.",
    time: "Just now",
    emoji: "⏰",
  },
];


function NotificationCard({ item }: { item: Notice }) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        {item.image ? (
          <Image source={item.image} style={styles.avatarImg} />
        ) : (
          <View style={styles.avatarEmoji}>
            <Text style={{ fontSize: 20 }}>{item.emoji ?? "🔔"}</Text>
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
    </View>
  );
}

export default function Notifications() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER (Blue with curve) */}
        <View style={styles.headerBlue}>
          <View style={styles.headerTopRow}>
            <View style={styles.brandRow}>
              <Image source={images.logo} style={styles.brandLogo} />
              <Text style={styles.brandText}>Medica</Text>
            </View>

            {/* hamburger */}
            <Pressable
  style={styles.hamburger}
  onPress={() => router.push("/profile" as any)}
>
  <Text style={styles.hamburgerText}>≡</Text>
</Pressable>
          </View>
        </View>

        {/* white curved overlay */}
        <View style={styles.whiteCurve} />

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Notification</Text>
        </View>

        {/* List */}
        <View style={{ marginTop: spacing.md }}>
          {NOTICES.map((n) => (
            <NotificationCard key={n.id} item={n} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <BottomNav
        active={"notify" as any}
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
    paddingBottom: 35, // space for bottom nav
  },

  headerBlue: {
    height: 95,
    backgroundColor: "#4FA3F7",
    paddingTop: 33,
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

  // smooth single curve (premium)
  whiteCurve: {
    height: 48,
    backgroundColor: "#4FA3F7",
    borderBottomLeftRadius: 46,
    borderBottomRightRadius: 46,
    transform: [{ scaleX: 1.2 }],
    marginTop: -18,
  },

  titleRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
  },

  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    gap: 12,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: { width: "100%", height: "100%", resizeMode: "cover" },

  avatarEmoji: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: { fontSize: 14, fontWeight: "900", color: colors.text },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.mutedText,
    lineHeight: 18,
  },
  cardTime: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "900",
    color: "#2E6FE8",
  },
});
