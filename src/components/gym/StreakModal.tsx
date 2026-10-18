/**
 * StreakModal.tsx
 * ------------------------------------------------------------------
 * POP UP streak (muncul saat kartu api ditekan), seperti Duolingo
 * tapi per MINGGU:
 *   - angka besar: berapa minggu berturut-turut target tercapai
 *   - 7 lingkaran: hari apa saja yang sudah latihan minggu ini
 *   - 8 titik: ringkasan 8 minggu terakhir (putih = target tercapai)
 *
 * Komponen ini TIDAK menyimpan apa-apa sendiri: terbuka atau tidaknya
 * diatur oleh halaman yang memakainya lewat `visible` dan `onClose`
 * (state-nya ada di halaman, pakai useState).
 */
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createGymStyles } from "@/styles/gym_styles";
import { DAY_LABELS } from "@/utils/dateHelpers";
import { getRecentWeeks, getVisitedDaysThisWeek } from "@/utils/streak";

interface StreakModalProps {
  visible: boolean;
  onClose: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  visible,
  onClose,
}) => {
  const s = useThemedStyles(createGymStyles);
  const { colors } = useTheme();
  const { streak, myVisits } = useGym();

  const now = new Date();
  const visitedDays = getVisitedDaysThisWeek(myVisits, now);
  const recentWeeks = getRecentWeeks(myVisits, 8, now);
  const todayIndex = (now.getDay() + 6) % 7; // 0 = Senin ... 6 = Minggu
  const remaining = Math.max(streak.goal - streak.thisWeekCount, 0);

  // Pesan semangat, menyesuaikan kondisi
  let message: string;
  if (streak.goalMet) {
    message = "Target minggu ini tercapai! Streak-mu bertambah.";
  } else if (streak.streak > 0) {
    message = `Latihan ${remaining} hari lagi minggu ini untuk menambah streak.`;
  } else {
    message = `Latihan ${streak.goal} hari dalam seminggu untuk memulai streak.`;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose} // tombol back di Android
    >
      {/* Tekan area gelap di luar kartu = tutup */}
      <Pressable style={s.backdrop} onPress={onClose}>
        {/* Pressable kosong ini mencegah tekanan di dalam kartu ikut menutup */}
        <Pressable style={s.sheet} onPress={() => {}}>
          <MaterialCommunityIcons name="fire" size={72} color={colors.white} />
          <Text style={s.streakNumber}>{streak.streak}</Text>
          <Text style={s.streakLabel}>MINGGU BERUNTUN</Text>
          <Text style={s.streakMessage}>{message}</Text>

          <Text style={s.modalSectionTitle}>
            MINGGU INI · {streak.thisWeekCount}/{streak.goal} HARI
          </Text>
          <View style={s.dayRow}>
            {DAY_LABELS.map((label, i) => (
              <View key={label} style={s.dayCol}>
                <View
                  style={[
                    s.dayCircle,
                    visitedDays[i] && s.dayCircleDone,
                    i === todayIndex && s.dayCircleToday,
                  ]}
                >
                  {visitedDays[i] && (
                    <Ionicons name="checkmark" size={20} color={colors.flameCard} />
                  )}
                </View>
                <Text style={s.dayLabel}>{label}</Text>
              </View>
            ))}
          </View>

          <Text style={s.modalSectionTitle}>8 MINGGU TERAKHIR</Text>
          <View style={s.weekDotsRow}>
            {recentWeeks.map((week) => (
              <View
                key={week.weekStart.getTime()}
                style={[
                  s.weekDot,
                  week.goalMet && s.weekDotMet,
                  week.isCurrent && s.weekDotCurrent,
                ]}
              />
            ))}
          </View>

          <Pressable style={s.closeButton} onPress={onClose}>
            <Text style={s.closeButtonText}>TUTUP</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
