/**
 * admin/scan.tsx  (halaman CHECK-IN MEMBER oleh admin, alamat "/admin/scan")
 * ------------------------------------------------------------------
 * PLACEHOLDER: belum ada kamera scanner. Kotak putus-putus di atas
 * mewakili tampilan kamera. Di bawahnya ada daftar member dengan
 * tombol SCAN untuk MENYIMULASIKAN "QR member ini baru saja dipindai".
 *
 * NANTI: ganti daftar ini dengan kamera (`expo-camera`). Hasil baca QR
 * berisi kode member -> cari member -> panggil checkIn(member.id).
 * Pesan hasilnya (berhasil / ditolak) tetap bisa dipakai apa adanya.
 *
 * Konsep modul 2: useState (pesan hasil), router.back() (kembali).
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/admin_styles";
import { createCommonStyles } from "@/styles/common_styles";
import { Member } from "@/types/gym";

// Hasil scan terakhir: teks + berhasil atau tidak (untuk menentukan warna)
interface ScanMessage {
  text: string;
  ok: boolean;
}

export default function AdminScanScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { colors } = useTheme();
  const { members, activeVisits, checkIn } = useGym();

  // useState: pesan hasil scan terakhir
  const [message, setMessage] = useState<ScanMessage | null>(null);

  function handleScan(member: Member) {
    const result = checkIn(member.id);

    if (result === "ok") {
      setMessage({ text: `${member.name} berhasil check-in.`, ok: true });
    } else if (result === "expired") {
      setMessage({
        text: `${member.name}: membership sudah berakhir, minta perpanjang dulu.`,
        ok: false,
      });
    } else if (result === "already") {
      setMessage({ text: `${member.name} sudah check-in.`, ok: false });
    } else {
      setMessage({ text: "Member tidak ditemukan.", ok: false });
    }
  }

  return (
    <Screen>
      {/* ---------- Area kamera (placeholder) ---------- */}
      <FadeInView>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>SCAN QR MEMBER</Text>
          </View>
          <View style={s.scannerFrame}>
            <Ionicons name="scan-outline" size={44} color={colors.textMuted} />
            <Text style={s.scannerText}>
              Kamera scanner belum tersedia (placeholder). Pakai daftar di
              bawah untuk simulasi.
            </Text>
          </View>

          {message && (
            <View style={s.resultBox}>
              <Text
                style={[
                  s.resultText,
                  { color: message.ok ? colors.mint : colors.warning },
                ]}
              >
                {message.text}
              </Text>
            </View>
          )}
        </View>
      </FadeInView>

      {/* ---------- Daftar member untuk simulasi ---------- */}
      <FadeInView delay={100}>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>SIMULASI SCAN</Text>
          </View>

          {members.map((member) => {
            const inGym = activeVisits.some((v) => v.memberId === member.id);
            return (
              <View key={member.id} style={s.row}>
                <View style={s.rowTextWrap}>
                  <Text style={s.rowTitle}>{member.name}</Text>
                  <Text style={s.rowSub}>{member.code}</Text>
                </View>
                {inGym ? (
                  <View style={s.rowBadge}>
                    <Text style={s.rowBadgeText}>DI GYM</Text>
                  </View>
                ) : (
                  <PressableScale
                    onPress={() => handleScan(member)}
                    style={[common.primaryButton, s.rowButton]}
                  >
                    <Text style={common.primaryButtonText}>SCAN</Text>
                  </PressableScale>
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
