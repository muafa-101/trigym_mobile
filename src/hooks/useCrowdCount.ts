/**
 * useCrowdCount.ts
 * ------------------------------------------------------------------
 * Hook (fungsi khusus React) yang mengembalikan jumlah orang LAIN yang
 * sedang di gym (di luar yang tercatat check-in di aplikasi ini).
 *
 * SAAT INI (PLACEHOLDER): angkanya hanya disimulasikan naik-turun acak
 * tiap beberapa detik.
 * NANTI: ganti isi setInterval dengan fetch ke server (atau pakai
 * WebSocket). Layar yang memakai hook ini tidak perlu diubah.
 *
 * Hook ini jarang dipakai langsung. Pakai `useGymCrowd()` yang sudah
 * menggabungkannya dengan data check-in sungguhan.
 */
import { useEffect, useState } from "react";

const MIN_COUNT = 0;
const MAX_COUNT = 24;

export function useCrowdCount(initial: number = 7, intervalMs: number = 5000) {
  // useState: menyimpan angka yang ditampilkan
  const [count, setCount] = useState(initial);

  // useEffect: jalan setelah layar tampil, lalu memperbarui angka berkala
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 sampai +2
        return Math.min(MAX_COUNT, Math.max(MIN_COUNT, prev + change));
      });
    }, intervalMs);

    // Fungsi pembersih: dijalankan saat layar ditutup,
    // supaya timer tidak terus jalan di belakang.
    return () => clearInterval(timerId);
  }, [intervalMs]);

  return count;
}
