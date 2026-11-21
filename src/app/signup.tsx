/**
 * signup.tsx  (halaman DAFTAR AKUN BARU, alamat "/signup")
 * ------------------------------------------------------------------
 * Mendaftarkan pengguna baru ke Supabase Auth dan membuat baris
 * profil di tabel `profiles`.
 *
 * Alur:
 *   1. User isi nama lengkap, email, password, konfirmasi password
 *   2. Tekan DAFTAR -> supabase.auth.signUp() + insert ke profiles
 *   3a. Jika Supabase perlu konfirmasi email -> tampilkan instruksi
 *   3b. Jika auto-confirm aktif -> session langsung ada -> ke /home
 */
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
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
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { LOGO_SOURCE } from "@/const/gymConfig";
import { useAuth } from "@/context/AuthContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createLoginPageStyles } from "@/styles/login_page_styles";

export default function SignupScreen() {
  const router = useRouter();
  const s = useThemedStyles(createLoginPageStyles);
  const { colors } = useTheme();
  const { signUp } = useAuth();

  /* ---- State form ---- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  /* ---- Refs untuk urutan fokus ---- */
  const emailRef = useRef<TextInputInstance>(null);
  const passwordRef = useRef<TextInputInstance>(null);
  const confirmRef = useRef<TextInputInstance>(null);

  /* ---- Handler daftar ---- */
  const handleSignup = useCallback(async () => {
    Keyboard.dismiss();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validasi form
    if (!name.trim()) {
      setErrorMsg("Masukkan nama lengkap kamu.");
      return;
    }
    if (name.trim().length < 3) {
      setErrorMsg("Nama minimal 3 karakter.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Masukkan alamat email.");
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) {
      setErrorMsg("Format email tidak valid.");
      return;
    }
    if (!password) {
      setErrorMsg("Masukkan password.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi password tidak cocok.");
      return;
    }

    setSubmitting(true);
    const { error, needsConfirmation } = await signUp(
      email.trim(),
      password,
      name.trim()
    );
    setSubmitting(false);

    if (error) {
      if (error.message.toLowerCase().includes("already registered") ||
          error.message.toLowerCase().includes("user already exists")) {
        setErrorMsg("Email ini sudah terdaftar. Coba login atau gunakan email lain.");
      } else if (error.message.toLowerCase().includes("invalid email")) {
        setErrorMsg("Format email tidak valid.");
      } else if (error.message.toLowerCase().includes("password")) {
        setErrorMsg("Password terlalu lemah. Gunakan minimal 6 karakter.");
      } else {
        setErrorMsg(error.message);
      }
      return;
    }

    if (needsConfirmation) {
      // Supabase memerlukan verifikasi email dulu
      setSuccessMsg(
        `Akun berhasil dibuat! Cek email ${email.trim()} dan klik link konfirmasi, lalu login.`
      );
    } else {
      // Session langsung ada (auto-confirm aktif) -> ke dashboard
      router.replace("/home");
    }
  }, [name, email, password, confirmPassword, signUp, router]);

  /* ---- Jika sudah sukses (perlu konfirmasi email) ---- */
  if (successMsg) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Image
          source={require("@/assets/BACKGROUND.jpg")}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <View
          pointerEvents="none"
          style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(10,16,35,0.6)" }}
        />
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
          <FadeInView style={{ alignItems: "center", gap: 20, width: "100%" }}>
            <View style={[localStyles.successIcon, { backgroundColor: colors.cta }]}>
              <Ionicons name="checkmark" size={40} color={colors.ctaText} />
            </View>
            <Text style={[localStyles.successTitle, { color: colors.text }]}>
              Pendaftaran Berhasil!
            </Text>
            <View style={[s.formCard, { width: "100%", alignItems: "center", gap: 16 }]}>
              <Ionicons name="mail" size={32} color={colors.cta} />
              <Text style={[localStyles.successBody, { color: colors.textSoft, textAlign: "center" }]}>
                {successMsg}
              </Text>
              <PressableScale
                onPress={() => router.replace("/login")}
                style={[s.loginButton, { width: "100%" }]}
              >
                <Ionicons name="log-in-outline" size={18} color={colors.ctaText} />
                <Text style={s.loginButtonText}>KE HALAMAN LOGIN</Text>
              </PressableScale>
            </View>
          </FadeInView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Background */}
      <Image
        source={require("@/assets/BACKGROUND.jpg")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="cover"
        pointerEvents="none"
      />
      <View
        pointerEvents="none"
        style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(10,16,35,0.55)" }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom", "left", "right"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo kecil di atas */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Image source={LOGO_SOURCE} style={{ width: 140, height: 56 }} resizeMode="contain" />
            </View>

            {/* Kartu Form */}
            <View style={s.formCard}>
              {/* Header */}
              <View style={s.formHeader}>
                <MaterialCommunityIcons
                  name="account-plus"
                  size={28}
                  color={colors.cta}
                />
                <Text style={s.formTitle}>BUAT AKUN</Text>
                <Text style={s.formSubtitle}>
                  Daftar dan mulai lacak latihanmu
                </Text>
              </View>

              {/* Input Nama */}
              <View style={s.inputGroup}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={colors.textMuted}
                />
                <TextInput
                  style={s.textInput}
                  placeholder="Nama Lengkap"
                  placeholderTextColor={colors.textMuted}
                  cursorColor={colors.cta}
                  selectionColor={colors.cta}
                  value={name}
                  onChangeText={(t) => {
                    setName(t);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  editable={!submitting}
                />
              </View>

              {/* Input Email */}
              <View style={s.inputGroup}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={colors.textMuted}
                />
                <TextInput
                  ref={emailRef}
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

              {/* Input Password */}
              <View style={s.inputGroup}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={colors.textMuted}
                />
                <TextInput
                  ref={passwordRef}
                  style={s.textInput}
                  placeholder="Password (min. 6 karakter)"
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
                  returnKeyType="next"
                  onSubmitEditing={() => confirmRef.current?.focus()}
                  editable={!submitting}
                />
                <TouchableOpacity
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

              {/* Input Konfirmasi Password */}
              <View style={[
                s.inputGroup,
                confirmPassword && password !== confirmPassword
                  ? { borderColor: colors.danger }
                  : null
              ]}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={
                    confirmPassword && password !== confirmPassword
                      ? colors.danger
                      : colors.textMuted
                  }
                />
                <TextInput
                  ref={confirmRef}
                  style={s.textInput}
                  placeholder="Ulangi Password"
                  placeholderTextColor={colors.textMuted}
                  cursorColor={colors.cta}
                  selectionColor={colors.cta}
                  value={confirmPassword}
                  onChangeText={(t) => {
                    setConfirmPassword(t);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSignup}
                  editable={!submitting}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={showConfirm ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>

                  {/* Info kecocokan password */}
                  {confirmPassword.length > 0 && (
                    <View style={[localStyles.matchRow]}>
                      <Ionicons
                        name={password === confirmPassword ? "checkmark-circle" : "close-circle"}
                        size={14}
                        color={password === confirmPassword ? colors.mint : colors.danger}
                      />
                      <Text style={[localStyles.matchText, {
                        color: password === confirmPassword ? colors.mint : colors.danger
                      }]}>
                        {password === confirmPassword ? "Password cocok" : "Password tidak cocok"}
                      </Text>
                    </View>
                  )}

                  {/* Error message */}
                  {errorMsg ? (
                    <View style={s.errorBox}>
                      <Ionicons name="alert-circle" size={16} color={colors.danger} />
                      <Text style={s.errorText}>{errorMsg}</Text>
                    </View>
                  ) : null}

                  {/* Tombol Daftar */}
                  <PressableScale
                    onPress={handleSignup}
                    style={[s.loginButton, submitting && s.loginButtonDisabled]}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <ActivityIndicator color={colors.ctaText} size="small" />
                    ) : (
                      <>
                        <MaterialCommunityIcons
                          name="account-plus"
                          size={18}
                          color={colors.ctaText}
                        />
                        <Text style={s.loginButtonText}>BUAT AKUN</Text>
                      </>
                    )}
                  </PressableScale>

                  {/* Sudah punya akun? */}
                  <View style={localStyles.linkRow}>
                    <Text style={[localStyles.linkText, { color: colors.textMuted }]}>
                      Sudah punya akun?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => router.replace("/login")}>
                      <Text style={[localStyles.linkText, { color: colors.cta, fontWeight: "700" }]}>
                        Masuk di sini
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

              {/* Catatan trial */}
              <FadeInView delay={200}>
                <View style={[localStyles.trialBadge, { backgroundColor: colors.navy }]}>
                  <Ionicons name="gift-outline" size={14} color={colors.mint} />
                  <Text style={[localStyles.trialText, { color: colors.textSoft }]}>
                    Akun baru mendapat membership trial 30 hari gratis
                  </Text>
                </View>
              </FadeInView>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }

const localStyles = StyleSheet.create({
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
  },
  successBody: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: -4,
  },
  matchText: {
    fontSize: 12,
    fontWeight: "600",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  linkText: {
    fontSize: 13,
  },
  trialBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    marginHorizontal: 4,
  },
  trialText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  },
});
