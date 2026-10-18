/**
 * admin/index.tsx  (dashboard ADMIN, alamat "/admin")
 * ------------------------------------------------------------------
 * Ringkasan untuk pengelola gym:
 *   1. Tiga angka: orang di gym, member aktif, member segera berakhir
 *   2. Status keramaian (sama dengan yang dilihat member)
 *   3. Jalan pintas: SCAN CHECK-IN dan DAFTAR MEMBER
 *   4. Daftar member yang sedang berlatih + tombol CHECK-OUT
 *
 * Catatan: angka "ORANG DI GYM" sebagian masih simulasi (placeholder),
 * sedangkan daftar di bawahnya hanya orang yang tercatat check-in di
 * aplikasi ini. Keduanya akan sama setelah ada server.
 */
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { CrowdStatusCard } from "@/components/gym/CrowdStatusCard";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { EXPIRING_SOON_DAYS, GYM_NAME } from "@/const/gymConfig";
import { useGym } from "@/context/GymContext";
import { useThemedStyles } from "@/context/ThemeContext";
import { useGymCrowd } from "@/hooks/useGymCrowd";
import { createStyles } from "@/styles/admin_styles";
import { createCommonStyles } from "@/styles/common_styles";
import { formatTime } from "@/utils/dateHelpers";
import { getMembershipStatus } from "@/utils/gymHelpers";

export default function AdminDashboardScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { members, activeVisits, getMember, checkOut } = useGym();
  const { count: crowdCount } = useGymCrowd();

  // Hitung ringkasan member
  const statuses = members.map((m) => getMembershipStatus(m.validUntil));
  const activeCount = statuses.filter((st) => st.isActive).length;
  const expiringCount = statuses.filter(
    (st) => st.isActive && st.daysLeft <= EXPIRING_SOON_DAYS,
  ).length;

  return (
    <Screen>
      {/* ---------- Angka ringkasan ---------- */}
      <FadeInView>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>DASHBOARD {GYM_NAME.toUpperCase()}</Text>
          </View>
          <View style={s.statsRow}>
            <View style={s.statTile}>
              <Text style={s.statValue}>{crowdCount}</Text>
              <Text style={s.statLabel}>ORANG DI GYM</Text>
            </View>
            <View style={s.statTile}>
              <Text style={s.statValue}>{activeCount}</Text>
              <Text style={s.statLabel}>MEMBER AKTIF</Text>
            </View>
            <View style={s.statTile}>
              <Text style={s.statValue}>{expiringCount}</Text>
              <Text style={s.statLabel}>SEGERA BERAKHIR</Text>
            </View>
          </View>
        </View>
      </FadeInView>

      {/* ---------- Status ramai ---------- */}
      <FadeInView delay={80}>
        <CrowdStatusCard />
      </FadeInView>

      {/* ---------- Jalan pintas ---------- */}
      <FadeInView delay={140}>
        <View style={common.buttonRow}>
          <PressableScale
            onPress={() => router.push("/admin/scan")}
            style={[common.primaryButton, common.grow1]}
          >
            <Text style={common.primaryButtonText}>SCAN CHECK-IN</Text>
          </PressableScale>
          <PressableScale
            onPress={() => router.push("/admin/members")}
            style={[common.secondaryButton, common.grow1]}
          >
            <Text style={common.secondaryButtonText}>DAFTAR MEMBER</Text>
          </PressableScale>
        </View>
      </FadeInView>

      {/* ---------- Sedang berlatih ---------- */}
      <FadeInView delay={200}>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>SEDANG BERLATIH</Text>
          </View>

          {activeVisits.length === 0 && (
            <Text style={common.emptyText}>Belum ada yang check-in.</Text>
          )}

          {activeVisits.map((visit) => {
            const member = getMember(visit.memberId);
            if (!member) return null;
            return (
              <View key={visit.id} style={s.row}>
                <View style={s.rowTextWrap}>
                  <Text style={s.rowTitle}>{member.name}</Text>
                  <Text style={s.rowSub}>
                    Masuk {formatTime(new Date(visit.checkInAt))} · {member.code}
                  </Text>
                </View>
                <PressableScale
                  onPress={() => checkOut(member.id)}
                  style={[common.dangerButton, s.rowButton]}
                >
                  <Text style={common.dangerButtonText}>CHECK-OUT</Text>
                </PressableScale>
              </View>
            );
          })}
        </View>
      </FadeInView>

      {/* ---------- Keluar ---------- */}
      <FadeInView delay={260}>
        <PressableScale
          onPress={() => router.replace("/")}
          style={common.secondaryButton}
        >
          <Text style={common.secondaryButtonText}>KELUAR</Text>
        </PressableScale>
      </FadeInView>
    </Screen>
  );
}
