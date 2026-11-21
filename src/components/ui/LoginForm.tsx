import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { PressableScale } from "@/components/ui/PressableScale";
import { useAuth } from "@/context/AuthContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createCommonStyles } from "@/styles/common_styles";

export default function LoginForm() {
  const common = useThemedStyles(createCommonStyles);
  const { colors } = useTheme();
  const { signIn, loading, session } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Masukkan email dan password");
      return;
    }
    setSubmitting(true);
    const error = await signIn(email.trim(), password);
    setSubmitting(false);

    if (error) {
      Alert.alert("Login Gagal", error.message);
    } else {
      router.replace("/home");
    }
  };

  if (!loading && session) {
    router.replace("/home");
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: colors.divider,
            backgroundColor: colors.deep,
          },
        ]}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: colors.divider,
            backgroundColor: colors.deep,
          },
        ]}
        placeholderTextColor={colors.textMuted}
      />
      <PressableScale
        onPress={handleSubmit}
        style={[common.primaryButton, submitting && common.disabled]}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color={colors.ctaText} size="small" />
        ) : (
          <Text style={common.primaryButtonText}>MASUK (SUPABASE)</Text>
        )}
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
});
