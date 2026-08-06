"use client";

import React, { useState } from "react";
import { Search, Bell, LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onSearchChange?: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 w-full min-h-[6rem] md:h-28 glass-nav px-3 md:px-8 py-3 md:py-0 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 gap-x-2 md:gap-6">
      {/* Official Branding Logo - NO GLOW EFFECT */}
      <div className="flex items-center shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/PHYSFLIX.png"
          alt="PhysicsSPMFlix Logo"
          className="h-12 md:h-24 lg:h-28 object-contain"
        />
      </div>

      {/* Center Search Bar */}
      <div className="w-full md:flex-1 md:max-w-xl order-3 md:order-2">
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
      <div className="flex items-center space-x-2 md:space-x-5 order-2 md:order-3">
        {/* Minimalist BM | DLP Language Toggle */}
        <div className="flex items-center bg-[#131826] p-1 rounded-full border border-slate-800 shadow-md">
          <button
            onClick={() => lang !== "bm" && toggleLang()}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-extrabold transition-all ${
              lang === "bm"
                ? "bg-red-600 text-white shadow-md shadow-red-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            BM
          </button>
          <button
            onClick={() => lang !== "dlp" && toggleLang()}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-extrabold transition-all ${
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
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute top-1 right-1 w-3 h-3 md:w-4 md:h-4 bg-red-600 text-white text-[8px] md:text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Authenticated User Profile */}
        <div className="flex items-center space-x-2 md:space-x-3 border-l border-slate-800 pl-2 md:pl-4">
          {user?.photoURL ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-red-500/30 object-cover"
            />
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-red-500/30">
              {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "SH"}
            </div>
          )}

          <div className="hidden lg:block text-left">
            <span className="block text-xs font-bold text-white max-w-[120px] truncate">
              {user?.displayName || "Sir Halim"}
            </span>
            <span className="block text-[10px] text-slate-400 max-w-[120px] truncate">
              {user?.email || t("teacherRole")}
            </span>
          </div>

          {user && (
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/60 rounded-lg transition"
              title="Log Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
