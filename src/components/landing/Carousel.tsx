/**
 * Carousel.tsx
 * ------------------------------------------------------------------
 * Daftar yang bisa digeser ke samping (satu kartu per halaman)
 * dengan indikator garis di atasnya. Dipakai untuk Fasilitas & Kelas.
 *
 * `<T>` artinya komponen ini umum: isinya bisa data apa saja
 * (fasilitas, kelas, dst). Cara menggambar tiap kartu dikirim
 * lewat `renderItem`.
 */
import React, { useRef, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  View,
} from "react-native";
import { useThemedStyles } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";

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
  const s = useThemedStyles(createStyles);

  // useState: lebar area carousel (diukur saat tampil) dan halaman aktif
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<T>>(null);

  // Dipanggil saat ukuran area diketahui -> simpan lebarnya
  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  // Dipanggil saat digeser -> hitung sekarang di halaman ke berapa
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!width) return;
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  // Loncat ke halaman tertentu (saat indikator ditekan)
  const goTo = (i: number) => {
    setIndex(i);
    listRef.current?.scrollToOffset({ offset: i * width, animated: true });
  };

  return (
    <View>
      {/* Indikator: satu garis per halaman, yang aktif lebih gelap */}
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
        {/* FlatList baru digambar setelah lebar diketahui */}
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
