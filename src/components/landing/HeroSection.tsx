import { styles as s } from "@/styles/styles";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface HeroSectionProps {
  logoSource: ImageSourcePropType;
  description: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  logoSource,
  description,
}) => (
  <View style={s.hero}>
    <View style={s.heroTopBar} />
    <View style={s.heroDivider} />
    <View style={s.heroBody}>
      <Image source={logoSource} style={s.logo} resizeMode="contain" />
      <Text style={s.heroText}>{description}</Text>
    </View>
  </View>
);
