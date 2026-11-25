-- Teacher mode requires approval by the project's named developer.
BEGIN;
ALTER TABLE public.teacher_accounts
  ADD COLUMN approval_status text NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  ADD COLUMN reviewed_at timestamptz,
  ADD COLUMN reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE FUNCTION public.is_teacher_approver()
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = '' STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM auth.users
    WHERE id = auth.uid() AND lower(email) = 'abdulhalimroslan@gmail.com' AND email_confirmed_at IS NOT NULL);
$$;
REVOKE ALL ON FUNCTION public.is_teacher_approver() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_teacher_approver() TO authenticated;

DROP POLICY teacher_own_account ON public.teacher_accounts;
CREATE POLICY teacher_own_account ON public.teacher_accounts FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_teacher_approver());
DROP POLICY report_participants ON public.school_reports;
CREATE POLICY report_participants ON public.school_reports FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR (teacher_id = auth.uid() AND EXISTS (
    SELECT 1 FROM public.teacher_accounts WHERE user_id = auth.uid() AND approval_status = 'approved'
  )));

CREATE OR REPLACE FUNCTION public.register_teacher(p_full_name text, p_school_name text, p_school_code text)
RETURNS public.teacher_accounts LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE result public.teacher_accounts;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Sila log masuk semula.'; END IF;
  SELECT * INTO result FROM public.teacher_accounts WHERE user_id = auth.uid() FOR UPDATE;
  IF result.approval_status = 'approved' AND result.full_name = btrim(p_full_name)
    AND result.school_name = btrim(p_school_name) THEN RETURN result; END IF;
  INSERT INTO public.teacher_accounts(user_id, full_name, school_name, school_code)
  VALUES (auth.uid(), btrim(p_full_name), btrim(p_school_name), upper(btrim(p_school_code)))
  ON CONFLICT (user_id) DO UPDATE SET full_name = excluded.full_name, school_name = excluded.school_name,
    approval_status = 'pending', reviewed_at = NULL, reviewed_by = NULL, created_at = now()
  RETURNING * INTO result;
  RETURN result;
END;
$$;

CREATE FUNCTION public.review_teacher_request(p_user_id uuid, p_approve boolean, p_requested_at timestamptz)
RETURNS public.teacher_accounts LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE result public.teacher_accounts;
BEGIN
  IF NOT public.is_teacher_approver() THEN RAISE EXCEPTION 'Hanya pembangun yang ditetapkan boleh mengesahkan permohonan guru.' USING ERRCODE = '42501'; END IF;
  IF p_approve IS NULL OR p_requested_at IS NULL THEN RAISE EXCEPTION 'Keputusan semakan tidak sah.'; END IF;
  UPDATE public.teacher_accounts
    SET approval_status = CASE WHEN p_approve THEN 'approved' ELSE 'rejected' END,
      reviewed_at = now(), reviewed_by = auth.uid()
    WHERE user_id = p_user_id AND approval_status = 'pending' AND created_at = p_requested_at
    RETURNING * INTO result;
  IF NOT FOUND THEN RAISE EXCEPTION 'Permohonan sudah berubah atau diproses. Muat semula senarai.'; END IF;
  RETURN result;
END;
$$;
REVOKE ALL ON FUNCTION public.review_teacher_request(uuid,boolean,timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.review_teacher_request(uuid,boolean,timestamptz) TO authenticated;

CREATE OR REPLACE FUNCTION public.find_report_school(p_school_code text)
RETURNS TABLE(full_name text, school_name text, school_code text)
LANGUAGE sql SECURITY DEFINER SET search_path = '' STABLE AS $$
  SELECT t.full_name, t.school_name, t.school_code FROM public.teacher_accounts t
  WHERE auth.uid() IS NOT NULL AND t.school_code = upper(btrim(p_school_code)) AND t.approval_status = 'approved';
$$;

CREATE FUNCTION public.enforce_approved_report_teacher()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  PERFORM 1 FROM public.teacher_accounts WHERE user_id = new.teacher_id AND approval_status = 'approved' FOR SHARE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Akaun guru belum diluluskan oleh pembangun.';
  END IF;
  RETURN new;
END;
$$;
REVOKE ALL ON FUNCTION public.enforce_approved_report_teacher() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER school_reports_approved_teacher BEFORE INSERT OR UPDATE ON public.school_reports
  FOR EACH ROW EXECUTE FUNCTION public.enforce_approved_report_teacher();
COMMIT;
