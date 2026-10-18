/**
 * CrowdStatusCard.tsx
 * ------------------------------------------------------------------
 * Kartu berwarna "STATUS : SEPI / NORMAL / RAMAI" + jumlah orang yang
 * sedang check-in. Warna kartu ikut berubah sesuai status.
 * Dipakai di dashboard member DAN dashboard admin.
 *
 * Angkanya dari useGymCrowd() (saat ini sebagian placeholder).
 */
import React from "react";
import { Text, View } from "react-native";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { useGymCrowd } from "@/hooks/useGymCrowd";
import { createGymStyles } from "@/styles/gym_styles";

export const CrowdStatusCard: React.FC = () => {
  const s = useThemedStyles(createGymStyles);
  const { colors } = useTheme();
  const { count, info } = useGymCrowd();

  // Ambil warna dari tema berdasarkan nama warna status
  const color = colors[info.colorKey];

  return (
    <View style={[s.crowdRow, { backgroundColor: color }]}>
      <View style={s.crowdLeft}>
        <Text style={s.crowdLabel}>STATUS :</Text>
        <View style={s.crowdPill}>
          <Text style={[s.crowdPillText, { color }]}>{info.label}</Text>
        </View>
      </View>
      <View style={s.crowdRight}>
        <View style={s.countPill}>
          <Text style={[s.countPillText, { color }]}>
            {count} ORANG CHECK-IN
          </Text>
        </View>
      </View>
    </View>
  );
};
