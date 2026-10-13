import { StyleSheet } from "react-native";

const GRAY = "#DADADA";
const BLUE = "#548CFF";
const NAVY = "#283350";
const DEEP = "#1F4DA0";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#D6F3FB" },
  scroll: { padding: 20, paddingBottom: 16 },
  page: { gap: 14 },

  /* Dekorasi latar */
  blob: { position: "absolute", borderRadius: 999 },

  /* Profil */
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7ACFE0",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  profileTextWrap: { flex: 1, marginLeft: 14 },
  profileText: {
    color: "#1F4DE0",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },

  /* Hero */
  hero: { backgroundColor: BLUE, borderRadius: 14, overflow: "hidden" },
  heroTopBar: { height: 26 },
  heroDivider: { height: 4, backgroundColor: "rgba(255,255,255,0.85)" },
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
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 19,
  },

  /* Seksi (dipakai bersama fasilitas & kelas) */
  section: { backgroundColor: BLUE, borderRadius: 16, padding: 10, gap: 10 },
  sectionTitleWrap: {
    backgroundColor: NAVY,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  sectionTitle: {
    color: "#E6E9F2",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 1,
    textAlign: "center",
  },

  /* Indikator carousel */
  indicatorRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  indicator: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E3E3E3",
  },
  indicatorActive: { backgroundColor: "#5A5A5A" },

  /* Kartu dalam */
  innerCard: { flex: 1, backgroundColor: DEEP, borderRadius: 16, padding: 14 },

  /* Fasilitas */
  facilityTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  facilityAccent: {
    alignSelf: "center",
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#173C80",
  },
  // scale > 1 = zoom ke bagian tengah gambar (ubah ke 1 untuk tanpa zoom)
  facilityImage: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.25 }],
  },
  facilityTextWrap: { flex: 1, gap: 10 },
  facilityDesc: { color: "#F1F5FF", fontSize: 13, lineHeight: 20 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },

  /* Kelas */
  classImage: {
    width: "100%",
    aspectRatio: 4 / 3, // 4:3
    borderRadius: 16,
    backgroundColor: "#173C80",
  },
  classBody: { marginTop: 14, gap: 6 },
  classHeaderRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  classIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  classLabel: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  classDesc: { color: "#F1F5FF", fontSize: 13, lineHeight: 20 },
  classMetaRow: { flexDirection: "row", gap: 8, marginTop: 6 },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  metaText: { color: "#FFFFFF", fontSize: 11, fontWeight: "600" },
});
