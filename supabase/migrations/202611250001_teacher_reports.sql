-- Self-service teacher mode; codes route explicit student report submissions.
BEGIN;
ALTER TABLE public.user_activity ADD COLUMN IF NOT EXISTS quiz_results jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE TABLE public.teacher_accounts (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 3 AND 120),
  school_name text NOT NULL CHECK (char_length(school_name) BETWEEN 3 AND 180),
  school_code text NOT NULL UNIQUE CHECK (school_code ~ '^[A-Z0-9][A-Z0-9-]{2,19}$'),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.school_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES public.teacher_accounts(user_id) ON DELETE CASCADE,
  student_name text NOT NULL CHECK (char_length(student_name) BETWEEN 3 AND 120),
  student_class text NOT NULL CHECK (char_length(student_class) BETWEEN 1 AND 60),
  scope text NOT NULL CHECK (scope IN ('all', '4', '5')),
  videos jsonb NOT NULL CHECK (jsonb_typeof(videos) = 'array' AND jsonb_array_length(videos) <= 200),
  general_quiz jsonb,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, teacher_id, scope)
);
CREATE INDEX school_reports_teacher_date ON public.school_reports(teacher_id, submitted_at DESC);
ALTER TABLE public.teacher_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_reports ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.teacher_accounts, public.school_reports FROM anon, authenticated;
GRANT SELECT ON public.teacher_accounts, public.school_reports TO authenticated;
CREATE POLICY teacher_own_account ON public.teacher_accounts FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY report_participants ON public.school_reports FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR teacher_id = auth.uid());

CREATE FUNCTION public.register_teacher(p_full_name text, p_school_name text, p_school_code text)
RETURNS public.teacher_accounts LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE result public.teacher_accounts;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Sila log masuk semula.'; END IF;
  INSERT INTO public.teacher_accounts(user_id, full_name, school_name, school_code)
  VALUES (auth.uid(), btrim(p_full_name), btrim(p_school_name), upper(btrim(p_school_code)))
  ON CONFLICT (user_id) DO UPDATE SET full_name = excluded.full_name, school_name = excluded.school_name
  RETURNING * INTO result;
  RETURN result;
END;
$$;

CREATE FUNCTION public.find_report_school(p_school_code text)
RETURNS TABLE(full_name text, school_name text, school_code text)
LANGUAGE sql SECURITY DEFINER SET search_path = '' STABLE AS $$
  SELECT t.full_name, t.school_name, t.school_code FROM public.teacher_accounts t
  WHERE auth.uid() IS NOT NULL AND t.school_code = upper(btrim(p_school_code));
$$;

CREATE FUNCTION public.submit_school_report(
  p_school_code text, p_student_name text, p_student_class text, p_scope text, p_videos jsonb, p_general_quiz jsonb DEFAULT NULL
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE teacher uuid; report_id uuid; item jsonb; q jsonb;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Sila log masuk semula.'; END IF;
  SELECT user_id INTO teacher FROM public.teacher_accounts WHERE school_code = upper(btrim(p_school_code));
  IF teacher IS NULL THEN RAISE EXCEPTION 'Kod sekolah tidak ditemui. Semak kod dengan guru anda.'; END IF;
  IF teacher = auth.uid() THEN RAISE EXCEPTION 'Gunakan akaun pelajar untuk menghantar laporan kepada guru.'; END IF;
  IF p_scope IS NULL OR p_scope NOT IN ('all','4','5') OR p_student_name IS NULL
    OR char_length(btrim(p_student_name)) NOT BETWEEN 3 AND 120 OR p_student_class IS NULL
    OR char_length(btrim(p_student_class)) NOT BETWEEN 1 AND 60 OR p_videos IS NULL
    OR jsonb_typeof(p_videos) <> 'array' OR jsonb_array_length(p_videos) > 200 THEN
    RAISE EXCEPTION 'Maklumat laporan tidak sah.';
  END IF;
  FOR item IN SELECT value FROM jsonb_array_elements(p_videos) LOOP
    IF jsonb_typeof(item) <> 'object' OR NOT (item ?& ARRAY['id','title','form','completionPercentage'])
      OR jsonb_typeof(item->'id') <> 'string' OR char_length(item->>'id') NOT BETWEEN 1 AND 200
      OR jsonb_typeof(item->'title') <> 'string' OR char_length(item->>'title') NOT BETWEEN 1 AND 240
      OR jsonb_typeof(item->'form') <> 'number' OR item->>'form' NOT IN ('4','5') OR (p_scope <> 'all' AND item->>'form' <> p_scope)
      OR jsonb_typeof(item->'completionPercentage') <> 'number'
      OR (item->>'completionPercentage')::numeric NOT BETWEEN 0 AND 100 THEN
      RAISE EXCEPTION 'Statistik video tidak sah.';
    END IF;
  END LOOP;
  FOR q IN SELECT v.value->'quiz' FROM jsonb_array_elements(p_videos) v
    WHERE v.value->'quiz' IS NOT NULL AND v.value->'quiz' <> 'null'::jsonb
    UNION ALL SELECT p_general_quiz WHERE p_general_quiz IS NOT NULL AND p_general_quiz <> 'null'::jsonb LOOP
    IF jsonb_typeof(q) <> 'object' OR NOT (q ?& ARRAY['correct','total','percentage'])
      OR jsonb_typeof(q->'correct') <> 'number' OR jsonb_typeof(q->'total') <> 'number'
      OR jsonb_typeof(q->'percentage') <> 'number' OR (q->>'total')::numeric NOT BETWEEN 1 AND 500
      OR (q->>'correct')::numeric NOT BETWEEN 0 AND (q->>'total')::numeric
      OR (q->>'percentage')::numeric <> round(100 * (q->>'correct')::numeric / (q->>'total')::numeric) THEN
      RAISE EXCEPTION 'Keputusan kuiz tidak sah.';
    END IF;
  END LOOP;
  INSERT INTO public.school_reports(student_id, teacher_id, student_name, student_class, scope, videos, general_quiz)
  VALUES (auth.uid(), teacher, btrim(p_student_name), btrim(p_student_class), p_scope, p_videos, p_general_quiz)
  ON CONFLICT (student_id, teacher_id, scope) DO UPDATE
    SET student_name = excluded.student_name, student_class = excluded.student_class, videos = excluded.videos,
      general_quiz = excluded.general_quiz, submitted_at = now()
  RETURNING id INTO report_id;
  RETURN report_id;
END;
$$;
REVOKE ALL ON FUNCTION public.register_teacher(text,text,text), public.find_report_school(text),
  public.submit_school_report(text,text,text,text,jsonb,jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.register_teacher(text,text,text), public.find_report_school(text),
  public.submit_school_report(text,text,text,text,jsonb,jsonb) TO authenticated;
COMMIT;
