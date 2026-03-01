import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../src/lib/supabase";
import { getMyMedicalId } from "../src/services/getMyMedicalId";

type Row = {
  id: string;
  medical_id: string | null;
  condition: string;
  notes: string | null;
  created_at: string;
};

export default function MedicalHistory() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const goBackSafe = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/profile" as any);
  };

  const load = async () => {
    try {
      setLoading(true);
      const { medicalId } = await getMyMedicalId();

      const { data, error } = await supabase
        .from("medical_history")
        .select("*")
        .eq("medical_id", medicalId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems((data ?? []) as Row[]);
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <View style={styles.header}>
          <Pressable onPress={goBackSafe} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backTxt}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Past Medical History</Text>
          <View style={{ width: 44 }} />
        </View>
      </SafeAreaView>

      <View style={styles.container}>
        {loading ? (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView style={{ marginTop: 14 }}>
            {items.map((x) => (
              <View key={x.id} style={styles.card}>
                <Text style={styles.bold}>{x.condition}</Text>
                {!!x.notes && <Text>{x.notes}</Text>}
                <Text style={styles.time}>
                  {new Date(x.created_at).toLocaleString()}
                </Text>
              </View>
            ))}

            {items.length === 0 && (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No history available.
              </Text>
            )}
          </ScrollView>
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

  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  bold: { fontWeight: "900" },
  time: { marginTop: 6, color: "#666", fontSize: 12, fontWeight: "700" },
});