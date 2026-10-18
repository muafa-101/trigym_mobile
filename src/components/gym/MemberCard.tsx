/**
 * MemberCard.tsx
 * ------------------------------------------------------------------
 * Kartu member (biru): foto/ikon, nama, email, nomor member, status
 * membership (AKTIF / SEGERA BERAKHIR / BERAKHIR) dan tanggal berlaku.
 *
 * `onExtend` bersifat opsional: kalau diisi, tombol PERPANJANG muncul.
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { PressableScale } from "@/components/ui/PressableScale";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createGymStyles } from "@/styles/gym_styles";
import { Member } from "@/types/gym";
import { formatISODate } from "@/utils/dateHelpers";
import { getMembershipStatus } from "@/utils/gymHelpers";

interface MemberCardProps {
  member: Member;
  onExtend?: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onExtend }) => {
  const s = useThemedStyles(createGymStyles);
  const { colors } = useTheme();
  const status = getMembershipStatus(member.validUntil);

  return (
    <View style={s.memberCard}>
      <View style={s.memberTopBar} />
      <View style={s.memberDivider} />
      <View style={s.memberBody}>
        {onExtend && (
          <PressableScale onPress={onExtend} style={s.extendPill}>
            <Text style={s.extendPillText}>PERPANJANG</Text>
          </PressableScale>
        )}

        <View style={s.memberRow}>
          <Ionicons name="person-circle" size={64} color={colors.memberIcon} />
          <View style={s.memberTextWrap}>
            <Text style={s.memberName}>{member.name}</Text>
            <Text style={s.memberEmail}>{member.email}</Text>
            <Text style={s.memberCode}>{member.code}</Text>
          </View>
        </View>

        <View style={s.validRow}>
          <View
            style={[s.statusChip, { backgroundColor: colors[status.colorKey] }]}
          >
            <Text style={s.statusChipText}>{status.label}</Text>
          </View>
          <Text style={s.validText}>
            Berlaku hingga {formatISODate(member.validUntil)} · {status.detail}
          </Text>
        </View>
      </View>
    </View>
  );
};
