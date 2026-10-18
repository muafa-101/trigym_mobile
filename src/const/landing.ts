/**
 * landing.ts (const)
 * ------------------------------------------------------------------
 * Teks dan gambar tetap untuk halaman beranda.
 * (Data kelas ada di data/classData.ts, data member di data/profileData.ts)
 */
import { FacilityItem } from "@/types/landing";

// TODO: arahkan ke path logo kamu
export const LOGO_SOURCE = require("@/assets/logo.png");

export const HERO_DESCRIPTION =
  "Tempat latihan yang lengkap, bersih, dan nyaman. Alat modern, pelatih berpengalaman, dan jadwal kelas yang fleksibel untuk semua level.";

// TODO: arahkan semua require() ke path gambar kamu (rasio 1:1)
export const FACILITIES: FacilityItem[] = [
  {
    title: "Peralatan Modern",
    desc: "Lebih dari 60 unit alat kardio dan beban dari merek terpercaya, dirawat rutin setiap minggu.",
    image: require("@/assets/fasilitas/PERALATAN GYM.jpg"),
    badge: "60+ Unit Alat",
  },
  {
    title: "Pelatih Profesional",
    desc: "Pelatih bersertifikat siap menyusun program latihan sesuai tujuan dan kemampuanmu.",
    image: require("@/assets/fasilitas/PERSONAL TRAINER.jpg"),
    badge: "Bersertifikat",
  },
  {
    title: "Area Nyaman & Bersih",
    desc: "Ruang ber-AC, loker aman, dan kamar mandi bersih yang dibersihkan beberapa kali sehari.",
    image: require("@/assets/fasilitas/AREA LUAS.jpg"),
    badge: "Ber-AC",
  },
];
