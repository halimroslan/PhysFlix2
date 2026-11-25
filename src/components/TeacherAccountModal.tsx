'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { reportError, TeacherAccount } from '@/lib/schoolReports';
import { useAuth } from '@/context/AuthContext';
import { X, GraduationCap } from 'lucide-react';

export function TeacherAccountModal({ account, onClose, onSaved }: {
  account: TeacherAccount | null;
  onClose: () => void;
  onSaved: (account: TeacherAccount) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { dialog.current?.showModal(); }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    try {
      const { data, error } = await supabase.rpc('register_teacher', {
        p_full_name: String(form.get('fullName')).trim(),
        p_school_name: String(form.get('schoolName')).trim(),
        p_school_code: String(form.get('schoolCode')).trim().toUpperCase(),
      });
      if (error) throw error;
      onSaved(data);
      onClose();
    } catch (error) { setError(reportError(error as Error)); }
    finally { setBusy(false); }
  }

  return (
    <dialog ref={dialog} onCancel={onClose} aria-labelledby="teacher-title" className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-slate-700 bg-[#111624] p-6 text-white shadow-2xl backdrop:bg-black/80">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 id="teacher-title" className="flex items-center gap-2 text-xl font-bold"><GraduationCap className="text-red-400" />{account ? 'Profil Guru' : 'Tukar ke Mod Guru'}</h2>
        <button type="button" onClick={onClose} aria-label="Tutup"><X /></button>
      </div>
      <p className="mb-5 text-sm text-slate-400">Daftar mod guru dengan maklumat sekolah anda. Kongsi kod unik dengan pelajar untuk menerima laporan mereka.</p>
      <form onSubmit={save} className="space-y-4">
        <label className="block text-sm">Nama penuh
          <input name="fullName" required minLength={3} maxLength={120} defaultValue={account?.full_name} autoComplete="name" className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 p-3" />
        </label>
        <label className="block text-sm">Nama sekolah
          <input name="schoolName" required minLength={3} maxLength={180} defaultValue={account?.school_name} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 p-3" />
        </label>
        <label className="block text-sm">Kod sekolah unik
          <input name="schoolCode" required pattern="[A-Za-z0-9][A-Za-z0-9-]{2,19}" maxLength={20} defaultValue={account?.school_code} readOnly={!!account} placeholder="Contoh: ABC1234" className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 p-3 uppercase read-only:text-slate-400" />
        </label>
        <p className="text-xs text-slate-400">3–20 aksara: huruf, nombor atau sempang. Satu kod untuk satu akaun guru; kod kekal selepas pendaftaran.</p>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-red-600 p-3 font-bold hover:bg-red-500 disabled:opacity-50">{busy ? 'Menyimpan…' : account ? 'Simpan Profil' : 'Aktifkan Mod Guru'}</button>
      </form>
    </dialog>
  );
}

export function useTeacherAccount() {
  const { user } = useAuth();
  const [account, setAccount] = useState<TeacherAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let cancelled = false;
    supabase.from('teacher_accounts').select('*').eq('user_id', user?.id || '').maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        setAccount(error ? null : data);
        setError(error ? reportError(error) : '');
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [user?.id]);
  return { account, setAccount, loading, error };
}
