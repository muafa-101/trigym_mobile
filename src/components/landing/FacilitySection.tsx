/**
 * FacilitySection.tsx
 * ------------------------------------------------------------------
 * Seksi "FASILITAS KAMI" di beranda: judul + carousel kartu fasilitas.
 */
import React from "react";
import { Text, View } from "react-native";
import { Carousel } from "@/components/landing/Carousel";
import { FacilityCard } from "@/components/landing/FacilityCard";
import { useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";
import { FacilityItem } from "@/types/landing";

interface FacilitySectionProps {
  facilities: FacilityItem[];
}

export const FacilitySection: React.FC<FacilitySectionProps> = ({
  facilities,
}) => {
  const s = useThemedStyles(createStyles);

  return (
    <View style={s.section}>
      <View style={s.sectionTitleWrap}>
        <Text style={s.sectionTitle}>FASILITAS KAMI</Text>
      </View>
      <Carousel
        data={facilities}
        keyExtractor={(f) => f.title}
        renderItem={(f) => <FacilityCard facilityItem={f} />}
      />
    </View>
  );
};
