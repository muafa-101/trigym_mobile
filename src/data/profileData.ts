/**
 * profileData.ts
 * ------------------------------------------------------------------
 * Data awal (sementara / dummy) untuk member, riwayat, dan paket.
 *
 * Ini hanya NILAI AWAL. Data yang bisa berubah (masa berlaku,
 * riwayat check-in) disimpan di GymContext, bukan diubah di sini.
 * Nanti bisa diganti dengan data dari server / login.
 */
import { CheckinHistory, MembershipPlan, Member } from "@/types/gym";

export const MEMBER: Member = {
  name: "Muhammad Kharisma Aditya Putra",
  email: "yenderruaditya@gmail.com",
  nim: "02010602",
  validUntil: "31/12/2026",
};

// Kelas yang sedang berlangsung (id merujuk ke classData.ts)
export const LIVE_CLASS_ID = "weight-training";

// Lama membership (hari), dipakai untuk menghitung panjang progress bar
export const MEMBERSHIP_TOTAL_DAYS = 365;

// Paket perpanjangan. Harga hanya contoh (placeholder).
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  { id: "1", months: 1, label: "1 Bulan", price: 150000 },
  { id: "3", months: 3, label: "3 Bulan", price: 400000, note: "Hemat 11%" },
  { id: "6", months: 6, label: "6 Bulan", price: 750000, note: "Hemat 17%" },
  {
    id: "12",
    months: 12,
    label: "12 Bulan",
    price: 1400000,
    note: "Paling hemat",
  },
];

// Urutan: yang terbaru di atas.
// checkOutTime: null artinya member lupa checkout, jadi dihitung otomatis (+2 jam)
export const CHECKIN_HISTORY: CheckinHistory[] = [
  {
    id: 4,
    date: "04/10/2026",
    className: "Zumba",
    checkInTime: "19:00",
    checkOutTime: null,
  },
  {
    id: 3,
    date: "02/10/2026",
    className: "Yoga & Pilates",
    checkInTime: "07:00",
    checkOutTime: "08:00",
  },
  {
    id: 2,
    date: "30/09/2026",
    className: "Cardio & HIIT",
    checkInTime: "18:30",
    checkOutTime: null,
  },
  {
    id: 1,
    date: "28/09/2026",
    className: "Weight Training",
    checkInTime: "16:00",
    checkOutTime: "17:15",
  },
];
