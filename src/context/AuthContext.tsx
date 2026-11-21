// src/context/AuthContext.tsx
// -------------------------------------------------------------------
// Global authentication context for the app.
// Uses Supabase client defined in `src/services/supabaseClient.ts`.
// The actual Supabase URL and anon key are taken from the .env file
// via the `@env` import (see `src/services/supabaseClient.ts`).
// -------------------------------------------------------------------

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/services/supabaseClient";
import type { Session, Provider, AuthError } from "@supabase/supabase-js";

interface AuthContextValue {
  /** Current Supabase session (null when not logged in) */
  session: Session | null;
  /** Indicates if auth state is being restored */
  loading: boolean;
  /** Login with email & password */
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  /** Login with OAuth provider (Google, Github, …) */
  signInWithProvider: (provider: Provider) => Promise<AuthError | null>;
  /** Logout */
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * AuthProvider – wraps the whole app (see `_layout.tsx`).
 * It automatically restores the session from Supabase on mount and
 * exposes helper functions for the UI.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes – this keeps `session` in sync.
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    // Initial check for an existing session.
    supabase.auth.getSession().then(({ data: { session: current } }) => {
      setSession(current);
      setLoading(false);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      // Session will be updated via the listener above.
    }
    return error;
  }, []);

  const signInWithProvider = useCallback(async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    // For mobile we rely on the native redirect flow handled by Supabase.
    return error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const value: AuthContextValue = {
    session,
    loading,
    signIn,
    signInWithProvider,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook to consume the auth context */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
