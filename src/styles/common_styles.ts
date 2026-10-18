/**
 * common_styles.ts
 * ------------------------------------------------------------------
 * Gaya yang dipakai BERSAMA oleh banyak halaman: kartu, tombol, chip.
 * Dengan begini tombol hijau di halaman mana pun tampilannya sama,
 * dan kalau mau diubah cukup ubah di sini.
 *
 * Gaya ditulis sebagai FUNGSI yang menerima paket warna `c`, jadi
 * otomatis ikut berubah saat dark mode (lihat const/theme.ts).
 * Cara pakai:  const s = useThemedStyles(createCommonStyles);
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createCommonStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Kartu biru besar + judul seksi + kartu dalam */
    card: {
      backgroundColor: c.primary,
      borderRadius: 16,
      padding: 10,
      gap: 10,
    },
    sectionHeader: {
      backgroundColor: c.navy,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    sectionHeaderText: {
      color: c.textSoft,
      fontSize: 15,
      fontWeight: "600",
      letterSpacing: 0.5,
      textAlign: "center",
    },
    innerCard: {
      backgroundColor: c.deep,
      borderRadius: 14,
      padding: 12,
    },

    /* Baris tombol + pengatur lebar tombol di dalam baris */
    buttonRow: { flexDirection: "row", gap: 10 },
    grow1: { flex: 1 },
    grow2: { flex: 2 },

    /* Tombol utama (hijau), kedua (abu-abu), bahaya (merah) */
    primaryButton: {
      backgroundColor: c.cta,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButtonText: { color: c.ctaText, fontSize: 14, fontWeight: "800" },
    secondaryButton: {
      backgroundColor: c.pillBackground,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    secondaryButtonText: { color: c.pillText, fontSize: 14, fontWeight: "700" },
    dangerButton: {
      backgroundColor: c.danger,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    dangerButtonText: { color: c.white, fontSize: 14, fontWeight: "800" },
    disabled: { opacity: 0.5 },

    /* Teks kecil */
    note: { color: c.warning, fontSize: 12, fontWeight: "600" },
    emptyText: {
      color: c.textMuted,
      fontSize: 13,
      textAlign: "center",
      paddingVertical: 8,
    },

    /* Chip kecil transparan */
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: c.chip,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    chipText: { color: c.text, fontSize: 11, fontWeight: "600" },
  });
