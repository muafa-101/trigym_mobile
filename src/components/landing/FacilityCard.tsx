/**
 * FacilityCard.tsx
 * ------------------------------------------------------------------
 * Satu kartu fasilitas: judul, gambar kotak di kiri,
 * badge + deskripsi di kanan.
 */
import React from "react";
import { Image, Text, View } from "react-native";
import { useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";
import { FacilityItem } from "@/types/landing";

interface FacilityCardProps {
  facilityItem: FacilityItem;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facilityItem }) => {
  const s = useThemedStyles(createStyles);

  return (
    <View style={s.innerCard}>
      <Text style={s.facilityTitle}>{facilityItem.title}</Text>
      <View style={s.facilityAccent} />
      <View style={s.facilityRow}>
        <View style={s.facilityImageWrap}>
          <Image
            source={facilityItem.image}
            style={s.facilityImage}
            resizeMode="cover"
          />
        </View>
        <View style={s.facilityTextWrap}>
          {/* Badge hanya tampil kalau datanya ada */}
          {facilityItem.badge && (
            <View style={s.badge}>
              <Text style={s.badgeText}>{facilityItem.badge}</Text>
            </View>
          )}
          <Text style={s.facilityDesc}>{facilityItem.desc}</Text>
        </View>
      </View>
    </View>
  );
};
