/**
 * admin/members.tsx  (halaman DAFTAR MEMBER, alamat "/admin/members")
 * ------------------------------------------------------------------
 * Semua member + status membership-nya, dengan kolom pencarian
 * (nama atau nomor member).
 *
 * Konsep modul 2: useState untuk teks pencarian.
 *
 * NANTI (pengembangan admin): tombol tambah member, perpanjang manual
 * (bayar tunai di kasir), dan nonaktifkan member.
 */
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/admin_styles";
import { createCommonStyles } from "@/styles/common_styles";
import { formatISODate } from "@/utils/dateHelpers";
import { getMembershipStatus } from "@/utils/gymHelpers";

export default function AdminMembersScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { colors } = useTheme();
  const { members, activeVisits } = useGym();

  // useState: teks yang diketik di kolom pencarian
  const [query, setQuery] = useState("");

  // Saring daftar: cocokkan nama atau nomor member (huruf besar/kecil sama saja)
  const keyword = query.trim().toLowerCase();
  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(keyword) ||
      m.code.toLowerCase().includes(keyword),
  );

  return (
    <Screen>
      <FadeInView>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>
              DAFTAR MEMBER ({members.length})
            </Text>
          </View>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari nama atau nomor member"
            placeholderTextColor={colors.textMuted}
            style={s.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {filtered.length === 0 && (
            <Text style={common.emptyText}>Member tidak ditemukan.</Text>
          )}

          {filtered.map((member) => {
            const status = getMembershipStatus(member.validUntil);
            const inGym = activeVisits.some((v) => v.memberId === member.id);
            return (
              <View key={member.id} style={s.row}>
                <View style={s.rowTextWrap}>
                  <Text style={s.rowTitle}>{member.name}</Text>
                  <Text style={s.rowSub}>
                    {member.code} · s/d {formatISODate(member.validUntil)}
                  </Text>
                  <View
                    style={[
                      s.statusChip,
                      { backgroundColor: colors[status.colorKey] },
                    ]}
                  >
                    <Text style={s.statusChipText}>{status.label}</Text>
                  </View>
                </View>
                {inGym && (
                  <View style={s.rowBadge}>
                    <Text style={s.rowBadgeText}>DI GYM</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </FadeInView>

      <PressableScale
        onPress={() => router.back()}
        style={common.secondaryButton}
      >
        <Text style={common.secondaryButtonText}>KEMBALI</Text>
      </PressableScale>
    </Screen>
  );
}
