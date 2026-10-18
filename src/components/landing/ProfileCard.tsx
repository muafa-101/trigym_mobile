/**
 * ProfileCard.tsx
 * ------------------------------------------------------------------
 * Kartu kecil di atas beranda berisi nama & NIM member.
 * Kalau ditekan, pindah ke halaman profil (lewat `onPress`).
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";

interface ProfileCardProps {
  name: string;
  nim: string;
  onPress: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  nim,
  onPress,
}) => {
  const s = useThemedStyles(createStyles);
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      // Saat ditekan, kartu sedikit redup
      style={({ pressed }) => [s.profileCard, pressed && { opacity: 0.85 }]}
    >
      <Ionicons name="person" size={48} color={colors.profileCardIcon} />
      <View style={s.profileTextWrap}>
        <Text style={s.profileText}>{name}</Text>
        <Text style={s.profileText}>{nim}</Text>
      </View>
    </Pressable>
  );
};
