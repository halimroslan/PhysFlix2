"use client";

import React, { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserActivityProvider, useUserActivity } from "@/context/UserActivityContext";
import { Navbar } from "@/components/Navbar";
import { HeroSpotlight, getPhysicsTopicCategory } from "@/components/HeroSpotlight";
import { Compass, Waves, Flame, Zap, Atom, Sparkles } from "lucide-react";
import { ContinueWatching } from "@/components/ContinueWatching";
import { TopPicks } from "@/components/TopPicks";
import { VideoPlayerView } from "@/components/VideoPlayerView";
import { PremiumCheckoutModal } from "@/components/PremiumCheckoutModal";
import { AnalyticBoard } from "@/components/AnalyticBoard";
import { ScoreBoardView } from "@/components/ScoreBoardView";
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
import { Play, BookOpen, Crown, X, GraduationCap, Search, Loader2, Bookmark, ListVideo, Grid, Target, Lock } from "lucide-react";

function MainDashboard() {
  const { lang } = useLanguage();
  const { user, loading, isSuperAdmin, isPremium, unlockPremium } = useAuth();
  const { isBookmarked, watchHistory, videoStats } = useUserActivity();
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightQuestionId, setHighlightQuestionId] = useState<string | null>(null);
  const [initialPlayerTab, setInitialPlayerTab] = useState<"overview" | "notes" | "qa">("overview");

  // Modals
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showPaymentSuccessToast, setShowPaymentSuccessToast] = useState(false);

  // Check for successful payment callback from ToyyibPay
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("payment") === "success") {
        if (unlockPremium) {
          unlockPremium();
        }
        setShowPaymentSuccessToast(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [unlockPremium]);

  const handleNavigateToQaReply = (videoId: string, questionId: string) => {
    const lesson = allVideoLessons.find(
      (l) => l.id === videoId || l.youtubeId === videoId || l.driveId === videoId
    );
    if (lesson) {
      setSelectedLesson(lesson);
      setHighlightQuestionId(questionId);
      setInitialPlayerTab("qa");
      setCurrentTab("playing");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // If Auth Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-white space-x-3">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        <span className="text-sm font-bold">Memuatkan Pengesahan...</span>
      </div>
    );
  }

  // If Not Authenticated -> Require Login Page!
  if (!user) {
    return <LoginPage />;
  }

  const userEmail = user?.email?.toLowerCase().trim() || "";

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

  // Helper render video card
  const renderVideoCard = (item: VideoLesson) => {
    const cat = getPhysicsTopicCategory(item);
    const CategoryIcon =
      cat === "optics"
        ? Compass
        : cat === "waves"
        ? Waves
        : cat === "heat"
        ? Flame
        : cat === "electricity"
        ? Zap
        : cat === "quantum"
        ? Atom
        : Sparkles;

    return (
      <div
        key={item.id}
        onClick={() => handlePlayLesson(item)}
        className="group cursor-pointer rounded-2xl bg-[#121622] border border-slate-800/90 hover:border-red-500/60 p-3.5 space-y-3 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
      >
        <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${item.thumbnailBg} relative overflow-hidden shadow-inner`}>
          {item.thumbnailUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.thumbnailUrl}
              alt={lang === "bm" ? item.titleBm : item.titleDlp}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('maxresdefault.jpg')) {
                  target.src = target.src.replace('maxresdefault.jpg', 'mqdefault.jpg');
                }
              }}
            />
          ) : (
            <>
              {/* Subtle physics grid overlay */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"></div>

              {/* Large background icon for visual interest */}
              <CategoryIcon className="absolute -right-4 -bottom-4 w-28 h-28 text-white opacity-[0.08] rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:opacity-[0.15]" />
            </>
          )}

          {/* Mini Category Icon Badge */}
          <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-center space-x-1 text-[9px] font-bold text-slate-200 z-10">
            <CategoryIcon className="w-3 h-3 text-red-400" />
            <span>T{item.form} • Bab {item.chapterNum}</span>
          </div>

          {/* Premium Lock Badge for Form 5 */}
          {item.form === 5 && !isSuperAdmin && !isPremium && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[9px] font-black flex items-center space-x-1 shadow-lg backdrop-blur-md z-10">
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>PREMIUM</span>
            </div>
          )}

          {/* Play / Lock Button Overlay (Centered) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className={`w-11 h-11 rounded-full ${item.form === 5 && !isSuperAdmin && !isPremium ? 'bg-amber-950/80 border-amber-500/50 group-hover:bg-amber-600' : 'bg-red-600/90 border-white/30 group-hover:bg-red-600 group-hover:scale-110'} border flex items-center justify-center text-white transition-all duration-300 shadow-2xl opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]`}>
              {item.form === 5 && !isSuperAdmin && !isPremium ? (
                <Lock className="w-4 h-4 text-amber-300 fill-amber-300/20" />
              ) : (
                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
              )}
            </div>
          </div>

          {/* Duration Badge */}
          <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-bold text-white bg-black/85 rounded backdrop-blur-sm border border-white/10 z-10">
            {item.duration}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            {/* Week badge removed */}
            <span className="text-[9px] font-semibold text-slate-400 truncate max-w-[120px]">{lang === "bm" ? item.chapterBm : item.chapterDlp}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-100 group-hover:text-red-400 transition line-clamp-2 leading-snug">
            {lang === "bm" ? item.titleBm : item.titleDlp}
          </h4>
          {item.keyConceptsBm && item.keyConceptsBm.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {item.keyConceptsBm.slice(0, 2).map((kc, idx) => (
                <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">
                  {kc}
                </span>
              ))}
            </div>
          )}
          {/* Progress Bar */}
          {(videoStats[item.id] !== undefined || watchHistory.includes(item.id)) && (
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden shadow-inner border border-slate-700/50">
              <div 
                className="h-full bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]" 
                style={{ width: `${Math.max(2, videoStats[item.id]?.completionPercentage || 0)}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const myListLessons = allVideoLessons.filter((l) => isBookmarked(l.id));
  const historyLessons = [...allVideoLessons]
    .filter((l) => watchHistory.includes(l.id) || videoStats[l.id]?.lastUpdatedTimestamp)
    .sort((a, b) => {
      const timeA = videoStats[a.id]?.lastUpdatedTimestamp || 0;
      const timeB = videoStats[b.id]?.lastUpdatedTimestamp || 0;
      // If neither has a timestamp (old data), fall back to watchHistory array order
      if (timeA === 0 && timeB === 0) {
        return watchHistory.indexOf(a.id) - watchHistory.indexOf(b.id);
      }
      return timeB - timeA;
    });

  const allChapters = Array.from(new Set(allVideoLessons.map(l => `${l.form}-${l.chapterNum}`))).map(formChap => {
    const [form, chap] = formChap.split("-");
    const lessons = allVideoLessons.filter(l => l.form === parseInt(form) && l.chapterNum === parseInt(chap));
    return {
      form: parseInt(form),
      chapterNum: parseInt(chap),
      chapterBm: lessons[0].chapterBm,
      chapterDlp: lessons[0].chapterDlp,
      lessons
    };
  }).sort((a, b) => {
    if (a.form === b.form) return a.chapterNum - b.chapterNum;
    return a.form - b.form;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      {/* Navbar (Netflix Style Header) */}
      <Navbar 
        onSearchChange={(val) => setSearchQuery(val)}
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab !== "playing") {
            setSelectedLesson(null);
            setHighlightQuestionId(null);
            setInitialPlayerTab("overview");
          }
        }}
        onOpenFormula={() => setIsFormulaOpen(true)}
        onOpenDict={() => setIsDictOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCalc={() => setIsCalcOpen(true)}
        onOpenSubscribe={() => setIsCheckoutOpen(true)}
        onNavigateToQaReply={handleNavigateToQaReply}
      />

      <div className="flex-1 flex">

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 space-y-8 max-w-7xl mx-auto overflow-x-hidden">
          {/* Active View Switch */}
          {currentTab === "playing" && selectedLesson ? (
            <VideoPlayerView
              key={`${selectedLesson.id}-${highlightQuestionId || 'normal'}`}
              currentLesson={selectedLesson}
              initialTab={initialPlayerTab}
              highlightQuestionId={highlightQuestionId}
              onBack={() => {
                setCurrentTab("home");
                setHighlightQuestionId(null);
                setInitialPlayerTab("overview");
              }}
              onSelectLesson={(lesson) => {
                setSelectedLesson(lesson);
                setHighlightQuestionId(null);
                setInitialPlayerTab("overview");
              }}
            />
          ) : searchQuery.trim() !== "" ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Search className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-extrabold text-white">
                  {lang === "bm" ? `Hasil Carian: "${searchQuery}"` : `Search Results for: "${searchQuery}"`}
                </h2>
                <span className="text-xs text-slate-400">({filteredLessons.length} video)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredLessons.map(renderVideoCard)}
              </div>
            </div>
          ) : currentTab === "mylist" ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <Bookmark className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-extrabold text-white">
                  {lang === "bm" ? "Senarai Saya" : "My List"}
                </h2>
                <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-extrabold rounded-full">
                  {myListLessons.length} Video
                </span>
              </div>
              {myListLessons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {myListLessons.map(renderVideoCard)}
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500 flex flex-col items-center">
                  <Bookmark className="w-12 h-12 mb-4 opacity-50" />
                  <p>{lang === "bm" ? "Tiada video dalam senarai bookmark." : "No videos bookmarked yet."}</p>
                </div>
              )}
            </div>
          ) : currentTab === "playlists" ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <ListVideo className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-extrabold text-white">
                  {lang === "bm" ? "Tonton Semula (Sejarah Tontonan)" : "Watch History"}
                </h2>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-extrabold rounded-full">
                  {historyLessons.length} Video
                </span>
              </div>
              {historyLessons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {historyLessons.map(renderVideoCard)}
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500 flex flex-col items-center">
                  <ListVideo className="w-12 h-12 mb-4 opacity-50" />
                  <p>{lang === "bm" ? "Anda belum menonton mana-mana video." : "You haven't watched any videos yet."}</p>
                </div>
              )}
            </div>
          ) : currentTab === "analytics" && isSuperAdmin ? (
            <AnalyticBoard onNavigateToQaReply={handleNavigateToQaReply} />
          ) : currentTab === "scoreboard" ? (
            <ScoreBoardView onPlayLesson={handlePlayLesson} />
          ) : currentTab === "topics" ? (
            <div className="space-y-10">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <Grid className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-extrabold text-white">
                  {lang === "bm" ? "Topik Pembelajaran Mengikut Bab" : "Learning Topics by Chapter"}
                </h2>
              </div>
              {allChapters.map(chap => (
                <div key={`${chap.form}-${chap.chapterNum}`} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-200 border-l-4 border-blue-500 pl-3">
                    {lang === "bm" ? `Tingkatan ${chap.form} - Bab ${chap.chapterNum}: ${chap.chapterBm}` : `Form ${chap.form} - Chapter ${chap.chapterNum}: ${chap.chapterDlp}`}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {chap.lessons.map(renderVideoCard)}
                  </div>
                </div>
              ))}
            </div>
          ) : currentTab === "form4" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-red-500" />
                    {lang === "bm" ? "Fizik Tingkatan 4 (KSSM)" : "Form 4 SPM Physics (KSSM)"}
                  </h2>
                </div>
                <span className="px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-extrabold rounded-full">
                  {form4VideoLessons.length} Video Lengkap
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {form4VideoLessons.map(renderVideoCard)}
              </div>
            </div>
          ) : currentTab === "form5" ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-red-500" />
                    {lang === "bm" ? "Fizik Tingkatan 5 (KSSM)" : "Form 5 SPM Physics (KSSM)"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === "bm"
                      ? "29 modul pengajaran lengkap SPM. Akses penuh buat masa ini dibuka untuk akaun pembangun & guru penggubal."
                      : "29 complete SPM modules. Full access is currently unlocked for developer & author accounts."}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {isSuperAdmin && (
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(true)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer ring-1 ring-amber-300/40"
                    >
                      <Crown className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                      <span>{lang === "bm" ? "Uji Bayaran FPX (RM 1.99)" : "Test FPX (RM 1.99)"}</span>
                    </button>
                  )}
                  {(!isSuperAdmin && !isPremium) ? (
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer"
                    >
                      <Crown className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                      <span>{lang === "bm" ? "Langgan Premium (FPX)" : "Subscribe Premium"}</span>
                    </button>
                  ) : isSuperAdmin ? (
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                      <span>👑</span>
                      <span>{lang === "bm" ? "Mod Pembangun: Akses Penuh" : "Developer: Full Access"}</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === "bm" ? "Akses Premium Aktif" : "Premium Active"}</span>
                    </span>
                  )}
                  <span className="px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-extrabold rounded-full">
                    {form5VideoLessons.length} Video Lengkap
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {form5VideoLessons.map(renderVideoCard)}
              </div>
            </div>
          ) : (
            <>
              {/* Hero Spotlight (Form 4 + Topik Pilihan Form 5) */}
              <HeroSpotlight
                featuredLessons={allVideoLessons}
                onPlay={handlePlayLesson}
              />
              {/* Continue Watching Row */}
              {historyLessons.length > 0 && (
                <ContinueWatching
                  lessons={historyLessons}
                  onPlay={handlePlayLesson}
                />
              )}
              {/* Top Picks for You Categories (DSKP Thematic Explorer) */}
              <TopPicks onPlay={handlePlayLesson} />
            </>
          )}
        </main>
      </div>

      {/* Payment Success Toast */}
      {showPaymentSuccessToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-[300] max-w-sm sm:max-w-md p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/60 shadow-[0_0_35px_rgba(16,185,129,0.4)] text-white flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎉</span>
              <span>PEMBAYARAN FPX BERJAYA!</span>
            </div>
            <p className="text-xs text-slate-200">
              Tahniah! Akaun anda kini dinaik taraf ke Akses Penuh Tingkatan 5 SPM (1 Tahun).
            </p>
          </div>
          <button
            onClick={() => setShowPaymentSuccessToast(false)}
            className="p-1 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modals */}
      <FormulaSheetModal isOpen={isFormulaOpen} onClose={() => setIsFormulaOpen(false)} />
      <DictionaryModal isOpen={isDictOpen} onClose={() => setIsDictOpen(false)} />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
      <PremiumCheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <UserActivityProvider>
          <MainDashboard />
        </UserActivityProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
