"use client";

import { useEffect } from "react";

// Obfuscation helpers for video stream IDs
export function obfuscateId(rawId: string): string {
  if (!rawId) return "";
  try {
    return btoa(rawId.split("").reverse().join(""));
  } catch (e) {
    return rawId;
  }
}

export function deobfuscateId(obfuscatedId: string): string {
  if (!obfuscatedId) return "";
  try {
    return atob(obfuscatedId).split("").reverse().join("");
  } catch (e) {
    return obfuscatedId;
  }
}

// DRM Protection Hook: Prevents DevTools shortcuts & right click inspect
export function useDRMProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Cmd+Alt+I, Cmd+Alt+J, Cmd+Option+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.altKey && (e.key === "i" || e.key === "j" || e.key === "c" || e.key === "u")) ||
        (e.ctrlKey && e.key === "u") ||
        (e.metaKey && e.key === "u")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
