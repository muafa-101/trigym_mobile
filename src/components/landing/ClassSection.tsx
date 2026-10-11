import { ClassItem } from "@/types/landing";
import { styles } from "@/styles/styles";
import { Text, View } from "react-native";
import { CLASSES } from "@/const/landing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ClassCard } from "@/components/landing/ClassCard";

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