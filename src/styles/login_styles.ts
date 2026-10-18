/**
 * login_styles.ts  (gaya halaman PILIH PERAN, alamat "/")
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Hero (logo + deskripsi) */
    hero: { backgroundColor: c.primary, borderRadius: 14, overflow: "hidden" },
    heroTopBar: { height: 26 },
    heroDivider: { height: 4, backgroundColor: c.divider },
    heroBody: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 28,
      paddingHorizontal: 14,
      gap: 14,
    },
    logo: { width: 140, height: 56, flexShrink: 0 },
    heroText: {
      flex: 1,
      color: c.text,
      fontSize: 13,
      fontWeight: "600",
      lineHeight: 19,
    },

    /* Keterangan kecil di bawah tombol */
    footnote: {
      color: c.textMuted,
      fontSize: 11,
      lineHeight: 16,
      textAlign: "center",
      paddingHorizontal: 6,
      paddingBottom: 4,
    },
  });
