"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, AlertCircle, Lock, Mail, KeyRound } from "lucide-react";

export const LoginPage: React.FC = () => {
  const { signInWithGoogle, loginWithEmail, signupWithEmail, authError } = useAuth();
  
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Login Error:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      setIsSigningIn(true);
      if (isSignUpMode) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      console.error("Email Auth Error:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const isIdentityToolkitBlocked = authError && (authError.includes("identitytoolkit") || authError.includes("projectconfigservice"));

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative z-20 w-full max-w-md bg-[#0f131f] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center flex flex-col items-center">
        <div className="py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/PHYSFLIX.png"
            alt="PhysicsSPMFlix Logo"
            className="h-28 md:h-32 w-auto object-contain"
          />
        </div>

        <div className="space-y-2 max-w-xs">
          <h1 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-red-500" />
            Pengesahan Akaun
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Sila log masuk menggunakan E-mel atau Akaun Google untuk mengakses platform ini.
          </p>
        </div>

        {authError && (
          <div className="w-full p-4 bg-red-950/80 border border-red-800/80 rounded-2xl flex items-start space-x-3 text-left text-xs text-red-300 space-y-2 flex-col">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span className="font-bold text-red-200">Ralat Pengesahan:</span>
            </div>
            
            <div className="leading-relaxed text-[11px] space-y-2 w-full">
              <p className="font-mono text-[10px] text-amber-300 bg-black/40 p-2 rounded-lg break-all">
                {authError}
              </p>
              {isIdentityToolkitBlocked && (
                <p>Sila pastikan <strong>Google Sign-In / Email Provider</strong> telah di-Enable di dalam projek Firebase ini.</p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="w-full space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              placeholder="Alamat E-mel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#121622]/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition shadow-inner"
            />
          </div>
          <div className="relative">
            <KeyRound className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="password"
              required
              placeholder="Kata Laluan"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#121622]/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all shadow-lg active:scale-95 disabled:opacity-70"
          >
            {isSigningIn ? "Memproses..." : isSignUpMode ? "Daftar Akaun Baru" : "Log Masuk E-mel"}
          </button>
        </form>

        <div className="w-full flex items-center justify-center space-x-2 text-xs text-slate-400">
          <span>{isSignUpMode ? "Sudah ada akaun?" : "Belum mendaftar?"}</span>
          <button 
            type="button" 
            onClick={() => setIsSignUpMode(!isSignUpMode)}
            className="text-red-400 font-bold hover:underline"
          >
            {isSignUpMode ? "Log Masuk" : "Daftar Sini"}
          </button>
        </div>

        <div className="relative w-full flex items-center py-2">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink-0 mx-4 text-slate-500 text-xs font-semibold">ATAU</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className="w-full flex items-center justify-center space-x-3 py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all duration-200 shadow-xl cursor-pointer active:scale-95 border border-white"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span className="font-extrabold">
            Teruskan dengan Google
          </span>
        </button>

        <div className="pt-2 border-t border-slate-800/80 w-full flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Pengesahan Akaun Firebase Terkawal</span>
        </div>
      </div>
    </div>
  );
};
