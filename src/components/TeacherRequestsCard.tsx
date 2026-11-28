'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { canReviewTeacherRequests, reportError, TeacherAccount } from '@/lib/schoolReports';

export function TeacherRequestsCard() {
  const { user } = useAuth();
  const allowed = canReviewTeacherRequests(user?.email);
  const [requests, setRequests] = useState<TeacherAccount[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadRequests = useCallback(async () => {
    if (!allowed) return;
    setLoading(true);
    setError('');
    try {
      const { data, count, error } = await supabase.from('teacher_accounts').select('*', { count: 'exact' })
        .or('approval_status.eq.pending,and(approval_status.eq.approved,code_change_status.eq.pending)').order('created_at').order('user_id').range(page * 20, page * 20 + 19);
      if (error) throw error;
      if (!data?.length && page > 0) { setPage(value => value - 1); return; }
      setRequests(data || []);
      setTotal(count || 0);
    } catch (error) { setError(reportError(error as Error)); }
    finally { setLoading(false); }
  }, [allowed, page]);
  useEffect(() => {
    const timer = setTimeout(() => { void loadRequests(); }, 0);
    return () => clearTimeout(timer);
  }, [loadRequests]);

  async function review(account: TeacherAccount, approve: boolean) {
    setBusy(account.user_id);
    setError('');
    setMessage('');
    try {
      const codeChange = account.approval_status === 'approved' && account.code_change_status === 'pending';
      const { error } = await supabase.rpc(codeChange ? 'review_school_code_change' : 'review_teacher_request', { p_user_id: account.user_id, p_approve: approve, p_requested_at: codeChange ? account.code_requested_at : account.created_at });
      if (error) throw error;
      setMessage(`Permohonan ${account.full_name} ${approve ? 'diluluskan' : 'ditolak'}.`);
      await loadRequests();
    } catch (error) { setError(reportError(error as Error)); }
    finally { setBusy(null); }
  }

  if (!allowed) return null;
  return (
    <details className="rounded-xl border border-slate-700 bg-slate-900/60 text-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400">
        <span><span className="block font-semibold">Permohonan Akaun Guru</span><span className="mt-1 block text-xs text-slate-400">Semak permohonan akaun dan pertukaran kod sekolah.</span></span>
        <span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300">{loading ? 'Memuatkan…' : error ? 'Semak status' : `${total} menunggu`}</span>
      </summary>
      <div className="space-y-4 border-t border-slate-800 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400">Kelulusan oleh akaun Developer yang ditetapkan.</p>
          <button type="button" disabled={loading || !!busy} onClick={loadRequests} className="rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-800 disabled:opacity-50">Muat semula permohonan</button>
        </div>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        {message && <p role="status" className="text-sm text-emerald-400">{message}</p>}
        {loading && <p role="status" className="text-sm text-slate-400">Memuatkan permohonan…</p>}
        {!loading && !error && requests.length === 0 && <p className="text-sm text-slate-400">Tiada permohonan menunggu semakan.</p>}
        {!error && requests.map(account => (
          <article key={account.user_id} className="flex flex-col justify-between gap-4 border-t border-slate-800 py-4 sm:flex-row sm:items-center">
            <div className="min-w-0 space-y-1">
              <h3 className="break-words font-semibold">{account.full_name}</h3>
              <p className="break-words text-sm text-slate-300">{account.school_name}</p>
              <p className="text-xs text-slate-400">Kod sekolah: <span className="font-mono text-slate-200">{account.school_code}</span></p>
              {account.approval_status === 'approved' && account.code_change_status === 'pending' && <p className="text-sm text-amber-300">Mohon tukar kod kepada: <span className="font-mono">{account.requested_school_code}</span></p>}
              <p className="break-all font-mono text-[11px] text-slate-500">ID akaun: {account.user_id}</p>
              {account.created_at && <time dateTime={account.created_at} className="block text-xs text-slate-500">{new Date(account.created_at).toLocaleString('ms-MY')}</time>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" disabled={!!busy || loading} onClick={() => review(account, false)} aria-label={`Tolak permohonan ${account.full_name}`} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-50">Tolak</button>
              <button type="button" disabled={!!busy || loading} onClick={() => review(account, true)} aria-label={`Luluskan permohonan ${account.full_name}`} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 disabled:opacity-50">{busy === account.user_id ? 'Memproses…' : 'Luluskan'}</button>
            </div>
          </article>
        ))}
        {total > 20 && <div className="flex items-center gap-3 text-xs">
          <button type="button" disabled={page === 0 || loading || !!busy} onClick={() => setPage(value => value - 1)} className="rounded border border-slate-700 px-3 py-2 disabled:opacity-40">Sebelum</button>
          <span>Halaman {page + 1}</span>
          <button type="button" disabled={(page + 1) * 20 >= total || loading || !!busy} onClick={() => setPage(value => value + 1)} className="rounded border border-slate-700 px-3 py-2 disabled:opacity-40">Seterusnya</button>
        </div>}
      </div>
    </details>
  );
}
