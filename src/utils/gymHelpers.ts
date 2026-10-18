/**
 * gymHelpers.ts
 * ------------------------------------------------------------------
 * Fungsi-fungsi kecil (tanpa tampilan) khusus urusan gym:
 * status keramaian, status membership, sesi latihan, format rupiah.
 */
import {
  AUTO_CHECKOUT_HOURS,
  CROWD_BUSY_FROM,
  CROWD_NORMAL_FROM,
  EXPIRING_SOON_DAYS,
} from "@/const/gymConfig";
import { Visit } from "@/types/gym";
import { formatTime, getDaysLeft } from "@/utils/dateHelpers";

/* ------------------------------------------------------------------
 * Status keramaian
 * ------------------------------------------------------------------ */

// Nama warna di theme.ts. Dipilih lewat nama supaya ikut sistem tema.
export type CrowdColorKey = "crowdLow" | "crowdMid" | "crowdHigh";

export interface CrowdInfo {
  label: string;
  colorKey: CrowdColorKey;
}

/** Menentukan status keramaian dari jumlah orang yang sedang check-in. */
export function getCrowdInfo(count: number): CrowdInfo {
  if (count < CROWD_NORMAL_FROM) return { label: "SEPI", colorKey: "crowdLow" };
  if (count < CROWD_BUSY_FROM) {
    return { label: "NORMAL", colorKey: "crowdMid" };
  }
  return { label: "RAMAI", colorKey: "crowdHigh" };
}

/* ------------------------------------------------------------------
 * Status membership
 * ------------------------------------------------------------------ */

export type MembershipColorKey = "mint" | "warning" | "danger";

export interface MembershipStatus {
  label: string; // AKTIF / SEGERA BERAKHIR / BERAKHIR
  detail: string; // "45 hari lagi", "Berakhir hari ini", dst
  colorKey: MembershipColorKey;
  isActive: boolean; // masih boleh check-in?
  daysLeft: number;
}

export function getMembershipStatus(
  validUntil: string,
  now: Date = new Date(),
): MembershipStatus {
  const daysLeft = getDaysLeft(validUntil, now);

  if (daysLeft < 0) {
    return {
      label: "BERAKHIR",
      detail: "Sudah kedaluwarsa",
      colorKey: "danger",
      isActive: false,
      daysLeft,
    };
  }
  const detail = daysLeft === 0 ? "Berakhir hari ini" : `${daysLeft} hari lagi`;
  if (daysLeft <= EXPIRING_SOON_DAYS) {
    return {
      label: "SEGERA BERAKHIR",
      detail,
      colorKey: "warning",
      isActive: true,
      daysLeft,
    };
  }
  return { label: "AKTIF", detail, colorKey: "mint", isActive: true, daysLeft };
}

/* ------------------------------------------------------------------
 * Sesi latihan
 * ------------------------------------------------------------------ */

/** Waktu check-out otomatis = jam masuk + AUTO_CHECKOUT_HOURS. */
export function getAutoCheckoutDate(visit: Visit): Date {
  const checkIn = new Date(visit.checkInAt);
  return new Date(checkIn.getTime() + AUTO_CHECKOUT_HOURS * 60 * 60 * 1000);
}

/**
 * Apakah kunjungan ini masih berlangsung?
 * Ya, kalau belum check-out DAN belum lewat batas otomatis.
 */
export function isVisitActive(visit: Visit, now: Date = new Date()): boolean {
  if (visit.checkOutAt !== null) return false;
  return now.getTime() < getAutoCheckoutDate(visit).getTime();
}

/**
 * Teks jam keluar untuk satu baris riwayat:
 *  - masih berlangsung -> "Sedang berlatih"
 *  - check-out sendiri -> jam aslinya
 *  - lupa check-out    -> "Otomatis HH:MM"
 */
export function getCheckoutLabel(visit: Visit, now: Date = new Date()): string {
  if (visit.checkOutAt !== null) return formatTime(new Date(visit.checkOutAt));
  if (isVisitActive(visit, now)) return "Sedang berlatih";
  return `Otomatis ${formatTime(getAutoCheckoutDate(visit))}`;
}

/* ------------------------------------------------------------------
 * Format teks
 * ------------------------------------------------------------------ */

/** 150000 -> "Rp 150.000" */
export function formatRupiah(amount: number): string {
  return "Rp " + String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
