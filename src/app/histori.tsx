/**
 * histori.tsx  (halaman RIWAYAT & STREAK, alamat "/histori")
 * ------------------------------------------------------------------
 * Dua bagian:
 *   1. Streak mingguan: angka streak + grafik 8 minggu terakhir
 *   2. Riwayat semua kunjungan (terbaru di atas)
 * Datanya dari GymContext, jadi check-in baru langsung muncul di sini.
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { WeeklyBars } from "@/components/gym/WeeklyBars";
import { FadeInView } from "@/components/ui/FadeInView";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createCommonStyles } from "@/styles/common_styles";
import { createStyles } from "@/styles/histori_styles";
import { formatDate, formatTime } from "@/utils/dateHelpers";
import { getCheckoutLabel } from "@/utils/gymHelpers";
import { getRecentWeeks } from "@/utils/streak";

// Nama hari, urut seperti Date.getDay() (Minggu = 0)
const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function HistoriScreen() {
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { colors } = useTheme();
  const { myVisits, streak } = useGym();

  const now = new Date();
  const weeks = getRecentWeeks(myVisits, 8, now);

  return (
    <Screen>
      {/* ---------- Streak mingguan ---------- */}
      <FadeInView>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>STREAK MINGGUAN</Text>
          </View>

          <View style={s.streakRow}>
            <MaterialCommunityIcons name="fire" size={48} color={colors.white} />
            <View style={s.streakTextWrap}>
              <Text style={s.streakTitle}>Minggu beruntun</Text>
              <Text style={s.streakSub}>
                Minggu ini: {streak.thisWeekCount}/{streak.goal} hari latihan
              </Text>
            </View>
            <Text style={s.streakNumber}>{streak.streak}</Text>
          </View>

          <View style={common.innerCard}>
            <WeeklyBars weeks={weeks} goal={streak.goal} />
          </View>
        </View>
      </FadeInView>

      {/* ---------- Riwayat kunjungan ---------- */}
      <FadeInView delay={120}>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>RIWAYAT KUNJUNGAN</Text>
          </View>
          <Text style={s.totalText}>Total {myVisits.length} kunjungan</Text>

          {myVisits.length === 0 && (
            <Text style={common.emptyText}>Belum ada kunjungan.</Text>
          )}

          {myVisits.map((visit) => {
            const checkIn = new Date(visit.checkInAt);
            return (
              <View key={visit.id} style={s.item}>
                <View>
                  <Text style={s.itemDate}>{formatDate(checkIn)}</Text>
                  <Text style={s.itemDay}>{DAY_NAMES[checkIn.getDay()]}</Text>
                </View>
                <View style={s.itemTimeWrap}>
                  <Text style={s.itemTime}>Masuk {formatTime(checkIn)}</Text>
                  <Text style={s.itemTime}>
                    Keluar {getCheckoutLabel(visit, now)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </FadeInView>
    </Screen>
  );
}
