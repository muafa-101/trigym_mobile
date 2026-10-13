import { Stack } from "expo-router";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { CHECKIN_HISTORY } from "../data/profileData";
import { styles } from "../styles/histori_styles";
import { countVisits, getCheckoutLabel } from "../utils/gymHelpers";

export default function HistoriScreen() {
  const totalVisits = countVisits(CHECKIN_HISTORY);

  return (
    <ImageBackground
      source={require("@/assets/BACKGROUND.jpg")} // <- path background di sini
      style={styles.safe}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
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
    </ImageBackground>
  );
}
