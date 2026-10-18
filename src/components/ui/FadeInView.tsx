/**
 * FadeInView.tsx
 * ------------------------------------------------------------------
 * Pembungkus yang memunculkan isinya pelan-pelan dari bawah
 * (fade + geser) saat layar dibuka. `delay` mengatur kapan mulai,
 * jadi kartu bisa muncul berurutan.
 */
import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

interface FadeInViewProps {
  delay?: number; // jeda sebelum animasi mulai (ms)
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  delay = 0,
  style,
  children,
}) => {
  // Nilai animasi 0 -> 1. useRef supaya nilainya tidak ter-reset tiap render.
  const anim = useRef(new Animated.Value(0)).current;

  // useEffect: jalankan animasi sekali setelah komponen tampil
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 450,
      delay,
      useNativeDriver: true,
    }).start();
  }, [anim, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: anim,
          transform: [
            {
              // bergeser dari 16px di bawah ke posisi asli
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
