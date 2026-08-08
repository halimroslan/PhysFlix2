"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Plus,
  CheckCircle2,
  Circle,
  FileText,
  Play,
  ShieldAlert,
  Lock,
  Bookmark,
  Maximize
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { VideoLesson, allVideoLessons } from "@/data/physicsData";
import { conceptDefinitions } from "@/data/conceptDefinitions";
import { useDRMProtection, deobfuscateId } from "@/utils/security";
import { useUserActivity } from "@/context/UserActivityContext";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface VideoPlayerViewProps {
  currentLesson: VideoLesson;
  onBack: () => void;
  onSelectLesson: (lesson: VideoLesson) => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  currentLesson,
  onBack,
  onSelectLesson
}) => {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, addToHistory } = useUserActivity();
  useDRMProtection(); // Activates DRM anti-inspect & anti-shortcut hook

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Parse duration into total seconds
  const totalSeconds = (() => {
    if (!currentLesson?.duration) return 0;
    const parts = currentLesson.duration.split(':').map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  })();

  const [showCover, setShowCover] = useState(true);
  const [showEndCover, setShowEndCover] = useState(false);

  useEffect(() => {
    if (currentLesson && currentLesson.id) {
      addToHistory(currentLesson.id);
      setShowCover(true); // Reset cover when lesson changes
    }
  }, [currentLesson]);

  // Detect clicks on the iframe when it gains focus
  useEffect(() => {
    const handleBlur = () => {
      // Small timeout ensures document.activeElement has updated
      setTimeout(() => {
        if (document.activeElement === iframeRef.current) {
          setShowCover(false);
        }
      }, 50);
    };
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Manage end cover timer based on playback state (showCover)
  useEffect(() => {
    if (!showCover) {
      // Calculate remaining time: Total duration - 14 minutes (840s) - 10s
      // If remaining time is valid, start timer
      const remainingSeconds = totalSeconds - 840 - 10;
      if (remainingSeconds > 0) {
        playTimerRef.current = setTimeout(() => {
          setShowEndCover(true);
        }, remainingSeconds * 1000);
      }
    } else {
      setShowEndCover(false);
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    }
    
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [showCover, totalSeconds]);

  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "qa">("overview");
  const [sidebarTab, setSidebarTab] = useState<"playlist" | "tools">("playlist");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareText, setShareText] = useState("Kongsi");
  const [saved, setSaved] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // Helper to generate a stable, realistic number of likes based on video ID
  const getBaseLikes = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
    return 1200 + (Math.abs(hash) % 4000); // Generates a number between 1200 and 5200
  };

  useEffect(() => {
    if (!currentLesson?.id) return;
    
    // Check local storage for like state
    const localLiked = localStorage.getItem(`liked_${currentLesson.id}`) === "true";
    setLiked(localLiked);

    const fetchLikes = async () => {
      const baseLikes = getBaseLikes(currentLesson.id);
      try {
        const docRef = doc(db, "videoStats", currentLesson.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLikeCount(docSnap.data().likes);
        } else {
          // Initialize document with base likes
          await setDoc(docRef, { likes: baseLikes });
          setLikeCount(baseLikes + (localLiked ? 1 : 0));
        }
      } catch (e) {
        console.warn("Firestore likes unavailable, using fallback.", e);
        setLikeCount(baseLikes + (localLiked ? 1 : 0));
      }
    };
    fetchLikes();
  }, [currentLesson]);
  const [comments, setComments] = useState([
    { name: "Ahmad Rizky", text: "Terbaik Sir! Baru faham melukis sinar selari dan sinar fokus.", time: "2 jam lepas" },
    { name: "Siti Sarah", text: "Fast explanation and clear graphics for DLP students!", time: "5 jam lepas" },
    { name: "Cikgu Tan", text: "Sangat membantu untuk ulangkaji SPM murid.", time: "1 hari lepas" }
  ]);
  const [newComment, setNewComment] = useState("");

  const rawDriveId = deobfuscateId(currentLesson.driveId);

  const handleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    // Update local UI immediately
    setLikeCount((c) => newLikedState ? c + 1 : c - 1);
    localStorage.setItem(`liked_${currentLesson.id}`, newLikedState ? "true" : "false");
    
    // Update Firestore
    try {
      const docRef = doc(db, "videoStats", currentLesson.id);
      await updateDoc(docRef, {
        likes: increment(newLikedState ? 1 : -1)
      });
    } catch (e) {
      console.warn("Error updating likes in Firestore", e);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: currentLesson.titleBm,
      text: "Jom tonton video pengajaran Fizik ini di Physics SPM Flix!",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareText("Tersalin!");
        setTimeout(() => setShareText("Kongsi"), 2000);
      }
    } catch (err) {
      console.error("Error sharing", err);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{ name: "Pelajar Fizik", text: newComment, time: "Baru sahaja" }, ...comments]);
    setNewComment("");
  };

  const { showTavisM1toM20, showTavisM21Plus } = (() => {
    const formStr = String(currentLesson.form);
    if (formStr !== "4" && formStr !== "5") return { showTavisM1toM20: false, showTavisM21Plus: false };
    
    const match = String(currentLesson.week).match(/M(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 20) return { showTavisM1toM20: true, showTavisM21Plus: false };
      if (num >= 21) return { showTavisM1toM20: false, showTavisM21Plus: true };
    }
    return { showTavisM1toM20: false, showTavisM21Plus: false };
  })();
  return (
    <div className="w-full space-y-4 md:space-y-6 select-none">
      {/* Top Bar Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#121622] hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>{t("backToHome")}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <span className="flex items-center space-x-1 text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
            <Lock className="w-3 h-3" />
            <span>DRM Encrypted Stream</span>
          </span>
          <span>•</span>
          <span className="text-red-400">
            {lang === "bm" ? currentLesson.chapterBm : currentLesson.chapterDlp}
          </span>
        </div>
      </div>

      {/* Main Grid: Player on Left, Playlist/Tools on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Protected Video Player & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* DRM Video Outer Wrapper */}
          <div
            ref={containerRef}
            onContextMenu={(e) => e.preventDefault()}
            className={`relative w-full mx-auto bg-black flex items-center justify-center shadow-2xl ${
              isFullscreen ? "rounded-none h-screen w-screen" : "border border-slate-800 rounded-xl overflow-hidden aspect-[4/3] md:aspect-video"
            }`}
          >
            {/* Inner Container - ALWAYS maintains 16:9 aspect ratio and scales to fit */}
            <div 
              className="relative group select-none overflow-hidden bg-black w-full h-full flex items-center justify-center"
              style={isFullscreen ? { 
                aspectRatio: '16/9',
                maxWidth: '177.778vh',
                maxHeight: '56.25vw'
              } : {
                aspectRatio: '16/9',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              {/* Embedded Stream via Obfuscated ID */}
            <iframe
              ref={iframeRef}
              src={`https://drive.google.com/file/d/${rawDriveId}/preview?t=840s`}
              className="absolute top-0 left-0 w-full h-full border-0 pointer-events-auto"
              allow="autoplay"
              title={currentLesson.titleBm}
            ></iframe>



            {/* Custom Top Right Brand Watermark - Blocks Google Drive Popout Button */}
            <div className="absolute top-0 right-0 z-20 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-black/90 rounded-bl-2xl pointer-events-auto cursor-default shadow-bl-xl border-l border-b border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/PFlix.png" alt="PhysicsSPMFlix" className="h-4 md:h-6 w-auto object-contain" />
            </div>

            {/* Top-Left Invisible Shield - Blocks Google Drive Title Link */}
            <div className="absolute top-0 left-0 z-20 w-1/2 h-10 md:h-16 pointer-events-auto cursor-default bg-transparent"></div>

            {/* TEMPORARY 10x10 GRID OVERLAY FOR PRECISE POSITIONING */}
            <div className="absolute inset-0 z-50 pointer-events-none grid grid-cols-10 grid-rows-10">
              {Array.from({ length: 100 }).map((_, i) => {
                const col = i % 10;
                const row = Math.floor(i / 10);
                const letter = String.fromCharCode(65 + row); // A-J
                const number = col + 1; // 1-10
                return (
                  <div key={i} className="border border-red-500/30 flex items-center justify-center">
                    <span className="text-red-500/80 font-mono text-xs md:text-sm font-bold bg-black/40 px-1 rounded">{letter}{number}</span>
                  </div>
                )
              })}
            </div>

            {/* Permanent Protectors for 'Tavis' Logo */}
            {currentLesson.tavisPositions && currentLesson.tavisPositions.length > 0 ? (
              currentLesson.tavisPositions.map((pos, idx) => (
                <div 
                  key={idx}
                  className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none"
                  style={pos as React.CSSProperties}
                >
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                </div>
              ))
            ) : (
              <>
                {showTavisM1toM20 && (
                  <>
                    {/* Top-Right Tavis Protector (B7-B8 for M1-M20) */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none"
                      style={{ top: '10%', right: '20%', width: '20%', height: '10%' }}
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                    </div>
                    
                    {/* Bottom-Right Tavis Protector (I7-I8 for M1-M20) */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none"
                      style={{ bottom: '10%', right: '20%', width: '20%', height: '10%' }}
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                    </div>
                  </>
                )}

                {showTavisM21Plus && (
                  <>
                    {/* Top-Right Tavis Protector (M21+) */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none"
                      style={{ top: '8%', right: '20%', width: '14%', height: '6%' }}
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain" />
                    </div>
                    
                    {/* Bottom-Right Tavis Protector (M21+) */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none"
                      style={{ bottom: '15%', right: '25%', width: '14%', height: '6%' }}
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain" />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Custom Initial Cover (Hole Punch for Drive Play Button) */}
            {showCover && (
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* 
                  This div represents the 'hole'. 
                  It is transparent but casts a massive solid black shadow to cover the rest of the screen. 
                  The border-radius ensures the hole perfectly matches the Google Drive play button.
                */}
                <div 
                  className="w-[72px] h-[52px] rounded-[12px] shadow-[0_0_0_9999px_#0a0a0a]"
                ></div>

                {/* Additional UI elements (Logo, text) placed around the hole */}
                <div className="absolute top-10 left-0 right-0 flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-12 md:h-16 w-auto object-contain mb-4 opacity-90" />
                  <span className="text-white/80 text-sm md:text-xl font-black font-mono tracking-widest text-center uppercase">
                    {currentLesson.titleBm}
                  </span>
                </div>
                
                <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                  <span className="text-red-500/80 text-sm md:text-base font-bold tracking-wide animate-pulse">
                    ↑ Klik butang Play di atas ↑
                  </span>
                </div>
              </div>
            )}

            {/* Full Screen End Cover (Last 10 Seconds) */}
            {showEndCover && (
              <div 
                onClick={() => setShowEndCover(false)}
                className="absolute inset-0 z-40 bg-[#0a0a0a] flex items-center justify-center cursor-pointer pointer-events-auto"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-16 md:h-24 w-auto object-contain opacity-90" />
              </div>
            )}
            </div>
          </div>

          {/* Video Header & Actions */}
          <div className="space-y-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-2">
                {lang === "bm" ? currentLesson.titleBm : currentLesson.titleDlp}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {lang === "bm" ? `Tingkatan ${currentLesson.form} • ${currentLesson.chapterBm}` : `Form ${currentLesson.form} • ${currentLesson.chapterDlp}`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-4 pt-2 border-t border-b border-slate-800/80 py-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-[#131826] rounded-full border border-slate-800 p-0.5">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      liked ? "bg-red-600 text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{likeCount}</span>
                  </button>
                  <button className="px-2.5 py-1.5 text-slate-400 hover:text-white border-l border-slate-800">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button 
                  onClick={handleShare}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#131826] hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{shareText === "Kongsi" ? t("btnShare") : shareText}</span>
                </button>

                <button
                  onClick={() => toggleBookmark(currentLesson.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    isBookmarked(currentLesson.id)
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-[#131724] hover:bg-[#1a2133] text-slate-300 border border-slate-800"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(currentLesson.id) ? "fill-current" : ""}`} />
                  <span>{isBookmarked(currentLesson.id) ? t("saved") : t("save")}</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 text-sm font-semibold transition"
                >
                  <Maximize className="w-4 h-4" />
                  <span className="hidden sm:inline">Skrin Penuh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detail Tabs Section */}
          <div className="space-y-4">
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-800 gap-4 md:gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 whitespace-nowrap transition ${
                  activeTab === "overview"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabOverview")}
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-3 whitespace-nowrap transition ${
                  activeTab === "notes"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabNotes")}
              </button>
              <button
                onClick={() => setActiveTab("qa")}
                className={`pb-3 whitespace-nowrap transition ${
                  activeTab === "qa"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabQA")}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {t("whatYoullLearn")}
                  </h3>
                  <ul className="space-y-2">
                    {(lang === "bm" ? currentLesson.learningPointsBm : currentLesson.learningPointsDlp).map(
                      (point, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {t("keyConcepts")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(lang === "bm" ? currentLesson.keyConceptsBm : currentLesson.keyConceptsDlp).map(
                      (concept, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedConcept(selectedConcept === concept ? null : concept)}
                          className={`px-3 py-1 border rounded-lg text-xs font-medium transition-colors ${
                            selectedConcept === concept
                              ? "bg-red-600 border-red-500 text-white"
                              : "bg-[#1a2133] border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {concept}
                        </button>
                      )
                    )}
                  </div>
                  {selectedConcept && (
                    <div className="mt-3 p-4 bg-slate-900/80 border border-slate-700 rounded-xl relative animate-in fade-in slide-in-from-top-2 duration-300">
                      <h4 className="text-sm font-bold text-red-400 mb-1">{selectedConcept}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {conceptDefinitions[selectedConcept] || 
                          (lang === "bm" 
                            ? "Definisi untuk konsep ini akan dikemas kini kelak mengikut silibus SPM." 
                            : "The definition for this concept will be updated soon according to the SPM syllabus.")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
                <h3 className="text-sm font-bold text-white">
                  Nota Ringkas & Formula SPM
                </h3>
                <p>
                  1. Pastikan perhatikan tanda positif dan negatif bagi jarak objek (u) dan jarak imej (v).
                </p>
                <p>
                  2. Kanta Cembung (Convex Lens) berfungsi menumpukan sinar cahaya pada titik fokus (F).
                </p>
                <p>
                  3. Formula Kanta / Cermin: <code className="bg-[#1c2438] px-2 py-0.5 rounded text-red-400 font-mono">1/f = 1/u + 1/v</code>
                </p>
              </div>
            )}

            {activeTab === "qa" && (
              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-4">
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tanya soalan tentang video ini..."
                    className="flex-1 px-4 py-2 bg-[#171e2e] border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition"
                  >
                    Hantar
                  </button>
                </form>

                <div className="space-y-3 pt-2">
                  {comments.map((c, i) => (
                    <div key={i} className="p-3 bg-[#161c2c] border border-slate-800 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="font-bold text-slate-200">{c.name}</span>
                        <span>{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-300">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar (Playlist / Learning Tools) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-3xl bg-[#101420] border border-slate-800/80 shadow-2xl space-y-5">
            {/* Playlist vs Learning Tools Segmented Switch */}
            <div className="flex bg-[#161c2b] p-1 rounded-2xl border border-slate-800">
              <button
                onClick={() => setSidebarTab("playlist")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  sidebarTab === "playlist"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("tabPlaylist")}
              </button>
              <button
                onClick={() => setSidebarTab("tools")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  sidebarTab === "tools"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("tabLearningTools")}
              </button>
            </div>

            {/* Protected Learning Notes Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 via-indigo-950/40 to-slate-900 border border-purple-800/40 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t("downloadNotesTitle")}</h4>
                  <p className="text-[10px] text-slate-400">Modul pembacaan digital dalam web</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("notes")}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg shadow-purple-950"
              >
                <span>Buka Reader Digital</span>
              </button>
            </div>

            {/* Chapters / Videos Playlist */}
            {sidebarTab === "playlist" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {t("tabChapters")} ({allVideoLessons.length} Video)
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold">{t("hide")}</span>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {allVideoLessons.map((lesson, idx) => {
                    const isCurrent = lesson.id === currentLesson.id;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`group cursor-pointer p-3 rounded-2xl border transition flex items-center space-x-3 ${
                          isCurrent
                            ? "bg-red-950/40 border-red-600/80 ring-1 ring-red-500/40"
                            : "bg-[#141a28] hover:bg-[#1a2234] border-slate-800/80"
                        }`}
                      >
                        {/* Mini Thumbnail */}
                        <div className="relative w-16 h-12 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                          {isCurrent ? (
                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
                              <Play className="w-3 h-3 fill-white ml-0.5" />
                            </div>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="flex-1 overflow-hidden">
                          <span className="text-[9px] font-bold text-red-400 block">
                            {lesson.week}
                          </span>
                          <h5
                            className={`text-xs font-bold truncate ${
                              isCurrent ? "text-red-400" : "text-slate-200 group-hover:text-white"
                            }`}
                          >
                            {lang === "bm" ? lesson.titleBm : lesson.titleDlp}
                          </h5>
                          <span className="text-[10px] text-slate-400">{lesson.duration}</span>
                        </div>

                        {/* Completion Icon */}
                        <div>
                          {idx < 3 ? (
                            <CheckCircle2 className="w-4 h-4 text-red-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
