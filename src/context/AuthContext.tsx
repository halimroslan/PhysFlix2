"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

export const SUPERADMIN_EMAILS = [
  "ahalimroslan@gmail.com",
  "abdulhalimroslan@gmail.com",
];

export function isDeveloperAccount(email?: string | null): boolean {
  if (!email) return false;
  return SUPERADMIN_EMAILS.includes(email.toLowerCase().trim());
}

export interface AppUser {
  uid: string;
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isSuperAdmin: boolean;
  isPremium: boolean;
  unlockPremium: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState<boolean>(false);

  const isSuperAdmin = !!user?.email && SUPERADMIN_EMAILS.includes(user.email.toLowerCase().trim());
  const isPremium = isSuperAdmin || isPremiumUnlocked;

  // Check premium status on mount and when user changes
  useEffect(() => {
    const checkPremium = async () => {
      try {
        const localUnlocked = typeof window !== 'undefined' ? localStorage.getItem("physflix_user_is_premium") : null;
        if (localUnlocked === "true") {
          setIsPremiumUnlocked(true);
          return;
        }
        if (isSupabaseConfigured && user?.id) {
          const { data } = await supabase
            .from("profiles")
            .select("is_premium")
            .eq("id", user.id)
            .single();
          if (data?.is_premium) {
            setIsPremiumUnlocked(true);
            localStorage.setItem("physflix_user_is_premium", "true");
          }
        }
      } catch (e) {
        // silent fallback
      }
    };
    checkPremium();
  }, [user]);

  const unlockPremium = async () => {
    setIsPremiumUnlocked(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem("physflix_user_is_premium", "true");
      if (user?.email) {
        localStorage.setItem("physflix_premium_email", user.email);
      }
    }
    if (isSupabaseConfigured && user?.id) {
      try {
        await supabase
          .from("profiles")
          .update({
            is_premium: true,
            premium_activated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      } catch (e) {
        console.warn("Could not sync premium to Supabase:", e);
      }
    }
  };

  // Helper to map Supabase User to AppUser
  const mapSupabaseUser = (sbUser: SupabaseUser | null): AppUser | null => {
    if (!sbUser) return null;
    return {
      uid: sbUser.id,
      id: sbUser.id,
      email: sbUser.email,
      displayName:
        sbUser.user_metadata?.full_name ||
        sbUser.user_metadata?.name ||
        sbUser.email?.split("@")[0] ||
        "Pelajar Fizik",
      photoURL: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture || "",
    };
  };

  useEffect(() => {
    // Check initial session
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const appUser = mapSupabaseUser(session.user);
            setUser(appUser);
            // Sync user profile to public.profiles table
            await supabase.from("profiles").upsert({
              id: session.user.id,
              email: session.user.email,
              display_name: appUser?.displayName,
              photo_url: appUser?.photoURL,
              last_login: new Date().toISOString(),
            });
          } else {
            // Check localStorage fallback
            const localUserStr = localStorage.getItem("physflix_local_user");
            if (localUserStr) {
              try { setUser(JSON.parse(localUserStr)); } catch (e) {}
            }
          }
        } else {
          // LocalStorage Demo Mode
          const localUserStr = localStorage.getItem("physflix_local_user");
          if (localUserStr) {
            try { setUser(JSON.parse(localUserStr)); } catch (e) {}
          }
        }
      } catch (err) {
        console.warn("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen to Supabase auth state changes
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const appUser = mapSupabaseUser(session.user);
          setUser(appUser);
          if (event === "SIGNED_IN") {
            await supabase.from("profiles").upsert({
              id: session.user.id,
              email: session.user.email,
              display_name: appUser?.displayName,
              photo_url: appUser?.photoURL,
              last_login: new Date().toISOString(),
            });
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          localStorage.removeItem("physflix_local_user");
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          },
        });
        if (error) throw error;
      } else {
        // Fallback for development without Supabase keys
        const mockUser: AppUser = {
          uid: "demo-google-user",
          id: "demo-google-user",
          email: "pelajar@moe-dl.edu.my",
          displayName: "Pelajar SPM Fizik",
          photoURL: "",
        };
        setUser(mockUser);
        localStorage.setItem("physflix_local_user", JSON.stringify(mockUser));
      }
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      setAuthError(error.message || "Gagal log masuk dengan Google.");
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        if (error) throw error;
        if (data.user) {
          setUser(mapSupabaseUser(data.user));
        }
      } else {
        const mockUser: AppUser = {
          uid: `user-${Date.now()}`,
          id: `user-${Date.now()}`,
          email,
          displayName: email.split("@")[0],
          photoURL: "",
        };
        setUser(mockUser);
        localStorage.setItem("physflix_local_user", JSON.stringify(mockUser));
      }
    } catch (error: any) {
      console.error("Email Login Error:", error);
      setAuthError(error.message || "Gagal log masuk dengan e-mel.");
    }
  };

  const signupWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: {
              display_name: email.split("@")[0],
            },
          },
        });
        if (error) throw error;
        if (data.user) {
          setUser(mapSupabaseUser(data.user));
        }
      } else {
        const mockUser: AppUser = {
          uid: `user-${Date.now()}`,
          id: `user-${Date.now()}`,
          email,
          displayName: email.split("@")[0],
          photoURL: "",
        };
        setUser(mockUser);
        localStorage.setItem("physflix_local_user", JSON.stringify(mockUser));
      }
    } catch (error: any) {
      console.error("Email Signup Error:", error);
      setAuthError(error.message || "Gagal mendaftar e-mel baru.");
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
    setUser(null);
    setIsPremiumUnlocked(false);
    localStorage.removeItem("physflix_local_user");
    localStorage.removeItem("physflix_user_is_premium");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSuperAdmin,
        isPremium,
        unlockPremium,
        signInWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
