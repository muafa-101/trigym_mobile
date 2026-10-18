/**
 * index.tsx  (halaman PILIH PERAN, alamat "/")
 * ------------------------------------------------------------------
 * Halaman pertama yang dibuka. Satu aplikasi dipakai dua jenis
 * pengguna: MEMBER dan ADMIN.
 *
 * PLACEHOLDER: belum ada login sungguhan. Tombol di sini langsung
 * membuka dashboard sesuai peran.
 * NANTI: ganti dengan form login (email + password). Server yang
 * memberi tahu akun ini member atau admin.
 *
 * Navigasi: router.replace() dipakai (bukan push) supaya tombol back
 * tidak kembali ke halaman ini. Untuk kembali, pakai tombol KELUAR.
 */
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { HERO_DESCRIPTION, LOGO_SOURCE } from "@/const/gymConfig";
import { useThemedStyles } from "@/context/ThemeContext";
import { createCommonStyles } from "@/styles/common_styles";
import { createStyles } from "@/styles/login_styles";

export default function RoleScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);

  return (
    <Screen>
      <FadeInView>
        <View style={s.hero}>
          <View style={s.heroTopBar} />
          <View style={s.heroDivider} />
          <View style={s.heroBody}>
            <Image source={LOGO_SOURCE} style={s.logo} resizeMode="contain" />
            <Text style={s.heroText}>{HERO_DESCRIPTION}</Text>
          </View>
        </View>
      </FadeInView>

      <FadeInView delay={120}>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>MASUK SEBAGAI</Text>
          </View>

          {/* replace: pindah halaman TANPA menumpuk di riwayat back */}
          <PressableScale
            onPress={() => router.replace("/home")}
            style={common.primaryButton}
          >
            <Text style={common.primaryButtonText}>MEMBER</Text>
          </PressableScale>

          <PressableScale
            onPress={() => router.replace("/admin")}
            style={common.secondaryButton}
          >
            <Text style={common.secondaryButtonText}>ADMIN</Text>
          </PressableScale>

          <Text style={s.footnote}>
            Ini hanya contoh (placeholder). Nanti diganti login sungguhan.
          </Text>
        </View>
      </FadeInView>
    </Screen>
  );
}
