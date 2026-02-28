// app/appointments.tsx

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";

const TIMES = ["09:00 AM", "10:30 AM", "11:30 AM", "01:00 PM", "03:00 PM", "05:30 PM"];

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : undefined]}
    >
      <Text style={[styles.chipText, active ? styles.chipTextActive : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function Appointments() {
  const params = useLocalSearchParams();

  // ✅ get doctor from link (optional)
  const doctorName = String(params.doctor ?? "Medica Hospital");
  const speciality = String(params.speciality ?? "General");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(""); // simple input so it works without extra libs
  const [time, setTime] = useState(TIMES[2]);

  const canSubmit = useMemo(() => {
    return (
      fullName.trim().length >= 2 &&
      phone.trim().length >= 6 &&
      date.trim().length >= 6 &&
      time.trim().length > 0
    );
  }, [fullName, phone, date, time]);

  const submit = () => {
    if (!canSubmit) {
      Alert.alert("Missing Info", "Please fill name, phone, date and select time.");
      return;
    }

    Alert.alert(
      "Appointment Requested ✅",
      `Doctor: ${doctorName}\nSpecialty: ${speciality}\nDate: ${date}\nTime: ${time}\n\nWe will contact you soon.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>
        <Text style={styles.title}>Book Appointment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Doctor card */}
        <View style={styles.doctorCard}>
          <Text style={styles.doctorTop}>Appointment with</Text>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.doctorSub}>{speciality}</Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your name"
            placeholderTextColor="#7A8CA4"
            style={styles.input}
          />

          <View style={{ height: 14 }} />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            placeholderTextColor="#7A8CA4"
            style={styles.input}
            keyboardType="phone-pad"
          />

          <View style={{ height: 14 }} />

          <Text style={styles.label}>Preferred Date</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="e.g. 12/03/2026"
            placeholderTextColor="#7A8CA4"
            style={styles.input}
          />

          <View style={{ height: 16 }} />

          <Text style={styles.label}>Select Time</Text>
          <View style={styles.chipsRow}>
            {TIMES.map((t) => (
              <Chip key={t} label={t} active={t === time} onPress={() => setTime(t)} />
            ))}
          </View>

          <View style={{ height: 16 }} />

          <Text style={styles.label}>Reason (optional)</Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Short note about your problem"
            placeholderTextColor="#7A8CA4"
            style={[styles.input, { height: 90, textAlignVertical: "top", paddingTop: 12 }]}
            multiline
          />
        </View>

        {/* Submit */}
        <Pressable
          onPress={submit}
          style={[styles.submitBtn, !canSubmit && { opacity: 0.55 }]}
          disabled={!canSubmit}
        >
          <Text style={styles.submitTxt}>Confirm Appointment</Text>
        </Pressable>

        <Text style={styles.note}>
          Tip: Keep your previous reports ready (if available).
        </Text>
      </ScrollView>
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
  title: { fontSize: 18, fontWeight: "900", color: colors.text },

  doctorCard: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: 22,
    backgroundColor: "#4FA3F7",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  doctorTop: { color: "rgba(255,255,255,0.9)", fontWeight: "900", fontSize: 12 },
  doctorName: { marginTop: 8, color: "#0B1B2B", fontWeight: "900", fontSize: 20 },
  doctorSub: { marginTop: 6, color: "rgba(255,255,255,0.95)", fontWeight: "800", fontSize: 13 },

  formCard: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  label: { fontSize: 13, fontWeight: "900", color: colors.text, marginBottom: 10 },

  input: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#D9ECFF",
    borderWidth: 1,
    borderColor: "#BFDFFF",
    paddingHorizontal: 14,
    color: "#0B1B2B",
    fontWeight: "800",
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },
  chipActive: {
    backgroundColor: "#4FA3F7",
    borderColor: "#4FA3F7",
  },
  chipText: { fontWeight: "900", color: colors.text, fontSize: 12 },
  chipTextActive: { color: "#0B1B2B" },

  submitBtn: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  submitTxt: { color: "#fff", fontWeight: "900", fontSize: 16 },

  note: {
    marginHorizontal: spacing.xl,
    marginTop: 14,
    textAlign: "center",
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.mutedText,
  },
});
