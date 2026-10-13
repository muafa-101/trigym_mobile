import { styles as s } from "@/styles/styles";
import { ProfileData } from "@/types/landing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface ProfileCardProps {
  profile: ProfileData;
  onPress: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: "rgba(0,0,0,0.1)" }}
    style={({ pressed }) => [s.profileCard, pressed && { opacity: 0.85 }]}
  >
    <Ionicons name="person" size={48} color="#2F6BFF" />
    <View style={s.profileTextWrap}>
      <Text style={s.profileText}>{profile.name}</Text>
      <Text style={s.profileText}>{profile.nim}</Text>
    </View>
  </Pressable>
);
