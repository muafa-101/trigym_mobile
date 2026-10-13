import { StyleSheet } from "react-native";

const BLUE = "#548CFF";
const DEEP = "#1F4DA0";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#D6F3FB" },
  scroll: { padding: 20, paddingBottom: 16 },
  page: { gap: 14 },

  summaryCard: {
    backgroundColor: BLUE,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    gap: 4,
  },
  summaryLabel: {
    color: "#E6E9F2",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  summaryValue: { color: "#FFFFFF", fontSize: 32, fontWeight: "800" },

  listSection: {
    backgroundColor: BLUE,
    borderRadius: 16,
    padding: 10,
    gap: 10,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: DEEP,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  historyClass: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  historyDate: { color: "#C9D8FF", fontSize: 11, marginTop: 2 },
  historyTimeWrap: { alignItems: "flex-end", gap: 2 },
  historyTime: { color: "#B6F2E0", fontSize: 11, fontWeight: "700" },
});
