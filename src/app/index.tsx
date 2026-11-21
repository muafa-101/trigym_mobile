/**
 * index.tsx  (halaman awal, alamat "/")
 * ------------------------------------------------------------------
 * Halaman pertama yang dibuka saat app diluncurkan.
 * Fungsinya sebagai "penjaga gerbang":
 *   - Jika sudah login (session aktif): langsung ke /home
 *   - Jika belum login: redirect ke halaman /login
 *
 * Halaman ini tidak menampilkan UI apa pun — hanya menampilkan loading
 * sementara auth state diperiksa.
 */
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function IndexScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    if (loading) return; // tunggu auth selesai dicek

    if (session) {
      // Sudah login -> langsung ke dashboard member
      router.replace("/home");
    } else {
      // Belum login -> ke halaman login
      router.replace("/login");
    }
  }, [loading, session, router]);

  // Tampilkan spinner kecil sementara redirect
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}
    >
      <ActivityIndicator size="large" color={colors.cta} />
    </View>
  );
}
