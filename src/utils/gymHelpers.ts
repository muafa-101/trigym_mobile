import { CheckinHistory } from "../types/gym";

export interface StatusInfo {
  label: string;
  color: string;
}

// Batas waktu di gym sebelum otomatis checkout (dalam jam)
const AUTO_CHECKOUT_HOURS = 2;

// Menentukan status keramaian dari jumlah check-in
export function getStatusInfo(checkinCount: number): StatusInfo {
  if (checkinCount < 40) {
    return { label: "SEPI", color: "#43A040" };
  }
  if (checkinCount < 90) {
    return { label: "NORMAL", color: "#FF8A1F" };
  }
  return { label: "RAMAI", color: "#FF5C5C" };
}

// Menghitung sisa hari membership dari tanggal format DD/MM/YYYY
export function getDaysLeft(validUntil: string): number {
  const [day, month, year] = validUntil.split("/").map(Number);
  const endDate = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((endDate.getTime() - today.getTime()) / msPerDay);
}

// Jam checkout otomatis = jam masuk + 2 jam. Contoh: "18:30" -> "20:30"
export function getAutoCheckout(checkInTime: string): string {
  const [hour, minute] = checkInTime.split(":").map(Number);
  const newHour = (hour + AUTO_CHECKOUT_HOURS) % 24;
  const hh = String(newHour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${hh}:${mm}`;
}

// Teks jam keluar: jam asli kalau checkout sendiri, atau "Otomatis HH:MM"
export function getCheckoutLabel(item: CheckinHistory): string {
  if (item.checkOutTime !== null) {
    return item.checkOutTime;
  }
  return `Otomatis ${getAutoCheckout(item.checkInTime)}`;
}

// Menghitung total kunjungan pakai loop for...of
export function countVisits(history: CheckinHistory[]): number {
  let total = 0;
  for (const item of history) {
    total += 1;
  }
  return total;
}
