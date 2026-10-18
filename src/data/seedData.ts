/**
 * seedData.ts
 * ------------------------------------------------------------------
 * DATA CONTOH (dummy) supaya aplikasi terlihat hidup sebelum ada server.
 * Ini hanya NILAI AWAL: data yang berubah selama aplikasi dipakai
 * disimpan di GymContext.
 *
 * Tanggalnya dibuat RELATIF terhadap hari ini, jadi demo selalu terlihat
 * wajar (streak tidak "basi") kapan pun aplikasi dibuka.
 *
 * NANTI: hapus file ini dan ambil data dari server di GymContext.
 */
import { Member, Visit } from "@/types/gym";
import { addDays, startOfWeek, toISODate } from "@/utils/dateHelpers";

const today = new Date();
const thisMonday = startOfWeek(today);

/** Tanggal "YYYY-MM-DD" sekian hari dari sekarang (negatif = lalu). */
function dateFromNow(days: number): string {
  return toISODate(addDays(today, days));
}

/* ------------------------------------------------------------------
 * Member (m1 = member yang "login" di aplikasi, lihat gymConfig.ts)
 * ------------------------------------------------------------------ */
export const SEED_MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Muhammad Kharisma Aditya Putra",
    email: "yenderruaditya@gmail.com",
    code: "02010602",
    validUntil: dateFromNow(45),
  },
  {
    id: "m2",
    name: "Rizky Pratama",
    email: "rizky@example.com",
    code: "02010611",
    validUntil: dateFromNow(120),
  },
  {
    id: "m3",
    name: "Sari Wulandari",
    email: "sari@example.com",
    code: "02010627",
    validUntil: dateFromNow(5), // segera berakhir
  },
  {
    id: "m4",
    name: "Dewi Lestari",
    email: "dewi@example.com",
    code: "02010634",
    validUntil: dateFromNow(-10), // sudah berakhir
  },
  {
    id: "m5",
    name: "Bagas Santoso",
    email: "bagas@example.com",
    code: "02010648",
    validUntil: dateFromNow(200),
  },
  {
    id: "m6",
    name: "Maya Putri",
    email: "maya@example.com",
    code: "02010652",
    validUntil: dateFromNow(30),
  },
];

/* ------------------------------------------------------------------
 * Kunjungan
 * ------------------------------------------------------------------ */

/** Membuat satu kunjungan pada tanggal tertentu, jam 17:00, durasi 75 menit. */
function visitOn(
  id: string,
  memberId: string,
  day: Date,
  forgotCheckout = false,
): Visit {
  const checkIn = new Date(day);
  checkIn.setHours(17, 0, 0, 0);
  const checkOut = new Date(checkIn.getTime() + 75 * 60 * 1000);
  return {
    id,
    memberId,
    checkInAt: checkIn.toISOString(),
    checkOutAt: forgotCheckout ? null : checkOut.toISOString(),
  };
}

/**
 * Riwayat m1, dibuat per minggu (weeksAgo = berapa minggu yang lalu):
 *   minggu lalu ... 6 minggu lalu : 3 hari latihan (tercapai)  -> streak 6
 *   7 minggu lalu                 : 1 hari latihan (gagal)     -> streak putus di sini
 *   8-9 minggu lalu               : 3 hari latihan (tercapai)
 *   minggu ini                    : Senin & Rabu (2 dari 3)    -> sisa 1 sesi
 */
function buildDemoHistory(): Visit[] {
  const visits: Visit[] = [];
  // Hari latihan dalam seminggu: 0 = Senin, 2 = Rabu, 4 = Jumat
  const plan: { weeksAgo: number; days: number[] }[] = [
    { weeksAgo: 1, days: [0, 2, 4] },
    { weeksAgo: 2, days: [0, 2, 4] },
    { weeksAgo: 3, days: [0, 2, 4] },
    { weeksAgo: 4, days: [0, 2, 5] },
    { weeksAgo: 5, days: [1, 3, 4] },
    { weeksAgo: 6, days: [0, 2, 4] },
    { weeksAgo: 7, days: [2] },
    { weeksAgo: 8, days: [0, 2, 4] },
    { weeksAgo: 9, days: [1, 3, 5] },
    { weeksAgo: 0, days: [0, 2] }, // minggu ini
  ];

  plan.forEach(({ weeksAgo, days }) => {
    days.forEach((dayIndex) => {
      const day = addDays(thisMonday, -7 * weeksAgo + dayIndex);
      // Lewati hari yang belum terjadi (kalau hari ini masih awal minggu)
      if (day.getTime() >= addDays(today, 0).setHours(0, 0, 0, 0)) return;
      // Sesekali "lupa check-out" supaya tampilan Otomatis terlihat
      const forgot = (weeksAgo + dayIndex) % 5 === 0;
      visits.push(visitOn(`v-${weeksAgo}-${dayIndex}`, "m1", day, forgot));
    });
  });

  // Urutkan: yang terbaru di atas
  return visits.sort((a, b) => b.checkInAt.localeCompare(a.checkInAt));
}

/** Dua member lain yang SEDANG berlatih (supaya dashboard admin berisi). */
function buildActiveVisits(): Visit[] {
  const minutesAgo = (m: number) =>
    new Date(Date.now() - m * 60 * 1000).toISOString();
  return [
    { id: "v-live-1", memberId: "m2", checkInAt: minutesAgo(35), checkOutAt: null },
    { id: "v-live-2", memberId: "m3", checkInAt: minutesAgo(70), checkOutAt: null },
  ];
}

export const SEED_VISITS: Visit[] = [...buildActiveVisits(), ...buildDemoHistory()];
