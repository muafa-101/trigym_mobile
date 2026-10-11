import {Image, ImageSourcePropType, Text, View} from "react-native";
import {styles} from "../../styles/styles";
import {LOGO_SOURCE} from "../../const/landing";
import React from "react";

interface HeroSectionProps {
    logoSource: ImageSourcePropType;
    description: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({logoSource, description}) => {
    return (
        <View style={styles.hero}>
            <View style={styles.heroTopBar} />
            <View style={styles.heroDivider} />
            <View style={styles.heroBody}>
                <Image
                    source={logoSource}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.heroText}>
                    {description}
                </Text>
            </View>
        </View>
    )
}