import { Carousel } from "@/components/landing/Carousel";
import { FacilityCard } from "@/components/landing/FacilityCard";
import { styles as s } from "@/styles/styles";
import { FacilityItem } from "@/types/landing";
import React from "react";
import { Text, View } from "react-native";

interface FacilitySectionProps {
  facilities: FacilityItem[];
}

export const FacilitySection: React.FC<FacilitySectionProps> = ({
  facilities,
}) => (
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
