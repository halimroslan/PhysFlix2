BEGIN;
ALTER TABLE public.teacher_accounts
  ADD COLUMN requested_school_code text CHECK (requested_school_code ~ '^[A-Z0-9][A-Z0-9-]{2,19}$'),
  ADD COLUMN code_requested_at timestamptz,
  ADD COLUMN code_change_status text CHECK (code_change_status IN ('pending', 'approved', 'rejected'));

CREATE FUNCTION public.request_school_code_change(p_school_code text)
RETURNS public.teacher_accounts LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE result public.teacher_accounts; code text := upper(btrim(p_school_code));
BEGIN
  SELECT * INTO result FROM public.teacher_accounts WHERE user_id = auth.uid() FOR UPDATE;
  IF NOT FOUND OR result.approval_status <> 'approved' THEN
    RAISE EXCEPTION 'Hanya akaun guru yang diluluskan boleh memohon tukar kod sekolah.' USING ERRCODE = '42501';
  END IF;
  IF code IS NULL OR code !~ '^[A-Z0-9][A-Z0-9-]{2,19}$' THEN
    RAISE EXCEPTION 'Kod sekolah mesti mengandungi 3–20 huruf, nombor atau sempang.';
  END IF;
  IF code = result.school_code THEN RAISE EXCEPTION 'Masukkan kod yang berbeza daripada kod semasa.'; END IF;
  IF EXISTS (SELECT 1 FROM public.teacher_accounts WHERE school_code = code) THEN
    RAISE EXCEPTION 'Kod sekolah sudah digunakan oleh guru lain.' USING ERRCODE = '23505';
  END IF;
  UPDATE public.teacher_accounts SET requested_school_code = code,
    code_requested_at = clock_timestamp(), code_change_status = 'pending'
    WHERE user_id = auth.uid() RETURNING * INTO result;
  RETURN result;
END;
$$;

CREATE FUNCTION public.review_school_code_change(p_user_id uuid, p_approve boolean, p_requested_at timestamptz)
RETURNS public.teacher_accounts LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE result public.teacher_accounts;
BEGIN
  IF NOT public.is_teacher_approver() THEN
    RAISE EXCEPTION 'Hanya pembangun boleh menyemak pertukaran kod sekolah.' USING ERRCODE = '42501';
  END IF;
  IF p_approve IS NULL OR p_requested_at IS NULL THEN RAISE EXCEPTION 'Keputusan semakan tidak sah.'; END IF;
  UPDATE public.teacher_accounts SET
    school_code = CASE WHEN p_approve THEN requested_school_code ELSE school_code END,
    code_change_status = CASE WHEN p_approve THEN 'approved' ELSE 'rejected' END
    WHERE user_id = p_user_id AND approval_status = 'approved'
      AND code_change_status = 'pending' AND code_requested_at = p_requested_at
    RETURNING * INTO result;
  IF NOT FOUND THEN RAISE EXCEPTION 'Permohonan sudah berubah atau diproses. Muat semula senarai.'; END IF;
  RETURN result;
END;
$$;
REVOKE ALL ON FUNCTION public.request_school_code_change(text), public.review_school_code_change(uuid,boolean,timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_school_code_change(text), public.review_school_code_change(uuid,boolean,timestamptz) TO authenticated;
COMMIT;
