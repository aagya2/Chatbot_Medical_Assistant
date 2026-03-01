import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Pressable,
  Linking,
} from "react-native";
import { supabase } from "../src/lib/supabase";
import { getMyMedicalId } from "../src/services/getMyMedicalId";

type Row = {
  id: string;
  medical_id: string | null;
  title: string;
  file_url: string | null;
  created_at: string;
};

export default function Reports() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const { medicalId } = await getMyMedicalId();

      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("medical_id", medicalId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems((data ?? []) as Row[]);
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Reports</Text>

      {loading ? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={{ marginTop: 14 }}>
          {items.map((x) => (
            <View key={x.id} style={styles.card}>
              <Text style={styles.bold}>{x.title}</Text>

              {!!x.file_url && (
                <Pressable onPress={() => Linking.openURL(x.file_url!)}>
                  <Text style={styles.link}>Open report</Text>
                </Pressable>
              )}

              <Text style={styles.time}>
                {new Date(x.created_at).toLocaleString()}
              </Text>
            </View>
          ))}

          {items.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No reports available.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "900" },
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  bold: { fontWeight: "900" },
  link: { marginTop: 8, color: "#2e7cf6", fontWeight: "800" },
  time: { marginTop: 6, color: "#666", fontSize: 12, fontWeight: "700" },
});