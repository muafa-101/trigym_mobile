-- ==============================================================================
-- DATABASE SCHEMA UNTUK TRIGYM (SUPABASE POSTGRESQL)
-- ==============================================================================
-- Proyek: TriGym Mobile App
-- Deskripsi: Skema lengkap tabel, view, fungsi/trigger, RLS, dan data awal (seed)
-- Cara Pakai:
-- 1. Buka dashboard Supabase (https://supabase.com/dashboard)
-- 2. Pilih project Supabase Anda
-- 3. Buka menu "SQL Editor" di bilah sisi kiri
-- 4. Klik "New Query", paste seluruh isi file ini, lalu klik "Run"
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 2. TABEL: MEMBERS (Data Member Gym)
-- ------------------------------------------------------------------------------
-- Menyimpan informasi profil member, nomor kartu/QR, masa berlaku, dan role.
CREATE TABLE IF NOT EXISTS public.members (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE, -- Nomor member / NIM / isi QR Code
    valid_until DATE NOT NULL,  -- Tanggal terakhir membership aktif (YYYY-MM-DD)
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indeks untuk pencarian cepat
CREATE INDEX IF NOT EXISTS idx_members_code ON public.members(code);
CREATE INDEX IF NOT EXISTS idx_members_email ON public.members(email);
CREATE INDEX IF NOT EXISTS idx_members_user_id ON public.members(user_id);

-- ------------------------------------------------------------------------------
-- 3. TABEL: MEMBERSHIP_PLANS (Paket Perpanjangan)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.membership_plans (
    id TEXT PRIMARY KEY,
    months INTEGER NOT NULL CHECK (months > 0),
    label TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    note TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 4. TABEL: VISITS (Riwayat Kunjungan & Sesi Latihan)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visits (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    member_id TEXT NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    check_in_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    check_out_at TIMESTAMPTZ, -- NULL menandakan member masih sedang di gym
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_visits_member_id ON public.visits(member_id);
CREATE INDEX IF NOT EXISTS idx_visits_check_in ON public.visits(check_in_at DESC);

-- ------------------------------------------------------------------------------
-- 5. TABEL: PAYMENTS (Riwayat Transaksi Perpanjangan)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    member_id TEXT NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    plan_id TEXT REFERENCES public.membership_plans(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL,
    months INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('pending', 'success', 'failed')),
    transaction_id TEXT,
    payment_method TEXT DEFAULT 'qris',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_payments_member_id ON public.payments(member_id);

-- ------------------------------------------------------------------------------
-- 6. VIEWS UNTUK KEMUDAHAN APLIKASI
-- ------------------------------------------------------------------------------

-- View: Kunjungan yang sedang aktif (belum check-out & masih dalam batas 2 jam)
CREATE OR REPLACE VIEW public.active_visits_view AS
SELECT 
    v.id AS visit_id,
    v.member_id,
    m.name AS member_name,
    m.code AS member_code,
    m.email AS member_email,
    m.valid_until,
    v.check_in_at,
    v.check_out_at
FROM public.visits v
JOIN public.members m ON m.id = v.member_id
WHERE v.check_out_at IS NULL
  AND v.check_in_at >= (now() - INTERVAL '2 hours');

-- View: Statistik Dashboard Admin
CREATE OR REPLACE VIEW public.gym_stats_view AS
SELECT 
    (SELECT COUNT(*) FROM public.active_visits_view) AS active_crowd_count,
    (SELECT COUNT(*) FROM public.members WHERE valid_until >= CURRENT_DATE) AS active_members_count,
    (SELECT COUNT(*) FROM public.members WHERE valid_until >= CURRENT_DATE AND valid_until <= (CURRENT_DATE + INTERVAL '7 days')) AS expiring_soon_count;

-- ------------------------------------------------------------------------------
-- 7. FUNGSI & TRIGGER
-- ------------------------------------------------------------------------------

-- Fungsi auto-update kolom `updated_at`
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Fungsi & Trigger: Otomatis buat profil Member ketika user baru daftar lewat Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_code TEXT;
    raw_name TEXT;
BEGIN
    -- Buat kode member unik otomatis (format: 0201 + 4 digit acak)
    new_code := '0201' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Ambil display_name dari metadata auth jika ada, jika tidak gunakan awalan email
    raw_name := COALESCE(
        NEW.raw_user_meta_data->>'name',
        NEW.raw_user_meta_data->>'full_name',
        SPLIT_PART(NEW.email, '@', 1)
    );

    INSERT INTO public.members (
        id,
        user_id,
        name,
        email,
        code,
        valid_until,
        role
    ) VALUES (
        NEW.id::TEXT,
        NEW.id,
        raw_name,
        NEW.email,
        new_code,
        (CURRENT_DATE + INTERVAL '30 days')::DATE, -- Gratis 30 hari pertama
        'member'
    )
    ON CONFLICT (email) DO UPDATE
    SET user_id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pasang trigger di auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Fungsi RPC: Check-in via Code / QR
CREATE OR REPLACE FUNCTION public.rpc_check_in(p_code TEXT)
RETURNS JSONB AS $$
DECLARE
    v_member public.members%ROWTYPE;
    v_active_id TEXT;
    v_new_id TEXT;
BEGIN
    -- 1. Cari data member berdasarkan kode
    SELECT * INTO v_member FROM public.members WHERE code = p_code;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('status', 'unknown', 'message', 'Member tidak ditemukan');
    END IF;

    -- 2. Cek apakah membership masih aktif
    IF v_member.valid_until < CURRENT_DATE THEN
        RETURN jsonb_build_object('status', 'expired', 'message', 'Membership sudah berakhir');
    END IF;

    -- 3. Cek apakah sudah check-in dan belum check-out (< 2 jam)
    SELECT id INTO v_active_id FROM public.visits
    WHERE member_id = v_member.id
      AND check_out_at IS NULL
      AND check_in_at >= (now() - INTERVAL '2 hours')
    LIMIT 1;

    IF v_active_id IS NOT NULL THEN
        RETURN jsonb_build_object('status', 'already', 'message', 'Member sudah check-in');
    END IF;

    -- 4. Catat kunjungan baru
    v_new_id := 'v-' || EXTRACT(EPOCH FROM now())::BIGINT::TEXT;
    INSERT INTO public.visits (id, member_id, check_in_at)
    VALUES (v_new_id, v_member.id, now());

    RETURN jsonb_build_object(
        'status', 'ok',
        'message', 'Check-in berhasil',
        'visit_id', v_new_id,
        'member_name', v_member.name
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fungsi RPC: Check-out
CREATE OR REPLACE FUNCTION public.rpc_check_out(p_member_id TEXT)
RETURNS JSONB AS $$
BEGIN
    UPDATE public.visits
    SET check_out_at = now()
    WHERE member_id = p_member_id
      AND check_out_at IS NULL
      AND check_in_at >= (now() - INTERVAL '2 hours');

    RETURN jsonb_build_object('status', 'ok', 'message', 'Check-out berhasil');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fungsi RPC: Perpanjang Membership
CREATE OR REPLACE FUNCTION public.rpc_extend_membership(
    p_member_id TEXT,
    p_months INT,
    p_plan_id TEXT,
    p_amount NUMERIC,
    p_transaction_id TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_member public.members%ROWTYPE;
    v_base_date DATE;
    v_new_date DATE;
BEGIN
    SELECT * INTO v_member FROM public.members WHERE id = p_member_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Member tidak ditemukan');
    END IF;

    -- Jika membership masih aktif, tambahkan dari tanggal berakhirnya.
    -- Jika sudah expired, tambahkan mulai dari hari ini.
    IF v_member.valid_until >= CURRENT_DATE THEN
        v_base_date := v_member.valid_until;
    ELSE
        v_base_date := CURRENT_DATE;
    END IF;

    v_new_date := (v_base_date + (p_months || ' months')::INTERVAL)::DATE;

    -- Update tanggal member
    UPDATE public.members
    SET valid_until = v_new_date
    WHERE id = p_member_id;

    -- Catat riwayat pembayaran
    INSERT INTO public.payments (
        member_id,
        plan_id,
        amount,
        months,
        status,
        transaction_id
    ) VALUES (
        p_member_id,
        p_plan_id,
        p_amount,
        p_months,
        'success',
        COALESCE(p_transaction_id, 'DEMO-' || p_member_id || '-' || EXTRACT(EPOCH FROM now())::BIGINT::TEXT)
    );

    RETURN jsonb_build_object(
        'success', true,
        'new_valid_until', v_new_date
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Policy Membership Plans: Bisa dibaca oleh publik/anon dan authenticated
DROP POLICY IF EXISTS "Plans are readable by everyone" ON public.membership_plans;
CREATE POLICY "Plans are readable by everyone"
ON public.membership_plans FOR SELECT
USING (true);

-- Policy Members:
-- User dapat melihat semua member (untuk daftar member/admin dan cek keramaian)
DROP POLICY IF EXISTS "Members are readable by authenticated users" ON public.members;
CREATE POLICY "Members are readable by authenticated users"
ON public.members FOR SELECT
TO authenticated, anon
USING (true);

-- User dapat mengupdate profil miliknya sendiri
DROP POLICY IF EXISTS "Users can update their own profile" ON public.members;
CREATE POLICY "Users can update their own profile"
ON public.members FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR auth.uid()::text = id);

-- Memungkinkan penambahan member (untuk registrasi / admin)
DROP POLICY IF EXISTS "Enable insert for authenticated and anon" ON public.members;
CREATE POLICY "Enable insert for authenticated and anon"
ON public.members FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Policy Visits:
DROP POLICY IF EXISTS "Visits are readable by everyone" ON public.visits;
CREATE POLICY "Visits are readable by everyone"
ON public.visits FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Visits can be created by authenticated and anon" ON public.visits;
CREATE POLICY "Visits can be created by authenticated and anon"
ON public.visits FOR INSERT
TO authenticated, anon
WITH CHECK (true);

DROP POLICY IF EXISTS "Visits can be updated by authenticated and anon" ON public.visits;
CREATE POLICY "Visits can be updated by authenticated and anon"
ON public.visits FOR UPDATE
TO authenticated, anon
USING (true);

-- Policy Payments:
DROP POLICY IF EXISTS "Payments are viewable by authenticated users" ON public.payments;
CREATE POLICY "Payments are viewable by authenticated users"
ON public.payments FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Payments can be inserted" ON public.payments;
CREATE POLICY "Payments can be inserted"
ON public.payments FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 9. DATA AWAL (SEED DATA)
-- ------------------------------------------------------------------------------

-- Seed: Paket Membership
INSERT INTO public.membership_plans (id, months, label, price, note) VALUES
('1', 1, '1 Bulan', 150000, NULL),
('3', 3, '3 Bulan', 400000, 'Hemat 11%'),
('6', 6, '6 Bulan', 750000, 'Hemat 17%'),
('12', 12, '12 Bulan', 1400000, 'Hemat 22%')
ON CONFLICT (id) DO UPDATE SET
    months = EXCLUDED.months,
    label = EXCLUDED.label,
    price = EXCLUDED.price,
    note = EXCLUDED.note;

-- Seed: Data Contoh Member (sesuai SEED_MEMBERS di seedData.ts)
INSERT INTO public.members (id, name, email, code, valid_until, role) VALUES
('m1', 'Muhammad Kharisma Aditya Putra', 'yenderruaditya@gmail.com', '02010602', (CURRENT_DATE + INTERVAL '45 days')::DATE, 'member'),
('m2', 'Rizky Pratama', 'rizky@example.com', '02010611', (CURRENT_DATE + INTERVAL '120 days')::DATE, 'member'),
('m3', 'Sari Wulandari', 'sari@example.com', '02010627', (CURRENT_DATE + INTERVAL '5 days')::DATE, 'member'),
('m4', 'Dewi Lestari', 'dewi@example.com', '02010634', (CURRENT_DATE - INTERVAL '10 days')::DATE, 'member'),
('m5', 'Bagas Santoso', 'bagas@example.com', '02010648', (CURRENT_DATE + INTERVAL '200 days')::DATE, 'member'),
('m6', 'Maya Putri', 'maya@example.com', '02010652', (CURRENT_DATE + INTERVAL '30 days')::DATE, 'member')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    code = EXCLUDED.code,
    valid_until = EXCLUDED.valid_until;

-- Seed: Data Kunjungan Aktif (Sedang di gym)
INSERT INTO public.visits (id, member_id, check_in_at, check_out_at) VALUES
('v-live-1', 'm2', now() - INTERVAL '35 minutes', NULL),
('v-live-2', 'm3', now() - INTERVAL '70 minutes', NULL)
ON CONFLICT (id) DO NOTHING;

-- Seed: Riwayat Kunjungan Demo untuk Member m1 (untuk Streak Mingguan)
INSERT INTO public.visits (id, member_id, check_in_at, check_out_at) VALUES
('v-demo-1', 'm1', now() - INTERVAL '2 days' - INTERVAL '4 hours', now() - INTERVAL '2 days' - INTERVAL '2 hours 45 minutes'),
('v-demo-2', 'm1', now() - INTERVAL '4 days' - INTERVAL '3 hours', now() - INTERVAL '4 days' - INTERVAL '1 hour 45 minutes'),
('v-demo-3', 'm1', now() - INTERVAL '7 days' - INTERVAL '5 hours', now() - INTERVAL '7 days' - INTERVAL '3 hours 45 minutes'),
('v-demo-4', 'm1', now() - INTERVAL '9 days' - INTERVAL '2 hours', now() - INTERVAL '9 days' - INTERVAL '45 minutes'),
('v-demo-5', 'm1', now() - INTERVAL '11 days' - INTERVAL '6 hours', now() - INTERVAL '11 days' - INTERVAL '4 hours 45 minutes'),
('v-demo-6', 'm1', now() - INTERVAL '14 days' - INTERVAL '4 hours', now() - INTERVAL '14 days' - INTERVAL '2 hours 45 minutes'),
('v-demo-7', 'm1', now() - INTERVAL '16 days' - INTERVAL '3 hours', now() - INTERVAL '16 days' - INTERVAL '1 hour 45 minutes'),
('v-demo-8', 'm1', now() - INTERVAL '18 days' - INTERVAL '5 hours', now() - INTERVAL '18 days' - INTERVAL '3 hours 45 minutes')
ON CONFLICT (id) DO NOTHING;
