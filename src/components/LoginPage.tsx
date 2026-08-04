"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, AlertCircle, Lock, ExternalLink, RefreshCw } from "lucide-react";

export const LoginPage: React.FC = () => {
  const { signInWithGoogle, authError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Login Error:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const isIdentityToolkitBlocked = authError && (authError.includes("identitytoolkit") || authError.includes("projectconfigservice"));
  const isUnauthorizedDomain = authError && authError.includes("unauthorized-domain");

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Subtle Background Physics Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Main Login Card */}
      <div className="relative z-20 w-full max-w-md bg-[#0f131f] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center flex flex-col items-center">
        {/* Official Branding Logo - NO GLOWING EFFECT */}
        <div className="py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="PhysicsSPMFlix Logo"
            className="h-28 md:h-32 w-auto object-contain"
          />
        </div>

        <div className="space-y-2 max-w-xs">
          <h1 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-red-500" />
            Pengesahan Akaun Google
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Akses platform ini memerlukan pengesahan akaun Google pelajar / guru yang sah menerusi Firebase Auth.
          </p>
        </div>

        {/* Error Alert Message if Any */}
        {authError && (
          <div className="w-full p-4 bg-red-950/80 border border-red-800/80 rounded-2xl flex items-start space-x-3 text-left text-xs text-red-300 space-y-2 flex-col">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span className="font-bold text-red-200">Perhatian Firebase Auth:</span>
            </div>
            
            <div className="leading-relaxed text-[11px] space-y-1.5 w-full">
              {isIdentityToolkitBlocked ? (
                <div>
                  <p>
                    Kunci API Google Cloud menyekat <strong>Identity Toolkit API</strong>.
                  </p>
                  <a
                    href="https://console.cloud.google.com/apis/credentials?project=physicsspmflix"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-amber-400 font-bold hover:underline mt-1"
                  >
                    <span>Klik Sini Untuk Buka Google Cloud Credentials</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-[10px] text-slate-400 mt-1">
                    (Pilih API Key ➔ Tukar API Restrictions kepada &quot;Don&apos;t restrict key&quot; ➔ Save)
                  </p>
                </div>
              ) : isUnauthorizedDomain ? (
                <div>
                  <p>
                    Domain <code>physicsflix.vercel.app</code> belum didaftarkan di Authorized Domains.
                  </p>
                  <a
                    href="https://console.firebase.google.com/u/0/project/physicsspmflix/authentication/settings"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-amber-400 font-bold hover:underline mt-1"
                  >
                    <span>Klik Sini Untuk Tambah Domain Di Firebase Settings</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                <p className="font-mono text-[10px] text-red-300 break-all">{authError}</p>
              )}
            </div>
          </div>
        )}

        {/* Strict Google Sign-In Button */}
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all duration-200 shadow-xl cursor-pointer active:scale-95 hover:shadow-2xl border border-white"
        >
          {/* Google Icon SVG */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="font-extrabold">
            {isSigningIn ? "Menghubungkan Pengesahan Google..." : "Log Masuk Dengan Akaun Google"}
          </span>
        </button>

        {/* Security badge footer */}
        <div className="pt-4 border-t border-slate-800/80 w-full flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Pengesahan Akaun Firebase Terkawal (physicsspmflix)</span>
        </div>
      </div>
    </div>
  );
};
