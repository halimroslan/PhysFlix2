"use client";

import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { HeroSpotlight } from "@/components/HeroSpotlight";
import { ContinueWatching } from "@/components/ContinueWatching";
import { TopPicks } from "@/components/TopPicks";
import { RevisionCollections } from "@/components/RevisionCollections";
import { VideoPlayerView } from "@/components/VideoPlayerView";
import { FormulaSheetModal } from "@/components/FormulaSheetModal";
import { DictionaryModal } from "@/components/DictionaryModal";
import { QuizModal } from "@/components/QuizModal";
import { CalculatorModal } from "@/components/CalculatorModal";
import { LoginPage } from "@/components/LoginPage";
import {
  allVideoLessons,
  form4VideoLessons,
  form5VideoLessons,
  VideoLesson
} from "@/data/physicsData";
import { Play, BookOpen, GraduationCap, Search, Loader2 } from "lucide-react";

function MainDashboard() {
  const { lang } = useLanguage();
  const { user, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  // If Auth Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-white space-x-3">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        <span className="text-sm font-bold">Memuatkan Pengesahan Firebase...</span>
      </div>
    );
  }

  // If Not Authenticated -> Require Google Sign-In Login Page!
  if (!user) {
    return <LoginPage />;
  }

  // Filter lessons based on search
  const filteredLessons = allVideoLessons.filter((item) => {
    const q = searchQuery.toLowerCase();
    const title = lang === "bm" ? item.titleBm.toLowerCase() : item.titleDlp.toLowerCase();
    const ch = lang === "bm" ? item.chapterBm.toLowerCase() : item.chapterDlp.toLowerCase();
    return (
      title.includes(q) ||
      ch.includes(q) ||
      item.week.toLowerCase().includes(q)
    );
  });

  const handlePlayLesson = (lesson: VideoLesson) => {
    setSelectedLesson(lesson);
    setCurrentTab("playing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectTopic = (chapterNum: number) => {
    const topicLesson = allVideoLessons.find((l) => l.chapterNum === chapterNum) || allVideoLessons[0];
    handlePlayLesson(topicLesson);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar onSearchChange={(val) => setSearchQuery(val)} />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            if (tab !== "playing") setSelectedLesson(null);
          }}
          onOpenFormula={() => setIsFormulaOpen(true)}
          onOpenDict={() => setIsDictOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCalc={() => setIsCalcOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 space-y-8 max-w-7xl mx-auto overflow-x-hidden">
          {/* Active View Switch */}
          {currentTab === "playing" && selectedLesson ? (
            <VideoPlayerView
              currentLesson={selectedLesson}
              onBack={() => setCurrentTab("home")}
              onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            />
          ) : searchQuery.trim() !== "" ? (
            /* Search Results View */
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Search className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-extrabold text-white">
                  {lang === "bm" ? `Hasil Carian: "${searchQuery}"` : `Search Results for: "${searchQuery}"`}
                </h2>
                <span className="text-xs text-slate-400">({filteredLessons.length} video)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredLessons.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handlePlayLesson(item)}
                    className="group cursor-pointer rounded-2xl bg-[#121622] border border-slate-800 hover:border-red-500/50 p-3.5 space-y-3 transition shadow-lg"
                  >
                    <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${item.thumbnailBg} flex items-center justify-center relative overflow-hidden`}>
                      <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-red-600 transition">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-bold text-white bg-black/80 rounded">
                        {item.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-red-400 block">{item.week}</span>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-red-400 transition line-clamp-1">
                        {lang === "bm" ? item.titleBm : item.titleDlp}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {lang === "bm" ? `Tingkatan ${item.form} • Bab ${item.chapterNum}` : `Form ${item.form} • Chapter ${item.chapterNum}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentTab === "form4" ? (
            /* Dedicated Form 4 Video Catalog View */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-red-500" />
                    {lang === "bm" ? "Katalog Video Fizik Tingkatan 4 (KSSM)" : "Form 4 SPM Physics Video Catalog"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === "bm"
                      ? "Disusun mengikut nombor minggu (T4 M1, T4 M2... T4 M39) dari Google Drive"
                      : "Sorted according to week number (T4 M1, T4 M2... T4 M39) from Google Drive"}
                  </p>
                </div>
                <span className="px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-extrabold rounded-full">
                  {form4VideoLessons.length} Video Lengkap
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {form4VideoLessons.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handlePlayLesson(item)}
                    className="group cursor-pointer rounded-2xl bg-[#121622] border border-slate-800 hover:border-red-500/50 p-3.5 space-y-3 transition shadow-lg flex flex-col justify-between"
                  >
                    <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${item.thumbnailBg} flex items-center justify-center relative overflow-hidden`}>
                      <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-red-600 transition shadow-xl">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-bold text-white bg-black/80 rounded">
                        {item.duration}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-red-400 block">{item.week}</span>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-red-400 transition line-clamp-2">
                        {lang === "bm" ? item.titleBm : item.titleDlp}
                      </h4>
                      <p className="text-[10px] text-slate-400 pt-1">
                        {lang === "bm" ? `Bab ${item.chapterNum}: ${item.chapterBm}` : `Ch ${item.chapterNum}: ${item.chapterDlp}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentTab === "form5" ? (
            /* Dedicated Form 5 Video Catalog View */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-red-500" />
                    {lang === "bm" ? "Katalog Video Fizik Tingkatan 5 (KSSM)" : "Form 5 SPM Physics Video Catalog"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === "bm"
                      ? "Disusun mengikut nombor minggu (T5 M1, T5 M2... T5 M39) dari Google Drive"
                      : "Sorted according to week number (T5 M1, T5 M2... T5 M39) from Google Drive"}
                  </p>
                </div>
                <span className="px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-extrabold rounded-full">
                  {form5VideoLessons.length} Video Lengkap
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {form5VideoLessons.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handlePlayLesson(item)}
                    className="group cursor-pointer rounded-2xl bg-[#121622] border border-slate-800 hover:border-red-500/50 p-3.5 space-y-3 transition shadow-lg flex flex-col justify-between"
                  >
                    <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${item.thumbnailBg} flex items-center justify-center relative overflow-hidden`}>
                      <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-red-600 transition shadow-xl">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-bold text-white bg-black/80 rounded">
                        {item.duration}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-red-400 block">{item.week}</span>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-red-400 transition line-clamp-2">
                        {lang === "bm" ? item.titleBm : item.titleDlp}
                      </h4>
                      <p className="text-[10px] text-slate-400 pt-1">
                        {lang === "bm" ? `Bab ${item.chapterNum}: ${item.chapterBm}` : `Ch ${item.chapterNum}: ${item.chapterDlp}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Standard Dashboard View matching Image 1 */
            <>
              {/* Hero Spotlight */}
              <HeroSpotlight
                featuredLesson={allVideoLessons[38]} // T4 M36 Optics lesson
                onPlay={handlePlayLesson}
              />

              {/* Continue Watching Row */}
              <ContinueWatching
                lessons={allVideoLessons}
                onPlay={handlePlayLesson}
              />

              {/* Top Picks for You Categories */}
              <TopPicks onSelectTopic={handleSelectTopic} />

              {/* SPM Revision Collections */}
              <RevisionCollections
                onOpenQuiz={() => setIsQuizOpen(true)}
                onOpenFormula={() => setIsFormulaOpen(true)}
              />
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <FormulaSheetModal isOpen={isFormulaOpen} onClose={() => setIsFormulaOpen(false)} />
      <DictionaryModal isOpen={isDictOpen} onClose={() => setIsDictOpen(false)} />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MainDashboard />
      </LanguageProvider>
    </AuthProvider>
  );
}
