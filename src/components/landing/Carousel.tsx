import { styles as s } from "@/styles/styles";
import React, { useRef, useState } from "react";
import {
    FlatList,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    View,
} from "react-native";

interface CarouselProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactElement;
}

export function Carousel<T>({
  data,
  keyExtractor,
  renderItem,
}: CarouselProps<T>) {
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<T>>(null);

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!width) return;
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const goTo = (i: number) => {
    setIndex(i);
    listRef.current?.scrollToOffset({ offset: i * width, animated: true });
  };

  return (
    <View>
      <View style={s.indicatorRow}>
        {data.map((item, i) => (
          <Pressable
            key={keyExtractor(item)}
            onPress={() => goTo(i)}
            hitSlop={8}
            style={[s.indicator, i === index && s.indicatorActive]}
          />
        ))}
      </View>
      <View onLayout={onLayout}>
        {width > 0 && (
          <FlatList
            ref={listRef}
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            onScroll={onScroll}
            scrollEventThrottle={16}
            getItemLayout={(_, i) => ({
              length: width,
              offset: width * i,
              index: i,
            })}
            renderItem={({ item }) => (
              <View style={{ width }}>{renderItem(item)}</View>
            )}
          />
        )}
      </View>
    </View>
  );
}
