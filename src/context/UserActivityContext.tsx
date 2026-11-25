"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

import { mergeQuizResults, type QuizResult } from "@/lib/schoolReports";

export interface VideoStat {
  totalTimeWatched: number;
  repeats: number;
  completionPercentage: number;
  lastWatchedSeconds?: number;
  lastUpdatedTimestamp?: number;
}

export interface VideoStatsMap {
  [driveId: string]: VideoStat;
}

interface UserActivityContextType {
  bookmarks: string[];
  watchHistory: string[];
  videoStats: VideoStatsMap;
  quizResults: Record<string, QuizResult>;
  activityLoading: boolean;
  recordQuizResult: (id: string, correct: number, total: number) => void;
  toggleBookmark: (driveId: string) => void;
  addToHistory: (driveId: string) => void;
  isBookmarked: (driveId: string) => boolean;
  updateVideoProgress: (driveId: string, timeSpentInSeconds: number, watchableDuration: number) => void;
  updateResumeTime: (driveId: string, timeInSeconds: number, minStartSecs: number, watchableDuration: number) => void;
  incrementRepeat: (driveId: string) => void;
}

const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

export const UserActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [watchHistory, setWatchHistory] = useState<string[]>([]);
  const [videoStats, setVideoStats] = useState<VideoStatsMap>({});
  
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [activityLoading, setActivityLoading] = useState(true);

  const dataLoadedFromRemote = useRef(false);
  const hydratedUserId = useRef<string | null>(null);

  // Helper to clean stats
  const sanitizeVideoStats = (stats: any): VideoStatsMap => {
    if (!stats || typeof stats !== "object") return {};
    const sanitized: VideoStatsMap = {};
    for (const [key, val] of Object.entries(stats)) {
      const stat = val as VideoStat;
      if (stat && typeof stat === "object") {
        if (stat.repeats > 50) {
          stat.repeats = 0;
          stat.totalTimeWatched = 0;
        }
        sanitized[key] = stat;
      }
    }
    return sanitized;
  };

  // Load from LocalStorage for instantaneous UI, then fetch from Supabase
  useEffect(() => {
    let cancelled = false;
    hydratedUserId.current = null;
    if (userId) {
      dataLoadedFromRemote.current = false;
      setActivityLoading(true);
      setBookmarks([]);
      setWatchHistory([]);
      setVideoStats({});
      setQuizResults({});
      const userKey = userId;

      // 1. Quick load from localStorage cache
      const storedBookmarks = localStorage.getItem(`bookmarks_${userKey}`);
      if (storedBookmarks) {
        try { setBookmarks(JSON.parse(storedBookmarks)); } catch (e) {}
      }

      const storedHistory = localStorage.getItem(`history_${userKey}`);
      if (storedHistory) {
        try { setWatchHistory(JSON.parse(storedHistory)); } catch (e) {}
      }

      const storedStats = localStorage.getItem(`videoStats_${userKey}`);
      if (storedStats) {
        try { setVideoStats(sanitizeVideoStats(JSON.parse(storedStats))); } catch (e) {}
      }

      let cachedQuizzes: Record<string, QuizResult> = {};
      try { cachedQuizzes = mergeQuizResults(JSON.parse(localStorage.getItem(`quizResults_${userKey}`) || "{}"), {}); } catch {}
      setQuizResults(cachedQuizzes);

      // 2. Supabase Sync
      const fetchFromSupabase = async () => {
        if (!isSupabaseConfigured) {
          dataLoadedFromRemote.current = true;
          hydratedUserId.current = userKey;
          setActivityLoading(false);
          return;
        }

        try {
          const { data, error } = await supabase
            .from("user_activity")
            .select("*")
            .eq("user_id", userKey)
            .maybeSingle();

          if (cancelled) return;
          if (error) {
            console.warn("Supabase fetch error, using local data:", error);
          } else if (data) {
            if (Array.isArray(data.bookmarks)) setBookmarks(data.bookmarks);
            if (Array.isArray(data.watch_history)) setWatchHistory(data.watch_history);
            setQuizResults(previous => mergeQuizResults(previous, data.quiz_results || {}));
            if (data.video_stats) setVideoStats(sanitizeVideoStats(data.video_stats));
          }
          dataLoadedFromRemote.current = !error;
        } catch (err) {
          console.warn("Error fetching Supabase activity:", err);
        } finally {
          if (!cancelled) {
            hydratedUserId.current = userKey;
            setActivityLoading(false);
          }
        }
      };

      fetchFromSupabase();
    } else {
      setBookmarks([]);
      setWatchHistory([]);
      setVideoStats({});
      setQuizResults({});
      setActivityLoading(false);
      dataLoadedFromRemote.current = false;
    }
    return () => { cancelled = true; };
  }, [userId]);

  // Save to LocalStorage & Supabase whenever they change
  useEffect(() => {
    if (user && !activityLoading && hydratedUserId.current === user.id) {
      const userKey = user.uid || user.id;

      localStorage.setItem(`bookmarks_${userKey}`, JSON.stringify(bookmarks));
      localStorage.setItem(`history_${userKey}`, JSON.stringify(watchHistory));
      localStorage.setItem(`videoStats_${userKey}`, JSON.stringify(videoStats));
      localStorage.setItem(`quizResults_${userKey}`, JSON.stringify(quizResults));
      
      if (!dataLoadedFromRemote.current) return;

      // Debounce writes without dropping the latest quiz/progress update.
      const controller = new AbortController();
      const timer = setTimeout(async () => {
        if (!isSupabaseConfigured) return;
        const activity = {
          user_id: userKey, bookmarks, watch_history: watchHistory,
          video_stats: videoStats, updated_at: new Date().toISOString(),
        };
        try {
          let { error } = await supabase.from("user_activity")
            .upsert({ ...activity, quiz_results: quizResults }, { onConflict: "user_id" })
            .abortSignal(controller.signal);
          // Preserve existing progress sync while the teacher migration is pending.
          if (error && ["42703", "PGRST204"].includes(error.code)) {
            ({ error } = await supabase.from("user_activity").upsert(activity, { onConflict: "user_id" }).abortSignal(controller.signal));
          }
          if (error && !controller.signal.aborted) console.error("Error syncing Supabase activity:", error.message);
        } catch (error) {
          if (!controller.signal.aborted) console.error("Error syncing Supabase activity:", error);
        }
      }, 400);
      return () => { clearTimeout(timer); controller.abort(); };
    }
  }, [bookmarks, watchHistory, videoStats, quizResults, activityLoading, user]);

  const recordQuizResult = (id: string, correct: number, total: number) => {
    if (!Number.isInteger(correct) || !Number.isInteger(total) || total < 1 || correct < 0 || correct > total) return;
    setQuizResults(previous => ({ ...previous, [id]: { correct, total, percentage: Math.round(correct / total * 100), completedAt: Date.now() } }));
  };

  const toggleBookmark = (driveId: string) => {
    setBookmarks((prev) => {
      if (prev.includes(driveId)) {
        return prev.filter((id) => id !== driveId);
      } else {
        return [...prev, driveId];
      }
    });
  };

  const addToHistory = (driveId: string) => {
    setWatchHistory((prev) => {
      const filtered = prev.filter((id) => id !== driveId);
      return [driveId, ...filtered].slice(0, 50);
    });
  };

  const incrementRepeat = (driveId: string) => {
    setVideoStats((prev) => {
      const current = prev[driveId] || { totalTimeWatched: 0, repeats: 0, completionPercentage: 0 };
      return {
        ...prev,
        [driveId]: {
          ...current,
          repeats: current.repeats + 1,
        },
      };
    });
  };

  const updateVideoProgress = (driveId: string, timeSpentInSeconds: number, watchableDuration: number) => {
    if (timeSpentInSeconds < 5) return;

    setVideoStats((prev) => {
      const current = prev[driveId] || { totalTimeWatched: 0, repeats: 0, completionPercentage: 0 };
      let newTotalTime = current.totalTimeWatched + timeSpentInSeconds;
      
      if (newTotalTime > watchableDuration * 50) {
        newTotalTime = watchableDuration;
      }
      
      let newCompletion = Math.round((newTotalTime / watchableDuration) * 100);
      if (newCompletion > 100) newCompletion = 100;

      if (newCompletion < current.completionPercentage && current.completionPercentage !== 100) {
        newCompletion = current.completionPercentage;
      }
      
      const calculatedRepeats = Math.floor(newTotalTime / (watchableDuration * 0.95));
      const newRepeats = calculatedRepeats > current.repeats || current.repeats > 50 ? calculatedRepeats : current.repeats;

      return {
        ...prev,
        [driveId]: {
          ...current,
          totalTimeWatched: newTotalTime,
          completionPercentage: newCompletion,
          repeats: newRepeats,
          lastUpdatedTimestamp: Date.now(),
        },
      };
    });
  };

  const updateResumeTime = (driveId: string, timeInSeconds: number, minStartSecs: number, watchableDuration: number) => {
    setVideoStats((prev) => {
      const current = prev[driveId] || { totalTimeWatched: 0, repeats: 0, completionPercentage: 0 };
      
      const watchedAmount = Math.max(0, timeInSeconds - minStartSecs);
      let newCompletion = Math.round((watchedAmount / watchableDuration) * 100);
      if (newCompletion > 100) newCompletion = 100;

      if (newCompletion < current.completionPercentage && current.completionPercentage !== 100) {
        newCompletion = current.completionPercentage;
      }
      
      return {
        ...prev,
        [driveId]: {
          ...current,
          lastWatchedSeconds: timeInSeconds,
          completionPercentage: newCompletion,
          lastUpdatedTimestamp: Date.now(),
        },
      };
    });
  };

  const isBookmarked = (driveId: string) => {
    return bookmarks.includes(driveId);
  };

  return (
    <UserActivityContext.Provider
      value={{
        bookmarks,
        watchHistory,
        videoStats,
        quizResults,
        activityLoading,
        recordQuizResult,
        toggleBookmark,
        addToHistory,
        isBookmarked,
        updateVideoProgress,
        updateResumeTime,
        incrementRepeat,
      }}
    >
      {children}
    </UserActivityContext.Provider>
  );
};

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (context === undefined) {
    throw new Error("useUserActivity must be used within a UserActivityProvider");
  }
  return context;
};
