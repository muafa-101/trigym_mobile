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

  /* Profil */
  profileCard: {
    borderWidth: 2,
    borderColor: "#ffff",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#548CFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    overflow: "hidden",
  },
  profileTextWrap: { flex: 1, marginLeft: 12 },
  profileText: {
    color: "#FFFF",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },

  /* Hero */
  hero: { backgroundColor: "#548CFF", borderRadius: 14, overflow: "hidden" },
  heroTopBar: { height: 32 },
  heroDivider: { height: 5, backgroundColor: GRAY },
  heroBody: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    flexGrow: 0,
    paddingVertical: 28,
    paddingHorizontal: 10,
    gap: 10,
  },
  logo: { width: 130, height: 52, flexShrink: 0 },
  heroText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },

  /* Judul seksi (dipakai bersama) */
  sectionTitle: {
    color: GRAY,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },

  /* Fasilitas */
  facilitySection: {
    backgroundColor: "#94E88D",
    borderRadius: 14,
    padding: 8,
    gap: 8,
  },
  facilityHeader: {
    borderWidth: 2,
    borderColor: "#ffff",
    backgroundColor: "#43A040",
    borderRadius: 12,
    paddingVertical: 8,
  },
  facilityRow: { flexDirection: "row", gap: 6 },
  facilityCard: {
    borderWidth: 2,
    borderColor: "#ffff",
    flex: 1,
    backgroundColor: "#43A040",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: "center",
    minHeight: 200,
  },
  facilityTitle: {
    color: GRAY,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 16,
    marginBottom: 14,
  },
  facilityDesc: {
    color: "#22EE00",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 15,
  },

  /* Kelas */
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
    paddingVertical: 8,
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
  classLabel: {
    color: GRAY,
    fontSize: 9,
    fontWeight: "500",
    textAlign: "center",
  },
  classIconWrap: { flex: 1, justifyContent: "center" },
});
