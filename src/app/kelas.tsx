/**
 * kelas.tsx  (halaman DETAIL KELAS, alamat "/kelas?id=zumba")
 * ------------------------------------------------------------------
 * Satu halaman dipakai untuk SEMUA kelas. Kelas mana yang tampil
 * ditentukan oleh parameter `id` di alamat, dibaca dengan
 * useLocalSearchParams().
 *
 * Konsep modul 2:
 *   - useState         : pesan peringatan
 *   - router.back()    : tombol KEMBALI / setelah berhasil ikut kelas
 *   - <Stack.Screen>   : judul header diganti sesuai nama kelas
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { getClassById } from "@/data/classData";
import { createStyles } from "@/styles/kelas_styles";

export default function KelasScreen() {
  const router = useRouter();
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const { isCheckedIn, checkIn } = useGym();

  // Baca parameter `id` dari alamat, lalu cari kelasnya
  const { id } = useLocalSearchParams<{ id?: string }>();
  const gymClass = getClassById(id);

  // useState: pesan kalau check-in gagal
  const [message, setMessage] = useState<string | null>(null);

  // Kembali ke halaman sebelumnya
  function handleBack() {
    router.back();
  }

  // Ikut kelas = check-in dengan nama kelas ini
  function handleJoin() {
    if (!gymClass) return;

    const result = checkIn(gymClass.label);
    if (result === "ok") {
      router.back(); // kembali ke profil, sesi latihan sudah aktif di sana
    } else if (result === "expired") {
      setMessage("Membership sudah berakhir. Perpanjang dulu dari halaman profil.");
    } else {
      setMessage("Kamu masih check-in. Check-out dulu di halaman profil.");
    }
  }

  /* Kalau id salah / kelas tidak ada */
  if (!gymClass) {
    return (
      <Screen>
        <View style={styles.card}>
          <Text style={styles.label}>Kelas tidak ditemukan</Text>
          <View style={styles.buttonRow}>
            <PressableScale onPress={handleBack} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>KEMBALI</Text>
            </PressableScale>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Mengganti judul header sesuai kelas yang dibuka */}
      <Stack.Screen options={{ title: gymClass.label }} />

      <View style={styles.card}>
        <Image source={gymClass.image} style={styles.image} resizeMode="cover" />

        <View style={styles.headerRow}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons
              name={gymClass.icon}
              size={24}
              color={colors.text}
            />
          </View>
          <Text style={styles.label}>{gymClass.label}</Text>
        </View>

        <Text style={styles.desc}>{gymClass.desc}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color={colors.text}
            />
            <Text style={styles.metaText}>{gymClass.duration}</Text>
          </View>
          <View style={styles.metaChip}>
            <MaterialCommunityIcons
              name="signal-cellular-2"
              size={14}
              color={colors.text}
            />
            <Text style={styles.metaText}>{gymClass.level}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>PELATIH</Text>
          <Text style={styles.infoValue}>{gymClass.trainer}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>JADWAL</Text>
          {gymClass.schedule.map((slot) => (
            <Text key={slot} style={styles.scheduleItem}>
              {slot}
            </Text>
          ))}
        </View>

        {message && <Text style={styles.note}>{message}</Text>}

        <View style={styles.buttonRow}>
          <PressableScale
            onPress={handleJoin}
            disabled={isCheckedIn}
            style={[
              styles.primaryButton,
              isCheckedIn && styles.primaryButtonDisabled,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isCheckedIn ? "SUDAH CHECK-IN" : "IKUTI KELAS"}
            </Text>
          </PressableScale>

          <PressableScale onPress={handleBack} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>KEMBALI</Text>
          </PressableScale>
        </View>
      </View>
    </Screen>
  );
}
