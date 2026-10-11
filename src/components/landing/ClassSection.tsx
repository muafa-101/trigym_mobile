import {ClassItem} from "@/app/types/landing";
import {styles} from "@/app/styles";
import {Text, View} from "react-native";
import {CLASSES} from "@/app/const/landing";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {ClassCard} from "@/app/components/landing/ClassCard";

interface ClassSectionProps {
    classes: ClassItem[]
}

export const ClassSection: React.FC<ClassSectionProps> = ({classes}) => {
    return (
        <View style={styles.classSection}>
            <View style={styles.classHeader}>
                <Text style={styles.sectionTitle}>PILIHAN KELAS</Text>
            </View>
            <View style={styles.classRow}>
                {CLASSES.map((item) => (
                    <ClassCard key={item.label} classItem={item} />
                ))}
            </View>
        </View>
    )
}