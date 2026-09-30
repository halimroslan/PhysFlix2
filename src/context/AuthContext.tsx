"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

export const SUPERADMIN_EMAILS = [
  "ahalimroslan@gmail.com",
  "abdulhalimroslan@gmail.com",
  "g-41192875@moe-dl.edu.my",
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
  // 6-Month Free Trial States & Handlers for Form 5
  isTrialActive: boolean;
  hasTrialStarted: boolean;
  isTrialExpired: boolean;
  trialStartedAt: Date | null;
  trialExpiresAt: Date | null;
  trialDaysLeft: number | null;
  hasForm5Access: boolean;
  startT5FreeTrial: () => Promise<{ success: boolean; expiresAt: Date; isNew: boolean }>;
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

  // Free Trial State
  const [trialStartedAt, setTrialStartedAt] = useState<Date | null>(null);
  const [trialExpiresAt, setTrialExpiresAt] = useState<Date | null>(null);
  const [isTrialActive, setIsTrialActive] = useState<boolean>(false);

  const isSuperAdmin = !!user?.email && SUPERADMIN_EMAILS.includes(user.email.toLowerCase().trim());
  const isPremium = isSuperAdmin || isPremiumUnlocked;

  const hasTrialStarted = !!trialStartedAt;
  const isTrialExpired = hasTrialStarted && !isTrialActive;
  const trialDaysLeft = trialExpiresAt
    ? Math.max(0, Math.ceil((trialExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  // Form 5 Access: SuperAdmin, Paid Premium, OR Active 6-Month Free Trial
  const hasForm5Access = isSuperAdmin || isPremium || isTrialActive;

  // Check premium status on mount and when user changes (enforces 1-year auto-expiry)
  useEffect(() => {
    const checkPremium = async () => {
      try {
        const localUnlocked = typeof window !== 'undefined' ? localStorage.getItem("physflix_user_is_premium") : null;
        const localExpiresAt = typeof window !== 'undefined' ? localStorage.getItem("physflix_premium_expires_at") : null;

        // 1. Check local storage cache with expiration validation
        if (localUnlocked === "true") {
          if (localExpiresAt) {
            const expTime = new Date(localExpiresAt).getTime();
            if (!isNaN(expTime) && expTime <= Date.now()) {
              // Expired! Lock locally and clean up cache
              localStorage.removeItem("physflix_user_is_premium");
              localStorage.removeItem("physflix_premium_expires_at");
              setIsPremiumUnlocked(false);
            } else {
              // Still valid within 1-year window
              setIsPremiumUnlocked(true);
              return;
            }
          }
        }

        // 2. Authoritative check with Supabase database
        if (isSupabaseConfigured && user?.id) {
          const { data } = await supabase
            .from("profiles")
            .select("is_premium, premium_expires_at")
            .eq("id", user.id)
            .single();

          if (data?.is_premium) {
            const expiryTime = data.premium_expires_at ? new Date(data.premium_expires_at).getTime() : NaN;
            const isExpired = !isNaN(expiryTime) && expiryTime <= Date.now();

            if (isExpired) {
              // 1 year has elapsed! Auto-lock account and update Supabase
              setIsPremiumUnlocked(false);
              if (typeof window !== 'undefined') {
                localStorage.removeItem("physflix_user_is_premium");
                localStorage.removeItem("physflix_premium_expires_at");
              }
              try {
                await supabase
                  .from("profiles")
                  .update({ is_premium: false })
                  .eq("id", user.id);
              } catch (dbSyncErr) {
                console.warn("Could not mark expired premium in Supabase:", dbSyncErr);
              }
            } else {
              // Active valid 1-year subscription
              setIsPremiumUnlocked(true);
              if (typeof window !== 'undefined') {
                localStorage.setItem("physflix_user_is_premium", "true");
                if (data.premium_expires_at) {
                  localStorage.setItem("physflix_premium_expires_at", data.premium_expires_at);
                }
              }
            }
          } else {
            // Not premium in Supabase database
            setIsPremiumUnlocked(false);
            if (typeof window !== 'undefined') {
              localStorage.removeItem("physflix_user_is_premium");
              localStorage.removeItem("physflix_premium_expires_at");
            }
          }
        }
      } catch (e) {
        // silent fallback
      }
    };
    checkPremium();
  }, [user]);

  // Check 6-Month Free Trial status on mount and when user changes
  useEffect(() => {
    const checkTrial = async () => {
      try {
        let storedStarted = typeof window !== 'undefined'
          ? (user?.id ? localStorage.getItem(`physflix_t5_trial_${user.id}_started_at`) : null) || localStorage.getItem("physflix_t5_trial_started_at")
          : null;
        let storedExpires = typeof window !== 'undefined'
          ? (user?.id ? localStorage.getItem(`physflix_t5_trial_${user.id}_expires_at`) : null) || localStorage.getItem("physflix_t5_trial_expires_at")
          : null;

        // Sync from Supabase if not found locally
        if ((!storedStarted || !storedExpires) && isSupabaseConfigured && user?.id) {
          // Attempt 1: Check user_activity.video_stats.t5_free_trial (JSONB, schema-safe)
          try {
            const { data: actData } = await supabase
              .from("user_activity")
              .select("video_stats")
              .eq("user_id", user.id)
              .single();

            const t5Trial = actData?.video_stats?.t5_free_trial;
            if (t5Trial?.started_at && t5Trial?.expires_at) {
              storedStarted = t5Trial.started_at;
              storedExpires = t5Trial.expires_at;
            }
          } catch (e) {}

          // Attempt 2: Check profiles table if column exists
          if (!storedStarted || !storedExpires) {
            try {
              const { data: profData } = await supabase
                .from("profiles")
                .select("trial_started_at, trial_expires_at")
                .eq("id", user.id)
                .single();

              if (profData?.trial_started_at && profData?.trial_expires_at) {
                storedStarted = profData.trial_started_at;
                storedExpires = profData.trial_expires_at;
              }
            } catch (e) {}
          }

          if (storedStarted && storedExpires && typeof window !== 'undefined') {
            if (user?.id) {
              localStorage.setItem(`physflix_t5_trial_${user.id}_started_at`, storedStarted);
              localStorage.setItem(`physflix_t5_trial_${user.id}_expires_at`, storedExpires);
            }
            localStorage.setItem("physflix_t5_trial_started_at", storedStarted);
            localStorage.setItem("physflix_t5_trial_expires_at", storedExpires);
          }
        }

        if (storedStarted && storedExpires) {
          const startDate = new Date(storedStarted);
          const expiryDate = new Date(storedExpires);
          setTrialStartedAt(startDate);
          setTrialExpiresAt(expiryDate);

          if (expiryDate.getTime() > Date.now()) {
            setIsTrialActive(true);
          } else {
            setIsTrialActive(false);
          }
        } else {
          setTrialStartedAt(null);
          setTrialExpiresAt(null);
          setIsTrialActive(false);
        }
      } catch (e) {
        // silent fallback
      }
    };

    checkTrial();
  }, [user]);

  // Start 6-Month Free Trial for Form 5 on first video play
  const startT5FreeTrial = async (): Promise<{ success: boolean; expiresAt: Date; isNew: boolean }> => {
    // If already superadmin or paid premium
    if (isSuperAdmin || isPremiumUnlocked) {
      const farFuture = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      return { success: true, expiresAt: farFuture, isNew: false };
    }

    // If trial is already active, return existing expiry
    if (isTrialActive && trialExpiresAt) {
      return { success: true, expiresAt: trialExpiresAt, isNew: false };
    }

    const now = new Date();
    // 6 calendar months
    const sixMonthsLater = new Date(now);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const startedIso = now.toISOString();
    const expiresIso = sixMonthsLater.toISOString();

    setTrialStartedAt(now);
    setTrialExpiresAt(sixMonthsLater);
    setIsTrialActive(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("physflix_t5_trial_started_at", startedIso);
      localStorage.setItem("physflix_t5_trial_expires_at", expiresIso);
      if (user?.id) {
        localStorage.setItem(`physflix_t5_trial_${user.id}_started_at`, startedIso);
        localStorage.setItem(`physflix_t5_trial_${user.id}_expires_at`, expiresIso);
      }
    }

    // Sync to Supabase
    if (isSupabaseConfigured && user?.id) {
      // 1. Sync to user_activity.video_stats (JSONB, 100% schema-tolerant)
      try {
        const { data: actData } = await supabase
          .from("user_activity")
          .select("video_stats")
          .eq("user_id", user.id)
          .single();

        const currentStats = actData?.video_stats || {};
        await supabase
          .from("user_activity")
          .upsert({
            user_id: user.id,
            video_stats: {
              ...currentStats,
              t5_free_trial: {
                started_at: startedIso,
                expires_at: expiresIso,
                is_active: true,
              },
            },
            updated_at: new Date().toISOString(),
          }, { onConflict: "user_id" });
      } catch (e) {
        console.warn("Could not sync trial to user_activity:", e);
      }

      // 2. Also attempt updating profiles (if columns trial_started_at/trial_expires_at exist)
      try {
        await supabase
          .from("profiles")
          .update({
            trial_started_at: startedIso,
            trial_expires_at: expiresIso,
          })
          .eq("id", user.id);
      } catch (profErr) {
        // Safe fallback if column not yet migrated
      }
    }

    return { success: true, expiresAt: sixMonthsLater, isNew: true };
  };

  const unlockPremium = async () => {
    setIsPremiumUnlocked(true);
    const now = new Date();
    const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const expiresAtIso = oneYearLater.toISOString();

    if (typeof window !== 'undefined') {
      localStorage.setItem("physflix_user_is_premium", "true");
      localStorage.setItem("physflix_premium_expires_at", expiresAtIso);
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
            premium_activated_at: now.toISOString(),
            premium_expires_at: expiresAtIso,
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
            try {
              await supabase.from("profiles").upsert({
                id: session.user.id,
                email: session.user.email,
                display_name: appUser?.displayName,
                photo_url: appUser?.photoURL,
                last_login: new Date().toISOString(),
              });
            } catch (e) {}
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setIsPremiumUnlocked(false);
          setIsTrialActive(false);
          setTrialStartedAt(null);
          setTrialExpiresAt(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      if (isSupabaseConfigured) {
        const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
            queryParams: {
              access_type: "offline",
              prompt: "select_account",
            },
          },
        });
        if (error) throw error;
      } else {
        // Fallback Mock Login
        const mockUser: AppUser = {
          uid: "demo-user-123",
          id: "demo-user-123",
          email: "demo@physflix.edu.my",
          displayName: "Pelajar Demo",
          photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        };
        setUser(mockUser);
        localStorage.setItem("physflix_local_user", JSON.stringify(mockUser));
      }
    } catch (error: any) {
      console.error("Sign-In Error:", error);
      setAuthError(error.message || "Gagal log masuk dengan Google.");
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      setAuthError(null);
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        if (error) throw error;
        if (data.user) {
          const appUser = mapSupabaseUser(data.user);
          setUser(appUser);
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: data.user.email,
            display_name: appUser?.displayName,
            photo_url: appUser?.photoURL,
            last_login: new Date().toISOString(),
          });
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
    try {
      setAuthError(null);
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
        });
        if (error) throw error;
        if (data.user) {
          const appUser = mapSupabaseUser(data.user);
          setUser(appUser);
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: data.user.email,
            display_name: appUser?.displayName,
            photo_url: appUser?.photoURL,
            last_login: new Date().toISOString(),
          });
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
    setIsTrialActive(false);
    setTrialStartedAt(null);
    setTrialExpiresAt(null);
    localStorage.removeItem("physflix_local_user");
    localStorage.removeItem("physflix_user_is_premium");
    localStorage.removeItem("physflix_premium_expires_at");
    localStorage.removeItem("physflix_t5_trial_started_at");
    localStorage.removeItem("physflix_t5_trial_expires_at");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSuperAdmin,
        isPremium,
        unlockPremium,
        isTrialActive,
        hasTrialStarted,
        isTrialExpired,
        trialStartedAt,
        trialExpiresAt,
        trialDaysLeft,
        hasForm5Access,
        startT5FreeTrial,
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
