/**
 * ClassCard.tsx
 * ------------------------------------------------------------------
 * Satu kartu kelas di carousel beranda: gambar, nama, deskripsi,
 * durasi, dan level. Kalau ditekan, membuka halaman detail kelas
 * lewat `onPress`.
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { PressableScale } from "@/components/ui/PressableScale";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";
import { GymClass } from "@/types/gym";

interface ClassCardProps {
  classItem: GymClass;
  onPress: () => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classItem, onPress }) => {
  const s = useThemedStyles(createStyles);
  const { colors } = useTheme();

  return (
    <PressableScale onPress={onPress} scaleTo={0.98} style={s.innerCard}>
      <Image source={classItem.image} style={s.classImage} resizeMode="cover" />
      <View style={s.classBody}>
        <View style={s.classHeaderRow}>
          <View style={s.classIconWrap}>
            <MaterialCommunityIcons
              name={classItem.icon}
              size={22}
              color={colors.text}
            />
          </View>
          <Text style={s.classLabel}>{classItem.label}</Text>
        </View>
        <Text style={s.classDesc}>{classItem.desc}</Text>
        <View style={s.classMetaRow}>
          <View style={s.metaChip}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color={colors.text}
            />
            <Text style={s.metaText}>{classItem.duration}</Text>
          </View>
          <View style={s.metaChip}>
            <MaterialCommunityIcons
              name="signal-cellular-2"
              size={14}
              color={colors.text}
            />
            <Text style={s.metaText}>{classItem.level}</Text>
          </View>
        </View>
      </View>
    </PressableScale>
  );
};
