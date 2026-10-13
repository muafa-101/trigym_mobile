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
  scaleTo?: number; // skala saat ditekan
  children: React.ReactNode;
}

/**
 * Pressable dengan efek membal (spring) + redup saat ditekan,
 * dan membesar sedikit saat di-hover (web / mouse).
 */
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
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

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
        animateTo(scaleTo, 0.85);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        animateTo(1, 1);
        onPressOut?.(e);
      }}
      onHoverIn={(e) => {
        animateTo(1.03, 1);
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
