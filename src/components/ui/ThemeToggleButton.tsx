/**
 * ThemeToggleButton.tsx
 * ------------------------------------------------------------------
 * Tombol bulan/matahari di pojok kanan header untuk ganti
 * mode terang <-> gelap. Dipasang SEKALI di _layout.tsx,
 * jadi muncul di semua halaman.
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export const ThemeToggleButton: React.FC = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
    >
      {/* Saat gelap tampil matahari (untuk kembali terang), dan sebaliknya */}
      <Ionicons
        name={isDark ? "sunny" : "moon"}
        size={22}
        color={colors.headerText}
      />
    </Pressable>
  );
};
