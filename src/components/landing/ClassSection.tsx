/**
 * ClassSection.tsx
 * ------------------------------------------------------------------
 * Seksi "PILIHAN KELAS" di beranda: judul + carousel kartu kelas.
 * Menekan kartu membuka halaman detail kelas (router.push).
 */
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Carousel } from "@/components/landing/Carousel";
import { ClassCard } from "@/components/landing/ClassCard";
import { useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";
import { GymClass } from "@/types/gym";

interface ClassSectionProps {
  classes: GymClass[];
}

export const ClassSection: React.FC<ClassSectionProps> = ({ classes }) => {
  const s = useThemedStyles(createStyles);
  const router = useRouter();

  return (
    <View style={s.section}>
      <View style={s.sectionTitleWrap}>
        <Text style={s.sectionTitle}>PILIHAN KELAS</Text>
      </View>
      <Carousel
        data={classes}
        keyExtractor={(c) => c.id}
        renderItem={(c) => (
          <ClassCard
            classItem={c}
            // push: pindah ke halaman detail, kirim id kelas lewat URL
            onPress={() =>
              router.push({ pathname: "/kelas", params: { id: c.id } })
            }
          />
        )}
      />
    </View>
  );
};
