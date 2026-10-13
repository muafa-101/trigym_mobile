import { styles as s } from "@/styles/styles";
import { FacilityItem } from "@/types/landing";
import React from "react";
import { Image, Text, View } from "react-native";

interface FacilityCardProps {
  facilityItem: FacilityItem;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facilityItem }) => (
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
