import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { images } from "../assets/assets";
import Svg, { Path } from "react-native-svg";
import { supabase } from "../lib/supabase";
import { ensureProfile } from "../services/ensureProfile";

export function LoginScreen() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const canLogin = useMemo(
    () => id.trim().length > 0 && pass.length > 0,
    [id, pass]
  );

  const onLogin = async () => {
    try {
      setError("");

      const email = id.trim();
      const password = pass;

      const { error: loginErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginErr) {
        setError(loginErr.message);
        return;
      }

      // ✅ IMPORTANT: create profiles row if missing (fixes foreign key errors)
      await ensureProfile();

      // login success
      router.replace("/home" as any);
    } catch (e: any) {
      setError(e?.message ?? "Login failed");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        {/* BLUE HEADER */}
        <View style={styles.blueHeader}>
          <SafeAreaView>
            <View style={styles.headerRow}>
              <Image source={images.logo} style={styles.logo} />
              <Text style={styles.title}>Medica</Text>
              <View style={{ width: 44 }} />
            </View>
          </SafeAreaView>

          {/* ONE sinusoidal wave (single layer) */}
          <View style={styles.waveWrap} pointerEvents="none">
            <Svg
              width="100%"
              height="100%"
              viewBox="0 0 375 160"
              preserveAspectRatio="none"
            >
              <Path
                d="M0,70
                   C70,20 140,20 210,55
                   C280,90 330,95 375,75
                   L375,160 L0,160 Z"
                fill="#FFFFFF"
              />
            </Svg>
          </View>
        </View>

        {/* FORM */}
        <View style={styles.formArea}>
          <View style={styles.inputPill}>
            <Text style={styles.pillIcon}>👤</Text>
            <TextInput
              value={id}
              onChangeText={setId}
              placeholder="Email"
              placeholderTextColor="#7A8CA4"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={{ height: 18 }} />

          <View style={styles.inputPill}>
            <Text style={styles.pillIcon}>🔒</Text>
            <TextInput
              value={pass}
              onChangeText={setPass}
              placeholder="Password"
              placeholderTextColor="#7A8CA4"
              style={styles.input}
              secureTextEntry={!showPass}
            />
            <Pressable
              onPress={() => setShowPass((s) => !s)}
              hitSlop={12}
              style={styles.eyeBtn}
            >
              <Text style={styles.eyeText}>{showPass ? "Hide" : "Show"}</Text>
            </Pressable>
          </View>

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            onPress={onLogin}
            disabled={!canLogin}
            style={[styles.loginBtn, !canLogin && { opacity: 0.55 }]}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert("Forgot Password", "Use your Supabase email/password.")
            }
          >
            <Text style={styles.forgot}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const BRAND_BLUE = "#4FA3F7";

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },

  blueHeader: {
    backgroundColor: BRAND_BLUE,
    height: 300,
  },

  headerRow: {
    height: 96,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 8 : 0,
  },

  logo: { width: 44, height: 44, resizeMode: "contain" },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 50,
    color: "#0B1B2B",
    fontWeight: "900",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Heavy" : "sans-serif",
    letterSpacing: 0.3,
  },

  waveWrap: {
    position: "absolute",
    left: -70,
    right: -400,
    bottom: -1,
    height: 200,
  },

  formArea: {
    flex: 1,
    paddingHorizontal: 26,
    marginTop: 8,
    paddingTop: 46,
  },

  inputPill: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#D9ECFF",
    borderWidth: 1,
    borderColor: "#BFDFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  pillIcon: {
    width: 22,
    textAlign: "center",
    fontSize: 16,
    opacity: 0.7,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1B2B",
    paddingHorizontal: 10,
  },

  eyeBtn: { paddingLeft: 10, paddingVertical: 8 },

  eyeText: {
    fontSize: 14,
    fontWeight: "900",
    color: BRAND_BLUE,
  },

  error: {
    marginTop: 10,
    color: "#D11A2A",
    fontWeight: "800",
  },

  loginBtn: {
    marginTop: 26,
    width: "70%",
    alignSelf: "center",
    height: 56,
    borderRadius: 18,
    backgroundColor: BRAND_BLUE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  loginText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0B1B2B",
  },

  forgot: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 13,
    fontWeight: "800",
    color: "#0B1B2B",
    opacity: 0.7,
  },
});