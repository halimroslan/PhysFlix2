"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Maximize,
  Brain,
  Video,
  Sparkles,
  CheckCircle2,
  Circle,
  FileText,
  Play,
  Lock,
  Sigma,
  Copy,
  Check,
  BookOpen,
  ArrowRightLeft,
  Lightbulb,
  GraduationCap,
  X,
  MessageSquare,
  Send,
  MessageCircle,
  Trash2,
  HelpCircle,
  Filter,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  RefreshCw
} from "lucide-react";
import QuizComponent from "./QuizComponent";
import { useLanguage } from "@/context/LanguageContext";
import { VideoLesson, allVideoLessons } from "@/data/physicsData";
import { conceptDefinitions, conceptDefinitionsDlp } from "@/data/conceptDefinitions";
import { allKamusTerms, DictTerm } from "@/data/kamusData";
import { allFormulas, FormulaItem } from "@/data/formulaData";
import { getLessonCheatNote } from "@/data/cheatNotesData";
import { MathFormula } from "@/components/MathFormula";
import { QAItem, QAReply, getLessonQAItems } from "@/data/qaDatabase";
import { checkQuickAbusive } from "@/utils/moderation";
import { deobfuscateId, useDRMProtection } from "@/utils/security";
import { useUserActivity } from "@/context/UserActivityContext";
import { useAuth } from "@/context/AuthContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  addAIReplyNotification,
  recordPendingQuestion,
  removePendingQuestion
} from "@/utils/notificationStore";

