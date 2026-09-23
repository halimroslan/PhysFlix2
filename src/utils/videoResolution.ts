import { allVideoLessons, VideoLesson } from "@/data/physicsData";

/**
 * Universal Video ID Aliases Dictionary.
 * Maps legacy, previous, or alternate video IDs to their active canonical video ID.
 * When a video is updated or replaced in the future, simply register the legacy ID here.
 */
export const VIDEO_ID_ALIASES: Record<string, string> = {
  // Lesson 1.1 Kuantiti Fizik (Form 4 Chapter 1)
  "HifOFbw3gDk": "jylD8xsEUkE",
  "jylD8xsEUkE": "jylD8xsEUkE",
};

/**
 * Returns the canonical video ID for a given ID.
 * If the ID has an alias, returns the target canonical ID; otherwise returns the original ID.
 */
export function getCanonicalVideoId(videoId: string): string {
  if (!videoId) return "";
  const clean = videoId.trim();
  return VIDEO_ID_ALIASES[clean] || clean;
}

/**
 * Returns a list of all equivalent video IDs (canonical + aliases).
 * Useful for querying and synchronizing comments across legacy and new video IDs.
 */
export function getUnifiedVideoIds(videoId: string): string[] {
  if (!videoId) return [];
  const clean = videoId.trim();
  const canonical = getCanonicalVideoId(clean);
  const result = new Set<string>([clean, canonical]);

  for (const [alias, target] of Object.entries(VIDEO_ID_ALIASES)) {
    if (target === canonical || target === clean || alias === clean) {
      result.add(alias);
      result.add(target);
    }
  }

  // Also check if any lesson has explicit aliases
  const lesson = allVideoLessons.find(
    (l) => l.id === canonical || l.youtubeId === canonical || l.driveId === canonical
  );
  if (lesson && (lesson as any).aliases) {
    for (const a of (lesson as any).aliases) {
      result.add(a);
    }
  }

  return Array.from(result);
}

/**
 * Robust, future-proof lesson resolver.
 * Finds a lesson by direct ID, YouTube ID, Drive ID, alias mapping, or fuzzy title/week match.
 */
export function findLessonByVideoId(videoId: string): VideoLesson | undefined {
  if (!videoId) return undefined;
  const clean = videoId.trim();

  // 1. Direct match on id, youtubeId, or driveId
  let lesson = allVideoLessons.find(
    (l) => l.id === clean || l.youtubeId === clean || l.driveId === clean
  );
  if (lesson) return lesson;

  // 2. Canonical alias match
  const canonical = getCanonicalVideoId(clean);
  if (canonical && canonical !== clean) {
    lesson = allVideoLessons.find(
      (l) => l.id === canonical || l.youtubeId === canonical || l.driveId === canonical
    );
    if (lesson) return lesson;
  }

  // 3. Lesson explicit aliases array
  lesson = allVideoLessons.find((l) => (l as any).aliases?.includes(clean));
  if (lesson) return lesson;

  // 4. Reverse alias match
  for (const [alias, target] of Object.entries(VIDEO_ID_ALIASES)) {
    if (target === clean) {
      lesson = allVideoLessons.find(
        (l) => l.id === alias || l.youtubeId === alias || l.driveId === alias
      );
      if (lesson) return lesson;
    }
  }

  // 5. Intelligent slug/week fallback (e.g. "t4_m1", "t4m1", "1.1")
  const norm = clean.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (norm) {
    lesson = allVideoLessons.find((l) => {
      const lWeek = l.week.toLowerCase().replace(/[^a-z0-9]/g, "");
      return lWeek === norm || l.id.toLowerCase().replace(/[^a-z0-9]/g, "") === norm;
    });
    if (lesson) return lesson;
  }

  return undefined;
}

/**
 * Safe resolver that never returns null/undefined.
 * If not found, falls back gracefully to default lesson or structured fallback info.
 */
export function resolveLessonSafe(videoId: string): VideoLesson {
  const found = findLessonByVideoId(videoId);
  if (found) return found;

  if (allVideoLessons.length > 0) {
    return allVideoLessons[0];
  }

  // Fallback stub if lessons empty
  return {
    id: videoId,
    driveId: videoId,
    youtubeId: videoId,
    week: "T4 M1",
    weekNum: 1,
    titleBm: `Topik Fizik (${videoId})`,
    titleDlp: `Physics Topic (${videoId})`,
    form: 4,
    chapterNum: 1,
    chapterBm: "Fizik SPM",
    chapterDlp: "SPM Physics",
    duration: "15:00",
    thumbnailBg: "from-blue-950 via-slate-900 to-cyan-950",
    learningPointsBm: [],
    learningPointsDlp: [],
    keyConceptsBm: [],
    keyConceptsDlp: [],
    resources: [],
  };
}
