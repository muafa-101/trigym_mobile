import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#2A4B9B" },
  qrImage: { width: 250, height: 250 },
});