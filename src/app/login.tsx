/**
 * login.tsx  (halaman LOGIN, alamat "/login")
 * ------------------------------------------------------------------
 * Halaman login penuh yang terpisah dengan UI modern.
 * Fitur:
 *   - Form email + password dengan Supabase Auth
 *   - Toggle visibilitas password
 *   - Pesan error yang informatif
 *   - Tombol demo langsung sebagai MEMBER / ADMIN (bypass login)
 *   - Animasi fade-in bertahap
 *   - Redirect otomatis jika sudah login
 *
 * Koneksi database: via useAuth() -> supabaseClient.ts -> Supabase
 */
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { TextInputInstance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PressableScale } from "@/components/ui/PressableScale";
import { LOGO_SOURCE } from "@/const/gymConfig";
import { useAuth } from "@/context/AuthContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createLoginPageStyles } from "@/styles/login_page_styles";

export default function LoginScreen() {
  const router = useRouter();
  const s = useThemedStyles(createLoginPageStyles);
  const { colors } = useTheme();
  const { signIn, loading, session } = useAuth();

  /* ---- State form ---- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* ---- Ref untuk pindah fokus email -> password ---- */
  const passwordRef = useRef<TextInputInstance>(null);

  /* ---- Redirect jika sudah login ---- */
  useEffect(() => {
    if (!loading && session) {
      router.replace("/home");
    }
  }, [loading, session, router]);

  /* ---- Handler login Supabase ---- */
  const handleLogin = useCallback(async () => {
    Keyboard.dismiss();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg("Masukkan alamat email kamu.");
      return;
    }
    if (!password) {
      setErrorMsg("Masukkan password.");
      return;
    }

    setSubmitting(true);
    const error = await signIn(email.trim(), password);
    setSubmitting(false);

    if (error) {
      // Terjemahkan pesan error Supabase ke bahasa yang lebih ramah
      if (
        error.message.toLowerCase().includes("invalid login") ||
        error.message.toLowerCase().includes("invalid credentials")
      ) {
        setErrorMsg("Email atau password salah. Silakan coba lagi.");
      } else if (error.message.toLowerCase().includes("email not confirmed")) {
        setErrorMsg("Email belum dikonfirmasi. Cek inbox kamu.");
      } else if (error.message.toLowerCase().includes("too many requests")) {
        setErrorMsg("Terlalu banyak percobaan. Coba lagi beberapa saat.");
      } else {
        setErrorMsg(error.message);
      }
    } else {
      router.replace("/home");
    }
  }, [email, password, signIn, router]);

  /* ---- Demo langsung (tanpa login Supabase) ---- */
  const goMember = useCallback(() => router.replace("/home"), [router]);
  const goAdmin = useCallback(() => router.replace("/admin"), [router]);

  /* Jika session sudah ada, tampilkan loading sementara redirect */
  if (!loading && session) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Background image */}
      <Image
        source={require("@/assets/BACKGROUND.jpg")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="cover"
        pointerEvents="none"
      />
      {/* Overlay gelap */}
      <View
        pointerEvents="none"
        style={[
          { position: "absolute", width: "100%", height: "100%" },
          { backgroundColor: "rgba(10,16,35,0.55)" },
        ]}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom", "left", "right"]}>
        <KeyboardAvoidingView
          style={s.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={s.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ---- Logo + Tagline ---- */}
            <View style={s.topSection}>
              <View style={s.logoWrapper}>
                <Image source={LOGO_SOURCE} style={s.logoGlow} resizeMode="contain" />
                <Text style={s.tagline}>
                  Check-in cepat · Pantau gym · Jaga streak latihan
                </Text>
              </View>

              {/* Badge fitur kecil */}
              <View style={s.badgeRow}>
                <View style={s.badge}>
                  <Ionicons name="qr-code" size={12} color={colors.textSoft} />
                  <Text style={s.badgeText}>QR Check-in</Text>
                </View>
                <View style={s.badge}>
                  <MaterialCommunityIcons name="fire" size={12} color={colors.textSoft} />
                  <Text style={s.badgeText}>Streak</Text>
                </View>
                <View style={s.badge}>
                  <Ionicons name="people" size={12} color={colors.textSoft} />
                  <Text style={s.badgeText}>Live Crowd</Text>
                </View>
              </View>
            </View>

            {/* ---- Kartu Form Login ---- */}
            <View style={s.formCard}>
              {/* Header form */}
              <View style={s.formHeader}>
                <Text style={s.formTitle}>MASUK KE AKUN</Text>
                <Text style={s.formSubtitle}>Gunakan akun TriGym kamu</Text>
              </View>

              {/* Input fields */}
              <View style={s.inputWrapper}>
                {/* Email */}
                <View style={s.inputGroup}>
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color={colors.textMuted}
                  />
                  <TextInput
                    style={s.textInput}
                    placeholder="Email"
                    placeholderTextColor={colors.textMuted}
                    cursorColor={colors.cta}
                    selectionColor={colors.cta}
                    value={email}
                    onChangeText={(t) => {
                      setEmail(t);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    editable={!submitting}
                  />
                </View>

                {/* Password */}
                <View style={s.inputGroup}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color={colors.textMuted}
                  />
                  <TextInput
                    ref={passwordRef}
                    style={s.textInput}
                    placeholder="Password"
                    placeholderTextColor={colors.textMuted}
                    cursorColor={colors.cta}
                    selectionColor={colors.cta}
                    value={password}
                    onChangeText={(t) => {
                      setPassword(t);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                    editable={!submitting}
                  />
                  <TouchableOpacity
                    style={s.eyeButton}
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={18}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              </View>

                {/* Error message */}
                {errorMsg ? (
                  <View style={s.errorBox}>
                    <Ionicons name="alert-circle" size={16} color={colors.danger} />
                    <Text style={s.errorText}>{errorMsg}</Text>
                  </View>
                ) : null}

                {/* Tombol Login Supabase */}
                <PressableScale
                  onPress={handleLogin}
                  style={[s.loginButton, submitting && s.loginButtonDisabled]}
                  disabled={submitting}
                >
                  {submitting ? (
                    <ActivityIndicator color={colors.ctaText} size="small" />
                  ) : (
                    <>
                      <Ionicons name="log-in-outline" size={18} color={colors.ctaText} />
                      <Text style={s.loginButtonText}>MASUK</Text>
                    </>
                  )}
                </PressableScale>

                {/* Pemisah */}
                <View style={s.dividerRow}>
                  <View style={s.dividerLine} />
                  <Text style={s.dividerText}>ATAU COBA DEMO</Text>
                  <View style={s.dividerLine} />
                </View>

                {/* Tombol Demo */}
                <View style={s.demoRow}>
                  <PressableScale onPress={goMember} style={s.demoButton}>
                    <Ionicons name="person" size={20} color={colors.cta} />
                    <Text style={s.demoButtonText}>MEMBER</Text>
                    <Text style={s.demoButtonSub}>Tanpa login</Text>
                  </PressableScale>

                  <PressableScale onPress={goAdmin} style={s.demoButton}>
                    <MaterialCommunityIcons
                      name="shield-account"
                      size={20}
                      color={colors.warning}
                    />
                    <Text style={s.demoButtonText}>ADMIN</Text>
                    <Text style={s.demoButtonSub}>Tanpa login</Text>
                  </PressableScale>
                </View>

                {/* Link ke Signup */}
                <View style={signupLinkStyle.row}>
                  <Text style={[signupLinkStyle.text, { color: colors.textMuted }]}>
                    Belum punya akun?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/signup")}>
                    <Text style={[signupLinkStyle.text, { color: colors.cta, fontWeight: "700" }]}>
                      Daftar sekarang
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={s.footerNote}>
                  Demo tidak memerlukan akun Supabase.{"\n"}
                  Data tidak tersimpan saat mode demo.
                </Text>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const signupLinkStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 13,
  },
});
