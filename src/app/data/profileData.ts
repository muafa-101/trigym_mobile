import { CheckinHistory, GymClass, Member } from "../types/gym";

export const MEMBER: Member = {
  name: "Muhammad Kharisma Aditya Putra",
  email: "yenderruaditya@gmail.com",
  nim: "02010602",
  validUntil: "31/12/2026",
};

export const WEEKLY_CLASSES: GymClass[] = [
  { label: "YOGA &\nPILATES", icon: "yoga" },
  { label: "WEIGHT\nTRAINING", icon: "weight-lifter" },
  { label: "CARDIO\n& HIT", icon: "heart-pulse" },
  { label: "ZUMBA", icon: "human-female-dance" },
];

// checkOutTime: null artinya member lupa checkout, jadi dihitung otomatis (+2 jam)
export const CHECKIN_HISTORY: CheckinHistory[] = [
  {
    id: 1,
    date: "28/09/2026",
    className: "Weight Training",
    checkInTime: "16:00",
    checkOutTime: "17:15",
  },
  {
    id: 2,
    date: "30/09/2026",
    className: "Cardio & HIT",
    checkInTime: "18:30",
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
    id: 4,
    date: "04/10/2026",
    className: "Zumba",
    checkInTime: "19:00",
    checkOutTime: null,
  },
];
