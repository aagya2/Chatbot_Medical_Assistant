import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "../../src/themes/colors";
import { spacing } from "../../src/themes/spacing";
import { doctors as doctorImgs } from "../../src/assets/assets";
import { ChatbotFloating } from "../../src/components/ChatbotFloating";

type DoctorDetail = {
  id: string;
  name: string;
  title: string;
  image: any;
  rating: string;
  about: string;
  education: string;
  focus: string;
  languages: string;
  experience: string;
  specialization: string;
  availability: string;
};

const DOCTOR_DETAILS: Record<string, DoctorDetail> = {
  "dr-yadav": {
    id: "dr-yadav",
    name: "Dr. Yadav",
    title: "General Physician",
    image: doctorImgs.yadav,
    rating: "4.7",
    about:
      "Dr. Yadav is a trusted General Physician focused on preventive care, accurate diagnosis, and friendly guidance for everyday health concerns.",
    education: "MBBS, MD",
    focus: "General Medicine, Preventive Care, Family Health",
    languages: "Nepali, Hindi, English, Maithili",
    experience: "18 years",
    specialization: "General Medicine",
    availability: "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday",
  },
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function DoctorDetails() {
  const params = useLocalSearchParams();
  const id = String(params.id ?? "dr-yadav");

  const doc = useMemo(() => DOCTOR_DETAILS[id], [id]);

  if (!doc) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.mutedText, fontWeight: "900" }}>Doctor not found.</Text>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { marginTop: 14 }]}>
          <Text style={styles.backTxt}>← Back</Text>
        </Pressable>
      </View>
    );
  }

const bookAppointment = () => {
  router.push(`/appointments?doctor=${encodeURIComponent(doc.name)}&speciality=${encodeURIComponent(doc.title)}` as any);
};


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backTxt}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Doctor Details</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <Image source={doc.image} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{doc.name}</Text>
            <Text style={styles.title}>{doc.title}</Text>

            <View style={styles.ratingPill}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.ratingText}>{doc.rating}</Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.about}>{doc.about}</Text>
        </View>

        {/* Info table */}
        <View style={styles.table}>
          <InfoRow label="Education" value={doc.education} />
          <InfoRow label="Area of Focus" value={doc.focus} />
          <InfoRow label="Language spoken" value={doc.languages} />
          <InfoRow label="Experience" value={doc.experience} />
          <InfoRow label="Medical Specialization" value={doc.specialization} />
          <InfoRow label="Availability" value={doc.availability} />
        </View>

        {/* Premium button */}
        <Pressable style={styles.bookBtn} onPress={bookAppointment}>
          <Text style={styles.bookBtnText}>Book Appointment</Text>
        </Pressable>

        <Text style={styles.note}>
          Tip: Bring previous reports (if any) for faster diagnosis.
        </Text>
      </ScrollView>

      {/* Chatbot (optional) */}
      <ChatbotFloating
        username="User"
        promptText="Hi User! Want to book an appointment?"
        delayMs={4500}
        autoHideMs={4500}
        onOpen={() => router.navigate("/chat" as any)}
      />
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
  headerTitle: { fontSize: 18, fontWeight: "900", color: colors.text },

  profileCard: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  avatar: { width: 78, height: 78, borderRadius: 22, resizeMode: "cover", backgroundColor: "#D9ECFF" },
  name: { fontSize: 18, fontWeight: "900", color: colors.text },
  title: { marginTop: 4, fontSize: 13, fontWeight: "800", color: colors.mutedText },

  ratingPill: {
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },
  star: { fontSize: 14, fontWeight: "900", color: "#D4AF37" }, // ✅ golden
  ratingText: { fontSize: 13, fontWeight: "900", color: colors.text },

  section: { marginHorizontal: spacing.xl, marginTop: spacing.lg },
  sectionTitle: { fontSize: 16, fontWeight: "900", color: colors.text },
  about: { marginTop: 8, fontSize: 13, fontWeight: "700", color: colors.mutedText, lineHeight: 19 },

  table: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
  },
  row: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF6FF",
  },
  rowLabel: { fontSize: 13, fontWeight: "900", color: colors.primary },
  rowValue: { marginTop: 6, fontSize: 13, fontWeight: "800", color: colors.text, lineHeight: 18 },

  bookBtn: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  bookBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  note: {
    marginHorizontal: spacing.xl,
    marginTop: 14,
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.mutedText,
    textAlign: "center",
  },
});
