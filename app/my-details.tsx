import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { supabase } from "../src/lib/supabase";
import { ensureProfile } from "../src/services/ensureProfile";

export default function MyDetails() {
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const uid = await ensureProfile();

        const { data: profile, error: pErr } = await supabase
          .from("profiles")
          .select("medical_id")
          .eq("id", uid)
          .maybeSingle();

        if (pErr) throw pErr;

        const medicalId = profile?.medical_id;
        if (!medicalId) {
          Alert.alert("Medical ID missing", "Go to Profile and save your Medical ID.");
          setPatient(null);
          return;
        }

        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("medical_id", medicalId)
          .maybeSingle();

        if (error) throw error;
        setPatient(data);
      } catch (e: any) {
        Alert.alert("Error", e.message ?? "Failed to load details");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator /></View>;

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>No patient details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Details</Text>
      <View style={styles.card}>
        <Text style={styles.line}>Name: {patient.full_name}</Text>
        <Text style={styles.line}>Medical ID: {patient.medical_id}</Text>
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
  title: { fontSize: 22, fontWeight: "900" },
  card: { marginTop: 14, borderWidth: 1, borderColor: "#eee", borderRadius: 14, padding: 12 },
  line: { marginBottom: 6, fontWeight: "700" },
});