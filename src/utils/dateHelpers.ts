/**
 * dateHelpers.ts
 * ------------------------------------------------------------------
 * Fungsi-fungsi kecil untuk tanggal. Semua pakai waktu LOKAL HP.
 *
 * Kenapa dipisah? Urusan tanggal gampang bikin bug (bulan mulai dari 0,
 * zona waktu, dst). Kalau semua ada di satu file, bug-nya mudah dicari.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

// Nama hari singkat, MULAI DARI SENIN (sesuai cara minggu dihitung)
export const DAY_LABELS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

// Angka -> 2 digit. Contoh: 7 -> "07"
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Date -> "YYYY-MM-DD" (tanggal lokal). */
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "YYYY-MM-DD" -> Date jam 00:00 lokal. */
export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Date -> "DD/MM/YYYY" untuk ditampilkan. */
export function formatDate(date: Date): string {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/** "YYYY-MM-DD" -> "DD/MM/YYYY" untuk ditampilkan. */
export function formatISODate(iso: string): string {
  return formatDate(parseISODate(iso));
}

/** Date -> "DD/MM" (tanpa tahun, untuk label sempit). */
export function formatDayMonth(date: Date): string {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
}

/** Date -> "HH:MM". */
export function formatTime(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Jam 00:00 pada hari yang sama. */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/** Menambah (atau mengurangi, kalau negatif) hari. Mengembalikan Date baru. */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Hari Senin jam 00:00 pada minggu dari `date`. */
export function startOfWeek(date: Date): Date {
  const result = startOfDay(date);
  // getDay(): Minggu = 0, Senin = 1, ... Sabtu = 6
  const daysSinceMonday = (result.getDay() + 6) % 7;
  return addDays(result, -daysSinceMonday);
}

/**
 * Menambah bulan ke tanggal "YYYY-MM-DD".
 * 31 Januari + 1 bulan = 28 Februari (tidak meloncat ke Maret).
 */
export function addMonthsToISO(iso: string, months: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const lastDayOfTarget = new Date(year, month - 1 + months + 1, 0).getDate();
  const result = new Date(
    year,
    month - 1 + months,
    Math.min(day, lastDayOfTarget),
  );
  return toISODate(result);
}

/**
 * Sisa hari membership.
 *   > 0  : masih beberapa hari lagi
 *   0    : hari ini adalah hari terakhir
 *   < 0  : sudah berakhir
 */
export function getDaysLeft(validUntil: string, now: Date = new Date()): number {
  const diff = parseISODate(validUntil).getTime() - startOfDay(now).getTime();
  return Math.round(diff / DAY_MS);
}

/**
 * Tanggal berlaku baru setelah perpanjang.
 * - Masih aktif  : bulan baru ditambahkan di ujung masa berlaku.
 * - Sudah berakhir: dihitung mulai hari ini.
 */
export function getExtendedDate(
  validUntil: string,
  months: number,
  now: Date = new Date(),
): string {
  const base = getDaysLeft(validUntil, now) >= 0 ? validUntil : toISODate(now);
  return addMonthsToISO(base, months);
}
