/**
 * HeroSection.tsx
 * ------------------------------------------------------------------
 * Kartu pembuka di beranda: logo gym + deskripsi singkat.
 */
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";

interface HeroSectionProps {
  logoSource: ImageSourcePropType;
  description: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  logoSource,
  description,
}) => {
  const s = useThemedStyles(createStyles);

  return (
    <View style={s.hero}>
      <View style={s.heroTopBar} />
      <View style={s.heroDivider} />
      <View style={s.heroBody}>
        <Image source={logoSource} style={s.logo} resizeMode="contain" />
        <Text style={s.heroText}>{description}</Text>
      </View>
    </View>
  );
};
