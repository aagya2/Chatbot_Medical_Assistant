import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { images } from "../src/assets/assets";
import { supabase } from "./lib/supabase";

export default function Index() {
useEffect(() => {
  console.log("APP OPENED");
  supabase.auth.getSession().then(({ data, error }) => {
    console.log("SESSION:", data?.session);
    console.log("ERROR:", error);
  });

  const t = setTimeout(() => {
    router.replace("/login" as any);
  }, 1600);

  return () => clearTimeout(t);
}, []);

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4FA3F7", alignItems: "center", justifyContent: "center" },
  logo: { width: 160, height: 160, resizeMode: "contain" },
});
