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

  summaryCard: {
    backgroundColor: "#8DEE7E",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    gap: 4,
  },
  summaryLabel: { color: "#1B5E20", fontSize: 11, fontWeight: "700" },
  summaryValue: { color: "#1B5E20", fontSize: 28, fontWeight: "800" },

  listSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  historyClass: { color: "#333333", fontSize: 12, fontWeight: "600" },
  historyDate: { color: "#777777", fontSize: 10 },
  historyTimeWrap: { alignItems: "flex-end", gap: 2 },
  historyTime: { color: "#2E7D32", fontSize: 11, fontWeight: "700" },
});
