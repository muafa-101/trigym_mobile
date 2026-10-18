/**
 * _layout.tsx  (layout ROOT aplikasi)
 * ------------------------------------------------------------------
 * File ini membungkus SEMUA halaman di folder app/. Di sini kita:
 *   1. Memasang "penyedia data" (Provider) supaya tema & data gym bisa
 *      dibaca semua halaman.
 *   2. Mendaftarkan semua halaman di <Stack> beserta judul headernya.
 *   3. Memasang tombol dark mode di header (muncul di semua halaman).
 *
 * Latar belakang (gambar) diurus oleh komponen Screen di tiap halaman.
 *
 * Nama file di folder app/ = alamat halamannya:
 *   index.tsx             -> "/"                    pilih peran
 *   home.tsx              -> "/home"                dashboard member
 *   qr.tsx                -> "/qr"                  QR check-in
 *   histori.tsx           -> "/histori"             riwayat + streak
 *   perpanjang.tsx        -> "/perpanjang"          pilih paket + bayar
 *   perpanjang-sukses.tsx -> "/perpanjang-sukses"   konfirmasi
 *   admin/index.tsx       -> "/admin"               dashboard admin
 *   admin/scan.tsx        -> "/admin/scan"          check-in member
 *   admin/members.tsx     -> "/admin/members"       daftar member
 */
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { GymProvider } from "@/context/GymContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

/**
 * Stack dipisah jadi komponen sendiri karena ia perlu membaca warna
 * tema (useTheme), sedangkan useTheme hanya boleh dipakai DI DALAM
 * ThemeProvider.
 */
function ThemedStack() {
  const { colors, isDark } = useTheme();

  return (
    <>
      {/* Warna ikon baterai/jam di status bar HP */}
      <StatusBar style={isDark ? "light" : "dark"} />

      <Stack
        // screenOptions = pengaturan yang berlaku untuk SEMUA halaman
        screenOptions={{
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTintColor: colors.headerText,
          headerTitleStyle: { color: colors.headerText },
          headerShadowVisible: false, // tanpa garis tipis di bawah header
          headerRight: () => <ThemeToggleButton />,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {/* Stack.Screen = pengaturan khusus satu halaman */}
        <Stack.Screen name="index" options={{ title: "TRIGYM" }} />
        <Stack.Screen
          name="home"
          options={{
            title: "HOME",
            headerBackVisible: false, // tidak ada tombol back ke halaman peran
            gestureEnabled: false, // matikan swipe back (iOS)
          }}
        />
        <Stack.Screen name="qr" options={{ title: "QR Member" }} />
        <Stack.Screen name="histori" options={{ title: "Riwayat & Streak" }} />
        <Stack.Screen
          name="perpanjang"
          options={{ title: "Perpanjang Membership" }}
        />
        <Stack.Screen
          name="perpanjang-sukses"
          options={{
            title: "Berhasil",
            headerBackVisible: false, // setelah bayar, tidak boleh back ke form
            gestureEnabled: false,
          }}
        />

        {/* Halaman admin (folder app/admin/) */}
        <Stack.Screen
          name="admin/index"
          options={{
            title: "ADMIN",
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="admin/scan" options={{ title: "Check-in Member" }} />
        <Stack.Screen
          name="admin/members"
          options={{ title: "Daftar Member" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GymProvider>
        <ThemedStack />
      </GymProvider>
    </ThemeProvider>
  );
}
