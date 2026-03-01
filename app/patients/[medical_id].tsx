import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "../../src/lib/supabase";

export default function PatientDetails() {
  const { medical_id } = useLocalSearchParams<{ medical_id: string }>();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          Alert.alert("Not logged in", "Please login first.");
          router.replace("/login" as any);
          return;
        }

        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("medical_id", medical_id)
          .maybeSingle();

        if (error) throw error;
        setPatient(data);
      } catch (e: any) {
        Alert.alert("Error", e.message ?? "Failed to load patient");
      } finally {
        setLoading(false);
      }
    })();
  }, [medical_id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>Patient not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>{patient.full_name}</Text>
      <Text style={styles.sub}>Medical ID: {patient.medical_id}</Text>

      <View style={styles.card}>
        <Text style={styles.line}>Gender: {patient.gender}</Text>
        <Text style={styles.line}>Age: {patient.age}</Text>
        <Text style={styles.line}>Phone: {patient.phone}</Text>
        <Text style={styles.line}>Blood Group: {patient.blood_group}</Text>
        <Text style={styles.line}>Address: {patient.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 16, fontWeight: "700", color: "#2e7cf6" },
  title: { fontSize: 22, fontWeight: "900" },
  sub: { marginTop: 4, color: "#555", fontWeight: "700" },
  card: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 12,
  },
  line: { marginBottom: 6, fontWeight: "600" },
});