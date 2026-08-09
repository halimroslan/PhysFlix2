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
  Maximize,
  Settings,
  X
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { VideoLesson, allVideoLessons } from "@/data/physicsData";
import { conceptDefinitions } from "@/data/conceptDefinitions";
import { useDRMProtection, deobfuscateId } from "@/utils/security";
import { useUserActivity } from "@/context/UserActivityContext";
import { useAuth } from "@/context/AuthContext";
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
  const { user } = useAuth();
  const isDev = user?.email?.toLowerCase().trim() === "abdulhalimroslan@gmail.com";

  // Developer Toggles
  const [devShowGrid, setDevShowGrid] = useState(false);
  const [devShowShields, setDevShowShields] = useState(true);
  const [devShowControllerShield, setDevShowControllerShield] = useState(true);
  const [devShowJump, setDevShowJump] = useState(false);
  const [devPanelOpen, setDevPanelOpen] = useState(false);

  useDRMProtection(); // Activates DRM anti-inspect & anti-shortcut hook

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shieldStyle, setShieldStyle] = useState({ bottom: '19.2%', height: '7.7%' });
  const [iframeSrc, setIframeSrc] = useState("");

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    // Check if browser supports native fullscreen API
    if ('requestFullscreen' in document.documentElement) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error("Native fullscreen failed, using CSS fallback:", err);
          setIsFullscreen(true);
        });
      } else {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    } else if ((containerRef.current as any).webkitRequestFullscreen) {
      // Safari specific native
      if (!(document as any).webkitFullscreenElement) {
        (containerRef.current as any).webkitRequestFullscreen();
      } else {
        (document as any).webkitExitFullscreen();
      }
    } else {
      // Complete fallback (iOS iPhone)
      setIsFullscreen(!isFullscreen);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.height >= 600) {
          setShieldStyle({ bottom: '7.7%', height: '7.7%' }); // W-X
        } else {
          setShieldStyle({ bottom: '19.2%', height: '7.7%' }); // T-U
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
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
  const [currentStartSeconds, setCurrentStartSeconds] = useState(600);

  useEffect(() => {
    if (currentLesson && currentLesson.id) {
      addToHistory(currentLesson.id);
      setShowCover(true); // Reset cover when lesson changes
      setCurrentStartSeconds(600); // Reset timer tracking
      const driveUrl = `https://drive.google.com/file/d/${deobfuscateId(currentLesson.driveId)}/preview`;
      setIframeSrc(`${driveUrl}?t=10m`); // Auto start at min 10 for testing
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
      // Normal start is at 10m (600s), but can be changed by jump. We want to stop 5 mins (300s) before end.
      const watchTimeSeconds = totalSeconds - currentStartSeconds - 300;
      if (watchTimeSeconds > 0) {
        playTimerRef.current = setTimeout(() => {
          setShowEndCover(true);
          setIframeSrc(""); // Auto mute by destroying iframe
        }, watchTimeSeconds * 1000);
      } else if (totalSeconds > 0) {
        // If video is short or jumped to end, block immediately
        setShowEndCover(true);
        setIframeSrc("");
      }
    } else {
      setShowEndCover(false);
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [showCover, totalSeconds, currentStartSeconds]);

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
            className={`mx-auto bg-black flex items-center justify-center shadow-2xl ${
              isFullscreen ? "fixed inset-0 z-[100] h-[100dvh] w-screen rounded-none" : "relative w-full border border-slate-800 rounded-xl overflow-hidden aspect-[4/3] md:aspect-video"
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
              src={iframeSrc}
              className="absolute top-0 left-0 w-full h-full border-0 pointer-events-auto"
              allow="autoplay"
              title={currentLesson.titleBm}
            ></iframe>



            {/* Custom Top Right Brand Watermark - Blocks Google Drive Popout Button */}
            <div className="absolute top-0 right-0 z-20 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-black/90 rounded-bl-2xl pointer-events-auto cursor-default shadow-bl-xl border-l border-b border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/PFlix.png" alt="PhysicsSPMFlix" className="h-4 md:h-6 w-auto object-contain" />
            </div>

            {/* Top-Left Shield - Blocks Google Drive Title Link (Solid black on mobile to hide menu) */}
            <div className="absolute top-0 left-0 z-20 w-[80%] h-10 md:h-16 pointer-events-auto cursor-default bg-black md:bg-transparent"></div>

            {/* Bottom Controller Shield (Solid Black) - Hides player controls completely on PC */}
            {devShowControllerShield && (
              <div 
                className="absolute left-0 right-0 bottom-0 z-20 pointer-events-auto cursor-default bg-black hidden md:block"
                style={{
                  height: isFullscreen ? '7.692%' : '11.538%',
                }}
              ></div>
            )}

            {/* TEMPORARY 15x26 GRID OVERLAY FOR PRECISE POSITIONING */}
            {devShowGrid && (
              <div 
                className="absolute inset-0 z-50 pointer-events-none grid"
                style={{ 
                  gridTemplateColumns: 'repeat(15, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(26, minmax(0, 1fr))'
                }}
              >
                {Array.from({ length: 15 * 26 }).map((_, i) => {
                  const col = i % 15;
                  const row = Math.floor(i / 15);
                  const letter = String.fromCharCode(65 + row); // A-Z
                  const number = col + 1; // 1-15
                  return (
                    <div key={i} className="border border-red-500/30 flex items-center justify-center overflow-hidden">
                      <span className="text-red-500/80 font-mono text-[8px] md:text-xs font-bold bg-black/40 px-0.5 rounded">{letter}{number}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Bottom-Center Invisible Shield - Blocks Timeline Scrubbing (Fast Forward/Rewind) */}
            {devShowShields && (
              <div 
                className="absolute left-[2%] right-[2%] z-30 pointer-events-auto cursor-not-allowed bg-red-500/30 max-md:landscape:!top-0 max-md:landscape:!bottom-auto max-md:landscape:!h-[11.5%] max-md:landscape:!left-0 max-md:landscape:!right-0"
                style={shieldStyle}
                title="Sila tonton tanpa skip"
              ></div>
            )}

            {/* Permanent Protectors for 'Tavis' Logo */}
            {devShowShields && (
              <>
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
                    {/* Top-Right Tavis Protector (B7-B8 for M1-M20) -> Portrait T10-U12 */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none top-[10%] right-[20%] w-[20%] h-[10%] portrait:top-[73%] portrait:right-auto portrait:left-[60%] portrait:w-[20%] portrait:h-[7.7%]"
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                    </div>
                    
                    {/* Bottom-Right Tavis Protector (I7-I8 for M1-M20) -> Portrait G10-H12 */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none bottom-[10%] right-[20%] w-[20%] h-[10%] portrait:bottom-auto portrait:top-[23%] portrait:right-auto portrait:left-[60%] portrait:w-[20%] portrait:h-[7.7%]"
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                    </div>
                  </>
                )}

                {showTavisM21Plus && (
                  <>
                    {/* Top-Left Tavis Protector (B1-B2 for M21+) -> Portrait F10-H12 */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none top-[10%] left-[0%] w-[20%] h-[10%] portrait:top-[19.2%] portrait:left-[60%] portrait:w-[20%] portrait:h-[11.5%]"
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                    </div>

                    {/* Top-Right Tavis Protector 1 (B7-B8 for M21+) */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none top-[10%] right-[20%] w-[20%] h-[10%] portrait:hidden"
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                    </div>
                    
                    {/* Top-Right Tavis Protector 2 (C9 for M21+) */}
                    <div 
                      className="absolute z-20 flex items-center justify-center bg-[#0a0a0a] rounded-[4px] md:rounded-lg shadow-xl border border-white/10 pointer-events-none top-[20%] right-[10%] w-[10%] h-[10%] portrait:hidden"
                    >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-[45%] w-auto object-contain opacity-80" />
                    </div>
                  </>
                )}
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
                  className="w-[72px] h-[52px] rounded-[12px] shadow-[0_0_0_2000px_#0a0a0a]"
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

            {/* Full Screen End Cover (Last 5 Minutes) */}
            {showEndCover && (
              <div 
                className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-auto"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/PHYSFLIX.png" alt="PhysicsSPMFlix" className="h-16 md:h-24 w-auto object-contain opacity-90 mb-4" />
                <span className="text-red-500 font-bold text-lg md:text-2xl animate-pulse mb-6">SESI TAMAT</span>
                
                <button
                  onClick={() => {
                    setShowEndCover(false);
                    setShowCover(true); // Reset the hole punch cover
                    setCurrentStartSeconds(600); // Reset timer
                    const driveUrl = `https://drive.google.com/file/d/${rawDriveId}/preview`;
                    setIframeSrc(`${driveUrl}?t=10m`); // Restart video at min 10
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Tonton Semula
                </button>
              </div>
            )}
            </div>
          </div>

          {/* TEMPORARY JUMP FEATURE */}
          {devShowJump && (
            <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <span className="text-sm font-medium text-slate-300 whitespace-nowrap">⏳ Lompat ke Masa:</span>
              <input 
                type="text" 
                placeholder="Cth: 12:30 atau 1m30s"
                className="bg-black border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500 w-full md:w-48"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = e.currentTarget.value;
                    if (!val) return;
                    let formattedTime = val;
                    if (val.includes(":")) {
                      const parts = val.split(":");
                      if (parts.length === 2) formattedTime = `${parts[0]}m${parts[1]}s`;
                      else if (parts.length === 3) formattedTime = `${parts[0]}h${parts[1]}m${parts[2]}s`;
                      
                      const p = val.split(":").map(Number);
                      if (p.length === 2) setCurrentStartSeconds(p[0]*60 + p[1]);
                      else if (p.length === 3) setCurrentStartSeconds(p[0]*3600 + p[1]*60 + p[2]);
                    } else {
                      let h=0, m=0, s=0;
                      const hM = val.match(/(\d+)h/);
                      const mM = val.match(/(\d+)m/);
                      const sM = val.match(/(\d+)s/);
                      if (hM) h = parseInt(hM[1]);
                      if (mM) m = parseInt(mM[1]);
                      if (sM) s = parseInt(sM[1]);
                      setCurrentStartSeconds(h*3600 + m*60 + s);
                    }
                    const baseUrl = `https://drive.google.com/file/d/${rawDriveId}/preview`;
                    const urlWithTime = `${baseUrl}?t=${formattedTime}`;
                    setIframeSrc(urlWithTime);
                  }
                }}
              />
              <span className="text-xs text-slate-400 italic">
                (Taip masa dan tekan <strong>Enter</strong>. Video akan *reload* di minit tersebut. Ciri sementara.)
              </span>
            </div>
          )}

          {/* DEVELOPER PANEL */}
          {isDev && (
            <div className="fixed bottom-4 left-4 z-50">
              <button 
                onClick={() => setDevPanelOpen(!devPanelOpen)}
                className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg border border-slate-600/50 transition-all hover:scale-105 active:scale-95"
              >
                {devPanelOpen ? <X className="w-5 h-5 text-red-500" /> : <Settings className="w-5 h-5 text-sky-400" />}
              </button>
              
              {devPanelOpen && (
                <div className="absolute bottom-14 left-0 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl p-4 w-64 space-y-4 animate-in slide-in-from-bottom-2 duration-200">
                  <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-2">Developer Tools</h3>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-300">Tunjuk Grid Koordinat</span>
                    <input type="checkbox" checked={devShowGrid} onChange={(e) => setDevShowGrid(e.target.checked)} className="rounded text-sky-500 focus:ring-sky-500 bg-slate-800 border-slate-600" />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-300">Aktifkan Cermin Ghaib</span>
                    <input type="checkbox" checked={devShowShields} onChange={(e) => setDevShowShields(e.target.checked)} className="rounded text-sky-500 focus:ring-sky-500 bg-slate-800 border-slate-600" />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-300">Pelindung Controller (PC)</span>
                    <input type="checkbox" checked={devShowControllerShield} onChange={(e) => setDevShowControllerShield(e.target.checked)} className="rounded text-sky-500 focus:ring-sky-500 bg-slate-800 border-slate-600" />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-300">Tunjuk Kotak Lompat</span>
                    <input type="checkbox" checked={devShowJump} onChange={(e) => setDevShowJump(e.target.checked)} className="rounded text-sky-500 focus:ring-sky-500 bg-slate-800 border-slate-600" />
                  </label>
                </div>
              )}
            </div>
          )}

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
