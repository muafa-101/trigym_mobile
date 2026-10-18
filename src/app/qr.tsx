/**
 * qr.tsx  (halaman QR MEMBER, alamat "/qr")
 * ------------------------------------------------------------------
 * Check-in memakai QR.
 *
 * PLACEHOLDER: gambar QR di bawah hanya contoh dari internet, dan
 * belum ada scanner sungguhan. Tombol SIMULASI SCAN mewakili petugas
 * yang memindai QR kamu, dan HARUS DIHAPUS kalau scanner sudah ada.
 *
 * NANTI ada dua cara (pilih salah satu atau dua-duanya):
 *   a. QR milik MEMBER ditampilkan di sini, dipindai petugas
 *      -> buat QR dari `member.code` memakai `react-native-qrcode-svg`.
 *   b. QR milik GYM dipasang di pintu, member memindai dari HP
 *      -> pakai `expo-camera` untuk membaca QR, lalu panggil checkIn().
 *
 * Konsep modul 2: useState (pesan hasil), router.back() (kembali).
 */
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useThemedStyles } from "@/context/ThemeContext";
import { createCommonStyles } from "@/styles/common_styles";
import { createStyles } from "@/styles/qr_styles";

// TODO: ganti dengan QR asli milik member
const QR_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/330px-QR_code_for_mobile_English_Wikipedia.svg.png";

export default function QrScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { currentMember, myActiveVisit, checkIn } = useGym();

  // useState: pesan kalau check-in ditolak
  const [message, setMessage] = useState<string | null>(null);

  // Mewakili petugas yang memindai QR member
  function handleSimulateScan() {
    const result = checkIn(currentMember.id);

    if (result === "ok") {
      router.back(); // kembali ke home, sesi latihan sudah aktif di sana
    } else if (result === "expired") {
      setMessage("Membership sudah berakhir. Perpanjang dulu dari halaman home.");
    } else if (result === "already") {
      setMessage("Kamu sudah check-in.");
    } else {
      setMessage("Member tidak ditemukan.");
    }
  }

  return (
    <Screen>
      <FadeInView>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>QR MEMBER</Text>
          </View>
          <View style={s.qrBody}>
            <Text style={s.hint}>Tunjukkan QR ini ke petugas di pintu gym</Text>
            <View style={s.qrFrame}>
              <Image
                source={{ uri: QR_URL }}
                style={s.qrImage}
                resizeMode="contain"
              />
            </View>
            <Text style={s.name}>{currentMember.name}</Text>
            <Text style={s.code}>{currentMember.code}</Text>
          </View>
        </View>
      </FadeInView>

      <FadeInView delay={120}>
        <View style={s.demoBox}>
          <Text style={s.demoTitle}>MODE DEMO</Text>
          <Text style={s.demoText}>
            Scanner belum tersedia. Tekan tombol di bawah untuk berpura-pura
            petugas sudah memindai QR kamu.
          </Text>
          {message && <Text style={common.note}>{message}</Text>}
          <View style={common.buttonRow}>
            {/* back: kembali ke halaman sebelumnya (home) */}
            <PressableScale
              onPress={() => router.back()}
              style={[common.secondaryButton, common.grow1]}
            >
              <Text style={common.secondaryButtonText}>KEMBALI</Text>
            </PressableScale>
            <PressableScale
              onPress={handleSimulateScan}
              disabled={myActiveVisit !== null}
              style={[
                common.primaryButton,
                common.grow2,
                myActiveVisit !== null && common.disabled,
              ]}
            >
              <Text style={common.primaryButtonText}>
                {myActiveVisit ? "SUDAH CHECK-IN" : "SIMULASI SCAN"}
              </Text>
            </PressableScale>
          </View>
        </View>
      </FadeInView>
    </Screen>
  );
}
