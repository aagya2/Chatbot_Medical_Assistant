// app/chat/[id].tsx

import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "../../src/themes/colors";
import { spacing } from "../../src/themes/spacing";
import { images, doctors as doctorImgs, icons } from "../../src/assets/assets";

type Msg = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
};

function getChatMeta(chatId: string) {
  // Map chat ids -> name + avatar (match your chat.tsx list)
  if (chatId === "dr-lisa") return { name: "Dr. Lisa", avatar: doctorImgs.lisa, hint: "Ask about appointment, reports..." };
  if (chatId === "dr-oliver") return { name: "Dr. Oliver", avatar: doctorImgs.oliver, hint: "Skin issues? Share symptoms..." };
  if (chatId === "dr-elly") return { name: "Dr. Elly", avatar: doctorImgs.elly, hint: "Dental pain? Tell where it hurts..." };
  if (chatId === "dr-yadav") return { name: "Dr. Yadav", avatar: doctorImgs.yadav, hint: "General health questions welcome." };
  if (chatId === "pharmacy") return { name: "Medica Pharmacy", avatar: icons.pharmacy, hint: "Ask about medicine availability." };
  if (chatId === "medica-hospital") return { name: "Medica Hospital", avatar: images.hospital, hint: "Helpdesk & appointments support." };

  return { name: "Medica", avatar: images.logo, hint: "How can we help you?" };
}

export default function ChatDetail() {
  const params = useLocalSearchParams();
  const chatId = String(params.id ?? "medica");
  const meta = useMemo(() => getChatMeta(chatId), [chatId]);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      text: `Hi User! 👋 This is ${meta.name}.`,
      mine: false,
      time: "Now",
    },
    {
      id: "m2",
      text: meta.hint,
      mine: false,
      time: "Now",
    },
  ]);

  const listRef = useRef<FlatList<Msg>>(null);

  const send = () => {
    const t = text.trim();
    if (!t) return;

    const mineMsg: Msg = {
      id: `m-${Date.now()}`,
      text: t,
      mine: true,
      time: "Now",
    };

    setMessages((prev) => [...prev, mineMsg]);
    setText("");

    // Fake auto-reply (premium feel)
    setTimeout(() => {
      const reply: Msg = {
        id: `r-${Date.now()}`,
        text: "Thanks! ✅ We received your message. We’ll respond shortly.",
        mine: false,
        time: "Now",
      };
      setMessages((prev) => [...prev, reply]);

      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }, 700);

    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const Quick = ({ label }: { label: string }) => (
    <Pressable
      onPress={() => setText(label)}
      style={styles.quickChip}
    >
      <Text style={styles.quickTxt}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>

        <View style={styles.headerMid}>
          <View style={styles.headerAvatarWrap}>
            <Image source={meta.avatar} style={styles.headerAvatar} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerName} numberOfLines={1}>
              {meta.name}
            </Text>
            <Text style={styles.headerSub}>Online</Text>
          </View>
        </View>

        <Pressable style={styles.moreBtn} onPress={() => {}}>
          <Text style={styles.moreTxt}>⋯</Text>
        </Pressable>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.msgList}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => {
          const isMine = item.mine;
          return (
            <View
              style={[
                styles.bubbleRow,
                isMine ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" },
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isMine ? styles.bubbleMine : styles.bubbleOther,
                ]}
              >
                <Text style={[styles.bubbleText, isMine && { color: "#0B1B2B" }]}>
                  {item.text}
                </Text>
                <Text style={[styles.bubbleTime, isMine && { opacity: 0.65 }]}>
                  {item.time}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Quick chips */}
        <View style={styles.quickRow}>
          <Quick label="Book appointment" />
          <Quick label="I need help" />
          <Quick label="Medicine query" />
        </View>

        <View style={styles.inputBar}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor="#7A8CA4"
            style={styles.input}
            multiline
          />

          <Pressable onPress={send} style={styles.sendBtn}>
            <Text style={styles.sendTxt}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E6F0FF",
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

  headerMid: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },

  headerAvatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    overflow: "hidden",
  },
  headerAvatar: { width: "100%", height: "100%", resizeMode: "cover" },

  headerName: { fontSize: 16, fontWeight: "900", color: colors.text },
  headerSub: { marginTop: 2, fontSize: 12, fontWeight: "800", color: "#2E6FE8" },

  moreBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  moreTxt: { fontSize: 22, fontWeight: "900", color: colors.text, marginTop: -2 },

  msgList: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },

  bubbleRow: { flexDirection: "row", marginBottom: 10 },

  bubble: {
    maxWidth: "82%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
  },

  bubbleOther: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E6F0FF",
  },

  bubbleMine: {
    backgroundColor: "#D9ECFF",
    borderColor: "#BFDFFF",
  },

  bubbleText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 20,
  },

  bubbleTime: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: "800",
    color: "#7A8CA4",
    alignSelf: "flex-end",
  },

  quickRow: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10,
  },
  quickChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },
  quickTxt: { fontSize: 12, fontWeight: "900", color: colors.text },

  inputBar: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },

  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },

  sendBtn: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#4FA3F7",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  sendTxt: { color: "#0B1B2B", fontWeight: "900", fontSize: 18, marginLeft: 2 },
});
