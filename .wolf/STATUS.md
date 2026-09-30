---
description: session handoff, regenerate with /handoff when a quest finishes
budget_tokens: 1000
---
# STATUS — PhysFlix SPM

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-09-30

---

## ✅ Done

### Fasa 1: Seni Bina UI & Penstriman Asas
- UI Netflix Cinematic Dark Mode responsif (Tingkatan 4 & 5).
- Pemain video HLS/MP4 responsif, senarai main bab, MyHomePhysics Lab.

### Fasa 2: Autentikasi Google & DELIMa Moe-DL
- Log masuk Google & DELIMa Moe-DL melalui Supabase Auth.
- Jadual `profiles`, `user_activity`, penanda buku, dan sejarah tontonan.
- **Persetujuan Privasi & Data (Consent Agreement):** Kotak persetujuan pengumpulan data (Alamat E-mel, Data Video Paling Banyak Ditonton, dan Data Komen/Soal Jawab) di `LoginPage.tsx` dengan pengesahan mandatori sebelum log masuk Google atau E-mel.

### Fasa 3: Sistem Soal Jawab (Q&A) & AI Tutor
- Integrasi AI Physics Assistant via OpenRouter/Gemini Flash.
- Penapisan komen automatik dan pengurusan jawapan rasmi guru.

### Fasa 4: Gerbang Pembayaran ToyyibPay FPX & Developer Analytic Board
- Tetingkap checkout (`PremiumCheckoutModal.tsx`) dengan input mandatori Nama & No Tel Malaysia.
- Integrasi penuh API ToyyibPay FPX (`create-bill`, `return`, `callback`).
- Penguatkuasaan tamat tempoh automatik 1 tahun (365 hari) akaun premium.
- Kad masa nyata *Jumlah Murid Berdaftar (Premium/ Subscription)* di `AnalyticBoard.tsx` dengan fallback toleran kegagalan.
- **Percubaan Percuma 6 Bulan Tingkatan 5 (Form 5 Free Trial):** Ditukar automatik bermula klik tontonan pertama video T5 dengan sokongan localStorage + Supabase, lencana dinamik pada Hero & Video Cards, serta pemantauan analitik di AnalyticBoard.

### OpenWolf & Graft Integration
- `openwolf init` dan `openwolf scan` selesai (104 fail diindeks).
- Integrasi fail panduan dan memori projek di `.wolf/`.

---

## 🚀 Next phase

**Goal:** Fasa 5 — Ujian Aliran Penuh Pembayaran Live & Pengukuhan Pemain Video (Video Player Hardening)

### Acceptance criteria
1. Simulasi dan pengesahan transaksi FPX langsung (Live RM30) menggunakan akaun murid biasa dengan pemantauan webhook callback ToyyibPay.
2. Pengesahan kemasukan rekod `phone_number`, `is_premium`, dan `premium_expires_at` (365 hari) dalam jadual Supabase `profiles`.
3. Pengukuhan penimbalan video pemain HLS & CDN cache untuk penstriman stabil tanpa lag pada peranti mudah alih.
4. Reka bentuk awal modul janaan resit invois PDF (Fasa 6).

### Files to create / edit
| Type | File | Content |
|---|---|---|
| edit | `src/app/api/payment/toyyibpay/callback/route.ts` | Pengendali webhook callback & logging audit transaksi |
| edit | `src/components/VideoPlayer.tsx` | Pengukuhan penimbalan HLS, ralat rangkaian & kawalan kualiti |
| new | `src/components/InvoiceDownloadModal.tsx` | Komponen tetingkap muat turun resit invois PDF (Fasa 6) |

### Closed decisions
- ToyyibPay memerlukan input manual pengguna untuk Nama & No Tel bagi mengelakkan medan terkunci di FPX.
- Pertanyaan analitik profil di `AnalyticBoard` menggunakan kaedah dwi-fasa (dual-attempt) untuk mengelakkan ralat ketiadaan kolum.
- Pengumpulan data pengguna di halaman log masuk (`LoginPage.tsx`) diwajibkan melalui persetujuan interaktif (Consent Checkbox) bagi mematuhi ketelusan data murid.

### Open decisions
- Pilihan pustaka penjanaan PDF (cth. `@react-pdf/renderer` atau `jspdf` / `html2canvas`) untuk invois resit murid.

---

## 📁 Active architecture

- **Stack:** Next.js 15/16 (Turbopack, App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, Lucide React, OpenRouter/Gemini API, ToyyibPay FPX API.
- **Key components / routes:**
  - `src/components/LoginPage.tsx`: Halaman log masuk dengan kotak persetujuan data pengguna (E-mel, Tontonan Video, Komen)
  - `src/components/PremiumCheckoutModal.tsx`: Tetingkap bayaran FPX ToyyibPay
  - `src/components/AnalyticBoard.tsx`: Papan pemuka analitik pembangun
  - `src/app/api/payment/toyyibpay/`: Endpoint integrasi FPX (`create-bill`, `return`, `callback`)
  - `src/context/AuthContext.tsx`: Pengurusan sesi Supabase Auth & profil
- **Patterns:**
  - Mandatory consent verification sebelum proses log masuk akaun
  - Strict input validation untuk nombor telefon & nama pembeli
  - Fault-tolerant database queries dengan fallback selamat
  - Pengehadan butang ujian hanya untuk `DEV_TEST_EMAILS`
  - Tolak kod serentak ke 3 remote git (`origin`, `physflix2-origin`, `old-origin`)

---

## ⚠️ External blockers (don't block coding)

- Akaun pedagang ToyyibPay dalam mod pengeluaran (Production Secret Key & Category Code).
- Kredensial Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).

---

## 🔧 Useful commands

```bash
npm run dev                # Jalankan pelayan pembangunan tempatan (port 3000)
npm run build              # Semak binaan pengeluaran Next.js
openwolf status            # Semak kesihatan daemon & integriti fail OpenWolf
openwolf find <simbol>     # Cari definisi kod tanpa membaca fail penuh
openwolf scan              # Imbas semula anatomi fail projek
graft map                  # Peta perhubungan modul kod dan penjimatan token
```

---

## 📚 References (read IF needed)

- `PROJECT_FLOW.md` — Aliran terperinci projek & living architecture
- `ROADMAP.md` — Garis masa & batu tanda fasa PhysFlix SPM
- `.wolf/cerebrum.md` — Keutamaan pembangun & log keputusan teknikal
- `.wolf/anatomy.md` — Indeks fail token-efisien
- `.wolf/memory.md` — Log tindakan setiap sesi
