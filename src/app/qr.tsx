import { Stack } from "expo-router";
import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { styles } from "../styles/qr_styles";

const QR_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/330px-QR_code_for_mobile_English_Wikipedia.svg.png";

export default function QrScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: "QR Member" }} />
      <View style={styles.page}>
        <Text style={styles.title}>Tunjukkan QR ini di pintu gym</Text>
        <Image
          source={{ uri: QR_URL }}
          style={styles.qrImage}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}