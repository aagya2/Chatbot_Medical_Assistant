import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput, Alert } from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { images } from "../src/assets/assets";
import { supabase } from "../src/lib/supabase";
import { ensureProfile } from "../src/services/ensureProfile";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [medicalId, setMedicalId] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const uid = await ensureProfile();

    const { data: userData } = await supabase.auth.getUser();
    setEmail(userData.user?.email ?? "");

    const { data, error } = await supabase
      .from("profiles")
      .select("medical_id")
      .eq("id", uid)
      .maybeSingle();

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    setMedicalId(data?.medical_id ?? "");
  };

  const saveMedicalId = async () => {
    try {
      setSaving(true);
      const uid = await ensureProfile();
      const mid = medicalId.trim().toUpperCase();

      if (!mid) {
        Alert.alert("Medical ID", "Enter your Medical ID (e.g., MED0001)");
        return;
      }
      if (!/^MED\d{4}$/.test(mid)) {
        Alert.alert("Medical ID", "Format should be like MED0001");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ medical_id: mid })
        .eq("id", uid);

      if (error) throw error;

      Alert.alert("Saved", "Medical ID linked successfully.");
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Failed to save Medical ID");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backTxt}>←</Text>
          </Pressable>
          <Text style={styles.title}>My Profile</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Image source={images.logo} style={styles.avatar} />
          </View>

          <Text style={styles.name}>Patient</Text>
          <Text style={styles.sub}>{email || "Logged in user"}</Text>

          <View style={{ height: 14 }} />

          <Text style={styles.label}>Medical ID (from hospital)</Text>
          <TextInput
            value={medicalId}
            onChangeText={setMedicalId}
            placeholder="MED0001"
            style={styles.input}
            autoCapitalize="characters"
          />

          <Pressable style={styles.saveBtn} onPress={saveMedicalId} disabled={saving}>
            <Text style={styles.saveText}>{saving ? "Saving..." : "Save Medical ID"}</Text>
          </Pressable>

          <Pressable style={styles.detailsBtn} onPress={() => router.push("/my-details" as any)}>
            <Text style={styles.detailsText}>View My Details</Text>
          </Pressable>
        </View>

        <Pressable style={styles.item} onPress={() => router.push("/medical-history" as any)}>
          <Text style={styles.itemText}>Past Medical History</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={() => router.push("/reports" as any)}>
          <Text style={styles.itemText}>Medical Reports</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={() => router.push("/allergies" as any)}>
          <Text style={styles.itemText}>Allergy History</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable
          style={[styles.item, { marginTop: 26 }]}
          onPress={async () => {
            await supabase.auth.signOut();
            router.replace("/login" as any);
          }}
        >
          <Text style={[styles.itemText, { color: "#D11A2A" }]}>Logout</Text>
        </Pressable>
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

  card: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
  },
  avatarWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: { width: 56, height: 56, resizeMode: "contain" },
  name: { fontSize: 18, fontWeight: "900", color: colors.text },
  sub: { marginTop: 6, fontSize: 13, fontWeight: "800", color: colors.mutedText },

  label: { alignSelf: "flex-start", fontWeight: "900", marginBottom: 6, color: colors.text },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontWeight: "800",
  },
  saveBtn: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#2e7cf6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "900" },

  detailsBtn: {
    marginTop: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#2e7cf6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  detailsText: { color: "#2e7cf6", fontWeight: "900" },

  item: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: { fontSize: 15, fontWeight: "900", color: colors.text },
  chev: { fontSize: 22, fontWeight: "900", color: "#2E6FE8" },
});