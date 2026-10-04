import {MaterialCommunityIcons} from "@expo/vector-icons";

export interface ProfileData {
    name: string;
    nim: string;
}

export interface FacilityItem {
    title: string;
    desc: string;
}

export interface ClassItem {
    label: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
}