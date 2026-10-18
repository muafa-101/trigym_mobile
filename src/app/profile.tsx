/**
 * profile.tsx  (halaman PROFIL, alamat "/profile")
 * ------------------------------------------------------------------
 * Halaman utama member. Isinya:
 *   1. Kartu member + progress bar sisa masa berlaku
 *   2. Tombol histori / QR + ikon api
 *   3. Status keramaian gym (angka berubah otomatis)
 *   4. Sesi latihan: tombol CHECK-IN / CHECK-OUT
 *   5. Kelas yang sedang berlangsung
 *   6. Pilihan kelas
 *
 * Konsep modul 2 yang dipakai di sini:
 *   - useState   : pesan peringatan check-in (`message`)
 *   - useEffect  : animasi progress bar, animasi api, hapus pesan lama
 *   - useRef     : menyimpan nilai animasi
 *   - Router     : router.push() ke halaman lain
 */
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { CLASSES, getClassById } from "@/data/classData";
import { LIVE_CLASS_ID, MEMBERSHIP_TOTAL_DAYS } from "@/data/profileData";
import { useCrowdCount } from "@/hooks/useCrowdCount";
import { createStyles } from "@/styles/profile_styles";
import { getDaysLeft, getStatusInfo } from "@/utils/gymHelpers";