interface VideoPlayerViewProps {
  currentLesson: VideoLesson;
  onBack: () => void;
  onSelectLesson: (lesson: VideoLesson) => void;
  initialTab?: "overview" | "notes" | "qa";
  highlightQuestionId?: string | null;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  currentLesson,
  onBack,
  onSelectLesson,
  initialTab = "overview",
  highlightQuestionId = null
}) => {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, addToHistory, videoStats, updateResumeTime } = useUserActivity();
  const { user } = useAuth();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoOpenedAt = useRef<number>(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");

  // Anti-Leaking Protection & Player State
  const [showProtectedNotice, setShowProtectedNotice] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const noticeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Activate DRM Protection (disables right-click context menu & devtools shortcuts)
  useDRMProtection();

  // Listen to postMessage from YouTube iframe
  useEffect(() => {
    const handleWindowMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data && data.event === "infoDelivery" && data.info && typeof data.info.playerState !== "undefined") {
          // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
          if (data.info.playerState === 1) setIsPlaying(true);
          if (data.info.playerState === 2) setIsPlaying(false);
        }
      } catch (err) {}
    };
    window.addEventListener("message", handleWindowMessage);
    return () => window.removeEventListener("message", handleWindowMessage);
  }, []);

  const sendPlayerCommand = (command: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: args,
        }),
        "*"
      );
    }
  };

  const handleShieldClick = () => {
    if (isPlaying) {
      sendPlayerCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      sendPlayerCommand("playVideo");
      setIsPlaying(true);
    }
    setShowProtectedNotice(true);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setShowProtectedNotice(false);
    }, 2500);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
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
      if (!(document as any).webkitFullscreenElement) {
        (containerRef.current as any).webkitRequestFullscreen();
      } else {
        (document as any).webkitExitFullscreen();
      }
    } else {
      setIsFullscreen(!isFullscreen);
    }
  };

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

  const watchableDuration = Math.max(1, totalSeconds > 0 ? totalSeconds : 600);
  const [currentStartSeconds, setCurrentStartSeconds] = useState(0);

  useEffect(() => {
    if (currentLesson && currentLesson.id) {
      addToHistory(currentLesson.id);
      videoOpenedAt.current = Date.now();
      
      const localSavedTime = localStorage.getItem(`physflix_resume_${currentLesson.id}`);
      const firebaseSavedTime = videoStats[currentLesson.id]?.lastWatchedSeconds;
      
      let startSecs = 0;
      const threshold = totalSeconds > 0 ? totalSeconds - 30 : Infinity;

      if (localSavedTime && parseInt(localSavedTime) > 0 && parseInt(localSavedTime) < threshold) {
        startSecs = parseInt(localSavedTime);
      } else if (firebaseSavedTime && firebaseSavedTime > 0 && firebaseSavedTime < threshold) {
        startSecs = firebaseSavedTime;
      }
      
      setCurrentStartSeconds(startSecs);
      
      if (currentLesson.youtubeId) {
        const origin = typeof window !== "undefined" ? window.location.origin : "https://physflix.vercel.app";
        setIframeSrc(`https://www.youtube.com/embed/${currentLesson.youtubeId}?enablejsapi=1&start=${startSecs}&rel=0&modestbranding=1&autoplay=1&controls=1&playsinline=1&iv_load_policy=3&origin=${encodeURIComponent(origin)}&widget_referrer=${encodeURIComponent(origin)}`);
      } else if (currentLesson.driveId) {
        const driveUrl = `https://drive.google.com/file/d/${deobfuscateId(currentLesson.driveId)}/preview`;
        setIframeSrc(`${driveUrl}?t=${startSecs}s`);
      }
    }
    
    // Auto-scroll screen to video player
    const screenTimer = setTimeout(() => {
      if (window.innerWidth < 768 && containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    
    return () => clearTimeout(screenTimer);
  }, [currentLesson]);

  // Track and save video progress continuously for Auto-Resume
  useEffect(() => {
    if (!currentLesson || !currentLesson.id || currentLesson.isPendingUpload) return;
    
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      const elapsedSecs = Math.floor((Date.now() - videoOpenedAt.current) / 1000);
      const currentProgress = currentStartSeconds + elapsedSecs;
      
      localStorage.setItem(`physflix_resume_${currentLesson.id}`, currentProgress.toString());
      
      if (ticks >= 12) {
        updateResumeTime(currentLesson.id, currentProgress, 0, watchableDuration);
        ticks = 0;
      }
    }, 5000);
    
    return () => {
      clearInterval(interval);
      if (currentLesson && currentLesson.id) {
        const timeSpent = Math.floor((Date.now() - videoOpenedAt.current) / 1000);
        const currentProgress = currentStartSeconds + timeSpent;
        updateResumeTime(currentLesson.id, currentProgress, 0, watchableDuration);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLesson, currentStartSeconds, watchableDuration]);

  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "qa">(
    initialTab || (highlightQuestionId ? "qa" : "overview")
  );

  // Auto-scroll and highlight target question from bell notification
  useEffect(() => {
    if (highlightQuestionId) {
      setActiveTab("qa");
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(`qa-item-${highlightQuestionId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 400);
      return () => clearTimeout(scrollTimer);
    }
  }, [highlightQuestionId]);
  const [sidebarTab, setSidebarTab] = useState<"playlist" | "tools" | "quiz">("playlist");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareText, setShareText] = useState("Kongsi");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Fetch verified related formulas for this video lesson
  const relatedFormulas = React.useMemo(() => {
    if (!currentLesson?.relatedFormulaIds || currentLesson.relatedFormulaIds.length === 0) return [];
    return currentLesson.relatedFormulaIds
      .map((id) => allFormulas.find((f) => f.id === id))
      .filter((f): f is FormulaItem => !!f);
  }, [currentLesson?.relatedFormulaIds]);

  const handleCopyFormula = (id: string, formulaStr: string) => {
    navigator.clipboard.writeText(formulaStr);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  // Find exact definition from Modul TasFiz / DSKP for clicked concept
  const getConceptInfo = (conceptName: string | null): DictTerm | null => {
    if (!conceptName) return null;
    const clean = conceptName.toLowerCase().trim();
    // 1. Exact match BM or DLP
    let match = allKamusTerms.find(
      (t) => t.bm.toLowerCase() === clean || t.dlp.toLowerCase() === clean
    );
    // 2. Substring match
    if (!match) {
      match = allKamusTerms.find(
        (t) => t.bm.toLowerCase().includes(clean) || clean.includes(t.bm.toLowerCase()) ||
               t.dlp.toLowerCase().includes(clean) || clean.includes(t.dlp.toLowerCase())
      );
    }
    if (match) return match;

    // 3. Fallback to conceptDefinitions (exact key)
    const directDefBm = conceptDefinitions[conceptName];
    const directDefDlp = conceptDefinitionsDlp[conceptName] || directDefBm;
    if (directDefBm) {
      return {
        id: `custom-${conceptName}`,
        form: currentLesson.form,
        chapterNum: 0,
        chapterBm: currentLesson.chapterBm,
        chapterDlp: currentLesson.chapterDlp,
        bm: conceptName,
        dlp: conceptName,
        defBm: directDefBm,
        defDlp: directDefDlp,
      };
    }

    // 4. Case-insensitive key lookup in conceptDefinitions
    const defKey = Object.keys(conceptDefinitions).find(
      (k) => k.toLowerCase() === clean || clean.includes(k.toLowerCase()) || k.toLowerCase().includes(clean)
    );
    if (defKey && conceptDefinitions[defKey]) {
      return {
        id: `custom-${defKey}`,
        form: currentLesson.form,
        chapterNum: 0,
        chapterBm: currentLesson.chapterBm,
        chapterDlp: currentLesson.chapterDlp,
        bm: defKey,
        dlp: defKey,
        defBm: conceptDefinitions[defKey],
        defDlp: conceptDefinitionsDlp[defKey] || conceptDefinitions[defKey],
      };
    }

    return null;
  };

  // Auto-scroll to currently playing video in playlist
  useEffect(() => {
    if (sidebarTab === "playlist") {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById("current-playing-video");
        const container = document.getElementById("playlist-container");
        if (el && container) {
          container.scrollTo({
            top: el.offsetTop - container.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      }, 200);
      return () => clearTimeout(scrollTimer);
    }
  }, [sidebarTab, currentLesson.id]);

  useEffect(() => {
    if (!currentLesson?.id) return;
    
    const localLiked = localStorage.getItem(`liked_${currentLesson.id}`) === "true";
    setLiked(localLiked);

    const trackViewAndFetchStats = async () => {
      if (!isSupabaseConfigured) {
        setLikeCount(localLiked ? 1 : 0);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("video_stats")
          .select("likes, views")
          .eq("id", currentLesson.id)
          .maybeSingle();

        const currentLikes = (data && typeof data.likes === "number") ? data.likes : 0;
        const currentViews = (data && typeof data.views === "number") ? data.views : 0;
        const newViews = currentViews + 1;

        setLikeCount(currentLikes);

        // Record real view increment
        await supabase.from("video_stats").upsert({
          id: currentLesson.id,
          likes: currentLikes,
          views: newViews,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        setLikeCount(0);
      }
    };
    trackViewAndFetchStats();
  }, [currentLesson]);

  // Soal Jawab (Q&A) State & Logic - Real Student/Teacher Q&A
  const [qaList, setQaList] = useState<QAItem[]>([]);
  const [qaCategory, setQaCategory] = useState<"Semua" | "Konsep" | "Pengiraan" | "SPM Kertas 2" | "SPM Kertas 1" | "Amali">("Semua");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState<"Konsep" | "Pengiraan" | "SPM Kertas 2" | "SPM Kertas 1" | "Amali">("Konsep");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [qaFilterTeacherOnly, setQaFilterTeacherOnly] = useState(false);
  const [isModerating, setIsModerating] = useState(false);
  const [moderationError, setModerationError] = useState<string | null>(null);

  const [isGeneratingAIAnswer, setIsGeneratingAIAnswer] = useState<{ [id: string]: boolean }>({});
  const [isCommentServiceDisabled, setIsCommentServiceDisabled] = useState(false);

  const userEmail = user?.email?.toLowerCase().trim() || "";
  const isSuperAdmin = ["ahalimroslan@gmail.com", "abdulhalimroslan@gmail.com"].includes(userEmail);

  // Public Real-Time Q&A Synchronization with Lossless Merging & Auto-Healing
  const fetchPublicQA = useCallback(async () => {
    try {
      const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
      if (!vid) return;

      // 1. Read existing local questions from localStorage
      const storageKey = `physflix_qa_${vid}`;
      let localItems: QAItem[] = [];
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) localItems = JSON.parse(saved);
      } catch {}

      const res = await fetch(`/api/qa?videoId=${encodeURIComponent(vid)}`);
      if (res.ok) {
        const data = await res.json();
        const serverQuestions: QAItem[] = Array.isArray(data.questions) ? data.questions : [];

        // Lossless Merge: Combine server questions + local questions so nothing is ever lost
        const mergedMap = new Map<string, QAItem>();

        // Add local items first
        localItems.forEach((q) => mergedMap.set(q.id, q));

        // Overlay server items
        serverQuestions.forEach((serverQ) => {
          const localQ = mergedMap.get(serverQ.id);
          if (localQ) {
            // Merge replies
            const replyMap = new Map<string, QAReply>();
            (localQ.replies || []).forEach((r) => replyMap.set(r.id, r));
            (serverQ.replies || []).forEach((r) => replyMap.set(r.id, r));
            mergedMap.set(serverQ.id, {
              ...localQ,
              ...serverQ,
              replies: Array.from(replyMap.values()),
            });
          } else {
            mergedMap.set(serverQ.id, serverQ);
          }
        });

        const mergedList = Array.from(mergedMap.values());
        setQaList(mergedList);
        try {
          localStorage.setItem(storageKey, JSON.stringify(mergedList));
        } catch {}

        // Check if client has questions that server is missing (e.g. after Vercel redeploy)
        const serverIds = new Set(serverQuestions.map((q) => q.id));
        const missingOnServer = localItems.filter((lq) => !serverIds.has(lq.id));
        if (missingOnServer.length > 0) {
          // Auto-heal: Push missing items to server!
          fetch("/api/qa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "sync_local_items",
              videoId: vid,
              items: missingOnServer,
            }),
          }).catch((e) => console.warn("Background auto-heal sync error:", e));
        }
      }
    } catch (err) {
      console.warn("Failed to fetch public QA:", err);
    }
  }, [currentLesson.id, currentLesson.youtubeId, currentLesson.driveId]);

  useEffect(() => {
    setModerationError(null);
    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
    const storageKey = `physflix_qa_${vid}`;
    const savedQA = localStorage.getItem(storageKey);
    if (savedQA) {
      try {
        const parsed = JSON.parse(savedQA);
        if (Array.isArray(parsed)) {
          setQaList(parsed);
        }
      } catch (e) {
        console.warn("Failed to parse cached QA", e);
      }
    }

    // Fetch latest public QA immediately
    fetchPublicQA();

    // Poll every 8 seconds so other users' comments and AI answers sync live
    const interval = setInterval(fetchPublicQA, 8000);
    return () => clearInterval(interval);
  }, [currentLesson.id, currentLesson.youtubeId, currentLesson.driveId, fetchPublicQA]);

  const triggerAIAnswer = async (targetQuestion: QAItem) => {
    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
    setIsGeneratingAIAnswer((prev) => ({ ...prev, [targetQuestion.id]: true }));
    try {
      const res = await fetch("/api/ai-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: targetQuestion.question,
          lessonTitle: currentLesson.titleBm || currentLesson.titleDlp,
          lessonTitleBm: currentLesson.titleBm,
          lessonTitleDlp: currentLesson.titleDlp,
          chapterNum: currentLesson.chapterNum,
          form: currentLesson.form,
          lang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.answer) {
          // Persist the AI reply to public store so all users see it
          const saveRes = await fetch("/api/qa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "add_reply",
              videoId: vid,
              questionId: targetQuestion.id,
              text: data.answer,
              authorName: "Sir Halim",
              authorRole: "guru",
              isVerified: true,
              isAi: true,
              authorEmail: "ai@physflix.internal",
            }),
          });

          if (saveRes.ok) {
            const saveData = await saveRes.json();
            if (saveData.questions) {
              setQaList(saveData.questions);
              try {
                localStorage.setItem(`physflix_qa_${vid}`, JSON.stringify(saveData.questions));
              } catch {}
            }

            // Raise notification in the bell icon for student
            addAIReplyNotification({
              videoId: vid,
              questionId: targetQuestion.id,
              lessonTitleBm: currentLesson.titleBm,
              lessonTitleDlp: currentLesson.titleDlp,
              questionText: targetQuestion.question,
              replyText: data.answer,
              timestamp: "Baru sahaja",
              createdAt: Date.now(),
            });
            removePendingQuestion(targetQuestion.id);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to trigger AI answer:", err);
    } finally {
      setIsGeneratingAIAnswer((prev) => ({ ...prev, [targetQuestion.id]: false }));
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || isModerating) return;

    setModerationError(null);
    setIsCommentServiceDisabled(false);

    // 1. Instant heuristic check (0ms latency)
    const instantCheck = checkQuickAbusive(newQuestionText.trim());
    if (instantCheck.isAbusive) {
      setModerationError(
        lang === "bm"
          ? instantCheck.reason
          : "Your question contains inappropriate language. Please use polite and constructive terms."
      );
      return;
    }

    setIsModerating(true);

    try {
      // 2. Ox Alpha AI Deep Contextual Moderation
      const modRes = await fetch("/api/moderate-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newQuestionText.trim() }),
      });

      if (modRes.ok) {
        const modData = await modRes.json();
        if (modData.serviceDisabled) {
          setIsCommentServiceDisabled(true);
          setModerationError(
            modData.error ||
              (lang === "bm"
                ? "Ruang Soal Jawab ditutup sementara waktu kerana kuota AI Moderasi (Ox Alpha) telah habis / sedang diselenggara."
                : "Q&A section is temporarily closed for AI quota maintenance.")
          );
          setIsModerating(false);
          return;
        }
        if (modData.isAbusive) {
          setModerationError(
            modData.reason ||
              (lang === "bm"
                ? "Soalan anda dikesan mengandungi perkataan atau unsur yang tidak sopan / dilarang. Sila gunakan bahasa yang berhemah."
                : "Your question contains inappropriate or abusive language. Please use polite and educational terms.")
          );
          setIsModerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Moderation check error:", err);
    }

    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
    const authorName = user?.displayName || (user?.email ? user.email.split("@")[0] : (lang === "bm" ? "Pelajar Fizik SPM" : "Physics Student"));
    const authorRole = isSuperAdmin ? "guru" : "pelajar";

    try {
      // Save question publicly to server
      const qaRes = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_question",
          videoId: vid,
          question: newQuestionText.trim(),
          category: newQuestionCategory,
          authorName,
          authorRole,
        }),
      });

      if (qaRes.ok) {
        const data = await qaRes.json();
        if (data.questions) {
          setQaList(data.questions);
          try {
            localStorage.setItem(`physflix_qa_${vid}`, JSON.stringify(data.questions));
          } catch {}
        }
        setNewQuestionText("");
        setIsModerating(false);

        if (data.item) {
          // Record pending so background sync catches AI reply if user navigates away
          recordPendingQuestion({
            questionId: data.item.id,
            videoId: vid,
            questionText: data.item.question,
            lessonTitleBm: currentLesson.titleBm,
            lessonTitleDlp: currentLesson.titleDlp,
            askedAt: Date.now(),
          });
          // Automatically trigger conversational AI tutor explanation from Sir Halim AI
          triggerAIAnswer(data.item);
        }
        return;
      }
    } catch (err) {
      console.error("Failed to add public question:", err);
    }

    setIsModerating(false);
  };

  const handleLikeQuestion = async (id: string) => {
    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
    // Optimistic UI update
    setQaList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likes: isLiked ? item.likes + 1 : Math.max(0, item.likes - 1),
          };
        }
        return item;
      })
    );

    try {
      await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "like_question",
          videoId: vid,
          questionId: id,
        }),
      });
    } catch (e) {
      console.warn("Failed to like question:", e);
    }
  };

  const handleAddReply = async (questionId: string) => {
    if (!replyText.trim() || isModerating) return;

    setModerationError(null);
    setIsCommentServiceDisabled(false);

    // 1. Instant heuristic check (0ms latency)
    const instantCheck = checkQuickAbusive(replyText.trim());
    if (instantCheck.isAbusive) {
      setModerationError(
        lang === "bm"
          ? instantCheck.reason
          : "Your reply contains inappropriate language. Please use polite and constructive terms."
      );
      return;
    }

    setIsModerating(true);

    try {
      // 2. Ox Alpha AI Deep Contextual Moderation
      const modRes = await fetch("/api/moderate-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: replyText.trim() }),
      });

      if (modRes.ok) {
        const modData = await modRes.json();
        if (modData.serviceDisabled) {
          setIsCommentServiceDisabled(true);
          setModerationError(
            modData.error ||
              (lang === "bm"
                ? "Ruang Soal Jawab ditutup sementara waktu kerana kuota AI Moderasi (Ox Alpha) telah habis / sedang diselenggara."
                : "Q&A section is temporarily closed for AI quota maintenance.")
          );
          setIsModerating(false);
          return;
        }
        if (modData.isAbusive) {
          setModerationError(
            modData.reason ||
              (lang === "bm"
                ? "Balasan anda dikesan mengandungi perkataan yang tidak sopan / dilarang."
                : "Your reply contains inappropriate language.")
          );
          setIsModerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Moderation check error:", err);
    }

    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
    const authorName = user?.displayName || (isSuperAdmin ? "Sir Halim (Guru Fizik)" : (lang === "bm" ? "Pelajar Fizik SPM" : "Physics Student"));
    const authorRole = isSuperAdmin ? "guru" : "pelajar";

    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_reply",
          videoId: vid,
          questionId,
          text: replyText.trim(),
          authorName,
          authorRole,
          isVerified: isSuperAdmin,
          authorEmail: user?.email || "",
          isAi: false,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.questions) {
          setQaList(data.questions);
          try {
            localStorage.setItem(`physflix_qa_${vid}`, JSON.stringify(data.questions));
          } catch {}
        }
      }
    } catch (err) {
      console.error("Failed to add reply:", err);
    }

    setReplyText("");
    setActiveReplyId(null);
    setIsModerating(false);
  };

  const handleLikeReply = async (questionId: string, replyId: string) => {
    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
    setQaList((prev) =>
      prev.map((item) => {
        if (item.id === questionId) {
          return {
            ...item,
            replies: item.replies.map((r) => (r.id === replyId ? { ...r, likes: r.likes + 1 } : r)),
          };
        }
        return item;
      })
    );

    try {
      await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "like_reply",
          videoId: vid,
          questionId,
          replyId,
        }),
      });
    } catch (e) {
      console.warn("Failed to like reply:", e);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!isSuperAdmin) return;
    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;
    
    // Optimistic UI update
    setQaList((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await fetch("/api/qa", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: vid,
          questionId: id,
          userEmail: user?.email || "",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.questions) {
          setQaList(data.questions);
          try {
            localStorage.setItem(`physflix_qa_${vid}`, JSON.stringify(data.questions));
          } catch {}
        }
      }
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  const handleDeleteReply = async (questionId: string, replyId: string) => {
    if (!isSuperAdmin) return;
    const vid = currentLesson.id || currentLesson.youtubeId || currentLesson.driveId;

    // Optimistic UI update
    setQaList((prev) =>
      prev.map((item) => {
        if (item.id === questionId) {
          return {
            ...item,
            replies: item.replies.filter((r) => r.id !== replyId),
          };
        }
        return item;
      })
    );

    try {
      const res = await fetch("/api/qa", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: vid,
          questionId,
          replyId,
          userEmail: user?.email || "",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.questions) {
          setQaList(data.questions);
          try {
            localStorage.setItem(`physflix_qa_${vid}`, JSON.stringify(data.questions));
          } catch {}
        }
      }
    } catch (err) {
      console.error("Failed to delete reply:", err);
    }
  };

  const filteredQAList = qaList.filter((item) => {
    if (qaFilterTeacherOnly && !item.replies.some((r) => r.authorRole === "guru" || r.isVerified)) {
      return false;
    }
    if (qaCategory === "Semua") return true;
    return item.category === qaCategory;
  });

  const handleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    const newCount = newLikedState ? likeCount + 1 : Math.max(0, likeCount - 1);
    setLikeCount(newCount);
    localStorage.setItem(`liked_${currentLesson.id}`, newLikedState ? "true" : "false");
    
    if (isSupabaseConfigured) {
      try {
        await supabase.from("video_stats").update({
          likes: newCount,
          updated_at: new Date().toISOString(),
        }).eq("id", currentLesson.id);
      } catch (e) {
        console.warn("Error updating likes in Supabase", e);
      }
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: currentLesson.titleBm,
      text: "Jom tonton video pengajaran Fizik ini di PhysFlix!",
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

  return (
    <div className="w-full space-y-4 md:space-y-6 select-none">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#121622] hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span className="font-bold text-slate-200">Kembali</span>
        </button>

        {user?.email && (
          <span className="text-[10px] text-slate-500 opacity-40 select-all hidden sm:inline">{user.email}</span>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <span className="flex items-center space-x-1 text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
            <Lock className="w-3 h-3" />
            <span>HD Stream</span>
          </span>
          <span>•</span>
          <span className="text-red-400">
            {lang === "bm" ? currentLesson.chapterBm : currentLesson.chapterDlp}
          </span>
        </div>
      </div>

      {/* Main Grid: Player on Left, Playlist/Tools on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Video Player & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Outer Wrapper */}
          <div
            ref={containerRef}
            className={`mx-auto bg-black flex items-center justify-center shadow-2xl ${
              isFullscreen ? "fixed inset-0 z-[100] h-[100dvh] w-screen rounded-none" : "relative w-full border border-slate-800 rounded-xl overflow-hidden aspect-[4/3] md:aspect-video"
            }`}
          >
            {/* Mobile Fullscreen Back Button */}
            {isFullscreen && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="absolute top-4 left-4 z-[110] bg-black/60 hover:bg-black/80 text-white p-3 rounded-full md:hidden flex items-center justify-center border border-white/20 shadow-xl cursor-pointer"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}

            {/* Inner Container - 16:9 Aspect Ratio */}
            <div 
              className="relative overflow-hidden bg-black w-full h-full flex items-center justify-center select-none"
              onContextMenu={(e) => {
                e.preventDefault();
                return false;
              }}
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
              {currentLesson.form === 5 || currentLesson.isPendingUpload || !currentLesson.youtubeId ? (
                <div className="absolute inset-0 z-30 bg-gradient-to-br from-[#0e1320] via-[#090c15] to-[#04060a] flex flex-col items-center justify-center p-6 text-center space-y-4 md:space-y-6">
                  {/* Subtle Grid / glow */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  {/* Icon Card */}
                  <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-red-950/40 border border-red-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.25)]">
                    <Video className="w-8 h-8 md:w-10 md:h-10 text-red-400 animate-pulse" />
                  </div>

                  {/* Text Details */}
                  <div className="relative z-10 space-y-2 max-w-xl px-2">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] md:text-xs font-black uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === "bm" ? "Tingkatan 5 • Sedang Diproses" : "Form 5 • Processing"}</span>
                    </div>
                    
                    <h2 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight">
                      {lang === "bm" 
                        ? "Video Pembelajaran Akan Dimuat Naik Dalam Masa Terdekat" 
                        : "Lesson Video Will Be Uploaded Soon"}
                    </h2>
                    
                    <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                      {lang === "bm"
                        ? `Rakaman video pengajaran bagi topik "${currentLesson.titleBm}" sedang disediakan. Anda boleh membaca nota ringkas, menyemak DSKP atau mencuba kuiz "Uji Minda" di panel sebelah!`
                        : `Video recording for "${currentLesson.titleDlp}" is being prepared. You can read summary notes, check DSKP or try the "Uji Minda" quiz on the side panel!`}
                    </p>
                  </div>

                  {/* Interactive Quick Links */}
                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button
                      onClick={() => setSidebarTab("quiz")}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-950/80 flex items-center space-x-2 cursor-pointer active:scale-95"
                    >
                      <Brain className="w-4 h-4" />
                      <span>{lang === "bm" ? "Mula Kuiz Uji Minda" : "Start Quiz"}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("notes")}
                      className="px-4 py-2.5 rounded-xl bg-[#151b2a] hover:bg-slate-800 text-slate-200 text-xs font-bold transition border border-slate-700/80 flex items-center space-x-2 cursor-pointer active:scale-95"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>{lang === "bm" ? "Buka Nota Ringkas" : "Open Notes"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full select-none" onContextMenu={(e) => { e.preventDefault(); return false; }}>
                  <iframe
                    ref={iframeRef}
                    src={iframeSrc}
                    className="w-full h-full border-0 select-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={currentLesson.titleBm}
                  ></iframe>

                  {/* 1. TOP HEADER SHIELD: Blocks YouTube Channel Avatar, Video Title, and Share Link */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShieldClick();
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="absolute top-0 left-0 w-[78%] h-14 sm:h-16 md:h-20 z-20 cursor-pointer pointer-events-auto bg-transparent"
                    title={lang === "bm" ? "Kandungan Eksklusif PhysFlix (Pautan Luar Dinyahaktifkan)" : "PhysFlix Exclusive Content"}
                  />

                  {/* 2. BOTTOM RIGHT LOGO SHIELD: Blocks YouTube Logo while keeping Fullscreen icon clickable */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShieldClick();
                    }}
                    className="absolute bottom-0 right-9 sm:right-11 w-22 sm:w-28 h-10 sm:h-12 z-20 cursor-default pointer-events-auto bg-transparent"
                    title="PhysFlix Protected Player"
                  />

                  {/* 3. BOTTOM LEFT SHIELD: Blocks Share / Watch Later popups if video is paused */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShieldClick();
                    }}
                    className="absolute bottom-1 left-2 w-28 h-12 z-20 cursor-pointer pointer-events-auto bg-transparent"
                  />

                  {/* 4. FLOATING FEEDBACK BADGE WHEN CLICKED */}
                  {showProtectedNotice && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-slate-950/90 border border-red-500/50 text-white text-xs font-bold shadow-2xl flex items-center space-x-2 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md pointer-events-none">
                      <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>
                        {lang === "bm" 
                          ? "🔒 Kandungan Eksklusif PhysFlix • Pautan Luar Dinyahaktifkan" 
                          : "🔒 PhysFlix Exclusive Content • External Links Disabled"}
                      </span>
                    </div>
                  )}
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
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                      liked ? "bg-red-600 text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{likeCount}</span>
                  </button>
                  <button className="px-2.5 py-1.5 text-slate-400 hover:text-white border-l border-slate-800 cursor-pointer">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button 
                  onClick={handleShare}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#131826] hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{shareText === "Kongsi" ? t("btnShare") : shareText}</span>
                </button>

                <button
                  onClick={() => toggleBookmark(currentLesson.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
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
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 text-sm font-semibold transition cursor-pointer"
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
                className={`pb-3 whitespace-nowrap transition cursor-pointer ${
                  activeTab === "overview"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabOverview")}
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-3 whitespace-nowrap transition cursor-pointer ${
                  activeTab === "notes"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("tabNotes")}
              </button>
              <button
                onClick={() => setActiveTab("qa")}
                className={`pb-3 whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "qa"
                    ? "border-b-2 border-red-500 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{t("tabQA")}</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition ${
                  activeTab === "qa" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"
                }`}>
                  {qaList.length}
                </span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* What You'll Learn */}
                  <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {t("whatYoullLearn")}
                    </h3>
                    <ul className="space-y-2.5">
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

                  {/* Key Concepts with Dictionary Definition */}
                  <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        {t("keyConcepts")}
                      </h3>
                      <span className="text-[10px] text-slate-400">
                        {lang === "bm" ? "Klik untuk definisi" : "Click for definition"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(lang === "bm" ? currentLesson.keyConceptsBm : currentLesson.keyConceptsDlp).map(
                        (concept, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedConcept(selectedConcept === concept ? null : concept)}
                            className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                              selectedConcept === concept
                                ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 scale-105"
                                : "bg-[#1a2133] border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                            }`}
                          >
                            <span>{concept}</span>
                          </button>
                        )
                      )}
                    </div>

                    {selectedConcept && (() => {
                      const info = getConceptInfo(selectedConcept);
                      return (
                        <div className="mt-3 p-4 bg-slate-900/90 border border-slate-700/80 rounded-xl relative animate-in fade-in slide-in-from-top-2 duration-300 space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-red-400">{info ? (lang === "bm" ? info.bm : info.dlp) : selectedConcept}</h4>
                              {info && info.dlp && lang === "bm" && (
                                <span className="text-[10px] text-slate-400 italic">({info.dlp})</span>
                              )}
                              {info && info.bm && lang === "dlp" && (
                                <span className="text-[10px] text-slate-400 italic">({info.bm})</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              {info?.symbol && (
                                <span className="px-2 py-0.5 bg-purple-950/80 border border-purple-800 text-purple-300 text-[10px] font-mono font-bold rounded">
                                  {info.symbol}
                                </span>
                              )}
                              {info?.sk && (
                                <span className="px-2 py-0.5 bg-blue-950/80 border border-blue-800 text-blue-300 text-[10px] font-bold rounded">
                                  {info.sk}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-xs text-slate-200 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-slate-800/80">
                            {info ? (
                              <div>
                                <p className="font-medium text-slate-200">
                                  {lang === "bm" ? info.defBm : info.defDlp}
                                </p>
                                {lang === "bm" && info.defDlp && (
                                  <p className="mt-1.5 text-[11px] text-slate-400 italic border-t border-slate-800 pt-1">
                                    DLP: {info.defDlp}
                                  </p>
                                )}
                                {lang === "dlp" && info.defBm && (
                                  <p className="mt-1.5 text-[11px] text-slate-400 italic border-t border-slate-800 pt-1">
                                    BM: {info.defBm}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p className="text-slate-300">
                                {lang === "bm"
                                  ? (conceptDefinitions[selectedConcept] || "Definisi untuk konsep ini selaras dengan Sukatan DSKP KSSM Fizik.")
                                  : (conceptDefinitionsDlp[selectedConcept] || "The definition for this concept aligns with KSSM SPM Physics DSKP standard.")}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Related Formulas Section */}
                <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg">
                        <Sigma className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                          {lang === "bm" ? "Formula Berkaitan (KSSM SPM)" : "Related Formulas (KSSM SPM)"}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {lang === "bm" 
                            ? "Rumus fizik rasmi yang terlibat dalam topik pembelajaran ini" 
                            : "Official physics formulas involved in this lesson"}
                        </p>
                      </div>
                    </div>
                    {relatedFormulas.length > 0 && (
                      <span className="px-2.5 py-1 bg-red-950/60 border border-red-800/80 text-red-300 text-[11px] font-bold rounded-lg">
                        {relatedFormulas.length} {lang === "bm" ? "Formula" : "Formulas"}
                      </span>
                    )}
                  </div>

                  {relatedFormulas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                      {relatedFormulas.map((formula) => (
                        <div
                          key={formula.id}
                          className="p-4 rounded-xl bg-[#151b2d] border border-slate-700/80 hover:border-red-500/50 transition-all flex flex-col justify-between group space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-300">
                              {lang === "bm" ? formula.topicBm : formula.topicDlp}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {formula.unit && (
                                <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-mono rounded border border-slate-700">
                                  {formula.unit}
                                </span>
                              )}
                              <button
                                onClick={() => handleCopyFormula(formula.id, formula.formula)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                                title="Salin Formula"
                              >
                                {copiedFormulaId === formula.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Mathematical KaTeX Equation */}
                          <div className="py-2.5 px-3 bg-black/40 rounded-lg border border-slate-800 flex items-center justify-center min-h-[52px]">
                            <MathFormula 
                              latex={formula.formulaDisplay || formula.formula} 
                              className="text-white text-base md:text-lg font-medium"
                            />
                          </div>

                          {/* Variable breakdown */}
                          <div className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2 space-y-1">
                            <p className="text-slate-300">
                              {lang === "bm" ? formula.variablesBm : formula.variablesDlp}
                            </p>
                            {formula.notes && (
                              <p className="text-[10px] text-amber-400/90 italic">
                                {formula.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed">
                      <p>
                        {lang === "bm"
                          ? "Topik ini berfokuskan kepada konsep kualitatif, prinsip teori, dan rajah sinar / aplikasi tanpa formula pengiraan khusus."
                          : "This topic focuses on qualitative concepts, theoretical principles, and ray diagrams / applications without specific calculation formulas."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "notes" && (() => {
              const cheatNote = getLessonCheatNote(currentLesson.id) || getLessonCheatNote(currentLesson.driveId);
              return (
                <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          {lang === "bm" ? "Ringkasan Nota" : "Summary Notes"}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {cheatNote?.dskpStandard || `${currentLesson.chapterBm} (Tingkatan ${currentLesson.form})`}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-slate-800/90 border border-slate-700/80 text-slate-300 text-xs font-semibold rounded-lg">
                      {currentLesson.chapterBm} • T{currentLesson.form}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Core Summary Points from CheatNote (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-4 bg-slate-900/90 border border-slate-700/70 rounded-xl space-y-3">
                        <h4 className="font-extrabold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-2 text-cyan-400">
                          <BookOpen className="w-4 h-4" />
                          {lang === "bm" ? "Fakta & Konsep Utama (CheatNote):" : "Key Facts & Concepts (CheatNote):"}
                        </h4>
                        <ul className="space-y-2.5">
                          {(cheatNote ? (lang === "bm" ? cheatNote.summaryPointsBm : cheatNote.summaryPointsDlp) : []).map(
                            (point, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                                <span>{point}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* SPM Exam Tips & Keywords (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 bg-amber-950/20 border border-amber-800/50 rounded-xl space-y-3">
                        <h4 className="font-extrabold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          {lang === "bm" ? "Tip Peperiksaan & Perangkap SPM:" : "SPM Exam Tips & Common Traps:"}
                        </h4>
                        <ul className="space-y-2">
                          {(cheatNote ? (lang === "bm" ? cheatNote.spmTipsBm : cheatNote.spmTipsDlp) : []).map(
                            (tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-amber-200/90 text-[11px] leading-relaxed">
                                <span className="text-amber-400 font-bold shrink-0">💡</span>
                                <span>{tip}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Important Keywords */}
                      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-purple-400" />
                            {lang === "bm" ? "Kata Kunci Penting (Kamus):" : "Essential Keywords:"}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {lang === "bm" ? "Klik untuk definisi" : "Click for definition"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(lang === "bm" ? currentLesson.keyConceptsBm : currentLesson.keyConceptsDlp).map((c, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedConcept(selectedConcept === c ? null : c)}
                              className={`px-2.5 py-1 border text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                                selectedConcept === c
                                  ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 scale-105 ring-2 ring-red-400/40"
                                  : "bg-slate-800/90 border-slate-700/80 text-slate-200 hover:bg-slate-700/90 hover:border-slate-500 hover:text-white"
                              }`}
                            >
                              <span>{c}</span>
                            </button>
                          ))}
                        </div>

                        {selectedConcept && (() => {
                          const info = getConceptInfo(selectedConcept);
                          return (
                            <div className="mt-2 p-3.5 bg-slate-950/95 border border-slate-700/90 rounded-xl relative animate-in fade-in slide-in-from-top-2 duration-300 space-y-2">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <h5 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                                    {info ? (lang === "bm" ? info.bm : info.dlp) : selectedConcept}
                                  </h5>
                                  {info && info.dlp && lang === "bm" && (
                                    <span className="text-[10px] text-slate-400 italic">({info.dlp})</span>
                                  )}
                                  {info && info.bm && lang === "dlp" && (
                                    <span className="text-[10px] text-slate-400 italic">({info.bm})</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {info?.symbol && (
                                    <span className="px-1.5 py-0.5 bg-purple-950/80 border border-purple-800 text-purple-300 text-[10px] font-mono font-bold rounded">
                                      {info.symbol}
                                    </span>
                                  )}
                                  {info?.sk && (
                                    <span className="px-1.5 py-0.5 bg-blue-950/80 border border-blue-800 text-blue-300 text-[10px] font-bold rounded">
                                      SK {info.sk}
                                    </span>
                                  )}
                                  <button
                                    onClick={() => setSelectedConcept(null)}
                                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition cursor-pointer"
                                    title="Tutup"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="text-xs text-slate-200 leading-relaxed bg-black/40 p-2.5 rounded-lg border border-slate-800/80">
                                {info ? (
                                  <div className="space-y-1.5">
                                    <p className="font-medium text-slate-200">
                                      {lang === "bm" ? info.defBm : info.defDlp}
                                    </p>
                                    {lang === "bm" && info.defDlp && (
                                      <p className="text-[11px] text-slate-400 italic border-t border-slate-800/80 pt-1">
                                        <span className="font-semibold text-slate-400 not-italic">DLP:</span> {info.defDlp}
                                      </p>
                                    )}
                                    {lang === "dlp" && info.defBm && (
                                      <p className="text-[11px] text-slate-400 italic border-t border-slate-800/80 pt-1">
                                        <span className="font-semibold text-slate-400 not-italic">BM:</span> {info.defBm}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-slate-300">
                                    {lang === "bm"
                                      ? (conceptDefinitions[selectedConcept] || "Definisi untuk konsep ini selaras dengan Sukatan DSKP KSSM Fizik.")
                                      : (conceptDefinitionsDlp[selectedConcept] || "The definition for this concept aligns with KSSM SPM Physics DSKP standard.")}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Related Formulas if available */}
                  {relatedFormulas.length > 0 && (
                    <div className="space-y-3 pt-2 border-t border-slate-800/80">
                      <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                        <Sigma className="w-4 h-4 text-red-400" />
                        {lang === "bm" ? "Formula Terlibat Dalam Topik Ini:" : "Formulas Involved in This Topic:"}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {relatedFormulas.map((f) => (
                          <div key={f.id} className="p-3.5 bg-[#151b2d] border border-slate-700/70 rounded-xl space-y-2">
                            <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-between">
                              <span>{lang === "bm" ? f.topicBm : f.topicDlp}</span>
                              {f.unit && (
                                <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">
                                  {f.unit}
                                </span>
                              )}
                            </div>
                            <div className="py-1.5 flex justify-center bg-black/40 rounded-lg border border-slate-800">
                              <MathFormula latex={f.formulaDisplay || f.formula} className="text-white text-base font-medium" />
                            </div>
                            <div className="text-[11px] text-slate-400 leading-relaxed">
                              {lang === "bm" ? f.variablesBm : f.variablesDlp}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {activeTab === "qa" && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#111624] border border-slate-800 space-y-6 text-slate-200">
                {/* Header & Stats Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/90 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        {lang === "bm" ? "Ruang Soal Jawab & Perbincangan Fizik" : "Physics Q&A & Discussion Forum"}
                        <span className="px-2.5 py-0.5 bg-red-600/90 text-white text-xs font-bold rounded-full">
                          {qaList.length} {lang === "bm" ? "Soalan" : "Questions"}
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {lang === "bm"
                          ? "Ajukan sebarang soalan & kemusykilan fizik tentang video ini untuk dijawab oleh Sir Halim & rakan pelajar."
                          : "Post your physics questions regarding this video to be answered by Sir Halim & fellow students."}
                      </p>
                    </div>
                  </div>

                  {/* AI Moderation & Stats Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    <span className="px-3 py-1 bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>AI Moderasi Aktif (Ox Alpha)</span>
                    </span>
                    {qaList.some(q => q.replies.some(r => r.authorRole === "guru" || r.isVerified)) && (
                      <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {qaList.filter(q => q.replies.some(r => r.authorRole === "guru" || r.isVerified)).length} {lang === "bm" ? "Dijawab Cikgu" : "Answered by Teacher"}
                      </span>
                    )}
                  </div>
                </div>

                {/* AI Service Disabled Maintenance Warning Banner */}
                {isCommentServiceDisabled && (
                  <div className="p-4 bg-amber-950/60 border border-amber-500/80 rounded-2xl text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in shadow-lg shadow-amber-950/40">
                    <div className="flex items-start gap-3 flex-1">
                      <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-amber-300 text-xs sm:text-sm">
                          {lang === "bm" ? "Ruang Soal Jawab Ditutup Sementara Waktu:" : "Q&A Section Temporarily Closed:"}
                        </p>
                        <p className="text-amber-200/90 leading-relaxed">
                          {lang === "bm"
                            ? "Fungsi menghantar soalan dan balasan baharu ditutup secara automatik sementara kuota AI Moderasi (Ox Alpha) diselenggara / diisi semula. Semua soalan dan jawapan sedia ada tetap boleh dibaca seperti biasa."
                            : "Posting new questions is automatically paused while Ox Alpha AI moderation quota is maintained. Existing Q&A remains readable."}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCommentServiceDisabled(false);
                        setModerationError(null);
                      }}
                      className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 rounded-xl text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 self-end sm:self-center"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {lang === "bm" ? "Semak Semula" : "Retry"}
                    </button>
                  </div>
                )}

                {/* Moderation Error Warning Banner */}
                {moderationError && !isCommentServiceDisabled && (
                  <div className="p-4 bg-red-950/90 border border-red-500 rounded-2xl text-red-200 text-xs flex items-start gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg shadow-red-950/50">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <p className="font-bold text-red-300 text-xs sm:text-sm">
                        {lang === "bm" ? "Mesej Disekat oleh AI Moderasi (Ox Alpha):" : "Message Blocked by Ox Alpha AI Moderation:"}
                      </p>
                      <p className="text-red-200/90 leading-relaxed">{moderationError}</p>
                    </div>
                    <button
                      onClick={() => setModerationError(null)}
                      className="text-red-400 hover:text-white p-1 rounded transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Ask a Question Form */}
                <form onSubmit={handleAddQuestion} className="p-4 sm:p-5 bg-[#141a29] border border-slate-700/80 rounded-2xl space-y-3.5 shadow-inner">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      {lang === "bm" ? "Tanya Soalan Baharu:" : "Ask a New Question:"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{lang === "bm" ? "Kategori:" : "Category:"}</span>
                      <select
                        value={newQuestionCategory}
                        disabled={isCommentServiceDisabled}
                        onChange={(e) => setNewQuestionCategory(e.target.value as any)}
                        className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-red-500 disabled:opacity-50"
                      >
                        <option value="Konsep">Konsep</option>
                        <option value="Pengiraan">Pengiraan</option>
                        <option value="SPM Kertas 2">SPM Kertas 2</option>
                        <option value="SPM Kertas 1">SPM Kertas 1</option>
                        <option value="Amali">Amali</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      rows={3}
                      value={newQuestionText}
                      disabled={isCommentServiceDisabled || isModerating}
                      onChange={(e) => {
                        setNewQuestionText(e.target.value);
                        if (moderationError) setModerationError(null);
                      }}
                      placeholder={
                        isCommentServiceDisabled
                          ? (lang === "bm" ? "Ruang Soal Jawab ditutup sementara waktu untuk penyelenggaraan kuota AI..." : "Q&A section is temporarily paused...")
                          : (lang === "bm"
                              ? `Tulis soalan anda tentang topik ${currentLesson.titleBm} di sini...`
                              : `Type your question about ${currentLesson.titleDlp} here...`)
                      }
                      className="w-full px-4 py-3 bg-[#0d121f] border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 resize-y disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-[10px]">
                        {user?.displayName ? user.displayName.substring(0, 1).toUpperCase() : "P"}
                      </div>
                      <span>
                        {user?.displayName || (user?.email ? user.email.split("@")[0] : (lang === "bm" ? "Pelajar Fizik SPM" : "Physics Student"))}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!newQuestionText.trim() || isModerating || isCommentServiceDisabled}
                      className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-red-600/30"
                    >
                      {isModerating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{lang === "bm" ? "Menyemak AI..." : "Checking AI..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{lang === "bm" ? "Hantar Soalan" : "Post Question"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Filter Tabs if questions exist */}
                {qaList.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 shrink-0 mr-1">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      {lang === "bm" ? "Tapis:" : "Filter:"}
                    </span>
                    {(["Semua", "Konsep", "Pengiraan", "SPM Kertas 2", "SPM Kertas 1", "Amali"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setQaCategory(cat);
                          setQaFilterTeacherOnly(false);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
                          qaCategory === cat && !qaFilterTeacherOnly
                            ? "bg-slate-700 text-white border border-slate-600"
                            : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                    <button
                      onClick={() => setQaFilterTeacherOnly(!qaFilterTeacherOnly)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer flex items-center gap-1 ${
                        qaFilterTeacherOnly
                          ? "bg-emerald-900/80 text-emerald-200 border border-emerald-700"
                          : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{lang === "bm" ? "Jawapan Guru Sahaja" : "Teacher Answers Only"}</span>
                    </button>
                  </div>
                )}

                {/* Questions Feed */}
                <div className="space-y-4 pt-1">
                  {filteredQAList.length === 0 ? (
                    <div className="p-8 sm:p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-400">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-200">
                          {lang === "bm"
                            ? "Belum ada soalan dikemukakan untuk topik ini."
                            : "No questions posted yet for this topic."}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                          {lang === "bm"
                            ? "Jadilah yang pertama mengemukakan soalan atau kemusykilan Fizik anda di atas. Sir Halim & rakan pelajar sedia membantu!"
                            : "Be the first to post a question above. Sir Halim and fellow students are here to help!"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    filteredQAList.map((item) => {
                      const isTargetHighlight = highlightQuestionId === item.id;
                      return (
                        <div
                          key={item.id}
                          id={`qa-item-${item.id}`}
                          className={`p-4 sm:p-5 rounded-2xl space-y-3.5 shadow-md transition-all duration-500 ${
                            isTargetHighlight
                              ? "bg-[#0c1e38] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/30 ring-4 ring-cyan-500/20"
                              : "bg-[#141a29] border border-slate-800/90 hover:border-slate-700"
                          }`}
                        >
                          {isTargetHighlight && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-950/90 border border-cyan-500/80 rounded-lg text-cyan-300 text-xs font-bold w-fit animate-pulse">
                              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{lang === "bm" ? "Soalan Terpilih Dari Pemberitahuan Loceng" : "Selected from Bell Notification"}</span>
                            </div>
                          )}
                        {/* Question Header */}
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white font-bold text-xs border border-white/10 shrink-0">
                              {item.authorAvatar ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={item.authorAvatar} alt={item.authorName} className="w-full h-full rounded-full object-cover" />
                              ) : (
                                item.authorName.substring(0, 2).toUpperCase()
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-xs sm:text-sm">{item.authorName}</span>
                                {item.authorRole === "admin" && (
                                  <span className="px-1.5 py-0.2 bg-red-950 text-red-400 border border-red-800 text-[9px] font-bold rounded">
                                    Admin
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-slate-800/90 border border-slate-700 text-slate-300 text-[10px] font-bold rounded-md">
                              {item.category}
                            </span>
                            {/* Delete button: SuperAdmin ONLY */}
                            {isSuperAdmin && (
                              <button
                                onClick={() => handleDeleteQuestion(item.id)}
                                className="p-1 text-slate-500 hover:text-red-400 rounded transition cursor-pointer"
                                title="Padam Soalan (Superadmin Sahaja)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Question Body */}
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-1 font-medium">
                          {item.question}
                        </p>

                        {/* Action Buttons: Like, Reply, and AI Tutor trigger */}
                        <div className="flex items-center gap-3 pt-1 text-xs border-t border-slate-800/80 flex-wrap">
                          <button
                            onClick={() => handleLikeQuestion(item.id)}
                            className={`flex items-center gap-1.5 font-semibold transition cursor-pointer ${
                              item.isLiked ? "text-red-400" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${item.isLiked ? "fill-red-400" : ""}`} />
                            <span>{item.likes > 0 ? item.likes : (lang === "bm" ? "Suka" : "Like")}</span>
                          </button>

                          <button
                            onClick={() => setActiveReplyId(activeReplyId === item.id ? null : item.id)}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-white font-semibold transition cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>
                              {lang === "bm" ? "Balas" : "Reply"} {item.replies.length > 0 && `(${item.replies.length})`}
                            </span>
                          </button>

                          <button
                            onClick={() => triggerAIAnswer(item)}
                            disabled={isGeneratingAIAnswer[item.id]}
                            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition cursor-pointer disabled:opacity-50 ml-auto px-2 py-0.5 rounded-lg bg-cyan-950/40 border border-cyan-800/60 hover:bg-cyan-900/50 shadow-sm"
                            title="Dapatkan jawapan santai & tepat daripada AI Tutor"
                          >
                            {isGeneratingAIAnswer[item.id] ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                                <span className="text-[11px]">{lang === "bm" ? "Menaip Jawapan..." : "Generating..."}</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3 h-3 text-cyan-400" />
                                <span className="text-[11px]">{lang === "bm" ? "Jawapan Balas" : "AI Reply"}</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Replies Section */}
                        {item.replies.length > 0 && (
                          <div className="space-y-2.5 pt-2 pl-3 sm:pl-6 border-l-2 border-slate-800">
                            {item.replies.map((reply) => {
                              const isAITutor = reply.isAi || reply.id.startsWith("reply-ai-") || reply.id === "reply-1788479876660-hzkyo" || reply.authorEmail === "ai@physflix.internal" || reply.authorName.includes("AI Tutor");
                              const isSuperAdminUser = !isAITutor && (
                                ["ahalimroslan@gmail.com", "abdulhalimroslan@gmail.com"].includes((reply.authorEmail || "").toLowerCase().trim()) ||
                                reply.authorName === "Abdul Halim Roslan" ||
                                reply.authorName === "Sir Halim (Guru Fizik)"
                              );
                              const isGuru = isSuperAdminUser || (reply.authorRole === "guru" && !isAITutor);
                              const displayAuthorName = isAITutor ? "Sir Halim (AI Tutor)" : reply.authorName;
                              return (
                                <div
                                  key={reply.id}
                                  className={`p-3.5 rounded-xl space-y-2 transition ${
                                    isAITutor
                                      ? "bg-[#0a1828] border border-cyan-600/70 shadow-lg shadow-cyan-950/50"
                                      : isSuperAdminUser
                                      ? "bg-[#081b2a] border border-sky-500/70 shadow-lg shadow-sky-950/40"
                                      : isGuru
                                      ? "bg-[#0b1622] border border-emerald-700/60 shadow-md"
                                      : "bg-[#0f1422] border border-slate-800"
                                  }`}
                                >
                                  <div className="flex items-center justify-between flex-wrap gap-1">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                                        isAITutor
                                          ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/30"
                                          : isSuperAdminUser
                                          ? "bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-500/30"
                                          : isGuru
                                          ? "bg-emerald-600"
                                          : "bg-slate-700"
                                      }`}>
                                        {isAITutor ? "AI" : (isSuperAdminUser ? "SH" : (isGuru ? "G" : displayAuthorName.substring(0, 1).toUpperCase()))}
                                      </div>
                                      <span className={`text-xs font-bold ${isAITutor ? "text-cyan-300" : (isSuperAdminUser ? "text-sky-300" : (isGuru ? "text-emerald-300" : "text-slate-200"))}`}>
                                        {displayAuthorName}
                                      </span>
                                      {isAITutor ? (
                                        <span className="px-2 py-0.5 bg-gradient-to-r from-cyan-900/90 to-blue-900/90 border border-cyan-500/80 text-cyan-200 text-[9px] font-extrabold rounded-full flex items-center gap-1 shadow-sm">
                                          <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                                          AI Tutor
                                        </span>
                                      ) : isSuperAdminUser ? (
                                        <span className="px-2 py-0.5 bg-sky-900/90 border border-sky-500/80 text-sky-200 text-[9px] font-extrabold rounded-full flex items-center gap-1 shadow-sm">
                                          <CheckCircle2 className="w-2.5 h-2.5 text-sky-400" />
                                          {lang === "bm" ? "Guru (Superadmin)" : "Teacher (Superadmin)"}
                                        </span>
                                      ) : isGuru ? (
                                        <span className="px-2 py-0.5 bg-emerald-900/90 border border-emerald-600/80 text-emerald-200 text-[9px] font-extrabold rounded-full flex items-center gap-1">
                                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                                          {lang === "bm" ? "Guru" : "Teacher"}
                                        </span>
                                      ) : null}
                                    </div>
                                    <span className="text-[10px] text-slate-500">{reply.timestamp}</span>
                                  </div>

                                  <p className="text-xs text-slate-200 leading-relaxed pl-8 whitespace-pre-line">
                                    {reply.text}
                                  </p>

                                  <div className="flex items-center justify-end pl-8 pt-1 gap-2">
                                    <button
                                      onClick={() => handleLikeReply(item.id, reply.id)}
                                      className="text-[10px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-semibold transition cursor-pointer"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{reply.likes > 0 ? reply.likes : ""} Bermanfaat</span>
                                    </button>

                                    {/* Delete reply: Superadmin ONLY */}
                                    {isSuperAdmin && (
                                      <button
                                        onClick={() => handleDeleteReply(item.id, reply.id)}
                                        className="text-[10px] text-slate-500 hover:text-red-400 flex items-center gap-1 font-semibold transition cursor-pointer ml-2"
                                        title="Padam Balasan (Superadmin Sahaja)"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                        <span>Padam</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Inline Reply Form */}
                        {activeReplyId === item.id && (
                          <div className="p-3 bg-[#0d121f] border border-slate-700/80 rounded-xl space-y-2 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                              <span>{lang === "bm" ? `Balas kepada ${item.authorName}:` : `Replying to ${item.authorName}:`}</span>
                              <button onClick={() => setActiveReplyId(null)} className="hover:text-white">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                autoFocus
                                disabled={isCommentServiceDisabled || isModerating}
                                value={replyText}
                                onChange={(e) => {
                                  setReplyText(e.target.value);
                                  if (moderationError) setModerationError(null);
                                }}
                                placeholder={
                                  isCommentServiceDisabled
                                    ? (lang === "bm" ? "Ruang Soal Jawab ditutup sementara waktu..." : "Q&A section is temporarily closed...")
                                    : (lang === "bm" ? "Tulis jawapan atau ulasan anda..." : "Write your response...")
                                }
                                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !isCommentServiceDisabled) {
                                    e.preventDefault();
                                    handleAddReply(item.id);
                                  }
                                }}
                              />
                              <button
                                onClick={() => handleAddReply(item.id)}
                                disabled={!replyText.trim() || isModerating || isCommentServiceDisabled}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center gap-1.5"
                              >
                                {isModerating ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Send className="w-3 h-3" />
                                )}
                                <span>{lang === "bm" ? "Hantar" : "Send"}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar (Playlist / Learning Tools) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-3xl bg-[#101420] border border-slate-800/80 shadow-2xl space-y-5">
            {/* Playlist vs Learning Tools Switch */}
            <div className="flex bg-[#161c2b] p-1 rounded-2xl border border-slate-800">
              <button
                onClick={() => setSidebarTab("playlist")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  sidebarTab === "playlist"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("tabPlaylist")}
              </button>
              <button
                onClick={() => setSidebarTab("tools")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  sidebarTab === "tools"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("tabLearningTools")}
              </button>
            </div>

            {/* Uji Minda Quiz Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 via-indigo-950/40 to-slate-900 border border-purple-800/40 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Uji Minda</h4>
                  <p className="text-[10px] text-slate-400">Latihan Kuiz Interaktif Fizik</p>
                </div>
              </div>

              <button
                onClick={() => setSidebarTab(sidebarTab === "quiz" ? "playlist" : "quiz")}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-white font-bold text-xs transition shadow-lg cursor-pointer ${
                  sidebarTab === "quiz"
                    ? "bg-slate-700 hover:bg-slate-600 shadow-slate-900"
                    : "bg-purple-600 hover:bg-purple-500 shadow-purple-950"
                }`}
              >
                <span>{sidebarTab === "quiz" ? "Tutup Kuiz" : "Mula Kuiz"}</span>
              </button>
            </div>

            {sidebarTab === "quiz" && (
              <QuizComponent key={currentLesson.titleBm} currentLesson={currentLesson} />
            )}

            {/* Chapters / Videos Playlist */}
            {sidebarTab === "playlist" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {t("tabChapters")} ({allVideoLessons.length} Video)
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold">{t("hide")}</span>
                </div>

                <div id="playlist-container" className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {allVideoLessons.map((lesson, idx) => {
                    const isCurrent = lesson.id === currentLesson.id;
                    return (
                      <div
                        key={lesson.id}
                        id={isCurrent ? "current-playing-video" : undefined}
                        onClick={() => onSelectLesson(lesson)}
                        className={`group cursor-pointer p-3 rounded-2xl border transition flex items-center space-x-3 ${
                          isCurrent
                            ? "bg-red-950/40 border-red-600/80 ring-1 ring-red-500/40"
                            : "bg-[#141a28] hover:bg-[#1a2234] border-slate-800/80"
                        }`}
                      >
                        {/* Mini Thumbnail */}
                        <div className="relative w-20 h-12 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
                          {lesson.thumbnailUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={lesson.thumbnailUrl}
                              alt={lesson.titleBm}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                          )}
                          {isCurrent && (
                            <div className="absolute inset-0 bg-red-950/60 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 fill-white text-white" />
                            </div>
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
