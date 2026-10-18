/**
 * GymContext.tsx
 * ------------------------------------------------------------------
 * Menyimpan data gym yang BISA BERUBAH dan dipakai banyak halaman:
 *   - daftar member (masa berlaku membership)
 *   - daftar kunjungan (riwayat check-in / check-out)
 * serta nilai turunannya: siapa yang sedang di gym, streak, dst.
 *
 * Contoh alurnya:
 *   Admin menekan SCAN        -> checkIn("m3")  -> kunjungan baru
 *   Dashboard member/admin    -> otomatis menampilkan data terbaru
 *
 * Satu context dipakai OLEH member dan admin, jadi apa yang dilakukan
 * admin langsung terlihat di sisi member (dan sebaliknya).
 *
 * Semua perubahan data ada di file ini. Nanti kalau mau disambungkan ke
 * server, yang diubah cukup fungsi-fungsi di sini (halaman tidak perlu
 * disentuh).
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CURRENT_MEMBER_ID } from "@/const/gymConfig";
import { SEED_MEMBERS, SEED_VISITS } from "@/data/seedData";
import {
  CheckInResult,
  Member,
  StreakInfo,
  Visit,
} from "@/types/gym";
import { getExtendedDate } from "@/utils/dateHelpers";
import { getMembershipStatus, isVisitActive } from "@/utils/gymHelpers";
import { getStreakInfo } from "@/utils/streak";

interface GymContextValue {
  members: Member[];
  visits: Visit[]; // semua kunjungan, terbaru di atas
  currentMember: Member; // member yang sedang "login"
  myVisits: Visit[]; // kunjungan currentMember
  myActiveVisit: Visit | null; // null = currentMember tidak sedang di gym
  activeVisits: Visit[]; // semua orang yang sedang di gym
  streak: StreakInfo; // streak currentMember
  getMember: (id: string) => Member | undefined;
  checkIn: (memberId: string) => CheckInResult;
  checkOut: (memberId: string) => void;
  extendMembership: (memberId: string, months: number) => void;
}

const GymContext = createContext<GymContextValue | null>(null);

export function GymProvider({ children }: { children: React.ReactNode }) {
  // useState: dua data utama yang berubah selama aplikasi dipakai
  const [members, setMembers] = useState<Member[]>(SEED_MEMBERS);
  const [visits, setVisits] = useState<Visit[]>(SEED_VISITS);

  // useState + useEffect: "jam" yang berdetak tiap menit. Gunanya supaya
  // sesi yang sudah lewat batas otomatis (2 jam) hilang dari daftar
  // "sedang di gym" tanpa perlu menekan apa pun.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timerId); // bersihkan timer saat provider ditutup
  }, []);

  /* ---------- Data turunan (dihitung dari state di atas) ---------- */
  const currentMember =
    members.find((m) => m.id === CURRENT_MEMBER_ID) ?? members[0];

  const activeVisits = useMemo(
    () => visits.filter((v) => isVisitActive(v, now)),
    [visits, now],
  );

  const myVisits = useMemo(
    () => visits.filter((v) => v.memberId === currentMember.id),
    [visits, currentMember.id],
  );

  const myActiveVisit =
    activeVisits.find((v) => v.memberId === currentMember.id) ?? null;

  const streak = useMemo(() => getStreakInfo(myVisits, now), [myVisits, now]);

  /* ---------- Aksi ---------- */

  const getMember = useCallback(
    (id: string) => members.find((m) => m.id === id),
    [members],
  );

  /** Check-in: menambah satu kunjungan baru di paling atas riwayat. */
  const checkIn = useCallback(
    (memberId: string): CheckInResult => {
      const member = members.find((m) => m.id === memberId);
      if (!member) return "unknown";

      const time = new Date();
      if (!getMembershipStatus(member.validUntil, time).isActive) {
        return "expired";
      }
      if (visits.some((v) => v.memberId === memberId && isVisitActive(v, time))) {
        return "already";
      }

      const newVisit: Visit = {
        id: `v-${time.getTime()}`, // id unik dari waktu (sementara)
        memberId,
        checkInAt: time.toISOString(),
        checkOutAt: null,
      };
      setVisits((prev) => [newVisit, ...prev]);
      return "ok";
    },
    [members, visits],
  );

  /** Check-out: mengisi jam keluar pada kunjungan yang sedang berjalan. */
  const checkOut = useCallback((memberId: string) => {
    const time = new Date();
    setVisits((prev) =>
      prev.map((v) =>
        v.memberId === memberId && isVisitActive(v, time)
          ? { ...v, checkOutAt: time.toISOString() }
          : v,
      ),
    );
  }, []);

  /** Perpanjang membership sebanyak `months` bulan. */
  const extendMembership = useCallback((memberId: string, months: number) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, validUntil: getExtendedDate(m.validUntil, months) }
          : m,
      ),
    );
  }, []);

  const value = useMemo<GymContextValue>(
    () => ({
      members,
      visits,
      currentMember,
      myVisits,
      myActiveVisit,
      activeVisits,
      streak,
      getMember,
      checkIn,
      checkOut,
      extendMembership,
    }),
    [
      members,
      visits,
      currentMember,
      myVisits,
      myActiveVisit,
      activeVisits,
      streak,
      getMember,
      checkIn,
      checkOut,
      extendMembership,
    ],
  );

  return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
}

/** Hook untuk membaca & mengubah data gym. */
export function useGym(): GymContextValue {
  const ctx = useContext(GymContext);
  if (!ctx) {
    throw new Error("useGym harus dipakai di dalam <GymProvider>");
  }
  return ctx;
}
