/**
 * admin_styles.ts  (gaya halaman-halaman ADMIN)
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Kotak angka ringkasan */
    statsRow: { flexDirection: "row", gap: 10 },
    statTile: {
      flex: 1,
      backgroundColor: c.deep,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 6,
      alignItems: "center",
      gap: 2,
    },
    statValue: { color: c.text, fontSize: 26, fontWeight: "900" },
    statLabel: {
      color: c.textMuted,
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 0.5,
      textAlign: "center",
    },

    /* Baris daftar (member / orang yang sedang berlatih) */
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: c.deep,
      borderRadius: 14,
      padding: 12,
    },
    rowTextWrap: { flex: 1, gap: 2 },
    rowTitle: { color: c.text, fontSize: 14, fontWeight: "700" },
    rowSub: { color: c.textMuted, fontSize: 11 },
    // Tombol kecil di ujung baris
    rowButton: { paddingVertical: 8, paddingHorizontal: 12 },
    rowBadge: {
      backgroundColor: c.chip,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    rowBadgeText: { color: c.text, fontSize: 10, fontWeight: "800" },
    statusChip: {
      alignSelf: "flex-start",
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 2,
      marginTop: 2,
    },
    statusChipText: { color: c.navy, fontSize: 9, fontWeight: "800" },

    /* Halaman scan */
    scannerFrame: {
      height: 150,
      borderRadius: 14,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: c.divider,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    scannerText: {
      color: c.textMuted,
      fontSize: 12,
      textAlign: "center",
      paddingHorizontal: 16,
    },
    resultBox: {
      backgroundColor: c.deep,
      borderRadius: 14,
      padding: 12,
    },
    resultText: { fontSize: 13, fontWeight: "700" },

    /* Kolom pencarian */
    searchInput: {
      backgroundColor: c.deep,
      color: c.text,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 14,
    },
  });
