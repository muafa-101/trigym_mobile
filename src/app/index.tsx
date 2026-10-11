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
import { styles } from "../styles/styles";
import { CLASSES, FACILITIES, HERO_DESCRIPTION, LOGO_SOURCE, PROFILE } from "@/const/landing";
import { ProfileCard } from "@/components/landing/ProfileCard";
import { HeroSection } from "@/components/landing/HeroSection";
import { FacilitySection } from "@/components/landing/FacilitySection";
import { ClassSection } from "@/components/landing/ClassSection";

export default function LandingScreen() {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push("./profile");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          backgroundColor: "#DADADA",
          borderRadius: 20,
          padding: 14,
          paddingBottom: 24,
          gap: 16,
        }}>
          <ProfileCard profile={PROFILE} onPress={handleProfilePress} />
          <HeroSection logoSource={LOGO_SOURCE} description={HERO_DESCRIPTION} />
          <FacilitySection facilities={FACILITIES} />
          <ClassSection classes={CLASSES} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
