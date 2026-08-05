"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

interface UserActivityContextType {
  bookmarks: string[];
  watchHistory: string[];
  toggleBookmark: (driveId: string) => void;
  addToHistory: (driveId: string) => void;
  isBookmarked: (driveId: string) => boolean;
}

const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

export const UserActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [watchHistory, setWatchHistory] = useState<string[]>([]);
  const isLoaded = useRef(false);

  // Load from LocalStorage when user changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (user && user.uid) {
      try {
        const storedBookmarks = localStorage.getItem(`bookmarks_${user.uid}`);
        if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
        } else {
          setBookmarks([]);
        }

        const storedHistory = localStorage.getItem(`history_${user.uid}`);
        if (storedHistory) {
          setWatchHistory(JSON.parse(storedHistory));
        } else {
          setWatchHistory([]);
        }
      } catch (e) {
        console.error("Error loading user activity from localStorage", e);
      } finally {
        isLoaded.current = true;
      }
    } else {
      setBookmarks([]);
      setWatchHistory([]);
      isLoaded.current = false;
    }
  }, [user]);

  // Save to LocalStorage whenever they change (only AFTER initial load)
  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded.current || !user || !user.uid) return;
    try {
      localStorage.setItem(`bookmarks_${user.uid}`, JSON.stringify(bookmarks));
    } catch (e) {}
  }, [bookmarks, user]);

  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded.current || !user || !user.uid) return;
    try {
      localStorage.setItem(`history_${user.uid}`, JSON.stringify(watchHistory));
    } catch (e) {}
  }, [watchHistory, user]);

  const toggleBookmark = (driveId: string) => {
    if (!driveId) return;
    setBookmarks((prev) => {
      if (prev.includes(driveId)) {
        return prev.filter((id) => id !== driveId);
      } else {
        return [...prev, driveId];
      }
    });
  };

  const addToHistory = (driveId: string) => {
    if (!driveId) return;
    setWatchHistory((prev) => {
      const filtered = prev.filter((id) => id !== driveId);
      return [driveId, ...filtered].slice(0, 50);
    });
  };

  const isBookmarked = (driveId: string) => {
    if (!driveId) return false;
    return bookmarks.includes(driveId);
  };

  return (
    <UserActivityContext.Provider
      value={{
        bookmarks,
        watchHistory,
        toggleBookmark,
        addToHistory,
        isBookmarked,
      }}
    >
      {children}
    </UserActivityContext.Provider>
  );
};

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (context === undefined) {
    return {
      bookmarks: [],
      watchHistory: [],
      toggleBookmark: () => {},
      addToHistory: () => {},
      isBookmarked: () => false,
    };
  }
  return context;
};
