// app/chat.tsx

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";

import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { BottomNav } from "../src/components/BottomNav";
import { images, doctors as doctorImgs, icons } from "../src/assets/assets";

type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar: ImageSourcePropType;
};

export default function Chat() {
  const [q, setQ] = useState("");

  // ✅ ONLY ONE hospital + doctors + pharmacy (no multiple hospitals)
  const CHATS: ChatItem[] = [
    {
      id: "dr-lisa",
      name: "Dr. Lisa",
      lastMessage: "ok",
      time: "5 days ago",
      avatar: doctorImgs.lisa,
    },
    {
      id: "medica-hospital",
      name: "Medica Hospital",
      lastMessage: "4 new messages",
      time: "8 days ago",
      unread: 4,
      avatar: images.hospital, // ✅ one hospital only
    },
    {
      id: "pharmacy",
      name: "Medica Pharmacy",
      lastMessage: "2 new messages",
      time: "Nov 4, 2025",
      unread: 2,
      avatar: icons.pharmacy, // ✅ pharmacy icon image
    },
    {
      id: "dr-oliver",
      name: "Dr. Oliver",
      lastMessage: "Seen",
      time: "Nov 4, 2025",
      avatar: doctorImgs.oliver,
    },
    {
      id: "dr-elly",
      name: "Dr. Elly",
      lastMessage: "Seen",
      time: "Dec 6, 2025",
      avatar: doctorImgs.elly,
    },
    {
      id: "dr-yadav",
      name: "Dr. Yadav",
      lastMessage: "How are you feeling today?",
      time: "Dec 7, 2025",
      avatar: doctorImgs.yadav,
    },
  ];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CHATS;
    return CHATS.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.lastMessage.toLowerCase().includes(s)
    );
  }, [q]);

  const topAvatars = [
    doctorImgs.lisa,
    doctorImgs.oliver,
    doctorImgs.elly,
    doctorImgs.yadav,
    // If you have more doctor images in assets.ts, you can add them here too.
  ];

  const openChat = (item: ChatItem) => {
  router.push(`/chat/${item.id}` as any);
};


  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header (Blue + curve) */}
        <View style={styles.headerBlue}>
          <View style={styles.headerTopRow}>
            <View style={styles.brandRow}>
              <Image source={images.logo} style={styles.brandLogo} />
              <Text style={styles.brandText}>Medica</Text>
            </View>

            <Pressable style={styles.hamburger} onPress={() => {}}>
              <Text style={styles.hamburgerText}>≡</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.whiteCurve} />

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Messages</Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search"
            placeholderTextColor="#7A8CA4"
            style={styles.searchInput}
          />
        </View>

        {/* Avatar row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.avatarRow}
        >
          {topAvatars.map((src, idx) => (
            <View key={idx} style={styles.avatarCircle}>
              <Image source={src} style={styles.avatarCircleImg} />
            </View>
          ))}
        </ScrollView>

        {/* Chat list */}
        <View style={{ marginTop: spacing.lg }}>
          {filtered.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => openChat(item)}
              style={styles.chatCard}
            >
              <View style={styles.avatarWrap}>
                <Image source={item.avatar} style={styles.avatarImg} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text
                  style={[
                    styles.msg,
                    item.unread ? styles.msgUnread : undefined,
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
              </View>

              <View style={styles.rightCol}>
                <Text style={styles.time}>{item.time}</Text>

                {!!item.unread && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}

          {filtered.length === 0 && (
            <Text style={styles.empty}>No messages found.</Text>
          )}
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <BottomNav
        active={"message" as any}
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
    paddingBottom: 110, // space for bottom nav
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
  brandText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0B1B2B",
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

  // Premium curve
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

  avatarRow: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    gap: 12,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
  },
  avatarCircleImg: { width: "100%", height: "100%", resizeMode: "cover" },

  chatCard: {
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
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%", resizeMode: "cover" },

  name: { fontSize: 14.5, fontWeight: "900", color: colors.text },
  msg: {
    marginTop: 4,
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.mutedText,
  },
  msgUnread: { color: "#0B1B2B" },

  rightCol: { alignItems: "flex-end", gap: 8 },
  time: { fontSize: 12, fontWeight: "900", color: "#2E6FE8" },

  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 7,
    backgroundColor: "#4FA3F7",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  empty: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    fontSize: 14,
    fontWeight: "800",
    color: colors.mutedText,
  },
});
