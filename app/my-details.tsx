import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../src/lib/supabase";
import { ensureProfile } from "../src/services/ensureProfile";

export default function MyDetails() {
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<any>(null);

  const goBackSafe = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/profile" as any);
  };

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

        const medicalId = (profile?.medical_id ?? "").toString().trim();
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

  return (
    <View style={styles.screen}>
      {/* ✅ iOS-safe header with back button */}
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <View style={styles.header}>
          <Pressable onPress={goBackSafe} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backTxt}>←</Text>
          </Pressable>

          <Text style={styles.headerTitle}>My Details</Text>

          <View style={{ width: 44 }} />
        </View>
      </SafeAreaView>

      {/* Body */}
      <View style={styles.container}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        ) : !patient ? (
          <View style={styles.center}>
            <Text>No patient details found.</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.line}>Name: {patient.full_name}</Text>
            <Text style={styles.line}>Medical ID: {patient.medical_id}</Text>
            <Text style={styles.line}>Gender: {patient.gender}</Text>
            <Text style={styles.line}>Age: {patient.age}</Text>
            <Text style={styles.line}>Phone: {patient.phone}</Text>
            <Text style={styles.line}>Blood Group: {patient.blood_group}</Text>
            <Text style={styles.line}>Address: {patient.address}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: Platform.OS === "android" ? 8 : 0,
    paddingHorizontal: 16,
    paddingBottom: 10,
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
  backTxt: { fontSize: 20, fontWeight: "900", color: "#0B1B2B" },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#0B1B2B" },

  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
  },
  line: { marginBottom: 8, fontWeight: "700" },
});