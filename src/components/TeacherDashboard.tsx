'use client';

import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, GraduationCap } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTeacherAccount } from './TeacherAccountModal';
import { reportError, SchoolReport, studentCode } from '@/lib/schoolReports';

export function TeacherDashboard() {
  const { account, loading: accountLoading, error: accountError } = useTeacherAccount();
  const [reports, setReports] = useState<SchoolReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const fetchReports = useCallback(async () => {
    if (!account) return;
    try {
      setLoading(true);
      setError('');
      const { data, error } = await supabase.from('school_reports').select('*')
        .eq('teacher_id', account.user_id).order('submitted_at', { ascending: false }).order('id')
        .range(page * 50, page * 50 + 50);
      if (error) throw error;
      setHasMore((data?.length || 0) > 50);
      setReports((data || []).slice(0, 50));
    } catch (error) { setError(reportError(error as Error)); }
    finally { setLoading(false); }
  }, [account, page]);
  useEffect(() => {
    const timer = setTimeout(() => { void fetchReports(); }, 0);
    return () => clearTimeout(timer);
  }, [fetchReports]);

  if (accountLoading) return <p role="status" className="py-10 text-slate-400">Memuatkan akaun guru…</p>;
  if (!account) return <p role="alert" className="py-10 text-slate-400">{accountError || 'Aktifkan Mod Guru melalui menu gambar profil dahulu.'}</p>;
  const visible = reports.filter(report => `${report.student_name} ${report.student_class} ${studentCode(report.student_id)}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="space-y-6 py-8 text-white">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black"><GraduationCap className="text-red-400" />Dashboard Guru</h1>
          <p className="mt-2 text-slate-400">{account.full_name} · {account.school_name}</p>
          <p className="mt-2 text-sm">Kod sekolah: <strong className="select-all rounded bg-red-500/15 px-2 py-1 font-mono text-red-300">{account.school_code}</strong></p>
        </div>
        <button onClick={fetchReports} disabled={loading} className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />Muat semula</button>
      </div>
      <p className="text-sm text-slate-400">Laporan ialah kemajuan ketika pelajar menekan Hantar. Penghantaran semula menggantikan laporan terdahulu untuk skop sama. Kuiz menunjukkan keputusan percubaan lengkap terkini.</p>
      <label className="block text-sm text-slate-300">Cari pada halaman ini mengikut nama, kelas atau ID unik
        <input value={search} onChange={event => setSearch(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white sm:max-w-lg" placeholder="Nama / kelas / ID pelajar" />
      </label>
      {loading && <p role="status" className="text-slate-400">Memuatkan laporan…</p>}
      {error && <p role="alert" className="text-red-400">{error}</p>}
      {!loading && !error && visible.length === 0 && <p className="rounded-xl border border-slate-800 p-8 text-slate-400">{reports.length ? 'Tiada padanan pada halaman ini.' : 'Belum ada laporan. Kongsi kod sekolah dengan pelajar dan minta mereka tekan Hantar pada Papan Skor.'}</p>}
      {!error && visible.map(report => (
        <article key={report.id} className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/60">
          <div className="flex flex-wrap justify-between gap-3 border-b border-slate-800 p-5">
            <div>
              <h2 className="text-lg font-bold">{report.student_name} <span className="ml-2 rounded bg-slate-800 px-2 py-1 text-sm font-medium">{report.student_class}</span></h2>
              <p className="mt-2 break-all font-mono text-xs text-slate-400">ID unik: {studentCode(report.student_id)}</p>
            </div>
            <div className="text-sm text-slate-400">
              <p className="font-semibold text-red-300">{report.scope === 'all' ? 'Semua tingkatan' : `Tingkatan ${report.scope}`}</p>
              <time dateTime={report.submitted_at}>{new Date(report.submitted_at).toLocaleString('ms-MY')}</time>
            </div>
          </div>
          <div className="grid gap-6 p-5 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 font-bold">Senarai Video · Peratus Tontonan</h3>
              {report.videos.length === 0 && <p className="text-sm text-slate-400">Belum ada aktiviti video.</p>}
              <ul className="space-y-3">{report.videos.map(video => (
                <li key={video.id} className="text-sm">
                  <div className="flex justify-between gap-4"><span>T{video.form} · {video.title}</span><strong className="text-red-300">{video.completionPercentage}%</strong></div>
                  <progress value={video.completionPercentage} max={100} aria-label={`Tontonan ${video.title}`} className="mt-1 h-1.5 w-full accent-red-500" />
                </li>
              ))}</ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold">Senarai Kuiz · Peratus Markah</h3>
              <ul className="space-y-3">{report.videos.map(video => (
                <li key={video.id} className="flex justify-between gap-4 text-sm"><span>T{video.form} · {video.title}</span><span className={`shrink-0 ${video.quiz ? 'text-emerald-400' : 'text-slate-500'}`}>{video.quiz ? `${video.quiz.percentage}% (${video.quiz.correct}/${video.quiz.total})` : 'Belum dijawab'}</span></li>
              ))}
              {report.scope === 'all' && <li className="flex justify-between gap-4 border-t border-slate-700 pt-3 text-sm"><span>Kuiz umum</span><span className="text-emerald-400">{report.general_quiz ? `${report.general_quiz.percentage}% (${report.general_quiz.correct}/${report.general_quiz.total})` : 'Belum dijawab'}</span></li>}
              </ul>
            </div>
          </div>
        </article>
      ))}
      <div className="flex items-center gap-4 text-sm">
        <button disabled={page === 0 || loading} onClick={() => setPage(value => value - 1)} className="rounded border border-slate-700 px-3 py-2 disabled:opacity-40">Sebelum</button>
        <span>Halaman {page + 1}</span>
        <button disabled={!hasMore || loading} onClick={() => setPage(value => value + 1)} className="rounded border border-slate-700 px-3 py-2 disabled:opacity-40">Seterusnya</button>
      </div>
    </section>
  );
}
