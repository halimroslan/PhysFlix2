# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-09-30T06:49:18.587Z
> Files: 105 tracked | Anatomy hits: 0 | Misses: 0

> Project structure index. Auto-maintained by OpenWolf hooks and daemon.
> Run `openwolf scan` to generate, or wait for the first Claude Code session.
> Status: Pending initial scan

## ./

- `.gitignore` — Git ignore rules (~152 tok)
- `.ignore` — graft's cards are gitignored but should stay greppable: ripgrep reads (~48 tok)
- `AGENTS.md` — This is NOT the Next.js you know (~243 tok)
- `CLAUDE.md` — OpenWolf (~102 tok)
- `eslint.config.mjs` — ESLint flat configuration (~124 tok)
- `GEMINI.md` — OpenWolf (~75 tok)
- `list_users.js` — firebaseConfig: main (~170 tok)
- `next.config.ts` — Next.js configuration (~38 tok)
- `obfuscate_ids.js` — Declares fs (~215 tok)
- `package.json` — Node.js package manifest (~238 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `PROJECT_FLOW.md` — 🧭 PROJECT FLOW & LIVING ARCHITECTURE: PHYSFLIX SPM (~1812 tok)
- `README.md` — Project documentation (~363 tok)
- `ROADMAP.md` — 🗺️ ROADMAP & MILESTONES: PHYSFLIX SPM (~517 tok)
- `supabase_schema.sql` — PHYSFLIX SUPABASE DATABASE SCHEMA & RLS POLICIES (~1561 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)

## public/

- `manifest.json` (~127 tok)

## public/thumbnails/

- `09jX9qGHwSQ.webp` (~178132 tok)
- `2OeHdtXaeyM.webp` (~132375 tok)
- `3Wy8-kNGrcc.webp` (~134588 tok)
- `4v3ygAyaP68.webp` (~227785 tok)
- `8Ci_wF-Pvps.webp` (~134541 tok)
- `90mxEb59yZI.webp` (~136823 tok)
- `9sJ9a5rToVs.webp` (~149224 tok)
- `AceZCzCckqc.webp` (~126951 tok)
- `BqZIb-bVYk0.webp` (~168506 tok)
- `BRgIHlXbr_k.webp` (~112783 tok)
- `BSKVOMr_NWU.webp` (~176695 tok)
- `bViYGWMIHoI.webp` (~137562 tok)
- `FoOtEc3jlts.webp` (~118271 tok)
- `GIbs4ZhEPVY.webp` (~113289 tok)
- `GK4PZO-9hos.webp` (~106391 tok)
- `gqbZ3grngvg.webp` (~157648 tok)
- `hgnSRVa-lcY.webp` (~137307 tok)
- `HifOFbw3gDk.webp` (~94645 tok)
- `hsjQe4dnpl0.webp` (~200992 tok)
- `i4WgQ_Azegc.webp` (~152829 tok)
- `jbBMpSkhVbE.webp` (~124465 tok)
- `jylD8xsEUkE.webp` (~94645 tok)
- `l1aYWXec21Q.webp` (~98989 tok)
- `Lrq-a0624Y8.webp` (~144922 tok)
- `LwJhb5ey-q8.webp` (~245882 tok)
- `m90zg3HyU_8.webp` (~157051 tok)
- `MrRD2TOnp54.webp` (~145037 tok)
- `nLaJH-EH3Ko.webp` (~129716 tok)
- `oyweI4GDIsM.webp` (~131964 tok)
- `QZtocJnhel4.webp` (~119452 tok)
- `sn7_SSzSURM.webp` (~142487 tok)
- `snbt6GpD0C4.webp` (~141698 tok)
- `t4_m15_3_3b.webp` (~146917 tok)
- `uQwyU34HH28.webp` (~162348 tok)
- `x-wilmj9cxE.webp` (~128022 tok)
- `XzSTapojxMU.webp` (~157586 tok)
- `Y7yT4-9R6do.webp` (~164922 tok)
- `yuY1N9zgEEc.webp` (~149974 tok)

## scripts/

- `parseQuiz.js` — fs: saveImage (~1729 tok)

## src/app/

- `globals.css` — Styles: 12 rules, 7 vars, 1 animations, 1 layers (~538 tok)
- `layout.tsx` — geistSans (~378 tok)
- `page.tsx` — MainDashboard — uses useState, useEffect (~8338 tok)

## src/app/api/ai-answer/

- `route.ts` — Helper to detect if a student's query is in English / DLP or asks for English (~3488 tok)

## src/app/api/ai-tokens/

- `route.ts` — Next.js API route: GET (~1403 tok)

## src/app/api/moderate-comment/

- `route.ts` — Helper for direct Google Gemini API call if key is available (~2524 tok)

## src/app/api/payment/toyyibpay/callback/

- `route.ts` — Next.js API route: POST (~435 tok)

## src/app/api/payment/toyyibpay/create-bill/

- `route.ts` — Next.js API route: POST (~1362 tok)

## src/app/api/payment/toyyibpay/return/

- `route.ts` — Next.js API route: GET (~767 tok)

## src/app/api/qa/

- `route.ts` — Next.js API route: GET (~7038 tok)

## src/components/

- `AnalyticBoard.tsx` — SUPERADMIN_EMAILS — renders chart — uses useState, useEffect (~16241 tok)
- `CalculatorModal.tsx` — CalculatorModal — uses useState (~899 tok)
- `ContinueWatching.tsx` — ContinueWatching (~1383 tok)
- `DictionaryModal.tsx` — DictionaryModal — uses useState, useMemo (~3488 tok)
- `FormulaSheetModal.tsx` — FormulaSheetModal — uses useState, useMemo (~3697 tok)
- `HeroSpotlight.tsx` — FEATURED_T5_DRIVE_IDS (~11820 tok)
- `LoginPage.tsx` — LoginPage — renders form — uses useState (~4759 tok)
- `MathFormula.tsx` — MathFormula — uses useMemo (~198 tok)
- `Navbar.tsx` — Navbar — uses useState, useEffect (~3876 tok)
- `NotificationDropdown.tsx` — STORAGE_KEY — uses useEffect (~5019 tok)
- `PremiumCheckoutModal.tsx` — FPX_BANKS — uses useEffect (~7138 tok)
- `QuizComponent.tsx` — The shape of our quiz data json (~2356 tok)
- `QuizModal.tsx` — quizData — uses useState (~2250 tok)
- `RevisionCollections.tsx` — RevisionCollections (~803 tok)
- `ScoreBoardView.tsx` — ScoreBoardView — renders chart (~2423 tok)
- `TopPicks.tsx` — dskpThemes (~5477 tok)
- `VideoPlayerView.tsx` — VideoPlayerView — uses useState, useEffect, useMemo (~36181 tok)

## src/context/

- `AuthContext.tsx` — SUPERADMIN_EMAILS — uses useState, useEffect (~5709 tok)
- `LanguageContext.tsx` — translations — uses useContext (~2007 tok)
- `UserActivityContext.tsx` — UserActivityContext — uses useRef, useEffect, useContext (~2494 tok)

## src/data/

- `cheatNotesData.ts` — RINGKASAN NOTA FIZIK SPM KSSM (~32732 tok)
- `conceptDefinitions.ts` — Exports conceptDefinitions (~23920 tok)
- `dskpData.ts` — Exports dskpMappings (~5087 tok)
- `dskpLearningPoints.ts` — Dokumen Standard Kurikulum dan Pentaksiran (DSKP) Fizik KSSM (~15784 tok)
- `formulaData.ts` — HELAIAN FORMULA FIZIK SPM (KSSM) (~18930 tok)
- `kamusData.ts` — KAMUS FIZIK SPM (BM <-> DLP) (~28044 tok)
- `notificationsData.ts` — Exports SystemNotification, initialNotifications (~1251 tok)
- `physicsData.ts` — Exports VideoLesson, rawForm4Videos (~15303 tok)
- `qa_store.json` (~5107 tok)
- `qaDatabase.ts` — Returns user Q&A discussions for a lesson (zero dummy chats) (~274 tok)
- `quizData.json` (~72558 tok)
- `tavisPositions.json` (~1 tok)

## src/lib/

- `firebase.ts` — Exports auth, googleProvider, db (~309 tok)
- `supabase.ts` — Exports isSupabaseConfigured, supabase (~185 tok)

## src/types/

- `qa.ts` — Exports SUPERADMIN_EMAILS, QAReply, QAItem, isSuperadminReply, isAiTutorReply (~517 tok)

## src/utils/

- `moderation.ts` — Comprehensive client-side & server-side profanity, insult, scam, harassment, (~1828 tok)
- `notificationStore.ts` — Notification Store for AI Tutor (Sir Halim) Replies & User Questions (~2287 tok)
- `security.ts` — Exports obfuscateId, deobfuscateId, useDRMProtection (~450 tok)
- `videoResolution.ts` — Universal Video ID Aliases Dictionary. (~1206 tok)
