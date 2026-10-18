/**
 * gym.ts
 * ------------------------------------------------------------------
 * Bentuk (tipe) data yang dipakai di seluruh aplikasi.
 * Kalau nanti data diambil dari server, bentuk respons server
 * sebaiknya disamakan dengan tipe-tipe ini.
 *
 * Aturan format tanggal (penting supaya tidak salah hitung):
 *   - tanggal saja  -> teks "YYYY-MM-DD"              (contoh: "2026-12-31")
 *   - tanggal+jam   -> teks ISO lengkap dari Date     (contoh: "2026-10-16T10:00:00.000Z")
 * Teks dibuat jadi tampilan "31/12/2026" hanya saat ditampilkan
 * (lihat utils/dateHelpers.ts).
 */

/** Data member. */
export interface Member {
  id: string;
  name: string;
  email: string;
  code: string; // nomor member (NIM / ID), ini juga isi QR
  validUntil: string; // "YYYY-MM-DD", hari TERAKHIR membership masih berlaku
}

/** Satu kunjungan: dari check-in sampai check-out. */
export interface Visit {
  id: string;
  memberId: string;
  checkInAt: string; // tanggal+jam ISO
  checkOutAt: string | null; // null = belum check-out
}

/** Paket perpanjangan membership. */
export interface MembershipPlan {
  id: string;
  months: number;
  label: string;
  price: number; // dalam Rupiah
  note?: string;
}

/** Hasil percobaan check-in. */
export type CheckInResult = "ok" | "expired" | "already" | "unknown";

/** Ringkasan streak mingguan seorang member. */
export interface StreakInfo {
  streak: number; // jumlah minggu berturut-turut yang targetnya tercapai
  thisWeekCount: number; // jumlah hari latihan minggu ini
  goal: number; // target hari latihan per minggu
  goalMet: boolean; // apakah target minggu ini sudah tercapai
}

/** Ringkasan satu minggu (untuk grafik batang). */
export interface WeekSummary {
  weekStart: Date; // hari Senin minggu itu
  count: number; // jumlah hari latihan
  goalMet: boolean;
  isCurrent: boolean; // true = minggu ini
}