export default function ProfileScreen() {
  const router = useRouter();
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const { member, isCheckedIn, activeSession, checkIn, checkOut } = useGym();

  /* ---------- Data turunan (dihitung dari data di atas) ---------- */
  const crowdCount = useCrowdCount(); // jumlah orang check-in, berubah otomatis
  const statusInfo = getStatusInfo(crowdCount);
  const daysLeft = getDaysLeft(member.validUntil);
  const liveClass = getClassById(LIVE_CLASS_ID);

  // Panjang progress bar: 0 (habis) sampai 1 (penuh)
  const progressPercent = Math.min(
    Math.max(daysLeft / MEMBERSHIP_TOTAL_DAYS, 0),
    1,
  );
  const progressColor =
    daysLeft > 30 ? colors.mint : daysLeft > 7 ? colors.warning : colors.danger;

  /* ---------- useState: pesan peringatan di kartu sesi ---------- */
  const [message, setMessage] = useState<string | null>(null);

  /* ---------- useEffect: hapus pesan "kedaluwarsa" setelah diperpanjang ---------- */
  useEffect(() => {
    if (daysLeft > 0) setMessage(null);
  }, [daysLeft]);

  /* ---------- useEffect: progress bar terisi pelan saat layar dibuka ---------- */
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

  /* ---------- useEffect: ikon api berdenyut pelan ---------- */
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
    return () => loop.stop(); // hentikan animasi saat layar ditutup
  }, [pulse]);

  /* ---------- Navigasi (router.push = buka halaman baru) ---------- */
  function handleExtend() {
    router.push("/perpanjang");
  }

  function handleHistory() {
    router.push("/histori");
  }

  function handleQrCode() {
    router.push("/qr");
  }

  // Kirim id kelas lewat parameter URL -> /kelas?id=weight-training
  function handleOpenClass(classId: string) {
    router.push({ pathname: "/kelas", params: { id: classId } });
  }

  /* ---------- Check-in / check-out ---------- */
  function handleSessionPress() {
    if (isCheckedIn) {
      checkOut();
      setMessage(null);
      return;
    }

    const result = checkIn("Latihan Bebas");
    if (result === "expired") {
      setMessage("Membership sudah berakhir. Perpanjang dulu untuk check-in.");
    } else {
      setMessage(null);
    }
  }

  return (
    <Screen>
      {/* ---------- Kartu member ---------- */}
      <FadeInView delay={0}>
        <View style={styles.memberCard}>
          <View style={styles.memberTopBar} />
          <View style={styles.memberDivider} />
          <View style={styles.memberBody}>
            <PressableScale onPress={handleExtend} style={styles.extendPill}>
              <Text style={styles.extendPillText}>PERPANJANG</Text>
            </PressableScale>

            <View style={styles.memberRow}>
              <Ionicons name="person-circle" size={64} color={colors.memberIcon} />
              <View style={styles.memberTextWrap}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberEmail}>{member.email}</Text>
                <Text style={styles.memberNim}>{member.nim}</Text>
              </View>
            </View>

            <Text style={styles.validUntil}>
              Berlaku hingga {member.validUntil} (
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

      {/* ---------- Histori / QR / Api ---------- */}
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
              <MaterialCommunityIcons name="fire" size={96} color="#FFFFFF" />
            </Animated.View>
          </PressableScale>
        </View>
      </FadeInView>

      {/* ---------- Status ramai ---------- */}
      <FadeInView delay={160}>
        <View
          style={[styles.statusRow, { backgroundColor: statusInfo.color }]}
        >
          <View style={styles.statusLeft}>
            <Text style={styles.statusLabel}>STATUS :</Text>
            <View style={styles.statusPill}>
              <Text style={[styles.statusPillText, { color: statusInfo.color }]}>
                {statusInfo.label}
              </Text>
            </View>
          </View>
          <View style={styles.statusRight}>
            <View style={styles.checkinPill}>
              <Text
                style={[styles.checkinPillText, { color: statusInfo.color }]}
              >
                {crowdCount} ORANG CHECK-IN
              </Text>
            </View>
          </View>
        </View>
      </FadeInView>

      {/* ---------- Sesi latihan (check-in / check-out) ---------- */}
      <FadeInView delay={200}>
        <View style={styles.sessionCard}>
          <View style={styles.sessionRow}>
            <Ionicons
              name={isCheckedIn ? "barbell" : "barbell-outline"}
              size={30}
              color={colors.text}
            />
            <View style={styles.sessionTextWrap}>
              <Text style={styles.sessionTitle}>SESI LATIHAN</Text>
              <Text style={styles.sessionSub}>
                {activeSession
                  ? `${activeSession.className} • masuk ${activeSession.checkInTime}`
                  : "Belum check-in"}
              </Text>
            </View>
            <PressableScale
              onPress={handleSessionPress}
              style={[
                styles.sessionButton,
                isCheckedIn && styles.sessionButtonOut,
              ]}
            >
              <Text
                style={[
                  styles.sessionButtonText,
                  isCheckedIn && styles.sessionButtonTextOut,
                ]}
              >
                {isCheckedIn ? "CHECK-OUT" : "CHECK-IN"}
              </Text>
            </PressableScale>
          </View>
          {message && <Text style={styles.sessionNote}>{message}</Text>}
        </View>
      </FadeInView>

      {/* ---------- Kelas yang sedang berlangsung ---------- */}
      {liveClass && (
        <FadeInView delay={240}>
          <View style={styles.liveClassRow}>
            <View style={styles.liveClassIconWrap}>
              <Ionicons name="person" size={30} color={colors.liveText} />
            </View>
            <View style={styles.liveClassTextWrap}>
              <Text style={styles.liveClassTitle}>KELAS {liveClass.label}</Text>
              <Text style={styles.liveClassTrainer}>{liveClass.trainer}</Text>
            </View>
            <PressableScale
              onPress={() => handleOpenClass(liveClass.id)}
              style={styles.followButton}
            >
              <Text style={styles.followButtonText}>IKUTI</Text>
            </PressableScale>
          </View>
        </FadeInView>
      )}

      {/* ---------- Pilihan kelas minggu ini ---------- */}
      <FadeInView delay={320}>
        <View style={styles.classSection}>
          <View style={styles.classHeader}>
            <Text style={styles.classHeaderText}>
              Mau Pilih kelas apa Minggu ini?
            </Text>
          </View>

          <View style={styles.classList}>
            {CLASSES.map((item) => (
              <PressableScale
                key={item.id}
                onPress={() => handleOpenClass(item.id)}
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
                  <Text style={styles.classLabel}>{item.label}</Text>
                  <Text style={styles.classDesc}>{item.desc}</Text>
                  <View style={styles.classMetaRow}>
                    <View style={styles.metaChip}>
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={14}
                        color="#FFFFFF"
                      />
                      <Text style={styles.metaText}>{item.duration}</Text>
                    </View>
                    <View style={styles.metaChip}>
                      <MaterialCommunityIcons
                        name="signal-cellular-2"
                        size={14}
                        color="#FFFFFF"
                      />
                      <Text style={styles.metaText}>{item.level}</Text>
                    </View>
                  </View>
                </View>
              </PressableScale>
            ))}
          </View>
        </View>
      </FadeInView>
    </Screen>
  );
}
