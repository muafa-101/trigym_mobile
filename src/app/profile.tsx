import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { MEMBER, WEEKLY_CLASSES } from "../data/profileData";
import { getDaysLeft, getStatusInfo } from "../utils/gymHelpers";
import { styles } from "./profile_styles";

/* ------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------ */
const STATUS = {
  checkinCount: 120,
};

// Lama membership (hari), dipakai untuk menghitung panjang progress bar
const MEMBERSHIP_TOTAL_DAYS = 365;

const LIVE_CLASS = {
  title: "KELAS WEIGHT TRAINING",
  trainer: "Abdoel Fatah",
};

/* ------------------------------------------------------------------
 * Screen
 * ------------------------------------------------------------------ */
export default function ProfileScreen() {
  const router = useRouter();

  // Hasil dari fungsi helper (langkah 2)
  const daysLeft = getDaysLeft(MEMBER.validUntil);
  const statusInfo = getStatusInfo(STATUS.checkinCount);

  // Nilai untuk inline style (langkah 3)
  const progressPercent = Math.min(
    Math.max(daysLeft / MEMBERSHIP_TOTAL_DAYS, 0),
    1
  );
  const progressColor =
    daysLeft > 30 ? "#B6F2E0" : daysLeft > 7 ? "#FFD27A" : "#FF5C5C";

  function handleExtend() {
    router.push("/perpanjang" as any);
  }

  function handleHistory() {
    router.push("./histori"); 
  }

  function handleQrCode() {
  router.push("./qr");
  }
  function handleFollowClass() {
    router.push("/kelas/weight-training" as any);
  }

  function handleClassPress(label: string) {
    router.push({ pathname: "/kelas", params: { nama: label } } as any);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          {/* ---------- Kartu member ---------- */}
          <View style={styles.memberCard}>
            <View style={styles.memberTopBar} />
            <View style={styles.memberDivider} />
            <View style={styles.memberBody}>
              <Pressable
                onPress={handleExtend}
                style={({ pressed }) => [
                  styles.extendPill,
                  pressed && styles.extendPillPressed,
                ]}
              >
                <Text style={styles.extendPillText}>PERPANJANG</Text>
              </Pressable>

              <View style={styles.memberRow}>
                <Ionicons name="person-circle" size={64} color="#B9CBFA" />
                <View style={styles.memberTextWrap}>
                  <Text style={styles.memberName}>{MEMBER.name}</Text>
                  <Text style={styles.memberEmail}>{MEMBER.email}</Text>
                  <Text style={styles.memberNim}>{MEMBER.nim}</Text>
                </View>
              </View>

              <Text style={styles.validUntil}>
                Berlaku hingga {MEMBER.validUntil} (
                {daysLeft > 0 ? `${daysLeft} hari lagi` : "Kedaluwarsa"})
              </Text>

              {/* Progress bar sisa membership (inline style) */}
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progressPercent * 100}%`,
                      backgroundColor: progressColor,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.utilityRow}>
            {/* Kiri: Histori + Scan QR (ditumpuk) */}
            <View style={styles.historyCard}>
              <View style={styles.historyIconsRow}>
                <Pressable
                  onPress={handleHistory}
                  style={({ pressed }) => [
                    styles.historyIconBox,
                    pressed && styles.historyIconBoxPressed,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={26}
                    color="#FFFFFF"
                  />
                  <Text style={styles.historyLabelText}>HISTORI</Text>
                </Pressable>

                <Pressable
                  onPress={handleQrCode}
                  style={({ pressed }) => [
                    styles.historyIconBox,
                    pressed && styles.historyIconBoxPressed,
                  ]}
                >
                  <Ionicons name="qr-code" size={24} color="#FFFFFF" />
                  <Text style={styles.historyLabelText}>SCAN QR</Text>
                </Pressable>
              </View>
            </View>

            {/* Kanan: Flame (fitur utama, 1:1) */}
            <Pressable
              style={({ pressed }) => [
                styles.flameCard,
                pressed && styles.flameCardPressed,
              ]}
            >
              <MaterialCommunityIcons name="fire" size={96} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* ---------- Status ramai ---------- */}
          <View
            style={[styles.statusRow, { backgroundColor: statusInfo.color }]}
          >
            <View style={styles.statusLeft}>
              <Text style={styles.statusLabel}>STATUS :</Text>
              <View style={styles.statusPill}>
                <Text
                  style={[styles.statusPillText, { color: statusInfo.color }]}
                >
                  {statusInfo.label}
                </Text>
              </View>
            </View>
            <View style={styles.statusRight}>
              <View style={styles.checkinPill}>
                <Text
                  style={[styles.checkinPillText, { color: statusInfo.color }]}
                >
                  {STATUS.checkinCount} ORANG CHECK-IN
                </Text>
              </View>
            </View>
          </View>

          {/* ---------- Kelas yang sedang berlangsung ---------- */}
          <View style={styles.liveClassRow}>
            <View style={styles.liveClassIconWrap}>
              <Ionicons name="person" size={30} color="#4A4A00" />
            </View>
            <View style={styles.liveClassTextWrap}>
              <Text style={styles.liveClassTitle}>{LIVE_CLASS.title}</Text>
              <Text style={styles.liveClassTrainer}>{LIVE_CLASS.trainer}</Text>
            </View>
            <Pressable
              onPress={handleFollowClass}
              style={({ pressed }) => [
                styles.followButton,
                pressed && styles.followButtonPressed,
              ]}
            >
              <Text style={styles.followButtonText}>IKUTI</Text>
            </Pressable>
          </View>

          {/* ---------- Pilihan kelas minggu ini ---------- */}
          <View style={styles.classSection}>
            <View style={styles.classHeader}>
              <Text style={styles.classHeaderText}>
                Mau Pilih kelas apa Minggu ini?
              </Text>
            </View>

            <View style={styles.classRow}>
              {WEEKLY_CLASSES.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => handleClassPress(item.label)}
                  style={({ pressed }) => [
                    styles.classCard,
                    pressed && styles.classCardPressed,
                  ]}
                >
                  <Text style={styles.classLabel}>{item.label}</Text>
                  <View style={styles.classIconWrap}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={34}
                      color="#FFFFFF"
                    />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
