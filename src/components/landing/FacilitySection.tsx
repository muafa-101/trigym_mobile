import {FacilityItem} from "@/app/types/landing";
import React from "react";
import {Text, View} from "react-native";
import {styles} from "@/app/styles";
import {FacilityCard} from "@/app/components/landing/FacilityCard";

interface FacilitySectionProps {
    facilities: FacilityItem[]
}

export const FacilitySection: React.FC<FacilitySectionProps> = ({facilities}) => {
    return (
        <View style={styles.facilitySection}>
            <View style={styles.facilityHeader}>
                <Text style={styles.sectionTitle}>FASILITAS KAMI</Text>
            </View>
            <View style={styles.facilityRow}>
                {facilities.map((item) => (
                    <FacilityCard key={item.title} facilityItem={item} />
                ))}
            </View>
        </View>
    )
}