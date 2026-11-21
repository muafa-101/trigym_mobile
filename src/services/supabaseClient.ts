// src/services/supabaseClient.ts
// -------------------------------------------------------------------
// Supabase client initialization.
// Replace the placeholder values in the .env file (SUPABASE_URL & SUPABASE_ANON_KEY).
// This file only contains the logic; UI components can import `supabase`.
// -------------------------------------------------------------------

// Import environment variables. Ensure `react-native-dotenv` is configured
// (see .env.example). If you prefer Expo Constants, replace the import.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

import { createClient } from "@supabase/supabase-js";

// Create a single Supabase client instance shared across the app.
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);
