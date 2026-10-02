import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "./profile_styles";

/* ------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------ */
const MEMBER = {
  name: "Muhammad Kharisma Aditya Putra",
  email: "yenderruaditya@gmail.com",
  nim: "02010602",
  validUntil: "17/08/1945",
};

const STATUS = {
  label: "RAMAI",
  checkinCount: 120,
};

const LIVE_CLASS = {
  title: "KELAS WEIGHT TRAINING",
  trainer: "Abdoel Fatah",
};

type ClassIcon = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const WEEKLY_CLASSES: { label: string; icon: ClassIcon }[] = [
  { label: "YOGA &\nPILATES", icon: "yoga" },
  { label: "WEIGHT\nTRAINING", icon: "weight-lifter" },
  { label: "CARDIO\n& HIT", icon: "heart-pulse" },
  { label: "ZUMBA", icon: "human-female-dance" },
];

/* ------------------------------------------------------------------
 * Screen
 * ------------------------------------------------------------------ */
export default function ProfileScreen() {
  const router = useRouter();

  const handleExtend = () => {
    // Aksi saat tombol "PERPANJANG" ditekan
    router.push("/perpanjang" as any);
  };

  const handleHistory = () => {
    // Aksi saat tombol "HISTORI" ditekan
    router.push("/histori" as any);
  };

  const handleQrCode = () => {
    // Aksi saat tombol "QR" ditekan
    router.push("/QR" as any);
  };

  const handleFollowClass = () => {
    // Aksi saat tombol "IKUTI" ditekan
    router.push("/kelas/weight-training" as any);
  };

  const handleClassPress = (label: string) => {
    // Aksi saat salah satu kartu kelas mingguan ditekan
    router.push({ pathname: "/kelas", params: { nama: label } } as any);
  };

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
                Berlaku hingga {MEMBER.validUntil}
              </Text>
            </View>
          </View>

          {/* ---------- Histori / QR + Flame ---------- */}
          <View style={styles.utilityRow}>
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
                    size={30}
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
                  <Ionicons name="qr-code" size={28} color="#FFFFFF" />
                  <Text style={styles.historyLabelText}>SCAN QR</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.flameCard}>
              <Ionicons name="flame" size={40} color="#FFFFFF" />
            </View>
          </View>

          {/* ---------- Status ramai ---------- */}
          <View style={styles.statusRow}>
            <View style={styles.statusLeft}>
              <Text style={styles.statusLabel}>STATUS :</Text>
              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>{STATUS.label}</Text>
              </View>
            </View>
            <View style={styles.statusRight}>
              <View style={styles.checkinPill}>
                <Text style={styles.checkinPillText}>
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
