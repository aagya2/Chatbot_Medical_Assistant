// app/home.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { images, doctors } from "../src/assets/assets";

import { DoctorCard } from "../src/components/DoctorCard";
import { ChatbotFloating } from "../src/components/ChatbotFloating";
import { BottomNav } from "../src/components/BottomNav";

export default function Home() {
  const goAppointments = () => {
  router.push(`/appointments?doctor=${encodeURIComponent("Medica Hospital")}&speciality=${encodeURIComponent("General")}` as any);
};



  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.brand}>Medica</Text>
          </View>

          <Pressable style={styles.menuBtn} onPress={() => {}}>
            <Text style={styles.menuTxt}>≡</Text>
          </Pressable>
        </View>

        <Text style={styles.subtitle}>All service for your health</Text>

        {/* Search */}
        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Search for doctors, medicines..."
            placeholderTextColor={colors.mutedText}
            style={styles.search}
          />
        </View>

        {/* Services */}
        <View style={styles.servicesRow}>
          <ServiceMini
            title="Doctor"
            emoji="🧑‍⚕️"
            onPress={() => router.push("/specialties" as any)}
          />
          <ServiceMini
            title="Pharmacy"
            emoji="💊"
            onPress={() => router.push("/pharmacy" as any)}
          />
          <ServiceMini
            title="Ambulance"
            emoji="🚑"
            onPress={() => router.push("/ambulance" as any)}
          />
        </View>

        {/* Hospital banner */}
        <View style={styles.hospitalCard}>
          <Image source={images.hospital} style={styles.hospitalImg} />
          <View style={styles.hospitalOverlay}>
            <Text style={styles.hospitalTitle}>Care that feels personal.</Text>
            <Text style={styles.hospitalQuote}>
              “Your health is our first priority.”
            </Text>

            <Pressable style={styles.appointmentBtn} onPress={goAppointments}>
              <Text style={styles.appointmentBtnText}>Make an appointment</Text>
            </Pressable>
          </View>
        </View>

        {/* Top specialists */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Top Specialists</Text>
          <Pressable onPress={() => router.push("/specialties" as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {/* Specialists (works even if extra ones not added yet) */}
        <DoctorCard name="Dr. Lisa" speciality="Cardiology" rating="4.5" image={doctors.lisa} />
        <DoctorCard name="Dr. Oliver" speciality="Dermatology" rating="4.3" image={doctors.oliver} />
        <DoctorCard name="Dr. Elly" speciality="Dentistry" rating="4.6" image={doctors.elly} />
        <DoctorCard name="Dr. Yadav" speciality="General Physician" rating="4.7" image={doctors.yadav} />

        {doctors.bharti && (
          <DoctorCard name="Dr. Bharti" speciality="Neurology" rating="4.6" image={doctors.bharti} />
        )}
        {doctors.bhattarai && (
          <DoctorCard name="Dr. Bhattarai" speciality="Orthopedics" rating="4.4" image={doctors.bhattarai} />
        )}
        {doctors.sandhya && (
          <DoctorCard name="Dr. Sandhya" speciality="Gynecology" rating="4.8" image={doctors.sandhya} />
        )}
      </ScrollView>

        <ChatbotFloating
        username="User"
        delayMs={4500}
        autoHideMs={4500}
        onOpen={() => {}}
/>

      {/* ✅ Bottom nav (recents ONLY on phone icon) */}
      <BottomNav
        active="home"
        onPress={(key) => {
          if (key === "home") router.navigate("/home" as any);
          if (key === "notify") router.navigate("/notifications" as any);
          if (key === "phone") router.navigate("/recents" as any); // ✅ recents here only
          if (key === "message") router.navigate("/chat" as any);  // ✅ chat here only
        }}
      />
    </View>
  );
}

function ServiceMini({
  title,
  emoji,
  onPress,
}: {
  title: string;
  emoji: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.servicePress} onPress={onPress}>
      <View style={styles.serviceIcon}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
      <Text style={styles.serviceText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  scrollContent: {
    paddingTop: spacing.xl,
    paddingBottom: 140,
  },

  header: {
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 30, height: 30, resizeMode: "contain" },
  brand: { fontSize: 22, fontWeight: "900", color: colors.text },

  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTxt: { fontSize: 20, fontWeight: "900", color: colors.text },

  subtitle: {
    paddingHorizontal: spacing.xl,
    marginTop: 10,
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "700",
  },

  searchWrap: { paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  search: {
    height: 46,
    borderRadius: 18,
    backgroundColor: "#F2F7FF",
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: "#E6F0FF",
    fontSize: 14,
    color: colors.text,
  },

  servicesRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  servicePress: { width: "31%", alignItems: "center" },
  serviceIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#EAF3FF",
    borderWidth: 1,
    borderColor: "#DCEBFF",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "800",
    color: colors.text,
  },

  hospitalCard: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#EEF6FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },
  hospitalImg: { width: "100%", height: 150, resizeMode: "cover" },
  hospitalOverlay: { padding: spacing.lg },
  hospitalTitle: { fontSize: 16, fontWeight: "900", color: colors.text },
  hospitalQuote: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: colors.mutedText,
  },

  appointmentBtn: {
    marginTop: spacing.md,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  appointmentBtnText: { color: "#fff", fontWeight: "900", fontSize: 14 },

  sectionRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "900", color: colors.text },
  seeAll: { fontSize: 12, fontWeight: "800", color: colors.primary },
});
