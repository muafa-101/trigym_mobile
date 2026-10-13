import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { MEMBER, WEEKLY_CLASSES } from "../data/profileData";
import { styles } from "../styles/profile_styles";
import { getDaysLeft, getStatusInfo } from "../utils/gymHelpers";

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

  const daysLeft = getDaysLeft(MEMBER.validUntil);
  const statusInfo = getStatusInfo(STATUS.checkinCount);

  const progressPercent = Math.min(
    Math.max(daysLeft / MEMBERSHIP_TOTAL_DAYS, 0),
    1,
  );
  const progressColor =
    daysLeft > 30 ? "#B6F2E0" : daysLeft > 7 ? "#FFD27A" : "#FF5C5C";

  /* Progress bar terisi pelan saat layar dibuka */
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 900,
      delay: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // animasi width tidak mendukung native driver
    }).start();
  }, [progressAnim, progressPercent]);

  /* Ikon api berdenyut pelan */
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

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
    <ImageBackground
      source={require("@/assets/BACKGROUND.jpg")} // <- path background di sini
      style={styles.safe}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.page}>
            {/* ---------- Kartu member ---------- */}
            <FadeInView delay={0}>
              <View style={styles.memberCard}>
                <View style={styles.memberTopBar} />
                <View style={styles.memberDivider} />
                <View style={styles.memberBody}>
                  <PressableScale
                    onPress={handleExtend}
                    style={styles.extendPill}
                  >
                    <Text style={styles.extendPillText}>PERPANJANG</Text>
                  </PressableScale>

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

                  <View style={styles.progressTrack}>
                    <Animated.View
                      style={[
                        styles.progressFill,
                        {
                          width: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"],
                          }),
                          backgroundColor: progressColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </FadeInView>

            {/* ---------- Histori / QR / Flame ---------- */}
            <FadeInView delay={80}>
              <View style={styles.utilityRow}>
                <View style={styles.historyCard}>
                  <View style={styles.historyIconsRow}>
                    <PressableScale
                      onPress={handleHistory}
                      style={styles.historyIconBox}
                    >
                      <MaterialCommunityIcons
                        name="calendar-clock"
                        size={26}
                        color="#FFFFFF"
                      />
                      <Text style={styles.historyLabelText}>HISTORI</Text>
                    </PressableScale>

                    <PressableScale
                      onPress={handleQrCode}
                      style={styles.historyIconBox}
                    >
                      <Ionicons name="qr-code" size={24} color="#FFFFFF" />
                      <Text style={styles.historyLabelText}>SCAN QR</Text>
                    </PressableScale>
                  </View>
                </View>

                <PressableScale scaleTo={0.94} style={styles.flameCard}>
                  <Animated.View style={{ transform: [{ scale: pulse }] }}>
                    <MaterialCommunityIcons
                      name="fire"
                      size={96}
                      color="#FFFFFF"
                    />
                  </Animated.View>
                </PressableScale>
              </View>
            </FadeInView>

            {/* ---------- Status ramai ---------- */}
            <FadeInView delay={160}>
              <View
                style={[
                  styles.statusRow,
                  { backgroundColor: statusInfo.color },
                ]}
              >
                <View style={styles.statusLeft}>
                  <Text style={styles.statusLabel}>STATUS :</Text>
                  <View style={styles.statusPill}>
                    <Text
                      style={[
                        styles.statusPillText,
                        { color: statusInfo.color },
                      ]}
                    >
                      {statusInfo.label}
                    </Text>
                  </View>
                </View>
                <View style={styles.statusRight}>
                  <View style={styles.checkinPill}>
                    <Text
                      style={[
                        styles.checkinPillText,
                        { color: statusInfo.color },
                      ]}
                    >
                      {STATUS.checkinCount} ORANG CHECK-IN
                    </Text>
                  </View>
                </View>
              </View>
            </FadeInView>

            {/* ---------- Kelas yang sedang berlangsung ---------- */}
            <FadeInView delay={240}>
              <View style={styles.liveClassRow}>
                <View style={styles.liveClassIconWrap}>
                  <Ionicons name="person" size={30} color="#4A4A00" />
                </View>
                <View style={styles.liveClassTextWrap}>
                  <Text style={styles.liveClassTitle}>{LIVE_CLASS.title}</Text>
                  <Text style={styles.liveClassTrainer}>
                    {LIVE_CLASS.trainer}
                  </Text>
                </View>
                <PressableScale
                  onPress={handleFollowClass}
                  style={styles.followButton}
                >
                  <Text style={styles.followButtonText}>IKUTI</Text>
                </PressableScale>
              </View>
            </FadeInView>

            {/* ---------- Pilihan kelas minggu ini ---------- */}
            <FadeInView delay={320}>
              <View style={styles.classSection}>
                <View style={styles.classHeader}>
                  <Text style={styles.classHeaderText}>
                    Mau Pilih kelas apa Minggu ini?
                  </Text>
                </View>

                <View style={styles.classList}>
                  {WEEKLY_CLASSES.map((item) => (
                    <PressableScale
                      key={item.label}
                      onPress={() => handleClassPress(item.label)}
                      scaleTo={0.97}
                      style={styles.classCard}
                    >
                      <View style={styles.classIconWrap}>
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={30}
                          color="#FFFFFF"
                        />
                      </View>
                      <View style={styles.classTextWrap}>
                        <Text style={styles.classLabel}>
                          {item.label.replace("\n", " ")}
                        </Text>
                        {item.desc && (
                          <Text style={styles.classDesc}>{item.desc}</Text>
                        )}
                        <View style={styles.classMetaRow}>
                          {item.duration && (
                            <View style={styles.metaChip}>
                              <MaterialCommunityIcons
                                name="clock-outline"
                                size={14}
                                color="#FFFFFF"
                              />
                              <Text style={styles.metaText}>
                                {item.duration}
                              </Text>
                            </View>
                          )}
                          {item.level && (
                            <View style={styles.metaChip}>
                              <MaterialCommunityIcons
                                name="signal-cellular-2"
                                size={14}
                                color="#FFFFFF"
                              />
                              <Text style={styles.metaText}>{item.level}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </PressableScale>
                  ))}
                </View>
              </View>
            </FadeInView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
