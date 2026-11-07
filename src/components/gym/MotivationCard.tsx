/**
 * MotivationCard.tsx
 * ------------------------------------------------------------------
 * Kartu kutipan motivasi gym yang muncul di halaman HOME member.
 *
 * Kartu ini menampilkan hasil fetch dari quoteService melalui
 * hook useMotivationQuote. Ketika data dimuat, tombol "KUTIPAN BARU"
 * memicu refresh() untuk mengambil kutipan berikutnya dari API.
 *
 * Label sumber (🌐 Online / 📱 Offline) memudahkan saat demo:
 *   - 🌐 Online  = data berhasil diambil dari internet (API quotable.io)
 *   - 📱 Offline = fallback lokal dipakai karena tidak ada koneksi
 */
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PressableScale } from "@/components/ui/PressableScale";
import { useTheme } from "@/context/ThemeContext";
import { useMotivationQuote } from "@/hooks/useMotivationQuote";
import { ThemeColors } from "@/const/theme";

export const MotivationCard: React.FC = () => {
  const { colors } = useTheme();
  const s = createStyles(colors);
  const { quote, loading, refresh } = useMotivationQuote();

  return (
    <View style={s.card}>
      {/* Header kartu */}
      <View style={s.header}>
        <Text style={s.headerText}>💪 MOTIVASI HARI INI</Text>
      </View>

      {/* Isi: loading spinner / teks kutipan */}
      <View style={s.body}>
        {loading ? (
          <ActivityIndicator color={colors.textSoft} />
        ) : quote ? (
          <>
            {/* Teks kutipan – dari Interface MotivationQuote.text */}
            <Text style={s.quoteText}>"{quote.text}"</Text>

            {/* Nama tokoh – dari Interface MotivationQuote.author */}
            <Text style={s.authorText}>— {quote.author}</Text>

            {/* Label sumber: tampilkan apakah dari API atau fallback */}
            <Text style={s.sourceLabel}>
              {quote.source === "api" ? "🌐 Online" : "📱 Offline"}
            </Text>
          </>
        ) : (
          <Text style={s.quoteText}>Gagal memuat kutipan.</Text>
        )}
      </View>

      {/* Tombol refresh – panggil ulang fetchMotivationQuote() */}
      <PressableScale onPress={refresh} disabled={loading} style={s.refreshBtn}>
        <Text style={s.refreshText}>
          {loading ? "Memuat..." : "KUTIPAN BARU"}
        </Text>
      </PressableScale>
    </View>
  );
};

/* ------------------------------------------------------------------ */
/* Gaya – inline di file ini karena hanya dipakai MotivationCard      */
/* ------------------------------------------------------------------ */
function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: c.primary,
      borderRadius: 16,
      padding: 10,
      gap: 8,
    },
    header: {
      backgroundColor: c.navy,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    headerText: {
      color: c.textSoft,
      fontSize: 14,
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    body: {
      backgroundColor: c.deep,
      borderRadius: 12,
      padding: 14,
      gap: 6,
      minHeight: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    quoteText: {
      color: c.text,
      fontSize: 13,
      fontStyle: "italic",
      textAlign: "center",
      lineHeight: 20,
    },
    authorText: {
      color: c.textMuted,
      fontSize: 11,
      fontWeight: "600",
      textAlign: "right",
      alignSelf: "flex-end",
    },
    sourceLabel: {
      color: c.textMuted,
      fontSize: 10,
      textAlign: "right",
      alignSelf: "flex-end",
    },
    refreshBtn: {
      backgroundColor: c.cta,
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: "center",
    },
    refreshText: {
      color: c.ctaText,
      fontSize: 13,
      fontWeight: "800",
    },
  });
}
