/**
 * ThemeContext.tsx
 * ------------------------------------------------------------------
 * Menyimpan tema yang sedang aktif (terang / gelap) dan membagikannya
 * ke SEMUA halaman.
 *
 * Kenapa pakai Context?
 *   useState biasa hanya hidup di satu komponen. Kalau tombol dark mode
 *   ada di header dan warnanya dipakai 6 halaman, state-nya harus
 *   "dititipkan" ke atas (di _layout.tsx) lalu dibagikan ke bawah.
 *   Itulah fungsi Context: sebuah "papan pengumuman" yang bisa dibaca
 *   semua komponen tanpa oper-oper props.
 *
 * Cara pakai di halaman mana pun:
 *   const { colors, isDark, toggleTheme } = useTheme();
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { THEMES, ThemeColors, ThemeMode } from "@/const/theme";

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Tema awal mengikuti pengaturan HP (terang/gelap).
  const systemScheme = useColorScheme();

  // useState: menyimpan tema aktif. Setiap kali berubah, semua layar
  // yang memakai useTheme() otomatis digambar ulang dengan warna baru.
  const [mode, setMode] = useState<ThemeMode>(
    systemScheme === "dark" ? "dark" : "light",
  );

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // useMemo: objek value hanya dibuat ulang kalau `mode` berubah.
  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors: THEMES[mode],
      isDark: mode === "dark",
      toggleTheme,
    }),
    [mode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Hook untuk membaca tema aktif. Hanya boleh dipakai di dalam ThemeProvider. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme harus dipakai di dalam <ThemeProvider>");
  }
  return ctx;
}

/**
 * Hook bantu: membuat StyleSheet dari paket warna yang aktif.
 *
 * Pemakaian:
 *   const styles = useThemedStyles(createStyles);
 *
 * `createStyles` adalah fungsi di file styles yang menerima `colors`
 * dan mengembalikan StyleSheet. Hasilnya di-cache (useMemo) dan hanya
 * dihitung ulang kalau tema berganti.
 */
export function useThemedStyles<T>(factory: (colors: ThemeColors) => T): T {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [factory, colors]);
}
