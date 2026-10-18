/**
 * PressableScale.tsx
 * ------------------------------------------------------------------
 * Tombol dengan efek membal (spring) + redup saat ditekan,
 * dan membesar sedikit saat di-hover (web / mouse).
 * Dipakai sebagai pengganti Pressable biasa supaya semua tombol
 * terasa seragam.
 */
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

const APressable = Animated.createAnimatedComponent(Pressable);

interface PressableScaleProps extends Omit<
  PressableProps,
  "style" | "children"
> {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number; // skala saat ditekan (default 0.96)
  children: React.ReactNode;
}

export const PressableScale: React.FC<PressableScaleProps> = ({
  style,
  scaleTo = 0.96,
  children,
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  ...rest
}) => {
  // Dua nilai animasi: ukuran dan transparansi
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Menganimasikan ukuran ke `s` dan transparansi ke `o` sekaligus
  const animateTo = (s: number, o: number) =>
    Animated.parallel([
      Animated.spring(scale, {
        toValue: s,
        speed: 40,
        bounciness: 6,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: o,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

  return (
    <APressable
      {...rest}
      onPressIn={(e) => {
        animateTo(scaleTo, 0.85); // mengecil + redup
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        animateTo(1, 1); // kembali normal
        onPressOut?.(e);
      }}
      onHoverIn={(e) => {
        animateTo(1.03, 1); // sedikit membesar (mouse)
        onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        animateTo(1, 1);
        onHoverOut?.(e);
      }}
      style={[style, { transform: [{ scale }], opacity }]}
    >
      {children}
    </APressable>
  );
};
