/**
 * classData.ts
 * ------------------------------------------------------------------
 * Daftar kelas gym. Ini SATU-SATUNYA sumber data kelas:
 * dipakai oleh beranda, profil, dan halaman detail kelas.
 *
 * Nanti kalau sudah ada server, ganti isi file ini dengan
 * pengambilan data dari API (fetch). Layar tidak perlu diubah.
 */
import { GymClass } from "@/types/gym";

// TODO: arahkan require() ke path gambar kamu (rasio 4:3)
export const CLASSES: GymClass[] = [
  {
    id: "yoga-pilates",
    label: "YOGA & PILATES",
    desc: "Tingkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran.",
    image: require("@/assets/kelas/yoga.jpg"),
    duration: "60 menit",
    level: "Semua level",
    icon: "yoga",
    trainer: "Sari Wulandari", // placeholder
    schedule: ["Senin 07:00", "Rabu 07:00", "Sabtu 08:00"],
  },
  {
    id: "zumba",
    label: "ZUMBA",
    desc: "Latihan kardio penuh energi dengan gerakan tari yang menyenangkan.",
    image: require("@/assets/kelas/zumba.jpg"),
    duration: "45 menit",
    level: "Pemula",
    icon: "music",
    trainer: "Dewi Lestari", // placeholder
    schedule: ["Selasa 18:00", "Kamis 18:00"],
  },
  {
    id: "weight-training",
    label: "WEIGHT TRAINING",
    desc: "Bangun kekuatan dan massa otot dengan latihan beban terarah dan teknik yang aman.",
    image: require("@/assets/kelas/weight training.jpg"),
    duration: "50 menit",
    level: "Menengah",
    icon: "dumbbell",
    trainer: "Abdoel Fatah", // placeholder
    schedule: ["Senin 16:00", "Rabu 16:00", "Jumat 16:00"],
  },
  {
    id: "cardio-hiit",
    label: "CARDIO & HIIT",
    desc: "Latihan interval intensitas tinggi untuk hasil maksimal dalam waktu singkat.",
    image: require("@/assets/kelas/cardio.jpg"),
    duration: "30 menit",
    level: "Lanjutan",
    icon: "lightning-bolt",
    trainer: "Rizky Pratama", // placeholder
    schedule: ["Selasa 06:30", "Kamis 06:30", "Minggu 08:00"],
  },
];

/** Cari kelas berdasarkan id. Hasilnya undefined kalau id tidak ada. */
export function getClassById(id: string | undefined): GymClass | undefined {
  return CLASSES.find((c) => c.id === id);
}
