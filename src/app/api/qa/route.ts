import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { checkQuickAbusive } from "@/utils/moderation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import defaultQaStore from "@/data/qa_store.json";
import { getUnifiedVideoIds, getCanonicalVideoId, VIDEO_ID_ALIASES } from "@/utils/videoResolution";

const STORE_PATH = path.join(process.cwd(), "src/data/qa_store.json");
const MASTER_BACKUP_PATH = "/Users/halimroslan/NEW CIDS SUITES PRO/physics-spm-flix-backup/qa_comments_archive/qa_store_master_backup.json";

export {
  SUPERADMIN_EMAILS,
  type QAReply,
  type QAItem,
  isSuperadminReply,
  isAiTutorReply,
} from "@/types/qa";
import { SUPERADMIN_EMAILS, QAReply, QAItem } from "@/types/qa";

// In-memory cache
let qaStoreCache: Record<string, QAItem[]> | null = null;

// Lossless store merger: ensures no question or AI reply is ever lost
function mergeStores(
  primary: Record<string, QAItem[]>,
  secondary: Record<string, QAItem[]>
): Record<string, QAItem[]> {
  const merged: Record<string, QAItem[]> = { ...secondary, ...primary };
  for (const [vid, items] of Object.entries(secondary)) {
    if (primary[vid]) {
      const primaryQuestionIds = new Set(primary[vid].map((q) => q.id));
      const missingQuestions = items.filter((q) => !primaryQuestionIds.has(q.id));

      const updatedPrimary = primary[vid].map((pq) => {
        const secQ = items.find((sq) => sq.id === pq.id);
        if (secQ && Array.isArray(secQ.replies)) {
          const existingReplyIds = new Set(pq.replies.map((r) => r.id));
          const missingReplies = secQ.replies.filter((r) => !existingReplyIds.has(r.id));
          if (missingReplies.length > 0) {
            return { ...pq, replies: [...pq.replies, ...missingReplies] };
          }
        }
        return pq;
      });

      merged[vid] = [...updatedPrimary, ...missingQuestions];
    } else {
      merged[vid] = items;
    }
  }
  return merged;
}

// 1. Supabase Cloud Persistence Engine - Multi-ID & Aliased Aware
async function fetchSupabaseQuestions(videoId: string): Promise<QAItem[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const vids = getUnifiedVideoIds(videoId);
    const allRows: any[] = [];

    for (const v of vids) {
      const { data, error } = await supabase
        .from("video_stats")
        .select("id")
        .like("id", `qa_q:${v}:%`);

      if (!error && data) {
        allRows.push(...data);
      }
    }

    const items: QAItem[] = [];
    const seenIds = new Set<string>();

    for (const row of allRows) {
      try {
        const parts = row.id.split(":");
        if (parts.length >= 4) {
          const firstColon = row.id.indexOf(":");
          const secondColon = row.id.indexOf(":", firstColon + 1);
          const thirdColon = row.id.indexOf(":", secondColon + 1);
          if (thirdColon !== -1) {
            const jsonStr = row.id.substring(thirdColon + 1);
            const parsed = JSON.parse(jsonStr) as QAItem;
            if (parsed && parsed.id && !seenIds.has(parsed.id)) {
              seenIds.add(parsed.id);
              parsed.videoId = videoId; // normalize to current target videoId
              items.push(parsed);
            }
          }
        }
      } catch (err) {
        console.warn("Error parsing Supabase QA row:", err);
      }
    }
    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return items;
  } catch (err) {
    console.warn("Supabase fetch exception:", err);
    return [];
  }
}

async function persistQuestionToSupabase(videoId: string, item: QAItem): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const unifiedIds = getUnifiedVideoIds(videoId);
    for (const vid of unifiedIds) {
      // Delete any older version of this question in Supabase
      await supabase
        .from("video_stats")
        .delete()
        .like("id", `qa_q:${vid}:${item.id}:%`);

      const targetItem = { ...item, videoId: vid };
      const rowId = `qa_q:${vid}:${item.id}:` + JSON.stringify(targetItem);
      await supabase.from("video_stats").upsert({
        id: rowId,
        likes: item.likes || 0,
        views: 0,
        updated_at: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("Failed to persist question to Supabase:", err);
  }
}

async function deleteQuestionFromSupabase(videoId: string, questionId: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const unifiedIds = getUnifiedVideoIds(videoId);
    for (const vid of unifiedIds) {
      await supabase
        .from("video_stats")
        .delete()
        .like("id", `qa_q:${vid}:${questionId}:%`);
    }
  } catch (err) {
    console.warn("Failed to delete question from Supabase:", err);
  }
}

