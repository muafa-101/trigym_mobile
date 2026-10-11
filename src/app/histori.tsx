import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { CHECKIN_HISTORY } from "../data/profileData";
import { countVisits, getCheckoutLabel } from "../utils/gymHelpers";
import { styles } from "../styles/histori_styles";

export default function HistoriScreen() {
  const totalVisits = countVisits(CHECKIN_HISTORY);

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: "Riwayat Check-in" }} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>TOTAL KUNJUNGAN</Text>
            <Text style={styles.summaryValue}>{totalVisits}x</Text>
          </View>

          <View style={styles.listSection}>
            {CHECKIN_HISTORY.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View>
                  <Text style={styles.historyClass}>{item.className}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <View style={styles.historyTimeWrap}>
                  <Text style={styles.historyTime}>
                    Masuk {item.checkInTime}
                  </Text>
                  <Text style={styles.historyTime}>
                    Keluar {getCheckoutLabel(item)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
