import type { VideoLesson } from '@/data/physicsData';
import type { VideoStatsMap } from '@/context/UserActivityContext';

export interface QuizResult {
  correct: number;
  total: number;
  percentage: number;
  completedAt?: number;
}
export interface TeacherAccount {
  user_id: string;
  full_name: string;
  school_name: string;
  school_code: string;
}
export interface ReportVideo {
  id: string;
  title: string;
  form: number;
  completionPercentage: number;
  quiz: QuizResult | null;
}
export interface SchoolReport {
  id: string;
  student_id: string;
  student_name: string;
  student_class: string;
  scope: 'all' | '4' | '5';
  videos: ReportVideo[];
  general_quiz: QuizResult | null;
  submitted_at: string;
}

export const schoolCodePattern = /^[A-Z0-9][A-Z0-9-]{2,19}$/;
export const studentCode = (id: string) => `PF-${id.toUpperCase()}`;

export function reportVideos(lessons: VideoLesson[], stats: VideoStatsMap, quizzes: Record<string, QuizResult>, history: string[]): ReportVideo[] {
  return lessons.filter(lesson => history.includes(lesson.id) || stats[lesson.id] || quizzes[lesson.id])
    .map(lesson => ({
      id: lesson.id,
      title: lesson.titleBm,
      form: lesson.form,
      completionPercentage: Math.round(Math.max(0, Math.min(100, Number(stats[lesson.id]?.completionPercentage) || 0))),
      quiz: quizzes[lesson.id] || null,
    }));
}

export function mergeQuizResults(local: Record<string, QuizResult>, remote: Record<string, QuizResult>) {
  const result: Record<string, QuizResult> = {};
  for (const source of [remote, local]) {
    if (!source || typeof source !== 'object') continue;
    for (const [id, quiz] of Object.entries(source)) {
      if (!quiz || !Number.isInteger(quiz.correct) || !Number.isInteger(quiz.total) || quiz.total < 1 || quiz.correct < 0 || quiz.correct > quiz.total) continue;
      if (!result[id] || (quiz.completedAt || 0) >= (result[id].completedAt || 0)) {
        result[id] = { ...quiz, percentage: Math.round(quiz.correct / quiz.total * 100) };
      }
    }
  }
  return result;
}

export function reportError(error: { message?: string; code?: string }) {
  if (error.code === '23505') return 'Kod sekolah sudah digunakan oleh guru lain. Pilih kod unik lain.';
  if (['PGRST202', 'PGRST205', '42P01', '42703'].includes(error.code || '')) {
    return 'Mod laporan sekolah belum diaktifkan pada pelayan. Sila hubungi pentadbir.';
  }
  return error.message || 'Permintaan gagal. Semak sambungan dan cuba lagi.';
}
