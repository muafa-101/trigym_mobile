import { StyleSheet } from "react-native";

const GRAY = "#DADADA";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  scroll: { padding: 8 },
  page: {
    backgroundColor: GRAY,
    borderRadius: 20,
    padding: 14,
    paddingBottom: 24,
    gap: 16,
  },

  /* Kartu member (biru) */
  memberCard: {
    backgroundColor: "#548CFF",
    borderRadius: 14,
    overflow: "hidden",
  },
  memberTopBar: { height: 24 },
  memberDivider: { height: 4, backgroundColor: GRAY },
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
  extendPillPressed: { opacity: 0.7 },
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

  /* Baris histori/qr + flame */
  utilityRow: { flexDirection: "row", gap: 8 },

  historyCard: {
    flex: 1,
    backgroundColor: "#8DEE7E",
    borderRadius: 14,
    padding: 8,
    gap: 8,
  },
  historyIconsRow: { flexDirection: "row", gap: 6 },
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
  historyIconBoxPressed: { opacity: 0.7 },
  historyLabelText: { color: "#FFFFFF", fontSize: 10, fontWeight: "700" },

  flameCard: {
    width: 78,
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
  followButtonPressed: { opacity: 0.75 },
  followButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  /* Pilihan kelas mingguan */
  classSection: {
    backgroundColor: "#F9D9A0",
    borderRadius: 14,
    padding: 8,
    gap: 8,
  },
  classHeader: {
    borderWidth: 2,
    borderColor: "#ffff",
    backgroundColor: "#FF8A1F",
    borderRadius: 12,
    paddingVertical: 10,
  },
  classHeaderText: {
    color: "#FFFF",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  classRow: { flexDirection: "row", gap: 5 },
  classCard: {
    borderWidth: 2,
    borderColor: "#ffff",
    flex: 1,
    aspectRatio: 0.6,
    backgroundColor: "#FF8A1F",
    borderRadius: 12,
    paddingTop: 8,
    alignItems: "center",
  },
  classCardPressed: { opacity: 0.8 },
  classLabel: {
    color: GRAY,
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },
  classIconWrap: { flex: 1, justifyContent: "center" },
});
