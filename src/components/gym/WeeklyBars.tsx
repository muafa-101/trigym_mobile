/**
 * WeeklyBars.tsx
 * ------------------------------------------------------------------
 * Grafik batang sederhana: jumlah hari latihan per minggu.
 * Batang hijau = target minggu itu tercapai. Garis putus-putus = target.
 * Tanpa library grafik, hanya View biasa.
 */
import React from "react";
import { Text, View } from "react-native";
import { useThemedStyles } from "@/context/ThemeContext";
import { createGymStyles } from "@/styles/gym_styles";
import { WeekSummary } from "@/types/gym";
import { formatDayMonth } from "@/utils/dateHelpers";

// Tinggi maksimal batang (dalam px)
const BAR_MAX_HEIGHT = 90;
// Ruang untuk angka di atas batang tertinggi
const VALUE_SPACE = 18;

interface WeeklyBarsProps {
  weeks: WeekSummary[]; // urut dari terlama ke minggu ini
  goal: number;
}

export const WeeklyBars: React.FC<WeeklyBarsProps> = ({ weeks, goal }) => {
  const s = useThemedStyles(createGymStyles);

  // Skala: batang tertinggi mengisi BAR_MAX_HEIGHT (minimal setinggi target)
  const scaleMax = Math.max(goal, ...weeks.map((w) => w.count), 1);
  const heightOf = (count: number) => (count / scaleMax) * BAR_MAX_HEIGHT;

  return (
    <View>
      <View style={[s.chartPlot, { height: BAR_MAX_HEIGHT + VALUE_SPACE }]}>
        {/* Garis target, sejajar dengan tinggi batang bernilai `goal` */}
        <View style={[s.goalLine, { bottom: heightOf(goal) }]} />

        {weeks.map((week) => (
          <View key={week.weekStart.getTime()} style={s.barCol}>
            {week.count > 0 && <Text style={s.barValue}>{week.count}</Text>}
            <View
              style={[
                s.bar,
                { height: Math.max(heightOf(week.count), 4) },
                week.goalMet && s.barMet,
              ]}
            />
          </View>
        ))}
      </View>

      {/* Label tanggal Senin tiap minggu */}
      <View style={s.labelRow}>
        {weeks.map((week) => (
          <Text
            key={week.weekStart.getTime()}
            style={[s.barLabel, week.isCurrent && s.barLabelCurrent]}
          >
            {week.isCurrent ? "Ini" : formatDayMonth(week.weekStart)}
          </Text>
        ))}
      </View>
      <Text style={s.legendText}>
        Garis putus-putus = target {goal} hari per minggu
      </Text>
    </View>
  );
};
