import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "../../src/themes/colors";
import { spacing } from "../../src/themes/spacing";
import { doctors as doctorImgs } from "../../src/assets/assets";
import { ChatbotFloating } from "../../src/components/ChatbotFloating";

type DoctorDetail = {
  id: string;
  name: string;
  title: string; // department label shown
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
  // =========================
  // ✅ GENERAL PHYSICIAN
  // =========================
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
    availability: "Sunday–Friday",
  },
  "dr-bharti": {
    id: "dr-bharti",
    name: "Dr. Bharti",
    title: "General Physician",
    image: doctorImgs.bharti,
    rating: "4.6",
    about:
      "Dr. Bharti supports patients with common illnesses, chronic condition follow-ups, and wellness planning with practical guidance.",
    education: "MBBS",
    focus: "Primary Care, Chronic Care, Wellness",
    languages: "Hindi, English, Nepali",
    experience: "12 years",
    specialization: "Primary Care",
    availability: "Monday–Saturday",
  },
  "dr-bhattarai": {
    id: "dr-bhattarai",
    name: "Dr. Bhattarai",
    title: "General Physician",
    image: doctorImgs.bhattarai,
    rating: "4.5",
    about:
      "Dr. Bhattarai provides careful evaluation of symptoms, health screening, and long-term care planning for families.",
    education: "MBBS, MD",
    focus: "Family Health, Preventive Screening",
    languages: "Nepali, English, Hindi",
    experience: "10 years",
    specialization: "General Medicine",
    availability: "Sunday–Thursday",
  },
  "dr-amita": {
    id: "dr-amita",
    name: "Dr. Amita",
    title: "General Physician",
    image: doctorImgs.amita,
    rating: "4.6",
    about:
      "Dr. Amita focuses on everyday health concerns, lifestyle guidance, and early diagnosis through patient-friendly consultations.",
    education: "MBBS",
    focus: "General Medicine, Lifestyle Guidance",
    languages: "English, Hindi, Nepali",
    experience: "9 years",
    specialization: "General Physician",
    availability: "Monday–Friday",
  },
  "dr-hemant": {
    id: "dr-hemant",
    name: "Dr. Hemant",
    title: "General Physician",
    image: doctorImgs.hemant,
    rating: "4.5",
    about:
      "Dr. Hemant supports patients with seasonal illnesses, routine checkups, and chronic health monitoring.",
    education: "MBBS",
    focus: "Primary Care, Routine Health Checks",
    languages: "English, Hindi",
    experience: "8 years",
    specialization: "Primary Care",
    availability: "Sunday–Friday",
  },
  "dr-manoj": {
    id: "dr-manoj",
    name: "Dr. Manoj",
    title: "General Physician",
    image: doctorImgs.manoj,
    rating: "4.4",
    about:
      "Dr. Manoj provides primary medical support, health screenings, and guidance for common conditions.",
    education: "MBBS",
    focus: "General Checkups, Basic Diagnostics",
    languages: "English, Hindi, Nepali",
    experience: "7 years",
    specialization: "General Medicine",
    availability: "Monday–Saturday",
  },
  "dr-rinky": {
    id: "dr-rinky",
    name: "Dr. Rinky",
    title: "General Physician",
    image: doctorImgs.rinky,
    rating: "4.6",
    about:
      "Dr. Rinky offers supportive care for everyday health issues and encourages preventive routines for long-term wellness.",
    education: "MBBS",
    focus: "Preventive Care, Primary Care",
    languages: "English, Hindi",
    experience: "9 years",
    specialization: "General Physician",
    availability: "Monday–Friday",
  },

  // =========================
  // ✅ CARDIOLOGY
  // =========================
  "dr-lisa": {
    id: "dr-lisa",
    name: "Dr. Lisa",
    title: "Cardiology",
    image: doctorImgs.lisa,
    rating: "4.5",
    about:
      "Dr. Lisa provides heart health evaluation, blood pressure management, and long-term cardiac risk reduction planning.",
    education: "MBBS, MD (Cardiology)",
    focus: "Heart Health, BP, Preventive Cardiology",
    languages: "English",
    experience: "11 years",
    specialization: "Cardiology",
    availability: "Monday–Friday",
  },
  "dr-regmi": {
    id: "dr-regmi",
    name: "Dr. Regmi",
    title: "Cardiology",
    image: doctorImgs.regmi,
    rating: "4.7",
    about:
      "Dr. Regmi is focused on cardiovascular care including lipid control, ECG evaluation, and heart-safe lifestyle guidance.",
    education: "MBBS, MD (Cardiology)",
    focus: "Cardiac Care, ECG, Cholesterol Control",
    languages: "Nepali, English, Hindi",
    experience: "14 years",
    specialization: "Cardiology",
    availability: "Sunday–Thursday",
  },
  "dr-aquila": {
    id: "dr-aquila",
    name: "Dr. Aquila",
    title: "Cardiology",
    image: doctorImgs.aquila,
    rating: "4.7",
    about:
      "Dr. Aquila supports patients with heart rhythm concerns, hypertension, and preventive cardiac plans.",
    education: "MBBS, MD (Cardiology)",
    focus: "Hypertension, Rhythm, Prevention",
    languages: "English, Hindi",
    experience: "10 years",
    specialization: "Cardiology",
    availability: "Monday–Saturday",
  },
  "dr-apurb": {
    id: "dr-apurb",
    name: "Dr. Apurb",
    title: "Cardiology",
    image: doctorImgs.apurb,
    rating: "4.6",
    about:
      "Dr. Apurb provides cardiac consultations with emphasis on lifestyle, diet, and stress management for heart health.",
    education: "MBBS, MD (Cardiology)",
    focus: "Cardiac Risk, Lifestyle, Cholesterol",
    languages: "English, Nepali",
    experience: "9 years",
    specialization: "Cardiology",
    availability: "Sunday–Friday",
  },
  "dr-milan": {
    id: "dr-milan",
    name: "Dr. Milan",
    title: "Cardiology",
    image: doctorImgs.milan,
    rating: "4.5",
    about:
      "Dr. Milan focuses on preventive cardiology and long-term monitoring of heart conditions.",
    education: "MBBS, MD (Cardiology)",
    focus: "Preventive Cardiology, Monitoring",
    languages: "English, Hindi",
    experience: "8 years",
    specialization: "Cardiology",
    availability: "Monday–Friday",
  },
  "dr-poonam": {
    id: "dr-poonam",
    name: "Dr. Poonam",
    title: "Cardiology",
    image: doctorImgs.poonam,
    rating: "4.6",
    about:
      "Dr. Poonam helps patients manage BP, chest discomfort evaluation, and long-term heart risk reduction.",
    education: "MBBS, MD (Cardiology)",
    focus: "BP, Risk Reduction, Heart Health",
    languages: "English, Hindi",
    experience: "10 years",
    specialization: "Cardiology",
    availability: "Monday–Saturday",
  },
  "dr-satyadeep": {
    id: "dr-satyadeep",
    name: "Dr. Satyadeep",
    title: "Cardiology",
    image: doctorImgs.satyadeep,
    rating: "4.7",
    about:
      "Dr. Satyadeep provides cardiac care with focus on diagnostics, follow-up planning, and prevention.",
    education: "MBBS, MD (Cardiology)",
    focus: "Diagnostics, Follow-ups, Prevention",
    languages: "English, Hindi",
    experience: "12 years",
    specialization: "Cardiology",
    availability: "Sunday–Friday",
  },

  // =========================
  // ✅ DERMATOLOGY
  // =========================
  "dr-oliver": {
    id: "dr-oliver",
    name: "Dr. Oliver",
    title: "Dermatology",
    image: doctorImgs.oliver,
    rating: "4.3",
    about:
      "Dr. Oliver treats common skin, hair, and nail conditions with evidence-based skincare guidance.",
    education: "MBBS, MD (Dermatology)",
    focus: "Skin Care, Acne, Allergies",
    languages: "English",
    experience: "7 years",
    specialization: "Dermatology",
    availability: "Monday–Friday",
  },
  "dr-adhikari": {
    id: "dr-adhikari",
    name: "Dr. Adhikari",
    title: "Dermatology",
    image: doctorImgs.adhikari,
    rating: "4.6",
    about:
      "Dr. Adhikari supports skin health with modern dermatology care and personalized treatment planning.",
    education: "MBBS, MD (Dermatology)",
    focus: "Acne, Pigmentation, Skin Allergy",
    languages: "Nepali, English, Hindi",
    experience: "9 years",
    specialization: "Dermatology",
    availability: "Sunday–Thursday",
  },
  "dr-jeena": {
    id: "dr-jeena",
    name: "Dr. Jeena",
    title: "Dermatology",
    image: doctorImgs.jeena,
    rating: "4.6",
    about:
      "Dr. Jeena provides skin and hair care consultations with a focus on clear, practical routines.",
    education: "MBBS, MD (Dermatology)",
    focus: "Acne, Hair Fall, Skin Health",
    languages: "English, Hindi",
    experience: "8 years",
    specialization: "Dermatology",
    availability: "Monday–Saturday",
  },
  "dr-sakshi": {
    id: "dr-sakshi",
    name: "Dr. Sakshi",
    title: "Dermatology",
    image: doctorImgs.sakshi,
    rating: "4.7",
    about:
      "Dr. Sakshi focuses on dermatology care including allergy evaluation, eczema, and skincare routines.",
    education: "MBBS, MD (Dermatology)",
    focus: "Eczema, Allergy, Skincare",
    languages: "English, Hindi",
    experience: "10 years",
    specialization: "Dermatology",
    availability: "Sunday–Friday",
  },
  "dr-susmita": {
    id: "dr-susmita",
    name: "Dr. Susmita",
    title: "Dermatology",
    image: doctorImgs.susmita,
    rating: "4.7",
    about:
      "Dr. Susmita helps patients with skin wellness and treatment plans tailored to individual needs.",
    education: "MBBS, MD (Dermatology)",
    focus: "Skin Wellness, Treatment Plans",
    languages: "English, Nepali",
    experience: "9 years",
    specialization: "Dermatology",
    availability: "Monday–Friday",
  },
  "dr-ranjit": {
    id: "dr-ranjit",
    name: "Dr. Ranjit",
    title: "Dermatology",
    image: doctorImgs.ranjit,
    rating: "4.5",
    about:
      "Dr. Ranjit provides dermatology support for common skin conditions with clear patient education.",
    education: "MBBS, MD (Dermatology)",
    focus: "Skin Allergy, Acne, Rashes",
    languages: "English, Hindi",
    experience: "8 years",
    specialization: "Dermatology",
    availability: "Monday–Saturday",
  },
  "dr-sabina": {
    id: "dr-sabina",
    name: "Dr. Sabina",
    title: "Dermatology",
    image: doctorImgs.sabina,
    rating: "4.6",
    about:
      "Dr. Sabina focuses on healthy skin routines and management of everyday dermatology concerns.",
    education: "MBBS, MD (Dermatology)",
    focus: "Skincare, Rashes, Acne",
    languages: "English, Hindi",
    experience: "7 years",
    specialization: "Dermatology",
    availability: "Sunday–Thursday",
  },

  // =========================
  // ✅ DENTISTRY
  // =========================
  "dr-elly": {
    id: "dr-elly",
    name: "Dr. Elly",
    title: "Dentistry",
    image: doctorImgs.elly,
    rating: "4.6",
    about:
      "Dr. Elly provides dental checkups, cleanings, and guidance for daily oral hygiene.",
    education: "BDS",
    focus: "Dental Checkups, Cleaning, Oral Care",
    languages: "English",
    experience: "8 years",
    specialization: "Dentistry",
    availability: "Monday–Friday",
  },
  "dr-parajuli": {
    id: "dr-parajuli",
    name: "Dr. Parajuli",
    title: "Dentistry",
    image: doctorImgs.parajuli,
    rating: "4.5",
    about:
      "Dr. Parajuli supports patients with preventive dentistry and friendly dental care experience.",
    education: "BDS, MDS",
    focus: "Preventive Dentistry, Oral Health",
    languages: "Nepali, English, Hindi",
    experience: "11 years",
    specialization: "Dentistry",
    availability: "Sunday–Thursday",
  },
  "dr-palistha": {
    id: "dr-palistha",
    name: "Dr. Palistha",
    title: "Dentistry",
    image: doctorImgs.palistha,
    rating: "4.6",
    about:
      "Dr. Palistha focuses on gentle dental care, cleaning, and pain-free consultation guidance.",
    education: "BDS",
    focus: "Cleaning, Cavity Care, Oral Hygiene",
    languages: "English, Hindi",
    experience: "7 years",
    specialization: "Dentistry",
    availability: "Monday–Saturday",
  },
  "dr-parbesh": {
    id: "dr-parbesh",
    name: "Dr. Parbesh",
    title: "Dentistry",
    image: doctorImgs.parbesh,
    rating: "4.5",
    about:
      "Dr. Parbesh provides dental checkups and helps patients maintain strong oral hygiene habits.",
    education: "BDS",
    focus: "Checkups, Oral Care, Dental Hygiene",
    languages: "English, Nepali",
    experience: "6 years",
    specialization: "Dentistry",
    availability: "Sunday–Friday",
  },
  "dr-manish": {
    id: "dr-manish",
    name: "Dr. Manish",
    title: "Dentistry",
    image: doctorImgs.manish,
    rating: "4.6",
    about:
      "Dr. Manish provides routine dental care with a focus on comfortable patient experience.",
    education: "BDS",
    focus: "Oral Care, Cleaning, Basic Dental Care",
    languages: "English, Hindi",
    experience: "8 years",
    specialization: "Dentistry",
    availability: "Monday–Friday",
  },

  // =========================
  // ✅ NEUROLOGY
  // =========================
  "dr-sangeeta": {
    id: "dr-sangeeta",
    name: "Dr. Sangeeta",
    title: "Neurology",
    image: doctorImgs.sangeeta,
    rating: "4.7",
    about:
      "Dr. Sangeeta supports patients with headache evaluation, nerve-related symptoms, and neurology follow-up care.",
    education: "MBBS, MD (Neurology)",
    focus: "Headache, Nerve Health, Follow-ups",
    languages: "Nepali, English, Hindi",
    experience: "13 years",
    specialization: "Neurology",
    availability: "Monday–Friday",
  },
  "dr-sumit": {
    id: "dr-sumit",
    name: "Dr. Sumit",
    title: "Neurology",
    image: doctorImgs.sumit,
    rating: "4.5",
    about:
      "Dr. Sumit supports neurology consultations for nerve pain, migraines, and symptom monitoring.",
    education: "MBBS, MD (Neurology)",
    focus: "Migraines, Nerve Pain, Monitoring",
    languages: "English, Hindi",
    experience: "9 years",
    specialization: "Neurology",
    availability: "Sunday–Thursday",
  },
  "dr-ambuj": {
    id: "dr-ambuj",
    name: "Dr. Ambuj",
    title: "Neurology",
    image: doctorImgs.ambuj,
    rating: "4.6",
    about:
      "Dr. Ambuj provides neurology care focused on diagnosis, medication guidance, and follow-up planning.",
    education: "MBBS, MD (Neurology)",
    focus: "Diagnosis, Follow-ups, Guidance",
    languages: "English, Hindi",
    experience: "10 years",
    specialization: "Neurology",
    availability: "Monday–Saturday",
  },
  "dr-satish": {
    id: "dr-satish",
    name: "Dr. Satish",
    title: "Neurology",
    image: doctorImgs.satish,
    rating: "4.7",
    about:
      "Dr. Satish focuses on patient-friendly neurology care and long-term symptom tracking plans.",
    education: "MBBS, MD (Neurology)",
    focus: "Symptom Tracking, Follow-ups",
    languages: "English, Hindi",
    experience: "12 years",
    specialization: "Neurology",
    availability: "Sunday–Friday",
  },

  // =========================
  // ✅ PEDIATRICS
  // =========================
  "dr-sandhya": {
    id: "dr-sandhya",
    name: "Dr. Sandhya",
    title: "Pediatrics",
    image: doctorImgs.sandhya,
    rating: "4.8",
    about:
      "Dr. Sandhya provides child healthcare with focus on growth, nutrition, vaccinations, and family guidance.",
    education: "MBBS, MD (Pediatrics)",
    focus: "Child Health, Vaccinations, Nutrition",
    languages: "Nepali, English, Hindi",
    experience: "12 years",
    specialization: "Pediatrics",
    availability: "Monday–Saturday",
  },
  "dr-manita": {
    id: "dr-manita",
    name: "Dr. Manita",
    title: "Pediatrics",
    image: doctorImgs.manita,
    rating: "4.7",
    about:
      "Dr. Manita supports parents with child wellness planning, vaccinations, and routine pediatric checkups.",
    education: "MBBS, MD (Pediatrics)",
    focus: "Vaccination, Growth Monitoring",
    languages: "English, Hindi",
    experience: "9 years",
    specialization: "Pediatrics",
    availability: "Sunday–Thursday",
  },
  "dr-kripa": {
    id: "dr-kripa",
    name: "Dr. Kripa",
    title: "Pediatrics",
    image: doctorImgs.kripa,
    rating: "4.6",
    about:
      "Dr. Kripa focuses on child health, nutrition guidance, and supportive follow-ups for parents.",
    education: "MBBS, MD (Pediatrics)",
    focus: "Nutrition, Child Care, Follow-ups",
    languages: "English, Nepali",
    experience: "8 years",
    specialization: "Pediatrics",
    availability: "Monday–Friday",
  },

  // =========================
  // ✅ ORTHOPEDICS
  // =========================
  "dr-regmi-ortho": {
    id: "dr-regmi-ortho",
    name: "Dr. Regmi",
    title: "Orthopedics",
    image: doctorImgs.regmi,
    rating: "4.6",
    about:
      "Dr. Regmi provides orthopedic consultations for joint pain, posture, mobility, and injury recovery planning.",
    education: "MBBS, MS (Orthopedics)",
    focus: "Joint Pain, Injury Recovery, Mobility",
    languages: "Nepali, English, Hindi",
    experience: "15 years",
    specialization: "Orthopedics",
    availability: "Sunday–Friday",
  },
  "dr-prajjwal": {
    id: "dr-prajjwal",
    name: "Dr. Prajjwal",
    title: "Orthopedics",
    image: doctorImgs.prajjwal,
    rating: "4.5",
    about:
      "Dr. Prajjwal helps with orthopedic care including back pain guidance and injury recovery support.",
    education: "MBBS, MS (Orthopedics)",
    focus: "Back Pain, Injury Recovery, Mobility",
    languages: "English, Hindi",
    experience: "8 years",
    specialization: "Orthopedics",
    availability: "Monday–Saturday",
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
    router.push(
      `/appointments?doctor=${encodeURIComponent(doc.name)}&speciality=${encodeURIComponent(doc.title)}` as any
    );
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

        {/* Book appointment */}
        <Pressable style={styles.bookBtn} onPress={bookAppointment}>
          <Text style={styles.bookBtnText}>Book Appointment</Text>
        </Pressable>

        <Text style={styles.note}>
          Tip: Bring previous reports (if any) for faster diagnosis.
        </Text>
      </ScrollView>

      {/* Chatbot */}
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
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 22,
    resizeMode: "cover",
    backgroundColor: "#D9ECFF",
  },
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
  star: { fontSize: 14, fontWeight: "900", color: "#D4AF37" },
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