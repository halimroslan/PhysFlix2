export const SUPERADMIN_EMAILS = [
  "ahalimroslan@gmail.com",
  "abdulhalimroslan@gmail.com",
  "g-41192875@moe-dl.edu.my",
];

export interface QAReply {
  id: string;
  authorName: string;
  authorRole: "pelajar" | "guru" | "rakan";
  authorEmail?: string;
  isAi?: boolean;
  isVerified?: boolean;
  text: string;
  timestamp: string;
  createdAt?: number;
  likes: number;
}

export interface QAItem {
  id: string;
  videoId: string;
  authorName: string;
  authorRole: "pelajar" | "guru" | "rakan";
  authorEmail?: string;
  timestamp: string;
  createdAt: number;
  category: "Konsep" | "Pengiraan" | "SPM Kertas 2" | "SPM Kertas 1" | "Amali";
  question: string;
  likes: number;
  isLiked?: boolean;
  replies: QAReply[];
}

export function isSuperadminReply(reply: QAReply | any): boolean {
  if (!reply) return false;
  if (
    reply.isAi === true ||
    reply.id?.startsWith("reply-ai-") ||
    reply.id === "reply-1788479876660-hzkyo" ||
    reply.authorEmail === "ai@physflix.internal"
  ) {
    return false;
  }
  const email = (reply.authorEmail || "").toLowerCase().trim();
  if (SUPERADMIN_EMAILS.includes(email)) {
    return true;
  }
  if (
    (reply.authorName === "Abdul Halim Roslan" || reply.authorName === "Sir Halim (Guru Fizik)") &&
    (reply.authorRole === "guru" || reply.isVerified)
  ) {
    return true;
  }
  return false;
}

export function isAiTutorReply(reply: QAReply | any): boolean {
  if (!reply) return false;
  return (
    reply.isAi === true ||
    reply.id?.startsWith("reply-ai-") ||
    reply.id === "reply-1788479876660-hzkyo" ||
    reply.authorEmail === "ai@physflix.internal" ||
    reply.authorName?.includes("AI Tutor") ||
    (reply.authorName === "Sir Halim" && !SUPERADMIN_EMAILS.includes((reply.authorEmail || "").toLowerCase().trim()))
  );
}
