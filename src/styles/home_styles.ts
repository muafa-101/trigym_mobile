/**
 * home_styles.ts  (gaya halaman HOME member)
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Kartu sesi latihan (check-in / check-out) */
    sessionCard: {
      backgroundColor: c.deep,
      borderRadius: 14,
      padding: 12,
      gap: 10,
    },
    sessionRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    sessionTextWrap: { flex: 1, gap: 2 },
    sessionTitle: { color: c.text, fontSize: 13, fontWeight: "800" },
    sessionSub: { color: c.textMuted, fontSize: 11, fontWeight: "500" },
    // Tombol di dalam kartu sesi dibuat lebih kecil dari tombol biasa
    sessionButton: { paddingVertical: 10, paddingHorizontal: 14 },

    /* Baris HISTORI / QR + kartu api (streak) */
    utilityRow: { flexDirection: "row", alignItems: "stretch", gap: 12 },
    historyCard: {
      flex: 2,
      backgroundColor: c.utilityCard,
      borderRadius: 20,
      padding: 8,
    },
    historyIconsRow: { flex: 1, flexDirection: "column", gap: 8 },
    historyIconBox: {
      flex: 1,
      aspectRatio: 1,
      backgroundColor: c.utilityBox,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: c.white,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    historyLabelText: { color: c.white, fontSize: 10, fontWeight: "700" },
    flameCard: {
      flex: 3,
      aspectRatio: 1,
      backgroundColor: c.flameCard,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    flameNumber: {
      color: c.white,
      fontSize: 34,
      fontWeight: "900",
      lineHeight: 38,
    },
    flameCaption: {
      color: c.white,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
    },
  });
