// src/components/ChatbotFloating.tsx

// src/components/ChatbotFloating.tsx

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { icons } from "../assets/assets";
import { colors } from "../themes/colors";
import { spacing } from "../themes/spacing";

type Props = {
  username?: string;
  delayMs?: number;
  autoHideMs?: number;
  onOpen: () => void;

  // ✅ NEW (so you can set different message per screen)
  promptText?: string;
};

export function ChatbotFloating({
  username = "User",
  delayMs = 4500,
  autoHideMs = 4500,
  onOpen,
  promptText,
}: Props) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const message = useMemo(() => {
    if (promptText && promptText.trim().length > 0) return promptText;
    return `Hi ${username}! I am here for you.`;
  }, [promptText, username]);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t1);
  }, [delayMs]);

  useEffect(() => {
    if (!visible) return;
    const t2 = setTimeout(() => setVisible(false), autoHideMs);
    return () => clearTimeout(t2);
  }, [visible, autoHideMs]);

  return (
    <>
      {/* Fullscreen popup */}
      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.popup} onPress={() => {}}>
            <Image source={icons.chatbot} style={styles.popupIcon} />
            <Text style={styles.popupTitle}>{message}</Text>
            <Text style={styles.popupSub}>
              Tap below to chat, or it will close automatically.
            </Text>

            <View style={{ height: spacing.lg }} />

            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                setVisible(false);
                router.push("/chat_screen"); // ✅ navigate to chat screen
              }}
            >
              <Text style={styles.primaryBtnText}>Chat now</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.secondaryBtnText}>Not now</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Floating button */}
      <Pressable style={styles.fab} onPress={() => setVisible(true)}>
        <Image source={icons.chatbot} style={styles.fabIcon} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: spacing.xl,
    bottom: 92, // above bottom nav
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  fabIcon: { width: 34, height: 34, resizeMode: "contain" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  popup: {
    width: "100%",
    borderRadius: 26,
    backgroundColor: "#fff",
    padding: spacing.xl,
  },
  popupIcon: {
    width: 44,
    height: 44,
    resizeMode: "contain",
    marginBottom: 10,
  },
  popupTitle: { fontSize: 18, fontWeight: "900", color: "#111" },
  popupSub: { marginTop: 6, color: "#555", fontSize: 13, fontWeight: "600" },

  primaryBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "900", fontSize: 15 },

  secondaryBtn: {
    height: 44,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F6FF",
  },
  secondaryBtnText: { color: "#111", fontWeight: "800", fontSize: 14 },
});
