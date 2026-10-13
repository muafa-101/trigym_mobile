import { StyleSheet } from "react-native";

const GRAY = "#DADADA";
const BLUE = "#548CFF";
const NAVY = "#283350";
const DEEP = "#1F4DA0";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#D6F3FB" },
  scroll: { padding: 20, paddingBottom: 16 },
  page: { gap: 14 },

  /* Kartu member (biru) */
  memberCard: {
    backgroundColor: BLUE,
    borderRadius: 14,
    overflow: "hidden",
  },
  memberTopBar: { height: 24 },
  memberDivider: { height: 4, backgroundColor: "rgba(255,255,255,0.85)" },
  memberBody: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    gap: 12,
  },
  extendPill: {
    alignSelf: "flex-end",
    backgroundColor: GRAY,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  extendPillText: {
    color: "#2A4B9B",
    fontSize: 11,
    fontWeight: "700",
  },
  memberRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  memberTextWrap: { flex: 1, gap: 2 },
  memberName: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  memberEmail: { color: "#EAF1FF", fontSize: 11, fontWeight: "500" },
  memberNim: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },
  validUntil: {
    alignSelf: "flex-end",
    color: "#B6F2E0",
    fontSize: 10,
    fontWeight: "600",
  },

  /* Progress bar sisa membership (lebar & warna diatur inline) */
  progressTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },

  /* Baris histori/qr + flame */
  utilityRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },

  historyCard: {
    flex: 2,
    backgroundColor: "#8DEE7E",
    borderRadius: 20,
    padding: 8,
  },
  historyIconsRow: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  historyIconBox: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#2E7D32",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  historyLabelText: { color: "#FFFFFF", fontSize: 10, fontWeight: "700" },

  flameCard: {
    flex: 3,
    aspectRatio: 1,
    backgroundColor: "#C24AFA",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Status ramai */
  statusRow: {
    flexDirection: "row",
    backgroundColor: "#FF5C5C",
    borderRadius: 14,
    overflow: "hidden",
  },
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
  statusPillText: { color: "#FF5C5C", fontSize: 15, fontWeight: "800" },
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
  checkinPillText: { color: "#FF5C5C", fontSize: 12, fontWeight: "800" },

  /* Kelas berlangsung (kuning) */
  liveClassRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3FF4D",
    borderRadius: 14,
    padding: 10,
    gap: 10,
  },
  liveClassIconWrap: { alignItems: "center", justifyContent: "center" },
  liveClassTextWrap: { flex: 1, gap: 2 },
  liveClassTitle: { color: "#4A4A00", fontSize: 12, fontWeight: "700" },
  liveClassTrainer: { color: "#4A4A00", fontSize: 11, fontWeight: "500" },
  followButton: {
    borderWidth: 2,
    borderColor: "#ffff",
    backgroundColor: "#6B6B1F",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  followButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  /* Pilihan kelas mingguan (tema sama dengan landing) */
  classSection: {
    backgroundColor: BLUE,
    borderRadius: 16,
    padding: 10,
    gap: 10,
  },
  classHeader: {
    backgroundColor: NAVY,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  classHeaderText: {
    color: "#E6E9F2",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  classList: { gap: 10 },
  classCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DEEP,
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  classIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  classTextWrap: { flex: 1, gap: 4 },
  classLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  classDesc: { color: "#F1F5FF", fontSize: 12, lineHeight: 18 },
  classMetaRow: { flexDirection: "row", gap: 8, marginTop: 4 },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  metaText: { color: "#FFFFFF", fontSize: 11, fontWeight: "600" },
});
