/**
 * Screen.tsx
 * ------------------------------------------------------------------
 * Kerangka standar SETIAP halaman:
 *   gambar background + lapisan gelap (dark mode) + area aman + scroll
 *   + padding + jarak antar kartu.
 *
 * Pemakaian:
 *   <Screen> ...kartu-kartu... </Screen>
 *
 * Soal ukuran gambar (penting!):
 *   Di browser, gambar akan memakai ukuran ASLINYA (misal 1080x2160)
 *   kalau lebar & tingginya tidak ditulis. Akibatnya halaman jadi bisa
 *   di-scroll ke bawah dan latar tampak "memaksa". Karena itu gambar
 *   di sini diberi width/height 100% secara eksplisit, dan wadahnya
 *   memotong apa pun yang melebihi layar (overflow: hidden).
 *   Gambar dan lapisan gelapnya juga satu wadah, jadi ukurannya
 *   selalu sama persis.
 */
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export const Screen: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* 1. Gambar background, memenuhi wadah (bukan ukuran aslinya) */}
      <Image
        source={require("@/assets/BACKGROUND.jpg")} // <- path background di sini
        style={[StyleSheet.absoluteFill, styles.fullSize]}
        resizeMode="cover"
      />
      {/* 2. Lapisan di atas gambar: transparan saat terang, gelap saat dark mode */}
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]}
      />

      {/* 3. Isi halaman. edges: bagian atas sudah ditangani header */}
      <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.page}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, overflow: "hidden" },
  fullSize: { width: "100%", height: "100%" },
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 32 },
  page: { gap: 14 }, // jarak antar kartu
});
