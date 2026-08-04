"use client";

import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full h-24 md:h-28 glass-nav px-4 md:px-8 flex items-center justify-between gap-6">
      {/* Massive Prominent Official Branding Logo */}
      <div className="flex items-center space-x-3 shrink-0 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="PhysicsSPMFlix Logo"
          className="h-20 md:h-24 lg:h-28 max-w-[280px] md:max-w-[360px] object-contain drop-shadow-[0_10px_20px_rgba(229,9,20,0.3)] hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-xl mx-2">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-11 pr-4 py-3 bg-[#121622]/90 border border-slate-800 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition shadow-inner"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-3 md:space-x-5">
        {/* Minimalist BM | DLP Language Toggle */}
        <div className="flex items-center bg-[#131826] p-1 rounded-full border border-slate-800 shadow-md">
          <button
            onClick={() => lang !== "bm" && toggleLang()}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              lang === "bm"
                ? "bg-red-600 text-white shadow-md shadow-red-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            BM
          </button>
          <button
            onClick={() => lang !== "dlp" && toggleLang()}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              lang === "dlp"
                ? "bg-red-600 text-white shadow-md shadow-red-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            DLP
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-red-500/30">
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
