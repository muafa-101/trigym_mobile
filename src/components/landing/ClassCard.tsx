import { styles as s } from "@/styles/styles";
import { ClassItem } from "@/types/landing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface ClassCardProps {
  classItem: ClassItem;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classItem }) => (
  <View style={s.innerCard}>
    <Image source={classItem.image} style={s.classImage} resizeMode="cover" />
    <View style={s.classBody}>
      <View style={s.classHeaderRow}>
        {classItem.icon && (
          <View style={s.classIconWrap}>
            <MaterialCommunityIcons
              name={classItem.icon}
              size={22}
              color="#FFFFFF"
            />
          </View>
        )}
        <Text style={s.classLabel}>{classItem.label}</Text>
      </View>
      <Text style={s.classDesc}>{classItem.desc}</Text>
      <View style={s.classMetaRow}>
        <View style={s.metaChip}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={14}
            color="#FFFFFF"
          />
          <Text style={s.metaText}>{classItem.duration}</Text>
        </View>
        <View style={s.metaChip}>
          <MaterialCommunityIcons
            name="signal-cellular-2"
            size={14}
            color="#FFFFFF"
          />
          <Text style={s.metaText}>{classItem.level}</Text>
        </View>
      </View>
    </View>
  </View>
);
