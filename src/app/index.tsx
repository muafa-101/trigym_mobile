import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";

const LOGO_SOURCE = require("../../assets/logo.png");

const PROFILE = {
  name: "Muhammad Kharisma Aditya Putra",
  nim: "02010602",
};

const FACILITIES = [
  {
    title: "Peralatan Modern",
    desc: "Lebih dari 60 unit alat kardio dan beban dari merek terpercaya, dirawat rutin setiap minggu.",
  },
  {
    title: "Personal Trainer",
    desc: "Pelatih bersertifikat yang menyusun program sesuai kondisi dan target kamu.",
  },
  {
    title: "Area luas & nyaman",
    desc: "Ruang latihan 800 m² dengan pendingin udara, loker, dan kamar bilas air panas.",
  },
];

type ClassIcon = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const CLASSES: { label: string; icon: ClassIcon }[] = [
  { label: "YOGA &\nPILATES", icon: "yoga" },
  { label: "WEIGHT\nTRAINING", icon: "weight-lifter" },
  { label: "CARDIO\n& HIT", icon: "heart-pulse" },
  { label: "ZUMBA", icon: "human-female-dance" },
];

export default function LandingScreen() {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push("/profile-section/profile" as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          {/* Kartu profil (Pressable) */}
          <Pressable
            onPress={handleProfilePress}
            android_ripple={{ color: "rgba(0,0,0,0.1)" }}
            style={({ pressed }) => [
              styles.profileCard,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="person" size={44} color="#FFFF" />
            <View style={styles.profileTextWrap}>
              <Text style={styles.profileText}>{PROFILE.name}</Text>
              <Text style={styles.profileText}>{PROFILE.nim}</Text>
            </View>
          </Pressable>

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroTopBar} />
            <View style={styles.heroDivider} />
            <View style={styles.heroBody}>
              <Image
                source={LOGO_SOURCE}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.heroText}>
                Tempat latihan yang lengkap, bersih, dan nyaman. Alat modern,
                pelatih berpengalaman, dan jadwal kelas yang fleksibel untuk
                semua level.
              </Text>
            </View>
          </View>

          {/* Fasilitas kami */}
          <View style={styles.facilitySection}>
            <View style={styles.facilityHeader}>
              <Text style={styles.sectionTitle}>FASILITAS KAMI</Text>
            </View>
            <View style={styles.facilityRow}>
              {FACILITIES.map((item) => (
                <View key={item.title} style={styles.facilityCard}>
                  <Text style={styles.facilityTitle}>{item.title}</Text>
                  <Text style={styles.facilityDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Pilihan kelas */}
          <View style={styles.classSection}>
            <View style={styles.classHeader}>
              <Text style={styles.sectionTitle}>PILIHAN KELAS</Text>
            </View>
            <View style={styles.classRow}>
              {CLASSES.map((item) => (
                <View key={item.label} style={styles.classCard}>
                  <Text style={styles.classLabel}>{item.label}</Text>
                  <View style={styles.classIconWrap}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={34}
                      color="#FFFFFF"
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
