"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "bm" | "dlp";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bm: {
    // Brand & Tagline
    appName: "PHYSFLIX",
    tagline: "Fizik SPM. Bila-bila Masa. Di Mana Jua.",
    searchPlaceholder: "Cari topik, video, kata kunci...",
    
    // Nav items
    navHome: "Laman Utama",
    navMyList: "Senarai Saya",
    navContinue: "Teruskan Menonton",
    navBrowse: "Topik Pembelajaran",
    navForm4: "Tingkatan 4",
    navForm5: "Tingkatan 5",
    navSPMRevision: "Ulangkaji SPM",
    navExperiments: "Amali Virtual",
    navPlaylists: "Tonton Semula",
    navLiveClasses: "Kelas Langsung",
    
    // Quick Access
    quickAccess: "Akses Pantas",
    formulaSheet: "Helaian Formula",
    physicsDict: "Kamus Fizik",
    pastYear: "Soalan Tahun Lepas",
    calculator: "Kalkulator",
    
    // Hero Spotlight
    spotlightBadge: "UTAMA",
    heroTitle: "Cahaya & Optik",
    heroDesc: "Fahami sifat cahaya, pembiasan, pemantulan dan pembentukan imej oleh kanta serta cermin sfera dengan animasi & simulasi mudah.",
    playNow: "Main Sekarang",
    moreInfo: "Maklumat Lanjut",
    
    // Section Titles
    continueWatching: "Teruskan Menonton",
    topPicks: "Topik Pilihan Untuk Anda",
    revisionCollections: "Koleksi Ulangkaji SPM",
    
    // Categories
    catMekaniks: "Mekaniks",
    catMekaniksSub: "Gerakan, Daya & Tenaga",
    catHaba: "Haba",
    catHabaSub: "Suhu, Haba & Termodinamik",
    catElektrik: "Elektrik",
    catElektrikSub: "Litar, Arus & Voltan",
    catGelombang: "Gelombang",
    catGelombangSub: "Bunyi, Cahaya & Gelombang EM",
    catFizikModen: "Fizik Moden",
    catFizikModenSub: "Kuanta, Atom & Relativiti",
    
    // SPM Revision Cards
    kertas1Title: "Kertas 1",
    kertas1Sub: "Soalan Objektif (320 Soalan)",
    kertas2Title: "Kertas 2",
    kertas2Sub: "Soalan Struktur & Esei (120 Soalan)",
    topicalTitle: "Ulangkaji Mengikut Topik",
    topicalSub: "58 Senarai Main",
    quickRevisionTitle: "Ulangkaji Pantas",
    quickRevisionSub: "25 Video Ringkasan",
    formulaTitle: "Formula & Konsep",
    formulaSub: "Nota & Formula PDF",
    
    // Player Page
    backToHome: "Kembali ke Laman Utama",
    videoSubscribers: "52.3K Pelanggan",
    btnShare: "Kongsi",
    btnAddList: "Tambah ke Senarai",
    tabOverview: "Gambaran Keseluruhan",
    tabNotes: "Nota ringkas",
    tabQA: "Soal Jawab (32)",
    tabChapters: "Bab & Topik",
    whatYoullLearn: "Apa yang akan anda pelajari",
    keyConcepts: "Konsep Utama",
    
    // Sidebar Player
    tabPlaylist: "Tonton Semula",
    tabLearningTools: "Alat Pembelajaran",
    downloadNotesTitle: "Muat Turun Nota",
    downloadNotesSub: "Nota lengkap & ringkasan dalam PDF",
    btnDownloadPDF: "Muat Turun Nota (PDF)",
    hide: "Sembunyi",
    viewAllChapters: "Lihat Semua Bab",
    resourcesTitle: "Bahan Sumber",
    
    // Teacher profile
    teacherName: "Sir Halim",
    teacherRole: "Pakar Fizik SPM",
    
    // Misc
    videosCount: "Video",
    left: "tinggal",
    completed: "Selesai",
    playing: "Sedang Dimainkan",
  },
  dlp: {
    // Brand & Tagline
    appName: "PHYSFLIX",
    tagline: "SPM Physics. Anytime. Anywhere.",
    searchPlaceholder: "Search topics, videos, keywords...",
    
    // Nav items
    navHome: "Home",
    navMyList: "My List",
    navContinue: "Continue Watching",
    navBrowse: "Browse Topics",
    navForm4: "Form 4",
    navForm5: "Form 5",
    navSPMRevision: "SPM Revision",
    navExperiments: "Virtual Labs",
    navPlaylists: "Playlists",
    navLiveClasses: "Live Classes",
    
    // Quick Access
    quickAccess: "Quick Access",
    formulaSheet: "Formula Sheet",
    physicsDict: "Physics Dictionary",
    pastYear: "Past Year Papers",
    calculator: "Calculator",
    
    // Hero Spotlight
    spotlightBadge: "SPOTLIGHT",
    heroTitle: "Light & Optics",
    heroDesc: "Understand light properties, refraction, reflection, and image formation by lenses and spherical mirrors with clear animations & simulations.",
    playNow: "Play Now",
    moreInfo: "More Info",
    
    // Section Titles
    continueWatching: "Continue Watching",
    topPicks: "Top Picks for You",
    revisionCollections: "SPM Revision Collections",
    
    // Categories
    catMekaniks: "Mechanics",
    catMekaniksSub: "Motion, Force & Energy",
    catHaba: "Thermal Physics",
    catHabaSub: "Heat, Temperature & Thermodynamics",
    catElektrik: "Electricity",
    catElektrikSub: "Circuits, Current & Voltage",
    catGelombang: "Waves",
    catGelombangSub: "Sound, Light & EM Waves",
    catFizikModen: "Modern Physics",
    catFizikModenSub: "Quantum, Atoms & Relativity",
    
    // SPM Revision Cards
    kertas1Title: "Paper 1",
    kertas1Sub: "Objective Questions (320 Questions)",
    kertas2Title: "Paper 2",
    kertas2Sub: "Structured & Essay Questions (120 Questions)",
    topicalTitle: "Topical Revision",
    topicalSub: "58 Playlists",
    quickRevisionTitle: "Quick Revision",
    quickRevisionSub: "25 Summary Videos",
    formulaTitle: "Formula & Concepts",
    formulaSub: "PDF Notes & Formulas",
    
    // Player Page
    backToHome: "Back to Home",
    videoSubscribers: "52.3K Subscribers",
    btnShare: "Share",
    btnAddList: "Add to My List",
    tabOverview: "Overview",
    tabNotes: "Notes",
    tabQA: "Q&A (32)",
    tabChapters: "Chapters",
    whatYoullLearn: "What you'll learn",
    keyConcepts: "Key Concepts",
    
    // Sidebar Player
    tabPlaylist: "Playlist",
    tabLearningTools: "Learning Tools",
    downloadNotesTitle: "Download Notes",
    downloadNotesSub: "Complete & concise notes in PDF",
    btnDownloadPDF: "Download Notes (PDF)",
    hide: "Hide",
    viewAllChapters: "View All Chapters",
    resourcesTitle: "Resources",
    
    // Teacher profile
    teacherName: "Sir Halim",
    teacherRole: "SPM Physics Specialist",
    
    // Misc
    videosCount: "Videos",
    left: "left",
    completed: "Completed",
    playing: "Now Playing",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("bm");

  const toggleLang = () => {
    setLang((prev) => (prev === "bm" ? "dlp" : "bm"));
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations["bm"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
