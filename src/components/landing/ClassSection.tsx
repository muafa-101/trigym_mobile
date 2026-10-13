import { Carousel } from "@/components/landing/Carousel";
import { ClassCard } from "@/components/landing/ClassCard";
import { styles as s } from "@/styles/styles";
import { ClassItem } from "@/types/landing";
import React from "react";
import { Text, View } from "react-native";

interface ClassSectionProps {
  classes: ClassItem[];
}

export const ClassSection: React.FC<ClassSectionProps> = ({ classes }) => (
  <View style={s.section}>
    <View style={s.sectionTitleWrap}>
      <Text style={s.sectionTitle}>PILIHAN KELAS</Text>
    </View>
    <Carousel
      data={classes}
      keyExtractor={(c) => c.label}
      renderItem={(c) => <ClassCard classItem={c} />}
    />
  </View>
);
