/**
 * home.tsx  (dashboard MEMBER, alamat "/home")
 * ------------------------------------------------------------------
 * Halaman utama member. Dari atas ke bawah:
 *   1. Kartu member + tombol PERPANJANG
 *   2. Sesi latihan: TAMPILKAN QR (untuk check-in) / CHECK-OUT
 *   3. HISTORI, QR, dan kartu api (streak mingguan, bisa ditekan)
 *   4. Status keramaian gym
 *   5. Kartu Kutipan Motivasi (fetch API eksternal)  <-- MODUL 3
 *   6. Tombol KELUAR
 *
 * Konsep modul 2 yang dipakai di sini:
 *   - useState : buka/tutup pop up streak
 *   - useEffect: animasi api berdenyut
 *   - Router   : router.push() ke halaman lain, router.replace() untuk keluar
 *
 * Konsep modul 3 yang dipakai (via MotivationCard):
 *   - Fetch external endpoint -> Interface MotivationQuote (quoteService.ts)
 *   - Custom async function (fetchMotivationQuote) + pre-built async (fetch)
 *   - .then(), .resolve(), .reject() di quoteService.ts
 */
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { CrowdStatusCard } from "@/components/gym/CrowdStatusCard";
import { MemberCard } from "@/components/gym/MemberCard";
import { MotivationCard } from "@/components/gym/MotivationCard";
import { StreakModal } from "@/components/gym/StreakModal";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createCommonStyles } from "@/styles/common_styles";
import { createStyles } from "@/styles/home_styles";
import { formatTime } from "@/utils/dateHelpers";
import { getMembershipStatus } from "@/utils/gymHelpers";

export default function HomeScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { colors } = useTheme();
  const { currentMember, myActiveVisit, streak, checkOut } = useGym();

  const membership = getMembershipStatus(currentMember.validUntil);

  /* ---------- useState: pop up streak sedang terbuka atau tidak ---------- */
  const [streakOpen, setStreakOpen] = useState(false);

  /* ---------- useEffect: ikon api berdenyut pelan ---------- */
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop(); // hentikan animasi saat layar ditutup
  }, [pulse]);

  return (
    <Screen>
      {/* ---------- Kartu member ---------- */}
      <FadeInView delay={0}>
        {/* push: membuka halaman perpanjang di atas halaman ini */}
        <MemberCard
          member={currentMember}
          onExtend={() => router.push("/perpanjang")}
        />
      </FadeInView>

      {/* ---------- Sesi latihan ---------- */}
      <FadeInView delay={80}>
        <View style={s.sessionCard}>
          <View style={s.sessionRow}>
            <Ionicons
              name={myActiveVisit ? "barbell" : "barbell-outline"}
              size={30}
              color={colors.text}
            />
            <View style={s.sessionTextWrap}>
              <Text style={s.sessionTitle}>
                {myActiveVisit ? "SEDANG BERLATIH" : "BELUM CHECK-IN"}
              </Text>
              <Text style={s.sessionSub}>
                {myActiveVisit
                  ? `Masuk pukul ${formatTime(new Date(myActiveVisit.checkInAt))}`
                  : membership.isActive
                    ? "Tunjukkan QR ke petugas untuk masuk"
                    : "Membership berakhir, perpanjang dulu"}
              </Text>
            </View>

          </View>

          {myActiveVisit ? (
            <PressableScale
              onPress={() => checkOut(currentMember.id)}
              style={[common.dangerButton, s.sessionButton]}
            >
              <Text style={common.dangerButtonText}>CHECK-OUT</Text>
            </PressableScale>
          ) : (
            <PressableScale
              onPress={() => router.push("/qr")}
              disabled={!membership.isActive}
              style={[
                common.primaryButton,
                s.sessionButton,
                !membership.isActive && common.disabled,
              ]}
            >
              <Text style={common.primaryButtonText}>TAMPILKAN QR</Text>
            </PressableScale>
          )}
        </View>
      </FadeInView>

      {/* ---------- Histori / QR / Streak ---------- */}
      <FadeInView delay={160}>
        <View style={s.utilityRow}>
          <View style={s.historyCard}>
            <View style={s.historyIconsRow}>
              <PressableScale
                onPress={() => router.push("/histori")}
                style={s.historyIconBox}
              >
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={26}
                  color={colors.white}
                />
                <Text style={s.historyLabelText}>HISTORI</Text>
              </PressableScale>

              <PressableScale
                onPress={() => router.push("/qr")}
                style={s.historyIconBox}
              >
                <Ionicons name="qr-code" size={24} color={colors.white} />
                <Text style={s.historyLabelText}>QR</Text>
              </PressableScale>
            </View>
          </View>

          {/* Kartu api: ditekan = buka pop up streak */}
          <PressableScale
            onPress={() => setStreakOpen(true)}
            scaleTo={0.94}
            style={s.flameCard}
          >
            <Animated.View style={{ transform: [{ scale: pulse }] }}>
              <MaterialCommunityIcons
                name="fire"
                size={72}
                color={colors.white}
              />
            </Animated.View>
            <Text style={s.flameNumber}>{streak.streak}</Text>
            <Text style={s.flameCaption}>MINGGU</Text>
          </PressableScale>
        </View>
      </FadeInView>

      {/* ---------- Status ramai ---------- */}
      <FadeInView delay={240}>
        <CrowdStatusCard />
      </FadeInView>

      {/* ---------- Kutipan Motivasi (Modul 3: fetch API + Interface) ---------- */}
      <FadeInView delay={320}>
        <MotivationCard />
      </FadeInView>

      {/* ---------- Keluar ---------- */}
      <FadeInView delay={300}>
        <PressableScale
          onPress={() => router.replace("/")}
          style={common.secondaryButton}
        >
          <Text style={common.secondaryButtonText}>KELUAR</Text>
        </PressableScale>
      </FadeInView>

      <StreakModal visible={streakOpen} onClose={() => setStreakOpen(false)} />
    </Screen>
  );
}
