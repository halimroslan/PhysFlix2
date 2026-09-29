"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Globe, AlertCircle, ShieldCheck, Mail, Video, MessageSquare } from "lucide-react";

export const LoginPage: React.FC = () => {
  const { signInWithGoogle, loginWithEmail, signupWithEmail, authError } = useAuth();
  
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasConsent, setHasConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    if (!hasConsent) {
      setConsentError("Sila tandakan kotak persetujuan pengumpulan data (E-mel, Analitik Tontonan Video, dan Komen) sebelum log masuk.");
      return;
    }
    setConsentError(null);
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
    if (!hasConsent) {
      setConsentError("Sila tandakan kotak persetujuan pengumpulan data (E-mel, Analitik Tontonan Video, dan Komen) sebelum meneruskan.");
      return;
    }
    setConsentError(null);
    
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
                setConsentError(null);
              }}
              className="bg-[#e50914] hover:bg-[#c11119] text-white px-4 py-1.5 rounded font-medium transition duration-200"
            >
              Log Masuk
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        {!showLoginForm ? (
          /* Netflix Landing Hero Section */
          <div className="text-center max-w-4xl mx-auto mt-[-4vh] sm:mt-[-8vh] animate-in fade-in zoom-in duration-500">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tight leading-tight drop-shadow-2xl">
              Pembelajaran Fizik <br className="hidden md:block" />Tanpa Had.
            </h1>
            <p className="text-lg md:text-2xl font-medium mb-4 drop-shadow-md">
              Tonton. Faham. Skor A+. Khas untuk Tingkatan 4 & 5.
            </p>
            <p className="text-base md:text-lg mb-6 font-light text-gray-300 drop-shadow-md">
              Bersedia untuk mulakan? Sila semak persetujuan privasi di bawah sebelum log masuk menggunakan akaun Google anda.
            </p>

            {/* Kotak Persetujuan Pengumpulan Data (Consent Box) */}
            <div className="max-w-2xl mx-auto bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 text-left shadow-2xl transition-all hover:border-red-500/40 mb-6">
              <label className="flex items-start gap-3.5 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={(e) => {
                    setHasConsent(e.target.checked);
                    if (e.target.checked) setConsentError(null);
                  }}
                  className="mt-1 w-5 h-5 rounded border-gray-500 text-[#e50914] focus:ring-[#e50914] accent-[#e50914] cursor-pointer shrink-0"
                />
                <div className="text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center gap-2 font-semibold text-white group-hover:text-red-400 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-[#e50914] shrink-0" />
                    Persetujuan Pengumpulan Data Pengguna
                  </div>
                  <p className="text-gray-400 mt-1 text-xs leading-relaxed">
                    Dengan mendaftar atau log masuk ke portal <strong>PhysFlix SPM</strong>, anda bersetuju membenarkan platform ini mengumpul dan memproses maklumat berikut bagi tujuan pengoperasian dan penambahbaikan kualiti pembelajaran:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                    <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <Mail className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Data E-mel:</strong> Pengesahan identiti murid (Akaun Google / DELIMa Moe-DL), pengurusan profil, dan status langganan.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <Video className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Data Video Paling Banyak Ditonton:</strong> Analisis kekerapan dan tabiat tontonan untuk mengenal pasti video paling popular serta mengesyorkan modul bab fizik yang relevan.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <MessageSquare className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Data Komen:</strong> Merekodkan pertanyaan, komen interaktif dalam ruangan soal jawab (Q&A), serta interaksi bimbingan bersama AI Physics Tutor.
                      </div>
                    </div>
                  </div>
                </div>
              </label>

              {consentError && (
                <div className="mt-3.5 text-xs text-amber-300 flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3 py-2 rounded-lg animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{consentError}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-center max-w-2xl mx-auto">
              <button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className={`w-full md:w-auto flex items-center justify-center px-8 py-4 md:py-5 rounded-md text-lg md:text-xl font-bold transition duration-200 shadow-2xl ${
                  hasConsent 
                    ? "bg-white hover:bg-gray-200 text-black cursor-pointer" 
                    : "bg-white/80 hover:bg-white text-black/80"
                } disabled:opacity-50`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-7 h-7 md:w-8 md:h-8 mr-4" />
                {isSigningIn ? "Menyambung..." : "Log Masuk melalui Google"}
              </button>
            </div>
          </div>
        ) : (
          /* Netflix Sign In Card Overlay */
          <div className="w-full max-w-[480px] bg-black/85 rounded-xl p-8 md:p-12 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-500 backdrop-blur-md shadow-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6">
              {isSignUpMode ? "Daftar Akaun" : "Log Masuk"}
            </h2>

            {authError && (
              <div className="bg-[#e87c03] text-white p-3 rounded-lg mb-6 text-sm flex items-start">
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
                  className="w-full px-4 pt-5 pb-2 bg-[#333] rounded-lg text-white focus:outline-none focus:bg-[#454545] peer border border-transparent focus:border-red-500"
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
                  className="w-full px-4 pt-5 pb-2 bg-[#333] rounded-lg text-white focus:outline-none focus:bg-[#454545] peer border border-transparent focus:border-red-500"
                  placeholder=" "
                />
                <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:text-xs peer-focus:top-1.5 pointer-events-none">
                  Kata Laluan
                </label>
              </div>

              {/* Kotak Persetujuan Pengumpulan Data (Modal Form) */}
              <div className="bg-white/5 border border-gray-700/60 rounded-lg p-3 text-left text-xs my-4 transition-all hover:border-red-500/30">
                <label className="flex items-start gap-2.5 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={hasConsent}
                    onChange={(e) => {
                      setHasConsent(e.target.checked);
                      if (e.target.checked) setConsentError(null);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-gray-600 text-[#e50914] focus:ring-[#e50914] accent-[#e50914] cursor-pointer shrink-0"
                  />
                  <div className="text-gray-300">
                    <div className="flex items-center gap-1.5 font-semibold text-white group-hover:text-red-400 transition-colors">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#e50914] shrink-0" />
                      Persetujuan Pengumpulan Data Pengguna
                    </div>
                    <p className="text-gray-400 text-[11px] mt-1 leading-snug">
                      Saya bersetuju membenarkan PhysFlix SPM mengumpul maklumat berikut:
                    </p>
                    <ul className="mt-1.5 space-y-1 text-[11px] text-gray-300">
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shrink-0 mt-1"></span>
                        <span><strong className="text-white">E-mel:</strong> Pengesahan identiti & status langganan.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shrink-0 mt-1"></span>
                        <span><strong className="text-white">Video Paling Banyak Ditonton:</strong> Analisis topik & statistik tontonan popular.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shrink-0 mt-1"></span>
                        <span><strong className="text-white">Komen:</strong> Sejarah pertanyaan soal jawab (Q&A) & AI Tutor.</span>
                      </li>
                    </ul>
                  </div>
                </label>

                {consentError && (
                  <div className="mt-2 text-[11px] text-amber-300 flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1.5 rounded">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>{consentError}</span>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={isSigningIn}
                className="w-full bg-[#e50914] text-white font-bold py-3.5 rounded-lg mt-4 hover:bg-[#c11119] transition disabled:opacity-50"
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
              className="w-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
              Teruskan dengan Google
            </button>

            <div className="mt-8 text-gray-400 text-sm">
              {isSignUpMode ? (
                <p>
                  Sudah mempunyai akaun?{" "}
                  <button 
                    onClick={() => {
                      setIsSignUpMode(false);
                      setConsentError(null);
                    }} 
                    className="text-white hover:underline font-semibold"
                  >
                    Log Masuk
                  </button>
                </p>
              ) : (
                <p>
                  Baru di PHYSFLIX?{" "}
                  <button 
                    onClick={() => {
                      setIsSignUpMode(true);
                      setConsentError(null);
                    }} 
                    className="text-white hover:underline font-semibold"
                  >
                    Daftar Sekarang
                  </button>
                </p>
              )}
            </div>

            <p className="mt-4 text-xs text-[#8c8c8c]">
              Halaman ini dilindungi oleh Google OAuth dan Supabase Auth untuk memastikan keselamatan akaun anda.
            </p>
          </div>
        )}
      </main>
      
      {/* Footer gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none"></div>
    </div>
  );
};
