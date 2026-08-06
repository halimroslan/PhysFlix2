"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, LogOut, Menu, X, ChevronDown, Book, FileText, Target, Calculator } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onSearchChange?: (val: string) => void;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onOpenFormula?: () => void;
  onOpenDict?: () => void;
  onOpenQuiz?: () => void;
  onOpenCalc?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSearchChange,
  currentTab = "home",
  onTabChange,
  onOpenFormula,
  onOpenDict,
  onOpenQuiz,
  onOpenCalc
}) => {
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const navLinks = [
    { id: "home", label: "Laman Utama" },
    { id: "form4", label: "Tingkatan 4" },
    { id: "form5", label: "Tingkatan 5" },
    { id: "spm", label: "Ulangkaji SPM" },
    { id: "mylist", label: "Senarai Saya" },
    { id: "experiments", label: "MyHomePhysics Lab" },
  ];

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
              className="h-6 md:h-8 lg:h-10 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors font-medium ${
                  currentTab === link.id ? "text-white font-bold" : "text-gray-300 hover:text-gray-400"
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

          {/* Notifications */}
          <button className="relative text-white hover:text-gray-300 transition hidden sm:block">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile & Tools Dropdown */}
          <div 
            className="relative flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setIsToolsDropdownOpen(true)}
            onMouseLeave={() => setIsToolsDropdownOpen(false)}
          >
            {user?.photoURL ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs">
                {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "SH"}
              </div>
            )}
            <ChevronDown className={`w-4 h-4 text-white transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />

            {/* Dropdown Menu */}
            {isToolsDropdownOpen && (
              <div className="absolute top-full right-0 mt-4 w-48 bg-black/90 border border-slate-800 rounded shadow-2xl py-2 flex flex-col text-sm text-gray-300">
                {/* Arrow up pointing to profile */}
                <div className="absolute -top-2 right-4 w-4 h-4 bg-black/90 border-t border-l border-slate-800 transform rotate-45"></div>
                
                <div className="px-4 py-2 font-bold text-white border-b border-slate-800 mb-2 truncate">
                  {user?.displayName || "Sir Halim"}
                </div>

                <button onClick={onOpenFormula} className="flex items-center px-4 py-2 hover:underline">
                  <Target className="w-4 h-4 mr-3 text-slate-400" /> Formula
                </button>
                <button onClick={onOpenDict} className="flex items-center px-4 py-2 hover:underline">
                  <Book className="w-4 h-4 mr-3 text-slate-400" /> Kamus
                </button>
                <button onClick={onOpenQuiz} className="flex items-center px-4 py-2 hover:underline">
                  <FileText className="w-4 h-4 mr-3 text-slate-400" /> Kuiz / Kertas
                </button>
                <button onClick={onOpenCalc} className="flex items-center px-4 py-2 hover:underline">
                  <Calculator className="w-4 h-4 mr-3 text-slate-400" /> Kalkulator
                </button>
                
                <div className="border-t border-slate-800 mt-2 pt-2">
                  <button onClick={logout} className="flex items-center w-full px-4 py-2 hover:underline text-left">
                    <LogOut className="w-4 h-4 mr-3 text-slate-400" /> Log Keluar
                  </button>
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
