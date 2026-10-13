import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export type ClassIcon = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

export interface Member {
  name: string;
  email: string;
  nim: string;
  validUntil: string; // format DD/MM/YYYY
}

export interface GymClass {
  label: string;
  icon: ClassIcon;
  desc?: string;
  duration?: string;
  level?: string;
}

export interface CheckinHistory {
  id: number;
  date: string; // format DD/MM/YYYY
  className: string;
  checkInTime: string; // format HH:MM
  checkOutTime: string | null; // null = belum checkout sendiri
}
