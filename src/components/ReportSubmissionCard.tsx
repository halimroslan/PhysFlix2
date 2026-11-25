'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUserActivity } from '@/context/UserActivityContext';
import { allVideoLessons } from '@/data/physicsData';
import { supabase } from '@/lib/supabase';
import { reportError, reportVideos, schoolCodePattern, studentCode } from '@/lib/schoolReports';

export function ReportSubmissionCard({ scope }: { scope: 'all' | '4' | '5' }) {
  const { user } = useAuth();
  const { videoStats, quizResults, watchHistory, activityLoading } = useUserActivity();
  const [saved] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`school_report_${user?.id}`) || '{}'); }
    catch { return {}; }
  });
  const [code, setCode] = useState(saved.code || '');
  const [name, setName] = useState(saved.name || user?.displayName || '');
  const [studentClass, setStudentClass] = useState(saved.studentClass || '');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || busy || activityLoading) return;
    const normalizedCode = code.trim().toUpperCase();
    if (!schoolCodePattern.test(normalizedCode)) { setError('Kod sekolah tidak sah. Gunakan 3–20 huruf, nombor atau sempang.'); return; }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const { data: schools, error: schoolError } = await supabase.rpc('find_report_school', { p_school_code: normalizedCode });
      if (schoolError) throw schoolError;
      if (!schools?.length) throw new Error('Kod sekolah tidak ditemui. Semak kod dengan guru anda.');
      const lessons = allVideoLessons.filter(lesson => scope === 'all' || String(lesson.form) === scope);
      const { error } = await supabase.rpc('submit_school_report', {
        p_school_code: normalizedCode,
        p_student_name: name.trim(),
        p_student_class: studentClass.trim(),
        p_scope: scope,
        p_videos: reportVideos(lessons, videoStats, quizResults, watchHistory),
        p_general_quiz: scope === 'all' ? quizResults.general || null : null,
      });
      if (error) throw error;
      try { localStorage.setItem(`school_report_${user.id}`, JSON.stringify({ code: normalizedCode, name: name.trim(), studentClass: studentClass.trim() })); } catch { /* Delivery already succeeded. */ }
      setMessage(`Laporan dihantar kepada ${schools[0].full_name} · ${schools[0].school_name}. Hantar semula untuk mengemas kini kemajuan.`);
    } catch (error) { setError(reportError(error as Error)); }
    finally { setBusy(false); }
  }

  return (
    <details aria-label="Penghantaran laporan statistik" className="w-full rounded-xl border border-white/15 text-left lg:w-80 lg:shrink-0">
      <summary className="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400">
        Hantar Laporan Statistik
        <span className="mt-1 block text-xs font-normal text-slate-400">{scope === 'all' ? 'Semua tingkatan' : `Tingkatan ${scope}`} · Kongsi dengan guru</span>
      </summary>
      <form onSubmit={send} className="space-y-3 border-t border-white/10 p-4">
        <label className="block text-xs text-slate-300">Kod sekolah
          <input required maxLength={20} value={code} onChange={e => { setCode(e.target.value.toUpperCase()); setMessage(''); }} placeholder="Kod daripada guru" className="mt-1 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm uppercase text-white" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs text-slate-300">Nama penuh
            <input required minLength={3} maxLength={120} value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-1 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white" />
          </label>
          <label className="block text-xs text-slate-300">Kelas
            <input required maxLength={60} value={studentClass} onChange={e => setStudentClass(e.target.value)} placeholder="Contoh: 4 Amanah" className="mt-1 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white" />
          </label>
        </div>
        {user && <p className="break-all text-[11px] text-slate-400">ID unik pelajar: <span className="font-mono">{studentCode(user.id)}</span></p>}
        <p className="text-[11px] text-slate-400">Dengan menekan Hantar, anda berkongsi nama, kelas, ID dan statistik ini dengan guru pemilik kod. Kuiz belum dijawab ditanda “Belum dijawab”.</p>
        <button disabled={busy || activityLoading || !user} className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200 disabled:opacity-50">{busy ? 'Menghantar…' : activityLoading ? 'Memuatkan kemajuan…' : 'Hantar'}</button>
        {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
        {message && <p role="status" className="text-xs text-emerald-400">{message}</p>}
      </form>
    </details>
  );
}
