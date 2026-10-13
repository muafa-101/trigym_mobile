import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { ImageSourcePropType } from "react-native";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export interface ProfileData {
  name: string;
  nim: string;
}

export interface FacilityItem {
  title: string;
  desc: string;
  image: ImageSourcePropType; // rasio 1:1
  badge?: string; // contoh: "60+ Unit Alat"
}

export interface ClassItem {
  label: string;
  desc: string;
  image: ImageSourcePropType; // rasio 4:3
  duration: string; // contoh: "60 menit"
  level: string; // contoh: "Semua level"
  icon?: IconName;
}
