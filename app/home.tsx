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
    router.push(
      `/appointments?doctor=${encodeURIComponent(
        "Medica Hospital"
      )}&speciality=${encodeURIComponent("General")}` as any
    );
  };

  // ✅ Safe logo source (prevents “missing”)
  const logoSrc = (images as any)?.logo;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header (Premium) */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            {/* ✅ If logo exists, show it. Else show placeholder */}
            {logoSrc ? (
              <Image source={logoSrc} style={styles.logo} />
            ) : (
              <View style={styles.logoFallback}>
                <Text style={styles.logoFallbackText}>M</Text>
              </View>
            )}

            <View>
              <Text style={styles.brand}>Medica</Text>
              <Text style={styles.welcome}>Welcome back</Text>
            </View>
          </View>

          {/* Hamburger opens Profile */}
          <View style={{ position: "relative" }}>
            <Pressable
              style={styles.menuBtn}
              onPress={() => router.push("/profile" as any)}
              android_ripple={{ color: "rgba(0,0,0,0.06)" }}
            >
              <Text style={styles.menuTxt}>≡</Text>
            </Pressable>

            <View style={styles.dot} />
          </View>
        </View>

        <Text style={styles.subtitle}>All service for your health</Text>

        {/* Search */}
        <View style={styles.searchWrap}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search doctors, pharmacy, reports..."
              placeholderTextColor="#7A8CA4"
              style={styles.searchInput}
            />
          </View>
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

            <Pressable
              style={styles.appointmentBtn}
              onPress={goAppointments}
              android_ripple={{ color: "rgba(255,255,255,0.25)" }}
            >
              <Text style={styles.appointmentBtnText}>Make an appointment</Text>
            </Pressable>
          </View>
        </View>

        {/* Top specialists */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Top Specialists</Text>
          <Pressable
            onPress={() => router.push("/specialties" as any)}
            android_ripple={{ color: "rgba(0,0,0,0.05)" }}
            style={styles.seeAllBtn}
          >
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {/* Doctor list (keep your existing list or premium list) */}
        <DoctorCard
          name="Dr. Lisa"
          speciality="Cardiology"
          rating="4.5"
          image={doctors.lisa}
          fee={700}
          experience="12 yrs"
          status="online"
          onPress={() => router.push("/doctor/dr-lisa" as any)}
          onBook={() =>
            router.push(
              `/appointments?doctor=${encodeURIComponent(
                "Dr. Lisa"
              )}&speciality=${encodeURIComponent("Cardiology")}` as any
            )
          }
        />

        <DoctorCard
          name="Dr. Oliver"
          speciality="Dermatology"
          rating="4.3"
          image={doctors.oliver}
          fee={600}
          experience="9 yrs"
          status="offline"
          onPress={() => router.push("/doctor/dr-oliver" as any)}
          onBook={() =>
            router.push(
              `/appointments?doctor=${encodeURIComponent(
                "Dr. Oliver"
              )}&speciality=${encodeURIComponent("Dermatology")}` as any
            )
          }
        />

        <DoctorCard
          name="Dr. Elly"
          speciality="Dentistry"
          rating="4.6"
          image={doctors.elly}
          fee={500}
          experience="10 yrs"
          status="online"
          onPress={() => router.push("/doctor/dr-elly" as any)}
          onBook={() =>
            router.push(
              `/appointments?doctor=${encodeURIComponent(
                "Dr. Elly"
              )}&speciality=${encodeURIComponent("Dentistry")}` as any
            )
          }
        />

        <DoctorCard
          name="Dr. Yadav"
          speciality="General Physician"
          rating="4.7"
          image={doctors.yadav}
          fee={800}
          experience="18 yrs"
          status="online"
          onPress={() => router.push("/doctor/dr-yadav" as any)}
          onBook={() =>
            router.push(
              `/appointments?doctor=${encodeURIComponent(
                "Dr. Yadav"
              )}&speciality=${encodeURIComponent("General Physician")}` as any
            )
          }
        />
      </ScrollView>

      <ChatbotFloating
        username="User"
        delayMs={4500}
        autoHideMs={4500}
        onOpen={() => {}}
      />

      <BottomNav
        active="home"
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
    <Pressable
      style={styles.servicePress}
      onPress={onPress}
      android_ripple={{ color: "rgba(0,0,0,0.06)" }}
    >
      <View style={styles.serviceIcon}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
      <Text style={styles.serviceText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  scrollContent: { paddingTop: spacing.xl, paddingBottom: 140 },

  header: {
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },

  logo: { width: 34, height: 34, resizeMode: "contain" },

  // ✅ Fallback logo if images.logo is missing
  logoFallback: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#D9ECFF",
    borderWidth: 1,
    borderColor: "#BFDFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoFallbackText: { fontWeight: "900", color: "#0B1B2B" },

  brand: { fontSize: 22, fontWeight: "900", color: colors.text },
  welcome: { marginTop: 2, fontSize: 12, fontWeight: "800", color: colors.mutedText },

  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  menuTxt: { fontSize: 20, fontWeight: "900", color: colors.text },

  dot: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
    borderWidth: 2,
    borderColor: "#F2F7FF",
  },

  subtitle: {
    paddingHorizontal: spacing.xl,
    marginTop: 10,
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "700",
  },

  searchWrap: { paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  searchBox: {
    height: 52,
    borderRadius: 18,
    backgroundColor: "#D9ECFF",
    borderWidth: 1,
    borderColor: "#BFDFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchIcon: { fontSize: 16, opacity: 0.75, width: 22 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#0B1B2B",
    paddingLeft: 8,
  },

  servicesRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  servicePress: { width: "31%", alignItems: "center", borderRadius: 18, overflow: "hidden" },
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
  serviceText: { marginTop: 8, fontSize: 12, fontWeight: "800", color: colors.text },

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
  hospitalQuote: { marginTop: 6, fontSize: 12, fontWeight: "700", color: colors.mutedText },

  appointmentBtn: {
    marginTop: spacing.md,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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

  seeAllBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, overflow: "hidden" },
  seeAll: { fontSize: 12, fontWeight: "800", color: colors.primary },
});