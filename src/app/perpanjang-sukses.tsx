/**
 * perpanjang-sukses.tsx  (halaman SUKSES, alamat "/perpanjang-sukses")
 * ------------------------------------------------------------------
 * Dibuka dari halaman perpanjang lewat router.replace(), sehingga form
 * perpanjang sudah tidak ada di tumpukan halaman. Tombol di bawah
 * memakai router.back() untuk kembali ke home.
 */
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createCommonStyles } from "@/styles/common_styles";
import { createStyles } from "@/styles/perpanjang_styles";
import { formatISODate } from "@/utils/dateHelpers";

export default function PerpanjangSuksesScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { colors } = useTheme();
  const { currentMember } = useGym(); // sudah berisi tanggal baru

  // Nama paket dikirim dari halaman sebelumnya lewat parameter URL
  const { plan } = useLocalSearchParams<{ plan?: string }>();

  return (
    <Screen>
      <FadeInView>
        <View style={s.successCard}>
          <Ionicons name="checkmark-circle" size={72} color={colors.mint} />
          <Text style={s.successTitle}>Perpanjangan Berhasil</Text>
          <Text style={s.successText}>
            {plan ? `Paket ${plan} sudah aktif.` : "Paketmu sudah aktif."}
            {"\n"}Membership berlaku hingga:
          </Text>
          <Text style={s.successDate}>
            {formatISODate(currentMember.validUntil)}
          </Text>
        </View>
      </FadeInView>

      <PressableScale
        onPress={() => router.back()}
        style={common.primaryButton}
      >
        <Text style={common.primaryButtonText}>KEMBALI KE HOME</Text>
      </PressableScale>
    </Screen>
  );
}
