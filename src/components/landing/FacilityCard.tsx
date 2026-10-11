import { FacilityItem } from "@/types/landing";
import { Text, View } from "react-native";
import { styles } from "@/styles/styles";
import { FACILITIES } from "@/const/landing";
import React from "react";

interface FacilityCardProps {
    facilityItem: FacilityItem;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({facilityItem}) => {
    return (
        <View style={styles.facilityCard}>
            <Text style={styles.facilityTitle}>{facilityItem.title}</Text>
            <Text style={styles.facilityDesc}>{facilityItem.desc}</Text>
        </View>
    )
}