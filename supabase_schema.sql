-- ==============================================================================
-- PHYSFLIX SUPABASE DATABASE SCHEMA & RLS POLICIES
-- Jalankan skrip ini di SQL Editor di dashboard Supabase anda (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Jadual Profil Pengguna (Diselaraskan dengan Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  photo_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  premium_activated_at TIMESTAMPTZ,
  premium_expires_at TIMESTAMPTZ,
  premium_billcode TEXT,
  premium_order_id TEXT,
  last_login TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Migration helpers if table already exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS premium_activated_at TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS premium_expires_at TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS premium_billcode TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS premium_order_id TEXT;

-- 2. Jadual Aktiviti Pengguna (Bookmarks, Sejarah Tontonan, Video Stats & Auto-Resume)
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  bookmarks JSONB DEFAULT '[]'::jsonb,
  watch_history JSONB DEFAULT '[]'::jsonb,
  video_stats JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Jadual Statistik & Kiraan Suka Video (Global Video Stats / Likes)
CREATE TABLE IF NOT EXISTS public.video_stats (
  id TEXT PRIMARY KEY,
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Aktifkan Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_stats ENABLE ROW LEVEL SECURITY;

-- 5. Polisi Keselamatan (RLS Policies)
-- Profil: Pengguna boleh membaca dan mengemaskini profil sendiri
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles are viewable by authenticated users') THEN
    CREATE POLICY "Public profiles are viewable by authenticated users" ON public.profiles
      FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own profile') THEN
    CREATE POLICY "Users can insert their own profile" ON public.profiles
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- Aktiviti: Pengguna hanya boleh akses aktiviti sendiri
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own activity') THEN
    CREATE POLICY "Users can view own activity" ON public.user_activity
      FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own activity') THEN
    CREATE POLICY "Users can insert own activity" ON public.user_activity
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own activity') THEN
    CREATE POLICY "Users can update own activity" ON public.user_activity
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Video Stats: Terbuka untuk dibaca semua & dikemaskini
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read on video_stats') THEN
    CREATE POLICY "Allow public read on video_stats" ON public.video_stats
      FOR SELECT TO public USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert/update on video_stats') THEN
    CREATE POLICY "Allow public insert/update on video_stats" ON public.video_stats
      FOR ALL TO public USING (true);
  END IF;
END $$;

-- 6. Trigger automatik untuk rekod profil apabila pengguna daftar masuk
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, photo_url, last_login)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    last_login = now();
  
  INSERT INTO public.user_activity (user_id)
  VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
