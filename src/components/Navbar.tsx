"use client";

import React, { useState } from "react";
import { Search, Bell, ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onSearchChange?: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const { lang, toggleLang, t } = useLanguage();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 glass-nav px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Brand logo for mobile / header */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-700 to-red-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-red-900/40">
          S
        </div>
        <div className="hidden sm:block">
          <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
            Physics<span className="text-red-500">SPM</span>Flix
            <span className="px-1.5 py-0.2 text-[9px] font-bold text-red-400 bg-red-950/60 border border-red-800/60 rounded">
              PRO
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium">
            {t("tagline")}
          </p>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-xl mx-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2 bg-[#121622]/90 border border-slate-800 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Minimalist BM | DLP Language Toggle */}
        <div className="flex items-center bg-[#131826] p-1 rounded-full border border-slate-800">
          <button
            onClick={() => lang !== "bm" && toggleLang()}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              lang === "bm"
                ? "bg-red-600 text-white shadow-md shadow-red-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            BM
          </button>
          <button
            onClick={() => lang !== "dlp" && toggleLang()}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              lang === "dlp"
                ? "bg-red-600 text-white shadow-md shadow-red-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            DLP
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 border-l border-slate-800 pl-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-red-500/30">
            SH
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-xs font-bold text-white">Sir Halim</span>
            <span className="block text-[10px] text-slate-400">{t("teacherRole")}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
