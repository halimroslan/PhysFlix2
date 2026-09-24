# 🧭 PROJECT FLOW & LIVING ARCHITECTURE: PHYSFLIX SPM

> **Status Semasa:** FASA 4 (Integrasi ToyyibPay FPX & Developer Analytic Board) ✅ SELESAI | FASA 5 (Ujian Aliran Penuh Pembayaran Live & Video Player Hardening) 🔄 SEDIA DIMULAKAN  
> **Tarikh Kemas Kini Terakhir:** 2026-09-24  
> **Direktori Utama Projek:** `/Users/halimroslan/Desktop/MyApp/physics-spm-flix`  
> **Aplikasi Live (Vercel):** [https://physflix.vercel.app](https://physflix.vercel.app)  
> **Pangkalan Data:** Supabase PostgreSQL (`yzurojadggyoxyxmmwof`)  
> **GitHub Repos:** 
> - `origin`: [https://github.com/halimroslan/PhysFlix4.git](https://github.com/halimroslan/PhysFlix4.git)
> - `physflix2-origin`: [https://github.com/halimroslan/PhysFlix2.git](https://github.com/halimroslan/PhysFlix2.git)
> - `old-origin`: [https://github.com/halimroslan/PhysicsSPMFlix.git](https://github.com/halimroslan/PhysicsSPMFlix.git)

---

## 1. 🎯 Ringkasan Eksekutif & Skop Projek
Platform penstriman video pengajaran Fizik SPM interaktif bertaraf premium ("Netflix untuk Fizik SPM"). Mengandungi 29 modul video Tingkatan 5 (Bab 1 - 7), modul Tingkatan 4, makmal maya MyHomePhysics Lab, AI Physics Tutor terbenam, papan analitik masa nyata (Developer Analytic Board), dan gerbang pembayaran FPX dalam talian rasmi ToyyibPay.

---

## 2. 📊 Status Fasa & Kemajuan Terkini

| Fasa | Nama Modul / Tugasan | Status | Catatan / Output Utama |
| :---: | :--- | :---: | :--- |
| **Fasa 1** | **Seni Bina UI & Penstriman Asas** | ✅ Selesai | Tema Netflix Dark Cinematic, sistem tab T4/T5, pemain video HLS/MP4 responsif. |
| **Fasa 2** | **Autentikasi Google & Profil Supabase** | ✅ Selesai | Log masuk akaun Google & DELIMa Moe-DL, jadual `profiles`, `user_activity`, pengesanan superadmin. |
| **Fasa 3** | **Sistem Soal Jawab (Q&A) & AI Tutor** | ✅ Selesai | Integrasi OpenRouter/Gemini Flash, penapisan komen automatik, sokongan semakan guru. |
| **Fasa 4** | **Gerbang Pembayaran ToyyibPay & Analytic Board** | ✅ Selesai | - Wajibkan input manual Nama Penuh & No Tel pada modal checkout.\n- Integrasi API ToyyibPay FPX (`create-bill`, `return`, `callback`).\n- Kad metrik *Jumlah Murid Berdaftar (Premium/ Subscription)* di Developer Analytic Board.\n- Migrasi kolum `profiles` di Supabase (`is_premium`, `premium_expires_at`, `phone_number`).\n- Mekanisme query fault-tolerant & binaan Vercel 100% lulus. |
| **Fasa 5** | **Ujian Aliran Penuh Pembayaran Live & Video Player Hardening** | 🔄 Sedia Mula | Simulasi pembayaran RM30 FPX sebenar, pemantauan webhook callback ToyyibPay, kawalan kualiti penstriman video. |
| **Fasa 6** | **Eksport Invois PDF & Pemberitahuan WhatsApp** | ⏳ Perancangan | Janaan resit rasmi secara automatik untuk simpanan murid/ibu bapa. |

---

## 3. 🏛️ Seni Bina Teknikal & Peraturan Emas (Golden Invariants)

1. **Invariant 1 (Mandatory Manual Input for Payer Info):** Pengguna WAJIB memasukkan Nama Penuh dan Nombor Telefon yang sah secara manual di `PremiumCheckoutModal` sebelum butang bayar boleh diproses. Tiada fallback nombor palsu `0123456789`.
2. **Invariant 2 (Strict Phone Format Validation):** Nombor telefon wajib menepati format Malaysia (10-11 digit, bermula dengan `01`).
3. **Invariant 3 (Strict 1-Year Expiration Auto-Lock):** Langganan premium sah selama 365 hari dari tarikh transaksi berjaya (`premium_activated_at` hingga `premium_expires_at`). Selepas tempoh tamat, akses video premium dikunci secara automatik di peringkat pangkalan data dan cache pelanggan.
4. **Invariant 4 (Fault-Tolerant Analytics Queries):** Sebarang pertanyaan analitik pangkalan data mesti mempunyai fallback selamat supaya papan pemuka tidak pernah ranap jika terdapat perubahan skema.
5. **Invariant 5 (Verified Developer Accounts Only for Simulations):** Butang pintas ujian pembangun (*instant unlock simulation*) hanya boleh dilihat dan digunakan oleh emel pembangun yang sah dalam `DEV_TEST_EMAILS`.
6. **Invariant 6 (Automatic Tri-Repo Push):** Sebarang kemas kini produksi mesti ditolak (push) serentak ke ketiga-tiga remote git (`origin`, `physflix2-origin`, `old-origin`) untuk memastikan penyelarasan Vercel sempurna.
7. **Invariant 7 (Mandatory Backup Protocol):** Salinan fail asal wajib disandarkan ke `/Users/halimroslan/NEW CIDS SUITES PRO/` sebelum sebarang pengubahsuaian fail dilakukan.

---

## 4. 📁 Peta Fail & Aset Kritikal
- `src/components/PremiumCheckoutModal.tsx`: Tetingkap modal langganan dengan borang maklumat pembeli mandatori & gerbang FPX.
- `src/app/api/payment/toyyibpay/create-bill/route.ts`: Endpoint API penjana bil ToyyibPay FPX & sinkronisasi nombor telefon pelajar ke Supabase.
- `src/app/api/payment/toyyibpay/return/route.ts`: Pengendali pengalihan kejayaan/kegagalan transaksi daripada ToyyibPay.
- `src/app/api/payment/toyyibpay/callback/route.ts`: Webhook pelayan ToyyibPay untuk pengaktifan akaun automatik secara tak segerak (asynchronous).
- `src/components/AnalyticBoard.tsx`: Papan pemuka analitik pembangun dengan kad masa nyata murid premium, tontonan, suka, dan senarai profil.
- `supabase_schema.sql`: Skema rasmi pangkalan data Supabase PostgreSQL & RLS Policies.

---

## 5. 📝 Log Keputusan Teknikal (Mini-ADRs)
- **2026-09-24 (Penyelesaian Kunci Read-Only ToyyibPay):** ToyyibPay mengunci medan nama & telefon sekiranya dihantar oleh API peniaga. Keputusan dibuat untuk mewajibkan pengguna menaip nama dan telefon sendiri di aplikasi PhysFlix sebelum diarahkan ke ToyyibPay, menggantikan data palsu terdahulu.
- **2026-09-24 (Graceful Fallback Analytic Board):** Bagi mengelakkan ranapan skrin merah sekiranya kolum `is_premium` belum wujud, `AnalyticBoard` melaksanakan dwi-pertanyaan (dual-attempt query) dengan fallback ke kolum asas dan butang salin skrip SQL 1-klik untuk pentadbir.

---

## 6. ⏭️ Tindakan Seterusnya (Next Action Items)
- [ ] Lakukan ujian transaksi sebenar (Live RM30.00 FPX Test) melalui akaun murid bukan pembangun.
- [ ] Pantau kemasukan data sebenar nombor telefon dan tarikh tamat tempoh dalam jadual `profiles` di Supabase.
- [ ] Semak paparan status langganan pada kad analitik Developer Board selepas transaksi pertama selesai.
