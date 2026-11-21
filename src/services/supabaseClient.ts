// src/services/supabaseClient.ts
// -------------------------------------------------------------------
// Supabase client initialization.
// Menggunakan environment variables EXPO_PUBLIC_* dari file .env.
// -------------------------------------------------------------------

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://wuzgiqhxdrdyjtrjxort.supabase.co";

const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_cFiib500_ejbN5eNtbcR-Q_kKveJyvD";

// Create a single Supabase client instance shared across the app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
