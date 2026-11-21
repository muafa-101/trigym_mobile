/**
 * GymContext.tsx
 * ------------------------------------------------------------------
 * Menyimpan data gym yang bisa berubah dan dibagikan ke semua halaman.
 *
 * PERUBAHAN DARI VERSI SEBELUMNYA:
 *   currentMember sekarang diambil dari `profile` di AuthContext
 *   (data nyata dari Supabase Auth + tabel profiles), bukan lagi
 *   hardcode ke CURRENT_MEMBER_ID dari seedData.
 *
 *   Jika profile ada (user sudah login), data user nyata dipakai.
 *   Jika tidak ada (mode demo), fallback ke SEED_MEMBERS[0].
 *
 * Semua aksi (checkIn, checkOut, extendMembership) masih lokal
 * (in-memory) sampai Supabase diintegrasikan penuh.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SEED_MEMBERS, SEED_VISITS } from "@/data/seedData";
import { useAuth } from "@/context/AuthContext";
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
  visits: Visit[];
  currentMember: Member;
  myVisits: Visit[];
  myActiveVisit: Visit | null;
  activeVisits: Visit[];
  streak: StreakInfo;
  getMember: (id: string) => Member | undefined;
  checkIn: (memberId: string) => CheckInResult;
  checkOut: (memberId: string) => void;
  extendMembership: (memberId: string, months: number) => void;
}

const GymContext = createContext<GymContextValue | null>(null);

export function GymProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();

  // Menyimpan perpanjangan tanggal membership secara lokal (in-memory)
  const [extendedDates, setExtendedDates] = useState<Record<string, string>>({});

  // -----------------------------------------------------------------
  // Bangun daftar member: gabungkan user yang login ke dalam seed data
  // -----------------------------------------------------------------
  const members = useMemo<Member[]>(() => {
    const applyDate = (id: string, defaultDate: string) =>
      extendedDates[id] ?? defaultDate;

    if (!profile) {
      return SEED_MEMBERS.map((m) => ({
        ...m,
        validUntil: applyDate(m.id, m.validUntil),
      }));
    }

    const currentProfileMember: Member = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      code: profile.code,
      validUntil: applyDate(profile.id, profile.validUntil),
    };

    const exists = SEED_MEMBERS.some((m) => m.id === profile.id);
    if (exists) {
      return SEED_MEMBERS.map((m) =>
        m.id === profile.id
          ? currentProfileMember
          : { ...m, validUntil: applyDate(m.id, m.validUntil) }
      );
    }

    return [
      currentProfileMember,
      ...SEED_MEMBERS.map((m) => ({
        ...m,
        validUntil: applyDate(m.id, m.validUntil),
      })),
    ];
  }, [profile, extendedDates]);

  const [visits, setVisits] = useState<Visit[]>(SEED_VISITS);

  // "Jam" yang berdetak tiap menit untuk auto-checkout
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timerId);
  }, []);

  /* ---------- currentMember: user yang sedang login ---------- */
  // Prioritas: profile dari Supabase Auth -> SEED_MEMBERS[0]
  const currentMember = useMemo(() => {
    if (profile) {
      return (
        members.find((m) => m.id === profile.id) ?? {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          code: profile.code,
          validUntil: extendedDates[profile.id] ?? profile.validUntil,
        }
      );
    }
    // Demo mode: pakai member pertama dari seed
    return members[0] ?? SEED_MEMBERS[0];
  }, [profile, members, extendedDates]);

  /* ---------- Data turunan ---------- */
  const activeVisits = useMemo(
    () => visits.filter((v) => isVisitActive(v, now)),
    [visits, now]
  );

  const myVisits = useMemo(
    () => visits.filter((v) => v.memberId === currentMember.id),
    [visits, currentMember.id]
  );

  const myActiveVisit =
    activeVisits.find((v) => v.memberId === currentMember.id) ?? null;

  const streak = useMemo(
    () => getStreakInfo(myVisits, now),
    [myVisits, now]
  );

  /* ---------- Aksi ---------- */
  const getMember = useCallback(
    (id: string) => members.find((m) => m.id === id),
    [members]
  );

  const checkIn = useCallback(
    (memberId: string): CheckInResult => {
      const member = members.find((m) => m.id === memberId);
      if (!member) return "unknown";

      const time = new Date();
      if (!getMembershipStatus(member.validUntil, time).isActive) return "expired";
      if (visits.some((v) => v.memberId === memberId && isVisitActive(v, time))) return "already";

      const newVisit: Visit = {
        id: `v-${time.getTime()}`,
        memberId,
        checkInAt: time.toISOString(),
        checkOutAt: null,
      };
      setVisits((prev) => [newVisit, ...prev]);
      return "ok";
    },
    [members, visits]
  );

  const checkOut = useCallback((memberId: string) => {
    const time = new Date();
    setVisits((prev) =>
      prev.map((v) =>
        v.memberId === memberId && isVisitActive(v, time)
          ? { ...v, checkOutAt: time.toISOString() }
          : v
      )
    );
  }, []);

  const extendMembership = useCallback((memberId: string, months: number) => {
    setExtendedDates((prev) => {
      const currentMemberObj = members.find((m) => m.id === memberId);
      const baseDate = currentMemberObj
        ? currentMemberObj.validUntil
        : new Date().toISOString().split("T")[0];
      return {
        ...prev,
        [memberId]: getExtendedDate(baseDate, months),
      };
    });
  }, [members]);

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
    ]
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