async function fetchAllSupabaseQuestions(): Promise<QAItem[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from("video_stats")
      .select("id")
      .like("id", "qa_q:%");

    if (error || !data) {
      console.warn("Supabase fetch all warning:", error?.message);
      return [];
    }

    const items: QAItem[] = [];
    const seenIds = new Set<string>();

    for (const row of data) {
      try {
        const parts = row.id.split(":");
        // row.id format: qa_q:videoId:questionId:JSON
        if (parts.length >= 4) {
          const firstColon = row.id.indexOf(":");
          const secondColon = row.id.indexOf(":", firstColon + 1);
          const thirdColon = row.id.indexOf(":", secondColon + 1);
          if (thirdColon !== -1) {
            const jsonStr = row.id.substring(thirdColon + 1);
            const parsed = JSON.parse(jsonStr) as QAItem;
            if (parsed && parsed.id && !seenIds.has(parsed.id)) {
              seenIds.add(parsed.id);
              items.push(parsed);
            }
          }
        }
      } catch (err) {
        console.warn("Error parsing Supabase QA row in all:", err);
      }
    }
    return items;
  } catch (err) {
    console.warn("Supabase fetch all exception:", err);
    return [];
  }
}

function loadStore(): Record<string, QAItem[]> {
  if (qaStoreCache) return qaStoreCache;
  let primaryStore: Record<string, QAItem[]> = {};

  // Seed with bundled default store (guaranteed in Vercel function bundle)
  try {
    primaryStore = JSON.parse(JSON.stringify(defaultQaStore)) || {};
  } catch {
    primaryStore = {};
  }

  // Overlay local disk file if exists
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, "utf-8");
      const diskStore = JSON.parse(data) || {};
      primaryStore = mergeStores(primaryStore, diskStore);
    }
  } catch (err) {
    console.warn("Failed to read qa_store.json, using bundled store:", err);
  }

  // Failsafe preservation: merge with master backup if available
  try {
    if (fs.existsSync(MASTER_BACKUP_PATH)) {
      const backupData = fs.readFileSync(MASTER_BACKUP_PATH, "utf-8");
      const backupStore = JSON.parse(backupData) || {};
      primaryStore = mergeStores(primaryStore, backupStore);
    }
  } catch {
    // Ignore in cloud / read-only environments
  }

  qaStoreCache = primaryStore;
  return qaStoreCache;
}

function saveStore(store: Record<string, QAItem[]>) {
  qaStoreCache = store;
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to qa_store.json:", err);
  }

  // Automatically preserve to external master backup folder
  try {
    const backupDir = path.dirname(MASTER_BACKUP_PATH);
    if (fs.existsSync(backupDir)) {
      fs.writeFileSync(MASTER_BACKUP_PATH, JSON.stringify(store, null, 2), "utf-8");
    }
  } catch {
    // Ignore in read-only / cloud environments
  }
}

