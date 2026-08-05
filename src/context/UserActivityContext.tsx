"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface UserActivityContextType {
  bookmarks: string[]; // array of driveIds
  watchHistory: string[]; // array of driveIds
  toggleBookmark: (driveId: string) => void;
  addToHistory: (driveId: string) => void;
  isBookmarked: (driveId: string) => boolean;
}

const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

export const UserActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [watchHistory, setWatchHistory] = useState<string[]>([]);

  // Load from LocalStorage when user changes
  useEffect(() => {
    if (user) {
      const storedBookmarks = localStorage.getItem(`bookmarks_${user.uid}`);
      if (storedBookmarks) {
        try { setBookmarks(JSON.parse(storedBookmarks)); } catch (e) {}
      } else {
        setBookmarks([]);
      }

      const storedHistory = localStorage.getItem(`history_${user.uid}`);
      if (storedHistory) {
        try { setWatchHistory(JSON.parse(storedHistory)); } catch (e) {}
      } else {
        setWatchHistory([]);
      }
    } else {
      setBookmarks([]);
      setWatchHistory([]);
    }
  }, [user]);

  // Save to LocalStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`bookmarks_${user.uid}`, JSON.stringify(bookmarks));
    }
  }, [bookmarks, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`history_${user.uid}`, JSON.stringify(watchHistory));
    }
  }, [watchHistory, user]);

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
      // Remove it if it exists so we can push it to the front
      const filtered = prev.filter((id) => id !== driveId);
      // Put at the front
      return [driveId, ...filtered].slice(0, 50); // Keep max 50 recent videos
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
    throw new Error("useUserActivity must be used within a UserActivityProvider");
  }
  return context;
};
