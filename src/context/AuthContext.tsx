// src/context/AuthContext.tsx
// -------------------------------------------------------------------
// Global authentication context.
// Menggunakan Supabase Auth: email/password signIn, signUp, signOut.
// Juga menyediakan data `user` (Supabase Auth User) dan `profile`
// (data tambahan member dari tabel `profiles` di Supabase).
//
// Tabel `profiles` di Supabase harus punya kolom:
//   id         uuid  PRIMARY KEY (sama dengan auth.users.id)
//   name       text
//   code       text   (nomor member)
//   valid_until date  (masa berlaku membership, format "YYYY-MM-DD")
//   role        text  ("member" | "admin") -- opsional, default "member"
//
// Kalau tabel belum ada, app tetap jalan dengan fallback data dari
// Supabase Auth user metadata.
// -------------------------------------------------------------------

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/services/supabaseClient";
import type { Session, User, AuthError } from "@supabase/supabase-js";

/** Data profil tambahan dari tabel `profiles`. */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  code: string;         // nomor member
  validUntil: string;   // "YYYY-MM-DD"
  role: "member" | "admin";
}

interface AuthContextValue {
  /** Supabase Auth session (null = belum login) */
  session: Session | null;
  /** Supabase Auth user object */
  user: User | null;
  /** Profil member dari tabel profiles (null = belum dimuat / belum login) */
  profile: UserProfile | null;
  /** True selama auth state pertama kali dimuat */
  loading: boolean;
  /** True selama profil sedang di-fetch dari Supabase */
  profileLoading: boolean;
  /** Login dengan email & password */
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  /** Daftar akun baru: buat auth user + baris di tabel profiles */
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: AuthError | null; needsConfirmation: boolean }>;
  /** Logout */
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Buat kode member acak 8 digit */
function generateMemberCode(): string {
  return String(Math.floor(10000000 + Math.random() * 90000000));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  /* ---- Fetch profil dari tabel profiles ---- */
  const fetchProfile = useCallback(async (userId: string, userEmail: string, userName?: string) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, code, valid_until, role")
        .eq("id", userId)
        .single();

      if (error || !data) {
        // Profil belum ada (misalnya signup baru atau tabel belum dibuat):
        // buat fallback dari data Auth user
        const fallback: UserProfile = {
          id: userId,
          name: userName || userEmail.split("@")[0],
          email: userEmail,
          code: generateMemberCode(),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          role: "member",
        };
        setProfile(fallback);
      } else {
        setProfile({
          id: data.id,
          name: data.name ?? (userName || userEmail.split("@")[0]),
          email: userEmail,
          code: data.code ?? generateMemberCode(),
          validUntil: data.valid_until ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          role: (data.role as "member" | "admin") ?? "member",
        });
      }
    } catch {
      // Network error – tampilkan fallback supaya app tetap bisa dipakai
      setProfile({
        id: userId,
        name: userName || userEmail.split("@")[0],
        email: userEmail,
        code: generateMemberCode(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        role: "member",
      });
    } finally {
      setProfileLoading(false);
    }
  }, []);

  /* ---- Listener auth state ---- */
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          const u = newSession.user;
          await fetchProfile(
            u.id,
            u.email ?? "",
            u.user_metadata?.name as string | undefined
          );
        } else {
          setProfile(null);
        }
      }
    );

    // Cek session awal
    supabase.auth.getSession().then(async ({ data: { session: current } }) => {
      setSession(current);
      setUser(current?.user ?? null);

      if (current?.user) {
        const u = current.user;
        await fetchProfile(
          u.id,
          u.email ?? "",
          u.user_metadata?.name as string | undefined
        );
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  /* ---- signIn ---- */
  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error;
  }, []);

  /* ---- signUp ---- */
  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      const memberCode = generateMemberCode();
      const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]; // 30 hari trial

      // 1. Buat akun di Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // disimpan di user_metadata
        },
      });

      if (error) return { error, needsConfirmation: false };

      const userId = data.user?.id;

      // 2. Buat baris profil di tabel profiles
      if (userId) {
        await supabase.from("profiles").upsert({
          id: userId,
          name,
          code: memberCode,
          valid_until: validUntil,
          role: "member",
        });
      }

      // Supabase kadang memerlukan konfirmasi email.
      // Kalau session langsung ada = auto-confirm aktif, tidak perlu konfirmasi.
      const needsConfirmation = !data.session;
      return { error: null, needsConfirmation };
    },
    []
  );

  /* ---- signOut ---- */
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  }, []);

  const value: AuthContextValue = {
    session,
    user,
    profile,
    loading,
    profileLoading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/** Hook untuk mengakses auth context. Harus di dalam AuthProvider. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