// GET: Fetch questions for a video (or all questions for teacher dashboard)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");
    const isAll = searchParams.get("all") === "true";

    if (isAll) {
      // 1. Get baseline questions from bundled / local seed
      const store = loadStore();
      const localAll: QAItem[] = [];
      const seenLocal = new Set<string>();

      for (const items of Object.values(store)) {
        if (!Array.isArray(items)) continue;
        for (const item of items) {
          if (
            item.id &&
            !seenLocal.has(item.id) &&
            !item.id.startsWith("qa-gen-") &&
            !item.id.startsWith("qa-1-") &&
            !item.id.startsWith("qa-2-") &&
            !item.id.startsWith("qa-3-") &&
            !item.id.startsWith("qa-4-") &&
            !item.id.startsWith("qa-5-") &&
            !checkQuickAbusive(item.question).isAbusive
          ) {
            seenLocal.add(item.id);
            localAll.push(item);
          }
        }
      }

      // 2. Fetch all live persistent questions from Supabase cloud database
      const cloudAll = await fetchAllSupabaseQuestions();

      // 3. Lossless merge: Cloud questions + Local baseline questions
      const mergedMap = new Map<string, QAItem>();
      for (const q of localAll) {
        mergedMap.set(q.id, q);
      }
      for (const cq of cloudAll) {
        const existing = mergedMap.get(cq.id);
        if (existing) {
          const replyMap = new Map<string, QAReply>();
          (existing.replies || []).forEach((r) => replyMap.set(r.id, r));
          (cq.replies || []).forEach((r) => replyMap.set(r.id, r));
          mergedMap.set(cq.id, {
            ...existing,
            ...cq,
            replies: Array.from(replyMap.values()),
          });
        } else {
          mergedMap.set(cq.id, cq);
        }
      }

      const allQuestions = Array.from(mergedMap.values());
      allQuestions.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      return NextResponse.json({ questions: allQuestions, total: allQuestions.length });
    }

    if (!videoId) {
      return NextResponse.json({ error: "videoId is required" }, { status: 400 });
    }

    // 1. Get baseline questions from bundled / local seed (including all aliased video IDs)
    const store = loadStore();
    const unifiedIds = getUnifiedVideoIds(videoId);
    const rawLocal: QAItem[] = [];
    for (const vid of unifiedIds) {
      if (Array.isArray(store[vid])) {
        rawLocal.push(...store[vid]);
      }
    }

    const seenLocalIds = new Set<string>();
    const localBaseline = rawLocal.filter((item) => {
      if (!item.id || seenLocalIds.has(item.id)) return false;
      seenLocalIds.add(item.id);
      return (
        !item.id.startsWith("qa-gen-") &&
        !item.id.startsWith("qa-1-") &&
        !item.id.startsWith("qa-2-") &&
        !item.id.startsWith("qa-3-") &&
        !item.id.startsWith("qa-4-") &&
        !item.id.startsWith("qa-5-") &&
        !checkQuickAbusive(item.question).isAbusive
      );
    });

    // 2. Fetch live persistent questions from Supabase cloud database
    const cloudQuestions = await fetchSupabaseQuestions(videoId);

    // 3. Lossless merge: Cloud questions + Local baseline questions
    const mergedMap = new Map<string, QAItem>();

    // Baseline first
    for (const q of localBaseline) {
      mergedMap.set(q.id, q);
    }

    // Overlay Cloud (has real-time replies, student submissions, and likes)
    for (const cq of cloudQuestions) {
      const existing = mergedMap.get(cq.id);
      if (existing) {
        const replyMap = new Map<string, QAReply>();
        (existing.replies || []).forEach((r) => replyMap.set(r.id, r));
        (cq.replies || []).forEach((r) => replyMap.set(r.id, r));
        mergedMap.set(cq.id, {
          ...existing,
          ...cq,
          replies: Array.from(replyMap.values()),
        });
      } else {
        mergedMap.set(cq.id, cq);
      }
    }

    const cleanItems = Array.from(mergedMap.values());
    cleanItems.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    // Keep in-memory cache synchronized across all unified IDs
    for (const vid of unifiedIds) {
      store[vid] = cleanItems;
    }

    return NextResponse.json({ questions: cleanItems });
  } catch (err) {
    console.error("Error in GET /api/qa:", err);
    return NextResponse.json({ questions: [] }, { status: 200 });
  }
}

