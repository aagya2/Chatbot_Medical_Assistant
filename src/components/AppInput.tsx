import React from "react";
import { TextInput, StyleSheet, View, TextInputProps } from "react-native";
import { colors } from "../themes/colors";
import { spacing } from "../themes/spacing";

type Props = TextInputProps;

export function AppInput(props: Props) {
  return (
    <View style={styles.wrap}>
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor={colors.mutedText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 18,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },
  input: {
    height: 46,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.text,
  },
});
