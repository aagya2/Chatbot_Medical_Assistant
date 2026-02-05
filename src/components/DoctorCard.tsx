// src/components/DoctorCard.tsx

import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { colors } from "../themes/colors";
import { spacing } from "../themes/spacing";

type Props = {
  name: string;
  speciality: string;
  rating: string;
  image: ImageSourcePropType;
};

export function DoctorCard({ name, speciality, rating, image }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.spec}>{speciality}</Text>
      </View>

      <View style={styles.ratingWrap}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#F5F9FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#D9ECFF",
    resizeMode: "cover",
  },
  name: { fontSize: 15, fontWeight: "900", color: colors.text },
  spec: { marginTop: 2, fontSize: 12, fontWeight: "700", color: colors.mutedText },

  ratingWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },

  // ✅ GOLD STAR
  star: {
    fontSize: 14,
    fontWeight: "900",
    color: "#F5B301", // golden
  },

  rating: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
  },
});
