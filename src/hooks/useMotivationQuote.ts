/**
 * useMotivationQuote.ts
 * ------------------------------------------------------------------
 * Hook kustom yang mengambil dan menyimpan kutipan motivasi
 * dari quoteService.ts, lalu menyajikannya ke komponen React.
 *
 * Hook ini menggabungkan:
 *   - useState  : menyimpan data kutipan + status loading/error
 *   - useEffect : memicu fetch saat layar pertama kali tampil
 *   - fetchMotivationQuote() : custom async function dari quoteService
 */
import { useEffect, useState } from "react";
import {
  fetchMotivationQuote,
  MotivationQuote,
} from "@/services/quoteService";

/** Semua nilai yang dikembalikan hook ini ke komponen. */
export interface UseMotivationQuoteResult {
  quote: MotivationQuote | null; // null = belum selesai dimuat
  loading: boolean; // true = sedang fetch
  error: string | null; // pesan error jika ada (jarang, karena ada fallback)
  refresh: () => void; // panggil untuk mengambil kutipan baru
}

/**
 * Hook: ambil kutipan motivasi gym secara async.
 *
 * Contoh pakai:
 *   const { quote, loading, refresh } = useMotivationQuote();
 */
export function useMotivationQuote(): UseMotivationQuoteResult {
  const [quote, setQuote] = useState<MotivationQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // "trigger" berubah setiap refresh() dipanggil → useEffect jalan lagi
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // Reset state sebelum fetch baru dimulai
    setLoading(true);
    setError(null);

    // Panggil custom async function dari quoteService
    // Gunakan .then() agar konsisten dengan gaya Kriteria 3
    fetchMotivationQuote()
      .then((result: MotivationQuote) => {
        setQuote(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        // Jarang terjadi (quoteService sudah punya fallback internal),
        // tapi tetap ditangani untuk keamanan
        const msg = err instanceof Error ? err.message : "Gagal memuat kutipan";
        setError(msg);
        setLoading(false);
      });
  }, [trigger]); // jalankan ulang setiap trigger berubah

  /** Fungsi refresh: panggil untuk mendapat kutipan baru dari API. */
  function refresh() {
    setTrigger((prev) => prev + 1);
  }

  return { quote, loading, error, refresh };
}
