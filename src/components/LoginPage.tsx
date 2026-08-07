"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight, Globe, Lock, Mail, KeyRound, AlertCircle } from "lucide-react";

export const LoginPage: React.FC = () => {
  const { signInWithGoogle, loginWithEmail, signupWithEmail, authError } = useAuth();
  
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
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

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSignUpMode(true);
      setShowLoginForm(true);
    }
  };

  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden flex flex-col">
      {/* Background Image with Netflix-style gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 md:opacity-60"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        {/* Top to bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
        {/* Radial gradient for vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 md:px-12 flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/PHYSFLIX.png" alt="PHYSFLIX" className="h-8 md:h-12 object-contain" />
        
        <div className="flex gap-4">
          <div className="hidden md:flex items-center bg-black/40 border border-white/30 rounded px-3 py-1.5 text-sm font-medium text-white hover:ring-2 ring-white/50 transition cursor-pointer">
            <Globe className="w-4 h-4 mr-2" />
            Bahasa Melayu
          </div>
          {!showLoginForm && (
            <button 
              onClick={() => {
                setIsSignUpMode(false);
                setShowLoginForm(true);
              }}
              className="bg-[#e50914] hover:bg-[#c11119] text-white px-4 py-1.5 rounded font-medium transition duration-200"
            >
              Log Masuk
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        {!showLoginForm ? (
          /* Netflix Landing Hero Section */
          <div className="text-center max-w-4xl mx-auto mt-[-10vh] animate-in fade-in zoom-in duration-500">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tight leading-tight drop-shadow-2xl">
              Pembelajaran Fizik <br className="hidden md:block" />Tanpa Had.
            </h1>
            <p className="text-lg md:text-2xl font-medium mb-6 drop-shadow-md">
              Tonton. Faham. Skor A+. Khas untuk Tingkatan 4 & 5.
            </p>
            <p className="text-base md:text-xl mb-6 font-light drop-shadow-md">
              Bersedia untuk mulakan? Log masuk menggunakan akaun Google anda.
            </p>
            
            <div className="flex justify-center max-w-2xl mx-auto mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="w-full md:w-auto flex items-center justify-center bg-white hover:bg-gray-200 text-black px-8 py-4 md:py-5 rounded-md text-lg md:text-xl font-bold transition duration-200 shadow-2xl disabled:opacity-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-7 h-7 md:w-8 md:h-8 mr-4" />
                Log Masuk melalui Google
              </button>
            </div>
          </div>
        ) : (
          /* Netflix Sign In Card Overlay */
          <div className="w-full max-w-[450px] bg-black/75 rounded-md p-10 md:p-16 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-500 backdrop-blur-sm shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">
              {isSignUpMode ? "Daftar Akaun" : "Log Masuk"}
            </h2>

            {authError && (
              <div className="bg-[#e87c03] text-white p-3 rounded mb-6 text-sm flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 pt-5 pb-2 bg-[#333] rounded text-white focus:outline-none focus:bg-[#454545] peer"
                  placeholder=" "
                />
                <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:text-xs peer-focus:top-1.5 pointer-events-none">
                  Alamat E-mel
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pt-5 pb-2 bg-[#333] rounded text-white focus:outline-none focus:bg-[#454545] peer"
                  placeholder=" "
                />
                <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:text-xs peer-focus:top-1.5 pointer-events-none">
                  Kata Laluan
                </label>
              </div>

              <button 
                type="submit"
                disabled={isSigningIn}
                className="w-full bg-[#e50914] text-white font-bold py-3.5 rounded mt-6 hover:bg-[#c11119] transition disabled:opacity-50"
              >
                {isSigningIn ? "Memproses..." : (isSignUpMode ? "Daftar Sekarang" : "Log Masuk")}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-4 text-gray-400 text-sm">ATAU</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded transition disabled:opacity-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
              Teruskan dengan Google
            </button>

            <div className="mt-8 text-gray-400">
              {isSignUpMode ? (
                <p>
                  Sudah mempunyai akaun?{" "}
                  <button onClick={() => setIsSignUpMode(false)} className="text-white hover:underline">
                    Log Masuk
                  </button>
                </p>
              ) : (
                <p>
                  Baru di PHYSFLIX?{" "}
                  <button onClick={() => setIsSignUpMode(true)} className="text-white hover:underline">
                    Daftar Sekarang
                  </button>
                </p>
              )}
            </div>

            <p className="mt-4 text-xs text-[#8c8c8c]">
              Halaman ini dilindungi oleh Google reCAPTCHA dan Firebase Auth untuk memastikan anda bukan bot.
            </p>
          </div>
        )}
      </main>
      
      {/* Footer gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none"></div>
    </div>
  );
};
