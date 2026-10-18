/**
 * histori_styles.ts  (gaya halaman RIWAYAT & STREAK)
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Ringkasan streak (kotak ungu) */
    streakRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: c.flameCard,
      borderRadius: 14,
      padding: 14,
    },
    streakNumber: {
      color: c.white,
      fontSize: 40,
      fontWeight: "900",
      lineHeight: 44,
    },
    streakTextWrap: { flex: 1, gap: 2 },
    streakTitle: { color: c.white, fontSize: 14, fontWeight: "800" },
    streakSub: { color: c.white, fontSize: 12, opacity: 0.9 },

    /* Daftar riwayat */
    totalText: {
      color: c.textMuted,
      fontSize: 11,
      fontWeight: "600",
      textAlign: "center",
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: c.deep,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    itemDate: { color: c.text, fontSize: 14, fontWeight: "700" },
    itemDay: { color: c.textMuted, fontSize: 11, marginTop: 2 },
    itemTimeWrap: { alignItems: "flex-end", gap: 2 },
    itemTime: { color: c.mint, fontSize: 11, fontWeight: "700" },
  });
