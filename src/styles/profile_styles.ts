/**
 * profile_styles.ts  (gaya halaman PROFIL)
 * ------------------------------------------------------------------
 * Sama seperti styles.ts: fungsi yang menerima paket warna `c`,
 * jadi otomatis ikut berubah saat dark mode.
 * Warna status keramaian (SEPI/NORMAL/RAMAI) sengaja tidak ikut tema
 * karena maknanya tetap (hijau/oranye/merah), diatur di gymHelpers.ts.
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* Kartu member (biru) */
    memberCard: {
      backgroundColor: c.primary,
      borderRadius: 14,
      overflow: "hidden",
    },
    memberTopBar: { height: 24 },
    memberDivider: { height: 4, backgroundColor: c.divider },
    memberBody: {
      paddingVertical: 18,
      paddingHorizontal: 14,
      gap: 12,
    },
    extendPill: {
      alignSelf: "flex-end",
      backgroundColor: c.pillBackground,
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 14,
    },
    extendPillText: { color: c.pillText, fontSize: 11, fontWeight: "700" },
    memberRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    memberTextWrap: { flex: 1, gap: 2 },
    memberName: { color: c.text, fontSize: 15, fontWeight: "700" },
    memberEmail: { color: c.textSoft, fontSize: 11, fontWeight: "500" },
    memberNim: {
      color: c.text,
      fontSize: 20,
      fontWeight: "700",
      marginTop: 2,
    },
    validUntil: {
      alignSelf: "flex-end",
      color: c.mint,
      fontSize: 10,
      fontWeight: "600",
    },

    /* Progress bar sisa membership (lebar & warna diatur di profile.tsx) */
    progressTrack: {
      height: 8,
      backgroundColor: c.trackBg,
      borderRadius: 4,
      overflow: "hidden",
    },
    progressFill: { height: "100%", borderRadius: 4 },

    /* Baris histori/qr + api */
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
      borderColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    historyLabelText: { color: "#FFFFFF", fontSize: 10, fontWeight: "700" },
    flameCard: {
      flex: 3,
      aspectRatio: 1,
      backgroundColor: c.flameCard,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },

    /* Status ramai (warna latar diatur di profile.tsx) */
    statusRow: { flexDirection: "row", borderRadius: 14, overflow: "hidden" },
    statusLeft: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      gap: 8,
      borderRightWidth: 2,
      borderRightColor: "#FFFFFF",
    },
    statusLabel: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
    statusPill: {
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 16,
    },
    statusPillText: { fontSize: 15, fontWeight: "800" },
    statusRight: {
      flex: 1.4,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
    },
    checkinPill: {
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 14,
    },
    checkinPillText: { fontSize: 12, fontWeight: "800" },

    /* Sesi latihan (check-in / check-out) */
    sessionCard: {
      backgroundColor: c.deep,
      borderRadius: 14,
      padding: 12,
      gap: 10,
    },
    sessionRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    sessionTextWrap: { flex: 1, gap: 2 },
    sessionTitle: { color: c.text, fontSize: 12, fontWeight: "700" },
    sessionSub: { color: c.textMuted, fontSize: 11, fontWeight: "500" },
    sessionButton: {
      backgroundColor: c.cta,
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    sessionButtonOut: { backgroundColor: c.danger },
    sessionButtonText: { color: c.ctaText, fontSize: 12, fontWeight: "800" },
    sessionButtonTextOut: { color: "#FFFFFF" },
    sessionNote: { color: c.warning, fontSize: 11, fontWeight: "600" },

    /* Kelas berlangsung (kuning) */
    liveClassRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.liveBackground,
      borderRadius: 14,
      padding: 10,
      gap: 10,
    },
    liveClassIconWrap: { alignItems: "center", justifyContent: "center" },
    liveClassTextWrap: { flex: 1, gap: 2 },
    liveClassTitle: { color: c.liveText, fontSize: 12, fontWeight: "700" },
    liveClassTrainer: { color: c.liveText, fontSize: 11, fontWeight: "500" },
    followButton: {
      borderWidth: 2,
      borderColor: "#FFFFFF",
      backgroundColor: c.liveButton,
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    followButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

    /* Pilihan kelas mingguan */
    classSection: {
      backgroundColor: c.primary,
      borderRadius: 16,
      padding: 10,
      gap: 10,
    },
    classHeader: {
      backgroundColor: c.navy,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    classHeaderText: {
      color: c.textSoft,
      fontSize: 15,
      fontWeight: "600",
      letterSpacing: 0.5,
      textAlign: "center",
    },
    classList: { gap: 10 },
    classCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.deep,
      borderRadius: 16,
      padding: 12,
      gap: 12,
    },
    classIconWrap: {
      width: 56,
      height: 56,
      borderRadius: 14,
      backgroundColor: c.chip,
      alignItems: "center",
      justifyContent: "center",
    },
    classTextWrap: { flex: 1, gap: 4 },
    classLabel: {
      color: c.text,
      fontSize: 16,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    classDesc: { color: c.textSoft, fontSize: 12, lineHeight: 18 },
    classMetaRow: { flexDirection: "row", gap: 8, marginTop: 4 },
    metaChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: c.chip,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    metaText: { color: c.text, fontSize: 11, fontWeight: "600" },
  });
