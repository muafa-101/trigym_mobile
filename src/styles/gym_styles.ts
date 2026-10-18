/**
 * gym_styles.ts
 * ------------------------------------------------------------------
 * Gaya untuk komponen-komponen di components/gym/:
 *   MemberCard, CrowdStatusCard, StreakModal, WeeklyBars
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createGymStyles = (c: ThemeColors) =>
  StyleSheet.create({
    /* ---------- MemberCard ---------- */
    memberCard: {
      backgroundColor: c.primary,
      borderRadius: 14,
      overflow: "hidden",
    },
    memberTopBar: { height: 24 },
    memberDivider: { height: 4, backgroundColor: c.divider },
    memberBody: { paddingVertical: 18, paddingHorizontal: 14, gap: 12 },
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
    memberCode: {
      color: c.text,
      fontSize: 20,
      fontWeight: "700",
      marginTop: 2,
    },
    validRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    statusChip: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    statusChipText: { color: c.navy, fontSize: 10, fontWeight: "800" },
    validText: { flex: 1, textAlign: "right", color: c.mint, fontSize: 10, fontWeight: "600" },

    /* ---------- CrowdStatusCard ---------- */
    crowdRow: { flexDirection: "row", borderRadius: 14, overflow: "hidden" },
    crowdLeft: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      gap: 8,
      borderRightWidth: 2,
      borderRightColor: c.white,
    },
    crowdLabel: { color: c.white, fontSize: 11, fontWeight: "700" },
    crowdPill: {
      backgroundColor: c.white,
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 16,
    },
    crowdPillText: { fontSize: 15, fontWeight: "800" },
    crowdRight: {
      flex: 1.4,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
    },
    countPill: {
      backgroundColor: c.white,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 14,
    },
    countPillText: { fontSize: 12, fontWeight: "800" },

    /* ---------- StreakModal (pop up api) ---------- */
    backdrop: {
      flex: 1,
      backgroundColor: c.scrim,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    },
    sheet: {
      width: "100%",
      maxWidth: 380,
      backgroundColor: c.flameCard,
      borderRadius: 24,
      padding: 20,
      alignItems: "center",
      gap: 10,
    },
    streakNumber: {
      color: c.white,
      fontSize: 64,
      fontWeight: "900",
      lineHeight: 70,
    },
    streakLabel: {
      color: c.white,
      fontSize: 13,
      fontWeight: "800",
      letterSpacing: 1.5,
    },
    streakMessage: {
      color: c.white,
      fontSize: 13,
      lineHeight: 19,
      textAlign: "center",
      opacity: 0.9,
    },
    modalSectionTitle: {
      alignSelf: "flex-start",
      color: c.white,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      marginTop: 8,
      opacity: 0.85,
    },
    dayRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "stretch",
    },
    dayCol: { alignItems: "center", gap: 4 },
    dayCircle: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: c.trackBg,
      alignItems: "center",
      justifyContent: "center",
    },
    dayCircleDone: { backgroundColor: c.white },
    dayCircleToday: { borderWidth: 2, borderColor: c.white },
    dayLabel: { color: c.white, fontSize: 10, fontWeight: "700", opacity: 0.85 },
    weekDotsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "stretch",
    },
    weekDot: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: c.trackBg,
    },
    weekDotMet: { backgroundColor: c.white },
    weekDotCurrent: { borderWidth: 2, borderColor: c.white },
    closeButton: {
      alignSelf: "stretch",
      backgroundColor: c.white,
      borderRadius: 14,
      paddingVertical: 12,
      alignItems: "center",
      marginTop: 10,
    },
    closeButtonText: { color: c.flameCard, fontSize: 14, fontWeight: "800" },

    /* ---------- WeeklyBars (grafik batang per minggu) ---------- */
    chartPlot: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
    goalLine: {
      position: "absolute",
      left: 0,
      right: 0,
      borderTopWidth: 1,
      borderStyle: "dashed",
      borderColor: c.divider,
    },
    barCol: { flex: 1, alignItems: "center", justifyContent: "flex-end", gap: 3 },
    bar: { width: "70%", borderRadius: 6, backgroundColor: c.trackBg },
    barMet: { backgroundColor: c.mint },
    barValue: { color: c.text, fontSize: 11, fontWeight: "700" },
    labelRow: { flexDirection: "row", gap: 6, marginTop: 6 },
    barLabel: {
      flex: 1,
      textAlign: "center",
      color: c.textMuted,
      fontSize: 9,
      fontWeight: "600",
    },
    barLabelCurrent: { color: c.text, fontWeight: "800" },
    legendText: { color: c.textMuted, fontSize: 10, marginTop: 8 },
  });
