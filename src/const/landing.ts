import { ClassItem, FacilityItem, ProfileData } from "@/types/landing";

export const PROFILE: ProfileData = {
  name: "Muhammad Kharisma Aditya Putra",
  nim: "02010602",
};

// TODO: arahkan ke path logo kamu
export const LOGO_SOURCE = require("@/assets/logo.png");

export const HERO_DESCRIPTION =
  "Tempat latihan yang lengkap, bersih, dan nyaman. Alat modern, pelatih berpengalaman, dan jadwal kelas yang fleksibel untuk semua level.";

// TODO: arahkan semua require() ke path gambar kamu (facility 1:1, class 4:3)
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

export const CLASSES: ClassItem[] = [
  {
    label: "YOGA & PILATES",
    desc: "Tingkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran.",
    image: require("@/assets/kelas/yoga.jpg"),
    duration: "60 menit",
    level: "Semua level",
    icon: "yoga",
  },
  {
    label: "ZUMBA",
    desc: "Latihan kardio penuh energi dengan gerakan tari yang menyenangkan.",
    image: require("@/assets/kelas/zumba.jpg"),
    duration: "45 menit",
    level: "Pemula",
    icon: "music",
  },
  {
    label: "WEIGHT TRAINING",
    desc: "Bangun kekuatan dan massa otot dengan latihan beban terarah dan teknik yang aman..",
    image: require("@/assets/kelas/weight training.jpg"),
    duration: "50 menit",
    level: "Menengah",
    icon: "dumbbell",
  },
  {
    label: "CARDIIO & HIIT",
    desc: "Latihan interval intensitas tinggi untuk hasil maksimal dalam waktu singkat.",
    image: require("@/assets/kelas/cardio.jpg"),
    duration: "30 menit",
    level: "Lanjutan",
    icon: "lightning-bolt",
  },
];
