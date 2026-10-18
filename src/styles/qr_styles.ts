/**
 * qr_styles.ts  (gaya halaman QR MEMBER)
 */
import { StyleSheet } from "react-native";
import { ThemeColors } from "@/const/theme";

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    qrBody: { alignItems: "center", gap: 10, paddingVertical: 8 },
    hint: { color: c.textSoft, fontSize: 13, textAlign: "center" },
    // Bingkai putih: QR tetap mudah dipindai walau tema gelap
    qrFrame: { backgroundColor: c.white, borderRadius: 16, padding: 12 },
    qrImage: { width: 220, height: 220 },
    name: { color: c.text, fontSize: 14, fontWeight: "700", textAlign: "center" },
    code: { color: c.text, fontSize: 20, fontWeight: "800" },

    /* Kotak "mode demo" */
    demoBox: {
      backgroundColor: c.deep,
      borderRadius: 14,
      padding: 12,
      gap: 10,
    },
    demoTitle: {
      color: c.warning,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
    },
    demoText: { color: c.textSoft, fontSize: 12, lineHeight: 18 },
  });
