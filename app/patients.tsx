import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../src/lib/supabase";

type Patient = {
  id: string;
  medical_id: string;
  full_name: string;
  gender: string;
  age: number;
  phone: string;
  address: string;
  blood_group: string;
};

export default function Patients() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Patient[]>([]);

  const loadFirstPatients = async () => {
    try {
      setLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        Alert.alert("Not logged in", "Please login first.");
        return;
      }

      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("medical_id", { ascending: true })
        .limit(30);

      if (error) throw error;
      setResults((data ?? []) as Patient[]);
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = async () => {
    try {
      setLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        Alert.alert("Not logged in", "Please login first.");
        return;
      }

      const q = query.trim();

      // ✅ If empty, just show first patients
      if (!q) {
        await loadFirstPatients();
        return;
      }

      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .or(`medical_id.ilike.%${q}%,full_name.ilike.%${q}%`)
        .order("medical_id", { ascending: true })
        .limit(30);

      if (error) throw error;

      setResults((data ?? []) as Patient[]);
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Failed to search");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFirstPatients();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patients</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Search Medical ID (MED0001) or Name"
          value={query}
          onChangeText={setQuery}
        />
        <Pressable
          style={styles.button}
          onPress={searchPatients}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "..." : "Search"}</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.list}>
        {results.map((p) => (
          <Pressable
            key={p.id}
            style={styles.card}
            onPress={() => router.push(`/patients/${p.medical_id}` as any)}
          >
            <Text style={styles.name}>
              {p.full_name} ({p.gender}, {p.age})
            </Text>
            <Text>Medical ID: {p.medical_id}</Text>
            <Text>Phone: {p.phone}</Text>
            <Text>Blood Group: {p.blood_group}</Text>
            <Text>Address: {p.address}</Text>
            <Text style={styles.tapHint}>Tap to view details →</Text>
          </Pressable>
        ))}

        {results.length === 0 && (
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            No results
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", gap: 10, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2e7cf6",
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  list: { marginTop: 12 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  tapHint: { marginTop: 6, color: "#2e7cf6", fontWeight: "700" },
});