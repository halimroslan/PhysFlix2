"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.warn("Popup blocked or failed, trying redirect fallback:", error);
      if (error.code === "auth/popup-blocked" || error.code === "auth/cancelled-popup-request") {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectErr: any) {
          console.error("Redirect Auth Error:", redirectErr);
          setAuthError(redirectErr.message || "Ralat pengesahan akaun Google.");
        }
      } else {
        setAuthError(error.message || "Pengesahan Google dibatalkan atau terhalang.");
      }
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error("Email Login Error:", error);
      setAuthError(error.message || "Gagal log masuk dengan e-mel.");
    }
  };

  const signupWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error("Email Signup Error:", error);
      setAuthError(error.message || "Gagal mendaftar e-mel baru.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, loginWithEmail, signupWithEmail, logout, authError }}>
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
