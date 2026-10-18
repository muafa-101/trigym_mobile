/**
 * landing.ts (types)
 * ------------------------------------------------------------------
 * Tipe data khusus halaman landing (beranda).
 * Tipe kelas (GymClass) ada di gym.ts karena dipakai banyak halaman.
 */
import { ImageSourcePropType } from "react-native";

export interface FacilityItem {
  title: string;
  desc: string;
  image: ImageSourcePropType; // rasio 1:1
  badge?: string; // contoh: "60+ Unit Alat"
}
