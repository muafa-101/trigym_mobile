/**
 * styles.ts  (gaya halaman BERANDA / landing)
 * ------------------------------------------------------------------
 * Gaya ditulis sebagai FUNGSI yang menerima paket warna (`c`).
 * Jadi tidak ada lagi warna hex yang ditulis langsung di sini:
 * semua warna diambil dari `c` (lihat const/theme.ts).
 *
 * Cara pakai di komponen:
 *   const s = useThemedStyles(createStyles);
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Kartu profil di atas beranda */
    profileCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.profileCardBackground,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 16,
      overflow: "hidden",
    },
    profileTextWrap: { flex: 1, marginLeft: 14 },
    profileText: {
      color: c.profileCardText,
      fontSize: 16,
      fontWeight: "700",
      lineHeight: 22,
    },

    /* Hero (logo + deskripsi) */
    hero: { backgroundColor: c.primary, borderRadius: 14, overflow: "hidden" },
    heroTopBar: { height: 26 },
    heroDivider: { height: 4, backgroundColor: c.divider },
    heroBody: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      flexGrow: 0,
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

    /* Seksi (dipakai bersama fasilitas & kelas) */
    section: {
      backgroundColor: c.primary,
      borderRadius: 16,
      padding: 10,
      gap: 10,
    },
    sectionTitleWrap: {
      backgroundColor: c.navy,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    sectionTitle: {
      color: c.textSoft,
      fontSize: 17,
      fontWeight: "600",
      letterSpacing: 1,
      textAlign: "center",
    },

    /* Indikator carousel (garis-garis kecil di atas kartu) */
    indicatorRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
    indicator: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      backgroundColor: c.indicator,
    },
    indicatorActive: { backgroundColor: c.indicatorActive },

    /* Kartu dalam (isi carousel) */
    innerCard: {
      flex: 1,
      backgroundColor: c.deep,
      borderRadius: 16,
      padding: 14,
    },

    /* Fasilitas */
    facilityTitle: {
      color: c.text,
      fontSize: 18,
      fontWeight: "700",
      textAlign: "center",
    },
    facilityAccent: {
      alignSelf: "center",
      width: 36,
      height: 3,
      borderRadius: 2,
      backgroundColor: c.text,
      opacity: 0.5,
      marginTop: 6,
      marginBottom: 14,
    },
    facilityRow: { flexDirection: "row", alignItems: "center", gap: 14 },
    facilityImageWrap: {
      width: 118,
      aspectRatio: 1, // 1:1
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: c.imageFallback,
    },
    // scale > 1 = zoom ke bagian tengah gambar (ubah ke 1 untuk tanpa zoom)
    facilityImage: {
      width: "100%",
      height: "100%",
      transform: [{ scale: 1.25 }],
    },
    facilityTextWrap: { flex: 1, gap: 10 },
    facilityDesc: { color: c.textSoft, fontSize: 13, lineHeight: 20 },
    badge: {
      alignSelf: "flex-start",
      backgroundColor: c.chip,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    badgeText: { color: c.text, fontSize: 11, fontWeight: "700" },

    /* Kelas */
    classImage: {
      width: "100%",
      aspectRatio: 4 / 3, // 4:3
      borderRadius: 16,
      backgroundColor: c.imageFallback,
    },
    classBody: { marginTop: 14, gap: 6 },
    classHeaderRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    classIconWrap: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: c.chip,
      alignItems: "center",
      justifyContent: "center",
    },
    classLabel: {
      flex: 1,
      color: c.text,
      fontSize: 20,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    classDesc: { color: c.textSoft, fontSize: 13, lineHeight: 20 },
    classMetaRow: { flexDirection: "row", gap: 8, marginTop: 6 },
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
  });
