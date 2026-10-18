/**
 * streak.ts
 * ------------------------------------------------------------------
 * Menghitung STREAK MINGGUAN (seperti streak Duolingo, tapi per minggu
 * karena orang tidak mungkin ke gym setiap hari).
 *
 * Aturan:
 *   1. Satu minggu = Senin sampai Minggu.
 *   2. Minggu "tercapai" kalau member latihan di >= WEEKLY_GOAL HARI
 *      yang berbeda (check-in dua kali di hari yang sama dihitung 1).
 *   3. Streak = jumlah minggu tercapai yang BERURUTAN sampai sekarang.
 *   4. Minggu ini yang belum tercapai TIDAK memutus streak (masih ada
 *      waktu). Streak baru putus kalau minggu lalu gagal.
 *
 * Contoh (target 3 hari): minggu-4 tercapai, minggu-3 tercapai,
 * minggu-2 tercapai, minggu-1 (lalu) tercapai, minggu ini baru 1 hari
 *  -> streak = 4, dan bertambah jadi 5 begitu minggu ini mencapai 3 hari.
 *
 * Fungsi di sini hanya MENGHITUNG; tidak ada tampilan.
 */
import { WEEKLY_GOAL } from "@/const/gymConfig";
import { StreakInfo, Visit, WeekSummary } from "@/types/gym";
import { addDays, startOfWeek, toISODate } from "@/utils/dateHelpers";

/**
 * Menghitung jumlah HARI latihan per minggu.
 * Hasil: peta  waktu-Senin-minggu-itu -> jumlah hari.
 */
function countDaysPerWeek(visits: Visit[]): Map<number, number> {
  // Kumpulkan tanggal unik per minggu (Set otomatis membuang duplikat)
  const daysByWeek = new Map<number, Set<string>>();

  for (const visit of visits) {
    const date = new Date(visit.checkInAt);
    const weekKey = startOfWeek(date).getTime();
    const days = daysByWeek.get(weekKey) ?? new Set<string>();
    days.add(toISODate(date));
    daysByWeek.set(weekKey, days);
  }

  const result = new Map<number, number>();
  daysByWeek.forEach((days, weekKey) => result.set(weekKey, days.size));
  return result;
}

/** Streak saat ini + progres minggu ini. `visits` = kunjungan SATU member. */
export function getStreakInfo(
  visits: Visit[],
  now: Date = new Date(),
): StreakInfo {
  const counts = countDaysPerWeek(visits);
  const thisWeek = startOfWeek(now);

  const thisWeekCount = counts.get(thisWeek.getTime()) ?? 0;
  const goalMet = thisWeekCount >= WEEKLY_GOAL;

  // Minggu ini ikut dihitung hanya kalau targetnya sudah tercapai
  let streak = goalMet ? 1 : 0;

  // Lalu mundur minggu demi minggu selama targetnya tercapai
  let cursor = addDays(thisWeek, -7);
  while ((counts.get(cursor.getTime()) ?? 0) >= WEEKLY_GOAL) {
    streak += 1;
    cursor = addDays(cursor, -7);
  }

  return { streak, thisWeekCount, goal: WEEKLY_GOAL, goalMet };
}

/** Ringkasan N minggu terakhir, URUT dari yang paling lama ke minggu ini. */
export function getRecentWeeks(
  visits: Visit[],
  weekCount: number = 8,
  now: Date = new Date(),
): WeekSummary[] {
  const counts = countDaysPerWeek(visits);
  const thisWeek = startOfWeek(now);
  const weeks: WeekSummary[] = [];

  for (let i = weekCount - 1; i >= 0; i--) {
    const weekStart = addDays(thisWeek, -7 * i);
    const count = counts.get(weekStart.getTime()) ?? 0;
    weeks.push({
      weekStart,
      count,
      goalMet: count >= WEEKLY_GOAL,
      isCurrent: i === 0,
    });
  }
  return weeks;
}

/**
 * Hari mana saja yang sudah latihan minggu ini?
 * Hasil: 7 nilai true/false, urutan Senin ... Minggu.
 */
export function getVisitedDaysThisWeek(
  visits: Visit[],
  now: Date = new Date(),
): boolean[] {
  const thisWeek = startOfWeek(now);
  const visitedDates = new Set(
    visits.map((v) => toISODate(new Date(v.checkInAt))),
  );
  return Array.from({ length: 7 }, (_, i) =>
    visitedDates.has(toISODate(addDays(thisWeek, i))),
  );
}
