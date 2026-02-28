// app/virtual-assistant.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { images, icons } from "../src/assets/assets";
import { BottomNav } from "../src/components/BottomNav";
import { predictDisease } from "../src/services/chatApi";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

export default function VirtualAssistant() {
  const isGreeting = (text: string) => {
    const greetings = [
      "hi",
      "hi there",
      "hello chatbot",
      "hello",
      "hey",
      "wow",
      "ok",
      "okay",
      "thanks",
      "thank you",
      "good morning",
      "good evening",
    ];

    return greetings.includes(text.toLowerCase().trim());
  };
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "I am your Virtual Health Assistant. How can I help you today?",
    },
  ]);

  const onSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();

    // 1️⃣ Show user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        text: userText,
      },
    ]);

    setInput("");

    // 2️⃣ Greeting check (STOP prediction)
    if (isGreeting(userText)) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_bot",
          role: "bot",
          text: "👋 Hi there! Please tell me your symptoms so I can help you 😊",
        },
      ]);
      return; // ⛔ IMPORTANT: do NOT call backend
    }

    // 3️⃣ Only symptoms reach backend
    setLoading(true);

    try {
      const res = await predictDisease(userText);
      const top = res.results[0];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_bot",
          role: "bot",
          text:
            `🩺 Possible condition: ${top.disease}\n` +
            `👨‍⚕️ Recommended doctor: ${top.specialty}\n` +
            `📊 Confidence: ${(top.score * 100).toFixed(1)}%`,
        },
      ]);

      // 2️⃣ Follow-up questions (if any)
      if (top.follow_up && top.follow_up.length > 0) {
        top.follow_up.forEach((q: string, index: number) => {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}_follow_${index}`,
              role: "bot",
              text: `🤔 ${q}`,
            },
          ]);
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_bot",
          role: "bot",
          text: "❌ Sorry, I couldn’t analyze that. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.headerBlue}>
            <View style={styles.headerTopRow}>
              <View style={styles.brandRow}>
                <Image source={images.logo} style={styles.brandLogo} />
                <Text style={styles.brandText}>Medica</Text>
              </View>

              <Pressable style={styles.hamburger} onPress={() => router.back()}>
                <Text style={styles.hamburgerText}>←</Text>
              </Pressable>
            </View>
          </View>

          {/* Curve */}
          <View style={styles.whiteCurve} />

          {/* Title */}
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>Virtual Assistant</Text>
            <Text style={styles.pageSub}>
              AI-powered guidance for common symptoms
            </Text>
          </View>

          {/* Chat */}
          <View style={styles.chatWrap}>
            {messages.map((m) => (
              <View
                key={m.id}
                style={[
                  styles.msgRow,
                  m.role === "user" ? styles.msgRight : styles.msgLeft,
                ]}
              >
                {m.role === "bot" && (
                  <Image source={icons.bot} style={styles.avatar} />
                )}

                <View
                  style={[
                    styles.bubble,
                    m.role === "user" ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text style={styles.msgText}>{m.text}</Text>
                </View>

                {m.role === "user" && (
                  <Image source={icons.user} style={styles.avatar} />
                )}
                {loading && (
                  <View style={[styles.msgRow, styles.msgLeft]}>
                    <Image source={icons.bot} style={styles.avatar} />
                    <View style={[styles.bubble, styles.botBubble]}>
                      <Text style={styles.msgText}>
                        🤖 Analyzing symptoms...
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimerCard}>
            <Text style={styles.disclaimerText}>
              Advice generated by AI. No medical diagnosis.
              {"\n"}For emergencies, visit a hospital.
            </Text>
          </View>
        </ScrollView>

        {/* Input */}
        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Describe your symptoms..."
            placeholderTextColor="#7A8CA4"
            style={styles.input}
          />
          <Pressable style={styles.sendBtn} onPress={onSend}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>

        {/* Bottom nav */}
        <BottomNav
          active={"message" as any}
          onPress={(key) => {
            if (key === "home") router.navigate("/home" as any);
            if (key === "notify") router.navigate("/notifications" as any);
            if (key === "phone") router.navigate("/recents" as any);
            if (key === "message") router.navigate("/virtual-assistant" as any);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  scrollContent: {
    paddingBottom: 160,
  },

  headerBlue: {
    height: 110,
    backgroundColor: "#4FA3F7",
    paddingTop: 40,
    paddingHorizontal: spacing.xl,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandLogo: { width: 40, height: 40, resizeMode: "contain" },
  brandText: { fontSize: 26, fontWeight: "900", color: "#0B1B2B" },

  hamburger: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  hamburgerText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: -2,
  },

  whiteCurve: {
    height: 52,
    backgroundColor: "#4FA3F7",
    borderBottomLeftRadius: 52,
    borderBottomRightRadius: 52,
    transform: [{ scaleX: 1.15 }],
    marginTop: -18,
  },

  titleRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
  },
  pageTitle: { fontSize: 28, fontWeight: "900", color: colors.text },
  pageSub: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "800",
    color: colors.mutedText,
  },

  chatWrap: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    gap: 14,
  },

  msgRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  msgLeft: { justifyContent: "flex-start" },
  msgRight: { justifyContent: "flex-end", alignSelf: "flex-end" },

  avatar: { width: 36, height: 36, resizeMode: "contain" },

  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E6F0FF",
  },
  userBubble: {
    backgroundColor: "#D9ECFF",
    borderColor: "#BFDFFF",
  },
  msgText: {
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 18,
  },

  disclaimerCard: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#F1F5FA",
    borderWidth: 1,
    borderColor: "#E2EAF5",
  },
  disclaimerText: {
    textAlign: "center",
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.mutedText,
    lineHeight: 18,
  },

  inputBar: {
    marginHorizontal: spacing.xl,
    marginBottom: 90,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    paddingRight: 10,
  },
  sendBtn: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#4FA3F7",
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: { color: "#fff", fontWeight: "900", fontSize: 12.5 },
});
