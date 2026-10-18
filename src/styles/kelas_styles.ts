/**
 * kelas_styles.ts  (gaya halaman DETAIL KELAS)
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.primary,
      borderRadius: 16,
      padding: 10,
      gap: 12,
    },
    image: {
      width: "100%",
      aspectRatio: 4 / 3,
      borderRadius: 14,
      backgroundColor: c.imageFallback,
    },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    iconWrap: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: c.chip,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      flex: 1,
      color: c.text,
      fontSize: 20,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    desc: { color: c.textSoft, fontSize: 13, lineHeight: 20 },
    metaRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
    metaChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: c.chip,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    metaText: { color: c.text, fontSize: 11, fontWeight: "600" },

    /* Kotak info: pelatih & jadwal */
    infoCard: {
      backgroundColor: c.deep,
      borderRadius: 14,
      padding: 14,
      gap: 8,
    },
    infoTitle: {
      color: c.textMuted,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1,
    },
    infoValue: { color: c.text, fontSize: 15, fontWeight: "700" },
    scheduleItem: { color: c.textSoft, fontSize: 13 },

    /* Tombol */
    note: { color: c.warning, fontSize: 12, fontWeight: "600" },
    buttonRow: { flexDirection: "row", gap: 10 },
    primaryButton: {
      flex: 2,
      backgroundColor: c.cta,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
    },
    primaryButtonDisabled: { opacity: 0.5 },
    primaryButtonText: { color: c.ctaText, fontSize: 14, fontWeight: "800" },
    secondaryButton: {
      flex: 1,
      backgroundColor: c.pillBackground,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
    },
    secondaryButtonText: { color: c.pillText, fontSize: 14, fontWeight: "700" },
  });
