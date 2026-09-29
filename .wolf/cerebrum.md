---
description: learned preferences, project conventions, and Do-Not-Repeat rules
budget_tokens: 2000
---
# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-09-29

## User Preferences

- **Theme & UI**: Netflix Dark Cinematic aesthetic, responsive Tailwind CSS, high contrast, clean typography (Inter / system fonts), Lucide icons.
- **Data Privacy Consent**: Wajibkan persetujuan eksplisit pengguna pada halaman log masuk (`LoginPage.tsx`) yang merangkumi pengumpulan data e-mel, statistik video paling banyak ditonton, dan data komen/Q&A sebelum butang log masuk diproses.
- **Payer Info Strictness**: Always require manual input of Full Name and Phone Number (01X-XXXXXXX) in `PremiumCheckoutModal`; no placeholder or fake phone fallback.
- **Analytics Resilience**: Papan pemuka analitik (`AnalyticBoard.tsx`) must be fault-tolerant with dual-attempt query fallback if database schema columns evolve.
- **Dev Security**: Test simulation unlock buttons restricted strictly to `DEV_TEST_EMAILS`.
- **Git Push Protocol**: Tri-repo push to `origin`, `physflix2-origin`, and `old-origin`.
- **Backup Protocol**: Salinan fail asal disandarkan ke `/Users/halimroslan/NEW CIDS SUITES PRO/` sebelum pengubahsuaian kritikal.

## Key Learnings

- **Project:** PhysFlix SPM (Next.js 15/16, TypeScript, Tailwind CSS, Supabase PostgreSQL, ToyyibPay FPX, OpenRouter/Gemini AI Tutor).
- **Consent Agreement:** Memberikan ketelusan penuh kepada murid tentang data yang dikumpul (E-mel Google/DELIMa, Sejarah/Analitik Tontonan Video, dan Komen Soal Jawab) mengurangkan keraguan pengguna dan mematuhi dasar privasi.
- **Payment Flow:** ToyyibPay locks payer fields if passed via API, hence students must verify/input details in modal before redirection.
- **Subscription Expiry:** Enforce 365-day validity period (`premium_activated_at` to `premium_expires_at`).
- **Graft & OpenWolf:** Use `graft` and `openwolf find` to pinpoint spans with zero wasted tokens.

## Do-Not-Repeat

- [2026-09-29] Jangan biarkan pengguna menekan butang Log Masuk tanpa mengesahkan kotak persetujuan privasi & pengumpulan data.
- [2026-09-24] Jangan masukkan nombor telefon palsu (cth. 0123456789) ke dalam API ToyyibPay; wajibkan pengesahan borang manual pengguna.
- [2026-09-24] Jangan buat query terus kolum baharu seperti `is_premium` tanpa fallback selamat; ia akan menyebabkan ranapan skrin merah jika kolum belum dicipta di Supabase.

## Decision Log

- **2026-09-29 (Pelaksanaan Kotak Persetujuan Pengumpulan Data)**: Meletakkan kotak semakan persetujuan interaktif yang memperincikan pengumpulan E-mel, Data Video Paling Banyak Ditonton, dan Data Komen pada kedua-dua paparan (Hero Landing & Modal Log Masuk E-mel).
- **2026-09-24 (Penyelesaian Kunci Read-Only ToyyibPay):** Wajibkan pengguna menaip nama dan telefon sendiri di aplikasi PhysFlix sebelum diarahkan ke ToyyibPay.
- **2026-09-24 (Graceful Fallback Analytic Board):** Laksana dwi-pertanyaan (dual-attempt query) dengan fallback ke kolum asas dan butang salin skrip SQL 1-klik.
