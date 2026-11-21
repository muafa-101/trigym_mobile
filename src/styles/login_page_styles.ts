/**
 * login_page_styles.ts
 * ------------------------------------------------------------------
 * Gaya khusus untuk halaman Login yang baru (src/app/login.tsx).
 * Halaman ini memiliki desain fullscreen yang lebih modern:
 *   - Logo besar di bagian atas
 *   - Form login di tengah dengan glassmorphism effect
 *   - Tombol demo di bawah
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createLoginPageStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* ---- Wrapper keseluruhan ---- */
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      paddingBottom: 24,
    },

    /* ---- Bagian atas: logo + tagline ---- */
    topSection: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 24,
      paddingBottom: 16,
      gap: 12,
    },
    logoWrapper: {
      alignItems: "center",
      gap: 10,
    },
    logoGlow: {
      width: 180,
      height: 72,
    },
    appName: {
      color: c.white,
      fontSize: 36,
      fontWeight: "900",
      letterSpacing: 4,
      textShadowColor: "rgba(0,0,0,0.5)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 8,
    },
    tagline: {
      color: c.textMuted,
      fontSize: 13,
      fontWeight: "500",
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 20,
    },

    /* ---- Kartu form login (bottom sheet style) ---- */
    formCard: {
      backgroundColor: c.primary,
      borderRadius: 28,
      marginHorizontal: 16,
      padding: 20,
      gap: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 20,
    },

    /* ---- Header form ---- */
    formHeader: {
      alignItems: "center",
      gap: 4,
      paddingBottom: 4,
    },
    formTitle: {
      color: c.text,
      fontSize: 20,
      fontWeight: "800",
      letterSpacing: 1,
    },
    formSubtitle: {
      color: c.textMuted,
      fontSize: 12,
      fontWeight: "500",
    },

    /* ---- Input field ---- */
    inputWrapper: {
      gap: 10,
    },
    inputGroup: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.deep,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.divider,
      paddingHorizontal: 14,
      gap: 10,
    },
    inputGroupFocused: {
      borderColor: c.cta,
      shadowColor: c.cta,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4,
    },
    inputIcon: {
      // Icon wrapper styling
    },
    textInput: {
      flex: 1,
      paddingVertical: 14,
      fontSize: 14,
      color: c.text,
      minHeight: 48,
    },
    eyeButton: {
      padding: 4,
    },

    /* ---- Error message ---- */
    errorBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,92,92,0.15)",
      borderRadius: 10,
      padding: 10,
      gap: 8,
      borderWidth: 1,
      borderColor: c.danger,
    },
    errorText: {
      flex: 1,
      color: c.danger,
      fontSize: 12,
      fontWeight: "500",
    },

    /* ---- Tombol login utama ---- */
    loginButton: {
      backgroundColor: c.cta,
      borderRadius: 14,
      paddingVertical: 15,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
    },
    loginButtonDisabled: {
      opacity: 0.6,
    },
    loginButtonText: {
      color: c.ctaText,
      fontSize: 15,
      fontWeight: "900",
      letterSpacing: 1,
    },

    /* ---- Pemisah "ATAU" ---- */
    dividerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: c.divider,
      opacity: 0.5,
    },
    dividerText: {
      color: c.textMuted,
      fontSize: 11,
      fontWeight: "600",
    },

    /* ---- Tombol demo ---- */
    demoRow: {
      flexDirection: "row",
      gap: 10,
    },
    demoButton: {
      flex: 1,
      backgroundColor: c.navy,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
      gap: 4,
    },
    demoButtonText: {
      color: c.textSoft,
      fontSize: 12,
      fontWeight: "700",
    },
    demoButtonSub: {
      color: c.textMuted,
      fontSize: 10,
      fontWeight: "500",
    },

    /* ---- Footer catatan ---- */
    footerNote: {
      color: c.textMuted,
      fontSize: 10,
      textAlign: "center",
      lineHeight: 15,
    },

    /* ---- Badge fitur (atas form) ---- */
    badgeRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
      marginBottom: 4,
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.12)",
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 5,
    },
    badgeText: {
      color: c.textSoft,
      fontSize: 11,
      fontWeight: "600",
    },
  });
