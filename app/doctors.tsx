// app/doctors.tsx

import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { doctors as doctorImgs } from "../src/assets/assets";

import { DoctorCard } from "../src/components/DoctorCard";
import { ChatbotFloating } from "../src/components/ChatbotFloating";

type Doc = {
  id: string; // ✅ used for doctor details route
  name: string;
  specialityKey: string; // must match specialties.tsx keys
  specialityLabel: string; // shown on UI
  rating: string;
  image: any;
};

const ALL_DOCTORS: Doc[] = [
  // ✅ General Physician
  {
    id: "dr-yadav",
    name: "Dr. Yadav",
    specialityKey: "general",
    specialityLabel: "General Physician",
    rating: "4.7",
    image: doctorImgs.yadav,
  },
  {
    id: "dr-bharti",
    name: "Dr. Bharti",
    specialityKey: "general",
    specialityLabel: "General Physician",
    rating: "4.6",
    image: doctorImgs.bharti,
  },
  {
    id: "dr-bhattarai",
    name: "Dr. Bhattarai",
    specialityKey: "general",
    specialityLabel: "General Physician",
    rating: "4.5",
    image: doctorImgs.bhattarai,
  },

  // ✅ Cardiology
  {
    id: "dr-lisa",
    name: "Dr. Lisa",
    specialityKey: "cardiology",
    specialityLabel: "Cardiology",
    rating: "4.5",
    image: doctorImgs.lisa,
  },
  {
    id: "dr-regmi",
    name: "Dr. Regmi",
    specialityKey: "cardiology",
    specialityLabel: "Cardiology",
    rating: "4.7",
    image: doctorImgs.regmi,
  },

  // ✅ Dermatology
  {
    id: "dr-oliver",
    name: "Dr. Oliver",
    specialityKey: "dermatology",
    specialityLabel: "Dermatology",
    rating: "4.3",
    image: doctorImgs.oliver,
  },
  {
    id: "dr-adhikari",
    name: "Dr. Adhikari",
    specialityKey: "dermatology",
    specialityLabel: "Dermatology",
    rating: "4.6",
    image: doctorImgs.adhikari,
  },

  // ✅ Dentistry
  {
    id: "dr-elly",
    name: "Dr. Elly",
    specialityKey: "dentistry",
    specialityLabel: "Dentistry",
    rating: "4.6",
    image: doctorImgs.elly,
  },
  {
    id: "dr-parajuli",
    name: "Dr. Parajuli",
    specialityKey: "dentistry",
    specialityLabel: "Dentistry",
    rating: "4.5",
    image: doctorImgs.parajuli,
  },

  // ✅ Neurology
  {
    id: "dr-sangeeta",
    name: "Dr. Sangeeta",
    specialityKey: "neurology",
    specialityLabel: "Neurology",
    rating: "4.7",
    image: doctorImgs.sangeeta,
  },

  // ✅ Pediatrics
  {
    id: "dr-sandhya",
    name: "Dr. Sandhya",
    specialityKey: "pediatrics",
    specialityLabel: "Pediatrics",
    rating: "4.8",
    image: doctorImgs.sandhya,
  },

  // ✅ Orthopedics
  {
    id: "dr-regmi-ortho",
    name: "Dr. Regmi",
    specialityKey: "orthopedics",
    specialityLabel: "Orthopedics",
    rating: "4.6",
    image: doctorImgs.regmi,
  },
];

export default function Doctors() {
  const params = useLocalSearchParams();
  const speciality = String(params.speciality ?? "general");

  const filtered = useMemo(() => {
    return ALL_DOCTORS.filter((d) => d.specialityKey === speciality);
  }, [speciality]);

  const title = filtered[0]?.specialityLabel ?? "Doctors";

  const openDoctor = (doc: Doc) => {
    // ✅ This will open: app/doctor/[id].tsx (you must have that page)
    router.push(`/doctor/${doc.id}` as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>

        <Text style={styles.title}>{title}</Text>

        <View style={{ width: 44 }} />
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: 170 }}
      >
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No doctors found for this specialty yet.</Text>
        ) : (
          filtered.map((d) => (
            <Pressable
              key={d.id}
              onPress={() => openDoctor(d)}
              style={{ marginBottom: 2 }}
            >
              <DoctorCard
                name={d.name}
                speciality={d.specialityLabel}
                rating={d.rating}
                image={d.image}
              />
            </Pressable>
          ))
        )}
      </ScrollView>

      {/* Chatbot (NOT linked) */}
      <ChatbotFloating
        username="User"
        promptText="Hi User! Looking for doctor?"
        delayMs={4500}
        autoHideMs={4500}
        onOpen={() => {}} // ✅ no navigation
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    position: "relative",
  },

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

  empty: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
    fontSize: 14,
    fontWeight: "800",
    color: colors.mutedText,
  },
});
