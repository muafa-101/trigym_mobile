import {ProfileData} from "@/app/types/landing";
import {Pressable, Text, View} from "react-native";
import {styles} from "@/app/styles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

interface ProfileCardProps {
    profile: ProfileData;
    onPress: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({profile, onPress}) => {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: "rgba(0,0,0,0.1)" }}
            style={({ pressed }) => [
                styles.profileCard,
                pressed && { opacity: 0.85 },
            ]}
        >
            <Ionicons name="person" size={44} color="#FFFF" />
            <View style={styles.profileTextWrap}>
                <Text style={styles.profileText}>{profile.name}</Text>
                <Text style={styles.profileText}>{profile.nim}</Text>
            </View>
        </Pressable>
    )
}