// src/components/ui/LoginForm.tsx
// -------------------------------------------------------------------
// Login form UI – matches the visual style of existing screens.
// Uses ThemeContext for colors and createStyles defined in
// `src/styles/login_styles.ts`. The form integrates with the global
// `AuthContext` (Supabase) we added earlier.
// -------------------------------------------------------------------

import React, { useState } from "react";
import { TextInput, View, Text, Alert } from "react-native";
import { useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/login_styles";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { PressableScale } from "@/components/ui/PressableScale";

export default function LoginForm() {
  const s = useThemedStyles(createStyles);
  const { signIn, loading, session } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // After successful login we redirect based on a simple rule:
  //   - If the user has a `role` meta in Supabase (not implemented yet),
  //   - fallback to the member dashboard (`/home`).
  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Masukkan email dan password");
      return;
    }
    const error = await signIn(email, password);
    if (error) {
      Alert.alert("Login gagal", error.message);
    } else {
      // Session will be populated via the AuthProvider listener.
      // For now we simply navigate to the member home screen.
      router.replace("/home");
    }
  };

  // If we already have a session (e.g., persisted), go straight to home.
  if (!loading && session) {
    router.replace("/home");
    return null;
  }

  return (
    <View style={s.hero}> {/* reuse hero container to keep UI consistent */}
      <View style={s.heroBody}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginBottom: 12,
            color: s.heroText.color,
          }}
          placeholderTextColor={s.heroText.color}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginBottom: 12,
            color: s.heroText.color,
          }}
          placeholderTextColor={s.heroText.color}
        />
        <PressableScale onPress={handleSubmit} style={s.sessionButton}>
          <Text style={{ color: "white", textAlign: "center" }}>MASUK</Text>
        </PressableScale>
      </View>
    </View>
  );
}