// POST: Add question, add reply, like, or sync local items
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, videoId } = body;

    if (!videoId) {
      return NextResponse.json({ error: "videoId is required" }, { status: 400 });
    }

    const store = loadStore();
    const unifiedIds = getUnifiedVideoIds(videoId);
    for (const vid of unifiedIds) {
      if (!store[vid]) store[vid] = [];
    }

    if (action === "add_question") {
      const { question, authorName, authorRole, category } = body;
      if (!question || !question.trim()) {
        return NextResponse.json({ error: "Question text is required" }, { status: 400 });
      }

      const quickCheck = checkQuickAbusive(question.trim());
      if (quickCheck.isAbusive) {
        return NextResponse.json({
          error: "Komen mengandungi unsur yang tidak sopan atau tidak relevan.",
          isAbusive: true,
        }, { status: 400 });
      }

      const newItem: QAItem = {
        id: `qa-real-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        videoId,
        authorName: authorName || "Pelajar",
        authorRole: authorRole || "pelajar",
        timestamp: "Baru sahaja",
        createdAt: Date.now(),
        category: category || "Konsep",
        question: question.trim(),
        likes: 0,
        replies: [],
      };

      for (const vid of unifiedIds) {
        if (!store[vid]) store[vid] = [];
        store[vid].unshift({ ...newItem, videoId: vid });
      }
      saveStore(store);

      // Instantly persist and register in Supabase Cloud database across unified keys
      await persistQuestionToSupabase(videoId, newItem);

      return NextResponse.json({ success: true, item: newItem, questions: store[videoId] });
    }

    if (action === "add_reply") {
      const { questionId, text, authorName, authorRole, isVerified, authorEmail, isAi } = body;
      if (!questionId || !text || !text.trim()) {
        return NextResponse.json({ error: "questionId and text are required" }, { status: 400 });
      }

      const quickCheck = checkQuickAbusive(text.trim());
      if (quickCheck.isAbusive && authorRole !== "guru" && !authorName?.includes("Sir Halim") && !authorName?.includes("AI Tutor")) {
        return NextResponse.json({
          error: "Balasan mengandungi unsur yang tidak sopan.",
          isAbusive: true,
        }, { status: 400 });
      }

      const normalizedEmail = (authorEmail || "").toLowerCase().trim();
      const isSuperAdminEmail = SUPERADMIN_EMAILS.includes(normalizedEmail);
      const isAiFlag = Boolean(isAi) || authorName?.includes("AI Tutor") || normalizedEmail === "ai@physflix.internal";

      const newReply: QAReply = {
        id: isAiFlag
          ? `reply-ai-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
          : `reply-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        authorName: authorName || (isSuperAdminEmail ? "Abdul Halim Roslan" : "Pelajar"),
        authorRole: isSuperAdminEmail ? "guru" : (authorRole || "pelajar"),
        authorEmail: normalizedEmail || (isAiFlag ? "ai@physflix.internal" : undefined),
        isAi: isAiFlag,
        isVerified: isSuperAdminEmail ? true : Boolean(isVerified),
        text: text.trim(),
        timestamp: "Baru sahaja",
        createdAt: Date.now(),
        likes: 0,
      };

      let targetQuestion: QAItem | null = null;
      let hostKey: string = videoId;

      // 1. Search in unified IDs first
      for (const vid of unifiedIds) {
        if (store[vid]) {
          const found = store[vid].find((q) => q.id === questionId);
          if (found) {
            targetQuestion = found;
            hostKey = vid;
            break;
          }
        }
      }

      // 2. Search across entire store if not found yet
      if (!targetQuestion) {
        for (const [vid, list] of Object.entries(store)) {
          if (Array.isArray(list)) {
            const found = list.find((q) => q.id === questionId);
            if (found) {
              targetQuestion = found;
              hostKey = vid;
              break;
            }
          }
        }
      }

      // 3. Search in Supabase cloud if still not found
      if (!targetQuestion && isSupabaseConfigured) {
        const cloudItems = await fetchSupabaseQuestions(videoId);
        const found = cloudItems.find((q) => q.id === questionId);
        if (found) {
          targetQuestion = found;
          hostKey = found.videoId || videoId;
        }
      }

      const updatedQuestion: QAItem = targetQuestion
        ? {
            ...targetQuestion,
            replies: [...(targetQuestion.replies || []), newReply],
          }
        : {
            id: questionId,
            videoId,
            authorName: "Pelajar",
            authorRole: "pelajar",
            timestamp: "Baru sahaja",
            createdAt: Date.now(),
            category: "Konsep",
            question: "Soalan",
            likes: 0,
            replies: [newReply],
          };

      // Synchronize in all unified store keys
      for (const vid of unifiedIds) {
        if (!store[vid]) store[vid] = [];
        const idx = store[vid].findIndex((q) => q.id === questionId);
        if (idx !== -1) {
          store[vid][idx] = { ...updatedQuestion, videoId: vid };
        } else {
          store[vid].unshift({ ...updatedQuestion, videoId: vid });
        }
      }
      if (hostKey && !unifiedIds.includes(hostKey)) {
        if (!store[hostKey]) store[hostKey] = [];
        const idx = store[hostKey].findIndex((q) => q.id === questionId);
        if (idx !== -1) store[hostKey][idx] = { ...updatedQuestion, videoId: hostKey };
      }

      saveStore(store);

      // Persist across all unified keys in Supabase
      await persistQuestionToSupabase(videoId, updatedQuestion);

      return NextResponse.json({ success: true, reply: newReply, questions: store[videoId] });
    }

    if (action === "like_question") {
      const { questionId } = body;
      let targetQuestion: QAItem | null = null;

      for (const vid of unifiedIds) {
        if (store[vid]) {
          const found = store[vid].find((q) => q.id === questionId);
          if (found) {
            targetQuestion = found;
            break;
          }
        }
      }

      if (!targetQuestion) {
        for (const list of Object.values(store)) {
          if (Array.isArray(list)) {
            const found = list.find((q) => q.id === questionId);
            if (found) {
              targetQuestion = found;
              break;
            }
          }
        }
      }

      if (targetQuestion) {
        const updatedQuestion: QAItem = { ...targetQuestion, likes: targetQuestion.likes + 1 };
        for (const vid of unifiedIds) {
          if (store[vid]) {
            store[vid] = store[vid].map((q) => (q.id === questionId ? { ...updatedQuestion, videoId: vid } : q));
          }
        }
        saveStore(store);
        await persistQuestionToSupabase(videoId, updatedQuestion);
      }

      return NextResponse.json({ success: true, questions: store[videoId] || [] });
    }

    if (action === "like_reply") {
      const { questionId, replyId } = body;
      let targetQuestion: QAItem | null = null;

      for (const vid of unifiedIds) {
        if (store[vid]) {
          const found = store[vid].find((q) => q.id === questionId);
          if (found) {
            targetQuestion = found;
            break;
          }
        }
      }

      if (!targetQuestion) {
        for (const list of Object.values(store)) {
          if (Array.isArray(list)) {
            const found = list.find((q) => q.id === questionId);
            if (found) {
              targetQuestion = found;
              break;
            }
          }
        }
      }

      if (targetQuestion) {
        const updatedQuestion: QAItem = {
          ...targetQuestion,
          replies: (targetQuestion.replies || []).map((r) => (r.id === replyId ? { ...r, likes: r.likes + 1 } : r)),
        };
        for (const vid of unifiedIds) {
          if (store[vid]) {
            store[vid] = store[vid].map((q) => (q.id === questionId ? { ...updatedQuestion, videoId: vid } : q));
          }
        }
        saveStore(store);
        await persistQuestionToSupabase(videoId, updatedQuestion);
      }

      return NextResponse.json({ success: true, questions: store[videoId] || [] });
    }

    if (action === "sync_local_items") {
      const { items } = body;
      if (Array.isArray(items) && items.length > 0) {
        for (const vid of unifiedIds) {
          if (!store[vid]) store[vid] = [];
          const existingIds = new Set(store[vid].map((q) => q.id));
          let changed = false;

          for (const localQ of items) {
            if (!localQ || !localQ.id) continue;
            if (!existingIds.has(localQ.id)) {
              store[vid].unshift({ ...localQ, videoId: vid });
              existingIds.add(localQ.id);
              changed = true;
              await persistQuestionToSupabase(vid, localQ);
            } else {
              const targetQ = store[vid].find((q) => q.id === localQ.id);
              if (targetQ && Array.isArray(localQ.replies)) {
                const replyIds = new Set(targetQ.replies.map((r) => r.id));
                let repliesChanged = false;
                for (const rep of localQ.replies) {
                  if (!replyIds.has(rep.id)) {
                    targetQ.replies.push(rep);
                    replyIds.add(rep.id);
                    repliesChanged = true;
                    changed = true;
                  }
                }
                if (repliesChanged) {
                  await persistQuestionToSupabase(vid, targetQ);
                }
              }
            }
          }
          if (changed) {
            saveStore(store);
          }
        }
      }
      return NextResponse.json({ success: true, questions: store[videoId] || [] });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Error in POST /api/qa:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: SuperAdmin ONLY
export async function DELETE(req: NextRequest) {
  try {
    const { videoId, questionId, replyId, userEmail } = await req.json();

    const normalizedEmail = (userEmail || "").toLowerCase().trim();
    if (!SUPERADMIN_EMAILS.includes(normalizedEmail)) {
      return NextResponse.json(
        { error: "Akses ditolak: Hanya Superadmin dibenarkan memadam komen." },
        { status: 403 }
      );
    }

    if (!videoId || !questionId) {
      return NextResponse.json({ error: "videoId and questionId are required" }, { status: 400 });
    }

    const store = loadStore();
    const unifiedIds = getUnifiedVideoIds(videoId);

    if (replyId) {
      // Delete reply across all unified video IDs
      for (const vid of unifiedIds) {
        if (store[vid]) {
          let targetQ: QAItem | null = null;
          store[vid] = store[vid].map((q) => {
            if (q.id === questionId) {
              const updated = {
                ...q,
                replies: q.replies.filter((r) => r.id !== replyId),
              };
              targetQ = updated;
              return updated;
            }
            return q;
          });
          if (targetQ) {
            await persistQuestionToSupabase(vid, targetQ);
          }
        }
      }
    } else {
      // Delete whole question across all unified video IDs
      for (const vid of unifiedIds) {
        if (store[vid]) {
          store[vid] = store[vid].filter((q) => q.id !== questionId);
        }
        await deleteQuestionFromSupabase(vid, questionId);
      }
    }

    saveStore(store);
    return NextResponse.json({ success: true, questions: store[videoId] || [] });
  } catch (err) {
    console.error("Error in DELETE /api/qa:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
