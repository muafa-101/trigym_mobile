/**
 * quoteService.ts
 * ------------------------------------------------------------------
 * Layanan pengambilan kutipan motivasi gym dari endpoint publik.
 *
 * ENDPOINT : https://dummyjson.com/quotes/random
 *   - Gratis, tanpa API key, SSL valid, sangat stabil & cepat.
 *   - API lama (quotable.io) dihentikan karena sertifikat SSL-nya
 *     kadaluarsa sehingga fetch selalu gagal dari device mobile.
 *
 * KRITERIA MODUL 3 yang diterapkan di file ini:
 *
 *  1. FETCH EXTERNAL ENDPOINT + INTERFACE
 *     - Mengambil data dari https://dummyjson.com/quotes/random
 *     - Respons server "dicetak" ke Interface `QuoteResponse`
 *     - Objek bersih `MotivationQuote` yang dipakai layar juga Interface
 *
 *  2. CUSTOM ASYNC + PRE-BUILT ASYNC
 *     - Pre-built async : fungsi bawaan `fetch()` (dari JavaScript runtime)
 *     - Custom async    : `fetchMotivationQuote()` yang kita tulis sendiri
 *       menggunakan kata kunci `async/await`
 *
 *  3. .then() / .resolve() / .reject()
 *     - `fetchWithTimeout()` membungkus fetch di dalam `new Promise()`
 *       dan memanggil resolve() / reject() secara eksplisit
 *     - `fetchMotivationQuote()` berantai dengan .then() untuk
 *       memetakan data mentah → Interface MotivationQuote
 */

/* ------------------------------------------------------------------ */
/* 1. INTERFACE – bentuk data yang keluar-masuk                        */
/* ------------------------------------------------------------------ */

/**
 * Bentuk MENTAH respons dari dummyjson.com/quotes/random.
 * Field ini sesuai persis dengan JSON yang dikembalikan server.
 *
 * Contoh JSON dari server:
 *   { "id": 42, "quote": "...", "author": "..." }
 */
export interface QuoteResponse {
  id: number;    // nomor kutipan di database
  quote: string; // teks kutipan
  author: string; // nama tokoh
}

/**
 * Bentuk BERSIH yang dipakai oleh layar aplikasi.
 * Hanya field yang kita perlukan, sudah diberi nama yang jelas.
 */
export interface MotivationQuote {
  id: string;
  text: string;                   // teks kutipan
  author: string;                 // nama tokoh
  source: "api" | "fallback";    // apakah dari internet atau cadangan lokal
}

/* ------------------------------------------------------------------ */
/* 2. CUSTOM ASYNC – fungsi yang kita tulis sendiri                    */
/* ------------------------------------------------------------------ */

/** URL endpoint publik kutipan (gratis, tanpa API key, SSL valid). */
const QUOTE_API_URL = "https://dummyjson.com/quotes/random";

/**
 * Kutipan CADANGAN – dipakai jika fetch gagal (offline / timeout).
 * Sengaja dibuat lokal agar demo tetap berjalan tanpa internet.
 */
const FALLBACK_QUOTES: MotivationQuote[] = [
  {
    id: "fb-1",
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    source: "fallback",
  },
  {
    id: "fb-2",
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
    source: "fallback",
  },
  {
    id: "fb-3",
    text: "Success starts with self-discipline.",
    author: "Unknown",
    source: "fallback",
  },
  {
    id: "fb-4",
    text: "Every champion was once a contender that refused to give up.",
    author: "Rocky Balboa",
    source: "fallback",
  },
];

/**
 * Mengembalikan kutipan cadangan secara acak (saat offline).
 * @internal
 */
function getRandomFallback(): MotivationQuote {
  const idx = Math.floor(Math.random() * FALLBACK_QUOTES.length);
  return FALLBACK_QUOTES[idx];
}

/* ------------------------------------------------------------------ */
/* 3. .resolve() dan .reject() – Promise eksplisit                     */
/* ------------------------------------------------------------------ */

/**
 * Membungkus `fetch()` dengan batas waktu (timeout).
 *
 * Memakai `new Promise()` agar bisa memanggil resolve() dan reject()
 * secara EKSPLISIT:
 *   - resolve(response) → fetch selesai dalam waktu
 *   - reject(error)     → waktu habis sebelum server membalas
 *
 * @param url - Alamat endpoint yang difetch
 * @param ms  - Batas waktu dalam milidetik (default 6000 ms)
 */
function fetchWithTimeout(url: string, ms = 6000): Promise<Response> {
  // Promise eksplisit: resolve & reject dipanggil secara manual
  return new Promise<Response>((resolve, reject) => {
    // Timer: jika fetch terlalu lama → reject dengan error timeout
    const timer = setTimeout(() => {
      reject(new Error(`Request timeout setelah ${ms} ms`));
    }, ms);

    // Pre-built async: `fetch()` adalah fungsi async bawaan JavaScript
    fetch(url)
      .then((response) => {
        clearTimeout(timer); // batalkan timer, fetch berhasil
        resolve(response);   // teruskan Response ke pemanggil
      })
      .catch((err) => {
        clearTimeout(timer); // batalkan timer, ada error jaringan
        reject(err);         // teruskan error ke pemanggil
      });
  });
}

/* ------------------------------------------------------------------ */
/* Fungsi utama – custom async dengan await                            */
/* ------------------------------------------------------------------ */

/**
 * Mengambil satu kutipan motivasi dari internet.
 *
 * Alur:
 *   fetchWithTimeout()  →  .then() parsing JSON  →  .then() mapping ke Interface
 *   Jika gagal          →  kembalikan kutipan cadangan (tidak melempar error)
 *
 * @returns Promise<MotivationQuote> – kutipan siap tampil
 */
export async function fetchMotivationQuote(): Promise<MotivationQuote> {
  try {
    // Panggil pre-built fetch lewat pembungkus timeout kita,
    // lalu berantai dengan .then() untuk parsing & mapping Interface
    const quote = await fetchWithTimeout(QUOTE_API_URL)
      // .then() pertama: ubah Response menjadi objek JSON (QuoteResponse)
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        // .json() adalah pre-built async method, mengembalikan Promise
        return res.json() as Promise<QuoteResponse>;
      })
      // .then() kedua: petakan QuoteResponse → MotivationQuote (Interface bersih)
      .then((data: QuoteResponse): MotivationQuote => ({
        id: String(data.id),
        text: data.quote,
        author: data.author,
        source: "api",
      }));

    return quote;
  } catch {
    // Jika fetch gagal (offline / timeout / HTTP error) → pakai cadangan lokal
    return getRandomFallback();
  }
}

/* ------------------------------------------------------------------ */
/* Fungsi tambahan – contoh .then() berantai tanpa async/await         */
/* ------------------------------------------------------------------ */

/**
 * Versi `.then()` murni (tanpa async/await) dari fetchMotivationQuote.
 * Disediakan agar saat demo bisa ditunjukkan perbedaan gaya penulisan.
 *
 * Ini CUSTOM ASYNC FUNCTION yang mengembalikan Promise<MotivationQuote>.
 */
export function fetchMotivationQuoteThen(): Promise<MotivationQuote> {
  return fetchWithTimeout(QUOTE_API_URL)
    .then((res: Response) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<QuoteResponse>;
    })
    .then(
      (data: QuoteResponse): MotivationQuote => ({
        id: String(data.id),
        text: data.quote,
        author: data.author,
        source: "api",
      }),
    )
    .catch((): MotivationQuote => getRandomFallback());
}
