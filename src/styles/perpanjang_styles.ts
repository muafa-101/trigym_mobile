/**
 * perpanjang_styles.ts
 * ------------------------------------------------------------------
 * Gaya untuk halaman PERPANJANG dan PERPANJANG-SUKSES
 * (dua halaman itu mirip, jadi berbagi satu file gaya).
 * Tombol memakai gaya bersama dari common_styles.ts.
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Kartu ringkasan masa berlaku */
    summaryCard: {
      backgroundColor: c.primary,
      borderRadius: 16,
      padding: 16,
      gap: 6,
    },
    summaryLabel: {
      color: c.textSoft,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1,
    },
    summaryValue: { color: c.text, fontSize: 20, fontWeight: "800" },
    summaryNew: { color: c.mint, fontSize: 13, fontWeight: "700" },

    /* Kartu paket */
    planCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.deep,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: "transparent",
      padding: 12,
      gap: 12,
    },
    planCardSelected: { borderColor: c.mint },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: c.textMuted,
      alignItems: "center",
      justifyContent: "center",
    },
    radioSelected: { borderColor: c.mint },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: c.mint,
    },
    planTextWrap: { flex: 1, gap: 2 },
    planLabel: { color: c.text, fontSize: 15, fontWeight: "800" },
    planNote: { color: c.mint, fontSize: 11, fontWeight: "600" },
    planPrice: { color: c.text, fontSize: 14, fontWeight: "700" },

    /* Halaman sukses */
    successCard: {
      backgroundColor: c.primary,
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      gap: 10,
    },
    successTitle: { color: c.text, fontSize: 20, fontWeight: "800" },
    successText: {
      color: c.textSoft,
      fontSize: 13,
      lineHeight: 20,
      textAlign: "center",
    },
    successDate: { color: c.mint, fontSize: 22, fontWeight: "800" },
  });
