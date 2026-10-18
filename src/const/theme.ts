/**
 * theme.ts
 * ------------------------------------------------------------------
 * SATU-SATUNYA tempat semua warna aplikasi didefinisikan.
 *
 * Ada dua "paket warna": terang (light) dan gelap (dark).
 * Kedua paket punya NAMA yang sama (primary, text, dst), hanya nilai
 * hex-nya yang beda. Di file lain kita tidak menulis "#548CFF" lagi,
 * tapi `colors.primary`. Saat tema berganti, semua halaman ikut berubah.
 *
 * Mau ganti warna aplikasi? Cukup ubah file ini.
 */

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  /* Latar */
  background: string; // warna dasar (terlihat kalau gambar belum termuat)
  overlay: string; // lapisan di atas gambar background (gelap saat dark mode)

  /* Header (bar atas) */
  headerBackground: string;
  headerText: string;

  /* Warna utama kartu */
  primary: string; // kartu biru besar
  navy: string; // judul seksi
  deep: string; // kartu di dalam kartu

  /* Teks di atas kartu berwarna */
  white: string; // putih mutlak (tidak ikut tema)
  text: string;
  textSoft: string;
  textMuted: string;

  /* Elemen kecil */
  chip: string; // latar chip / badge transparan
  divider: string; // garis pemisah
  trackBg: string; // jalur progress / bar kosong
  scrim: string; // lapisan gelap di belakang pop up

  /* Warna status */
  mint: string; // hijau muda (aman / tercapai)
  warning: string;
  danger: string;
  crowdLow: string; // status gym SEPI
  crowdMid: string; // status gym NORMAL
  crowdHigh: string; // status gym RAMAI

  /* Tombol */
  pillBackground: string; // tombol kecil abu-abu
  pillText: string;
  cta: string; // tombol aksi utama (hijau)
  ctaText: string;

  /* Kartu khusus */
  memberIcon: string;
  utilityCard: string; // kotak hijau HISTORI / QR
  utilityBox: string;
  flameCard: string; // kotak ungu streak
}

export const lightColors: ThemeColors = {
  background: "#D6F3FB",
  overlay: "rgba(0,0,0,0)",

  headerBackground: "#FFFFFF",
  headerText: "#1B1B1B",

  primary: "#548CFF",
  navy: "#283350",
  deep: "#1F4DA0",

  white: "#FFFFFF",
  text: "#FFFFFF",
  textSoft: "#F1F5FF",
  textMuted: "#C9D8FF",

  chip: "rgba(255,255,255,0.16)",
  divider: "rgba(255,255,255,0.85)",
  trackBg: "rgba(255,255,255,0.3)",
  scrim: "rgba(10,16,35,0.6)",

  mint: "#B6F2E0",
  warning: "#FFD27A",
  danger: "#FF5C5C",
  crowdLow: "#43A040",
  crowdMid: "#FF8A1F",
  crowdHigh: "#FF5C5C",

  pillBackground: "#DADADA",
  pillText: "#2A4B9B",
  cta: "#8DEE7E",
  ctaText: "#0F3D14",

  memberIcon: "#B9CBFA",
  utilityCard: "#8DEE7E",
  utilityBox: "#2E7D32",
  flameCard: "#C24AFA",
};

export const darkColors: ThemeColors = {
  background: "#0E1424",
  overlay: "rgba(8,12,24,0.72)", // menggelapkan gambar BACKGROUND.jpg

  headerBackground: "#141B2D",
  headerText: "#FFFFFF",

  primary: "#2A4378",
  navy: "#141B2D",
  deep: "#182C57",

  white: "#FFFFFF",
  text: "#FFFFFF",
  textSoft: "#E4EAFB",
  textMuted: "#A9BCE8",

  chip: "rgba(255,255,255,0.12)",
  divider: "rgba(255,255,255,0.55)",
  trackBg: "rgba(255,255,255,0.22)",
  scrim: "rgba(0,0,0,0.7)",

  mint: "#7FE0C4",
  warning: "#F2C265",
  danger: "#FF6B6B",
  crowdLow: "#43A040",
  crowdMid: "#FF8A1F",
  crowdHigh: "#FF5C5C",

  pillBackground: "#3A4666",
  pillText: "#E4EAFB",
  cta: "#3FAE3A",
  ctaText: "#FFFFFF",

  memberIcon: "#B9CBFA",
  utilityCard: "#2F6B2A",
  utilityBox: "#1B4A1A",
  flameCard: "#7B2FA3",
};

/** Tabel pencarian: THEMES["dark"] -> paket warna gelap. */
export const THEMES: Record<ThemeMode, ThemeColors> = {
  light: lightColors,
  dark: darkColors,
};
