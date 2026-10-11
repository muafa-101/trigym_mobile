import {ClassItem} from "@/types/landing";

export const LOGO_SOURCE = require("@/assets/logo.png");

export const HERO_DESCRIPTION = `Tempat latihan yang lengkap, bersih, dan nyaman. Alat modern,  pelatih berpengalaman, dan jadwal kelas yang fleksibel untuk semua level.`

export const PROFILE = {
    name: "Muhammad Kharisma Aditya Putra",
    nim: "02010602",
};

export const FACILITIES = [
    {
        title: "Peralatan Modern",
        desc: "Lebih dari 60 unit alat kardio dan beban dari merek terpercaya, dirawat rutin setiap minggu.",
    },
    {
        title: "Personal Trainer",
        desc: "Pelatih bersertifikat yang menyusun program sesuai kondisi dan target kamu.",
    },
    {
        title: "Area luas & nyaman",
        desc: "Ruang latihan 800 m² dengan pendingin udara, loker, dan kamar bilas air panas.",
    },
];

export const CLASSES: ClassItem[] = [
    { label: "YOGA &\nPILATES", icon: "yoga" },
    { label: "WEIGHT\nTRAINING", icon: "weight-lifter" },
    { label: "CARDIO\n& HIT", icon: "heart-pulse" },
    { label: "ZUMBA", icon: "human-female-dance" },
];