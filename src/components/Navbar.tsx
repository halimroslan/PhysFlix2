"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, LogOut, Menu, X, ChevronDown, Book, FileText, Target, Calculator } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { NotificationDropdown } from "./NotificationDropdown";

interface NavbarProps {
  onSearchChange?: (val: string) => void;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onOpenFormula?: () => void;
  onOpenDict?: () => void;
  onOpenQuiz?: () => void;
  onOpenCalc?: () => void;
  onOpenSubscribe?: () => void;
  onNavigateToQaReply?: (videoId: string, questionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSearchChange,
  currentTab = "home",
  onTabChange,
  onOpenFormula,
  onOpenDict,
  onOpenQuiz,
  onOpenCalc,
  onOpenSubscribe,
  onNavigateToQaReply
}) => {
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Netflix-style scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  const userEmail = user?.email?.toLowerCase().trim() || "";
  const isSuperAdmin = ["ahalimroslan@gmail.com", "abdulhalimroslan@gmail.com"].includes(userEmail);

  const navLinks = [
    { id: "home", label: "Laman Utama" },
    { id: "form4", label: "Tingkatan 4" },
    { id: "form5", label: "Tingkatan 5" },
    { id: "mylist", label: "Senarai Saya" },
    { id: "scoreboard", label: "Score Board" },
    { id: "experiments", label: "MyHomePhysics Lab" },
  ];

  if (isSuperAdmin) {
    navLinks.push({ id: "analytics", label: "Analytic Board" });
  }

  const handleNavClick = (id: string) => {
    if (id === "experiments") {
      window.open("https://myphysicstutor2.vercel.app/#myhomephysicslab", "_blank");
    } else if (onTabChange) {
      onTabChange(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ease-in-out px-4 md:px-12 py-4 flex items-center justify-between ${
          isScrolled ? "bg-[#141414] shadow-md" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="flex items-center gap-6 md:gap-10">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="shrink-0 cursor-pointer" onClick={() => handleNavClick("home")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/PHYSFLIX.png"
              alt="PhysicsSPMFlix Logo"
              className="h-5 md:h-6 lg:h-7 object-contain mt-1"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm ml-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium ${
                  currentTab === link.id 
                    ? "bg-white/20 text-white font-semibold" 
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Netflix-style Search */}
          <div className="flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-black/60 border border-white/80 px-2 py-1 transition-all">
                <Search className="w-4 h-4 text-white mr-2 cursor-pointer" onClick={() => setIsSearchOpen(false)} />
                <input
                  type="text"
                  autoFocus
                  value={searchValue}
                  onChange={handleSearch}
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-white text-sm focus:outline-none w-32 md:w-48 placeholder-gray-400"
                />
              </div>
            ) : (
              <Search 
                className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition" 
                onClick={() => setIsSearchOpen(true)}
              />
            )}
          </div>

          {/* Minimalist BM | DLP Language Pill */}
          <div className="hidden md:flex items-center font-medium text-xs border border-gray-600 rounded-sm">
            <button
              onClick={() => lang !== "bm" && toggleLang()}
              className={`px-2 py-1 ${lang === "bm" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
            >
              BM
            </button>
            <button
              onClick={() => lang !== "dlp" && toggleLang()}
              className={`px-2 py-1 ${lang === "dlp" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
            >
              DLP
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen((prev) => !prev);
                setIsToolsDropdownOpen(false);
              }}
              className="relative text-white hover:text-gray-300 transition p-1.5 rounded-full hover:bg-white/10 cursor-pointer flex items-center justify-center"
              title={lang === "bm" ? "Pemberitahuan Sistem" : "System Notifications"}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-600/50 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              onOpenDict={onOpenDict}
              onOpenFormula={onOpenFormula}
              onOpenCheatNote={() => {
                setIsNotificationsOpen(false);
                if (onTabChange) onTabChange("home");
              }}
              onOpenSubscribe={() => {
                setIsNotificationsOpen(false);
                if (onOpenSubscribe) onOpenSubscribe();
              }}
              onNavigateToQaReply={(videoId, questionId) => {
                setIsNotificationsOpen(false);
                if (onNavigateToQaReply) onNavigateToQaReply(videoId, questionId);
              }}
              onUnreadCountChange={(count) => setUnreadCount(count)}
            />
          </div>

          {/* Profile & Tools Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative flex items-center gap-2 cursor-pointer group py-2"
            onClick={() => setIsToolsDropdownOpen((prev) => !prev)}
            onMouseEnter={() => setIsToolsDropdownOpen(true)}
            onMouseLeave={() => setIsToolsDropdownOpen(false)}
          >
            {user?.photoURL ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-8 h-8 rounded-full border border-slate-700 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs shadow">
                {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "SH"}
              </div>
            )}
            <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />

            {/* Dropdown Menu with Seamless Hover Bridge */}
            {isToolsDropdownOpen && (
              <div 
                className="absolute top-full right-0 pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#0f172a]/95 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-2 flex flex-col text-sm text-gray-300">
                  {/* Arrow indicator */}
                  <div className="absolute -top-1 right-4 w-3 h-3 bg-[#0f172a] border-t border-l border-slate-700 transform rotate-45"></div>
                  
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="font-bold text-white text-xs truncate">{user?.displayName || "Sir Halim"}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email || ""}</p>
                  </div>

                  <button 
                    onClick={() => { onOpenFormula?.(); setIsToolsDropdownOpen(false); }} 
                    className="flex items-center px-3 py-2 hover:bg-slate-800/80 hover:text-white rounded-lg transition text-left"
                  >
                    <Target className="w-4 h-4 mr-3 text-cyan-400" /> Formula
                  </button>
                  <button 
                    onClick={() => { onOpenDict?.(); setIsToolsDropdownOpen(false); }} 
                    className="flex items-center px-3 py-2 hover:bg-slate-800/80 hover:text-white rounded-lg transition text-left"
                  >
                    <Book className="w-4 h-4 mr-3 text-emerald-400" /> Kamus
                  </button>
                  <button 
                    onClick={() => { onOpenQuiz?.(); setIsToolsDropdownOpen(false); }} 
                    className="flex items-center px-3 py-2 hover:bg-slate-800/80 hover:text-white rounded-lg transition text-left"
                  >
                    <FileText className="w-4 h-4 mr-3 text-amber-400" /> Kuiz / Kertas
                  </button>
                  <button 
                    onClick={() => { onOpenCalc?.(); setIsToolsDropdownOpen(false); }} 
                    className="flex items-center px-3 py-2 hover:bg-slate-800/80 hover:text-white rounded-lg transition text-left"
                  >
                    <Calculator className="w-4 h-4 mr-3 text-indigo-400" /> Kalkulator
                  </button>
                  
                  <div className="border-t border-slate-800/80 mt-1 pt-1">
                    <button 
                      onClick={() => { logout(); setIsToolsDropdownOpen(false); }} 
                      className="flex items-center w-full px-3 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition text-left font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-400" /> Log Keluar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't hide under the fixed navbar */}
      <div className="h-20 md:h-24 bg-[#141414]"></div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-200">
          <button 
            className="absolute top-6 right-6 text-white p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-xl font-medium ${
                currentTab === link.id ? "text-white font-bold" : "text-gray-400"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
