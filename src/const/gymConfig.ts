/**
 * gymConfig.ts
 * ------------------------------------------------------------------
 * Semua ANGKA dan TEKS PENGATURAN gym dikumpulkan di sini.
 * Mau ubah aturan gym (target streak, batas ramai, harga paket)?
 * Cukup ubah file ini, tidak perlu membuka halaman satu per satu.
 */
import { MembershipPlan } from "@/types/gym";

export const GYM_NAME = "TriGym";

// TODO: arahkan ke path logo kamu
export const LOGO_SOURCE = require("@/assets/logo.png");

export const HERO_DESCRIPTION =
  "Check-in cepat pakai QR, pantau keramaian gym, dan jaga semangat latihan lewat streak mingguan.";

/* ------------------------------------------------------------------
 * Member yang sedang "login".
 * PLACEHOLDER: nanti diganti data dari proses login (server).
 * ------------------------------------------------------------------ */
export const CURRENT_MEMBER_ID = "m1";

/* ------------------------------------------------------------------
 * Aturan check-in
 * ------------------------------------------------------------------ */
// Lupa check-out? Sesi otomatis dianggap selesai setelah sekian jam.
export const AUTO_CHECKOUT_HOURS = 2;

/* ------------------------------------------------------------------
 * Streak mingguan
 * Satu minggu dianggap "tercapai" kalau member latihan di
 * WEEKLY_GOAL hari yang berbeda (minggu dihitung Senin - Minggu).
 * Streak = berapa minggu BERTURUT-TURUT target tercapai.
 * ------------------------------------------------------------------ */
export const WEEKLY_GOAL = 3;

/* ------------------------------------------------------------------
 * Status keramaian (jumlah orang yang sedang check-in)
 * Gym kecil: di bawah 10 = SEPI, 10-19 = NORMAL, 20 ke atas = RAMAI.
 * ------------------------------------------------------------------ */
export const CROWD_NORMAL_FROM = 10;
export const CROWD_BUSY_FROM = 20;

/* ------------------------------------------------------------------
 * Membership
 * ------------------------------------------------------------------ */
// Membership dianggap "segera berakhir" kalau sisa hari <= angka ini
export const EXPIRING_SOON_DAYS = 7;

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
