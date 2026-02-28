// src/components/DoctorCard.tsx

import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from "react-native";
import { colors } from "../themes/colors";
import { spacing } from "../themes/spacing";

type Props = {
  name: string;
  speciality: string;
  rating: string;
  image: any;

  // ✅ NEW (optional)
  fee?: number; // e.g. 500
  experience?: string; // e.g. "8 yrs"
  status?: "online" | "offline"; // dot
  onPress?: () => void; // tap card
  onBook?: () => void; // tap book button
};

export function DoctorCard({
  name,
  speciality,
  rating,
  image,
  fee = 500,
  experience = "8 yrs",
  status = "online",
  onPress,
  onBook,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 30,
      bounciness: 0,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const dotColor = status === "online" ? "#1E8E3E" : "#9AA8B6";
  const statusText = status === "online" ? "Online" : "Offline";
  const badgeBg = status === "online" ? "#E8F6EC" : "#EEF2F7";
  const badgeTextColor = status === "online" ? "#1E8E3E" : "#5F6C7B";

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={styles.card}
        android_ripple={{ color: "rgba(0,0,0,0.05)" }}
      >
        {/* Left: Image */}
        <View style={styles.imageWrap}>
          <Image source={image} style={styles.image} />

          {/* ✅ Status Dot */}
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
        </View>

        {/* Right: Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.speciality} numberOfLines={1}>
            {speciality}
          </Text>

          {/* ✅ Row: Rating + Experience + Fee */}
          <View style={styles.metaRow}>
            <View style={styles.pill}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.pillText}>{rating}</Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>{experience}</Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>₹{fee}/visit</Text>
            </View>
          </View>

          {/* ✅ Row: Status Badge + Book button */}
          <View style={styles.bottomRow}>
            <View style={[styles.statusBadge, { backgroundColor: badgeBg }]}>
              <Text style={[styles.statusText, { color: badgeTextColor }]}>
                {statusText}
              </Text>
            </View>

            <Pressable
              onPress={onBook}
              style={styles.bookBtn}
              android_ripple={{ color: "rgba(255,255,255,0.25)" }}
            >
              <Text style={styles.bookBtnText}>Book Now</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    gap: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,

    overflow: "hidden", // for ripple nice edges
  },

  imageWrap: {
    width: 82,
    height: 82,
    borderRadius: 22,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
    position: "relative",
  },

  image: { width: "100%", height: "100%", resizeMode: "cover" },

  dot: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  info: { flex: 1, justifyContent: "center" },

  name: { fontSize: 16, fontWeight: "900", color: colors.text },
  speciality: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "800",
    color: colors.mutedText,
  },

  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },

  star: { fontSize: 12, fontWeight: "900", color: "#D4AF37" },
  pillText: { fontSize: 12, fontWeight: "900", color: colors.text },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  statusText: { fontSize: 11.5, fontWeight: "900" },

  bookBtn: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bookBtnText: { color: "#fff", fontWeight: "900", fontSize: 12.5 },
});