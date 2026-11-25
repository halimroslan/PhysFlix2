-- Both verified developer accounts may review teacher requests.
BEGIN;
CREATE OR REPLACE FUNCTION public.is_teacher_approver()
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = '' STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND lower(email) IN ('abdulhalimroslan@gmail.com', 'ahalimroslan@gmail.com')
      AND email_confirmed_at IS NOT NULL);
$$;
REVOKE ALL ON FUNCTION public.is_teacher_approver() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_teacher_approver() TO authenticated;
COMMIT;
