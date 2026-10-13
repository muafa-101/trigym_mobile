import { ClassSection } from "@/components/landing/ClassSection";
import { FacilitySection } from "@/components/landing/FacilitySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProfileCard } from "@/components/landing/ProfileCard";
import {
  CLASSES,
  FACILITIES,
  HERO_DESCRIPTION,
  LOGO_SOURCE,
  PROFILE,
} from "@/const/landing";
import { styles as s } from "@/styles/styles";
import { useRouter } from "expo-router";
import { ImageBackground, SafeAreaView, ScrollView, View } from "react-native";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/BACKGROUND.jpg")} // <- path background di sini
      style={s.safe}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.page}>
            <ProfileCard
              profile={PROFILE}
              onPress={() => router.push("./profile" as any)}
            />
            <HeroSection
              logoSource={LOGO_SOURCE}
              description={HERO_DESCRIPTION}
            />
            <FacilitySection facilities={FACILITIES} />
            <ClassSection classes={CLASSES} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
