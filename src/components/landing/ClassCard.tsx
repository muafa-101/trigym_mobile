import { ClassItem } from "@/types/landing";
import { styles } from "@/styles/styles";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

interface ClassCardProps {
    classItem: ClassItem
}

export const ClassCard: React.FC<ClassCardProps> = ({classItem}) => {
    return (
        <View style={styles.classCard}>
            <Text style={styles.classLabel}>{classItem.label}</Text>
            <View style={styles.classIconWrap}>
                <MaterialCommunityIcons
                    name={classItem.icon}
                    size={34}
                    color="#FFFFFF"
                />
            </View>
        </View>
    )
}