# STATUS — PhysFlix SPM

Last updated: 2026-11-28

## ✅ Done
- Teacher requests from account menu: full name, school name and unique school code with Developer-approved change requests; pending/approved/rejected lifecycle.
- Only verified `abdulhalimroslan@gmail.com` and `ahalimroslan@gmail.com` can approve/reject via **Permohonan Akaun Guru** in Analytic Board; other superadmin accounts cannot review.
- Dashboard Guru shown after MyHomePhysics Lab only after approval. Teacher can check status; rejected requests can resubmit. Changed approved name/school requires reapproval.
- Minimal expandable report cards in Score Board and T4/T5 statistics retain school code, full name, class, stable PF-UUID, consent and explicit Send.
- Teacher dashboard reports are collapsed by default. Clicking student name/header expands or collapses video/quiz progress; name, class, ID, scope and timestamp remain visible. Native details/summary supports Enter/Space and mobile. Separate snapshots by all/T4/T5; resubmission updates same scope.
- Quiz results persist with timestamp reconciliation, account-isolated cache and safe remote sync.
- Application release `dca5a85` pushed to all three remotes; Vercel production deployment `dpl_5w5swjACfawKHctK2kSdjdX5hg2r` READY at https://physflix.vercel.app. Documentation handoff `f72f372` also pushed.
- **PRODUCTION DATABASE ACTIVE:** migrations `202611250001_teacher_reports.sql` and `202611250002_teacher_approval.sql` applied atomically to `yzurojadggyoxyxmmwof`, recorded in `supabase_migrations.schema_migrations`; PostgREST schema reload notified.
- Verified real production DB roles: registration pending, exact verified developer-only review, reject/resubmit/approve, stale-review rejection, student report submission/resubmission, correct video/quiz values, RLS isolation, reapproval access lock. Entire test transaction rolled back; no test fixtures retained.
- Anonymous REST requests now resolve the new RPCs and correctly return 401/42501 instead of missing-function PGRST202.
- Earlier checks passed: Next production build, TypeScript, focused ESLint, PGlite approval suite, mocked desktop/mobile UI including status refresh and report design.

## 🚀 Next quest
Monitor first real teacher request and student report through the live UI.

Acceptance:
1. Teacher submits actual name/school/code and sees pending status.
2. Developer logs in as `abdulhalimroslan@gmail.com` or `ahalimroslan@gmail.com`, opens Analytic Board → Permohonan Akaun Guru, reviews and approves/rejects.
3. Approved teacher sees dashboard; student sends name/class/ID/video/quiz statistics using school code.
4. Monitor first live submissions; no further migration/deployment required for activation.

## Context
- Supabase CLI login confirmed. Project PhysFlix ACTIVE_HEALTHY; designated developer already has verified application auth account.
- Management API SQL works without DB password: `supabase db query --linked --project-ref yzurojadggyoxyxmmwof --file <sql>`.
- Schema snapshot, atomic apply SQL, source migrations and rollback-only production verification SQL saved outside repo at `/Users/halimroslan/NEW CIDS SUITES PRO/PhysFlix-SPM-production-activation-20261125/`.
- No auth users/profiles changed by production tests. Test teacher/report records rolled back; no messages sent.
- Vercel project `physflix`, scope `abdulhalimroslan-3945s-projects`. DB-only activation needs no application redeploy.
- Remotes: origin PhysFlix4, physflix2-origin PhysFlix2, old-origin PhysicsSPMFlix; main. Supabase local `.temp` cache ignored.
- Existing legacy lint violations remain outside scope; no new application dependencies or product code changes this activation turn.

## Dashboard collapse update
- Student report disclosure implemented with native details/summary; no JS state or dependencies.
- Production build, focused ESLint and mocked desktop/mobile browser checks passed (default closed, click open/close, Enter/Space, independent reports, video/quiz values).

## Additional Developer — 2026-11-25
- Added `ahalimroslan@gmail.com` alongside existing developer to teacher-request UI and database approver allowlist. Both auth accounts confirmed verified in production.
- Migration `202611250003_second_developer.sql` applied atomically with migration history and schema reload; verified auth.users identity remains mandatory. Other superadmins receive no new permission.
- School-report checks, PGlite approval/RLS suite, focused ESLint and production build passed. Production permission checks passed for all existing auth identities, with spoofed JWT email rejected and anonymous execution disabled. Application commit `29d5912` pushed to all three remotes; Vercel production deployment `dpl_7n19t7pA2aZxLBgXPrfA25DCQbfp` READY at https://physflix.vercel.app.

## School-code change requests — 2026-11-28
- Approved teachers can request a new unique code in Menu akaun → Profil Guru → Mohon Tukar Kod Sekolah, check status, and revise/resubmit requests.
- Existing code and approved teacher access remain active pending review. Developer reviews current/requested code in Permohonan Akaun Guru. Approval atomically changes routing; rejection keeps old code. Reports remain bound to teacher UUID.
- Migration `202611280001_school_code_requests.sql` applied and recorded in production; anonymous access denied, verified Developer checks retained, stale reviews and code collisions rejected.
- Checks passed: PGlite authorization/approval/rejection/collision/routing/report-preservation suite, focused lint, production build, mocked mobile/desktop UI including status refresh, production migration/permission checks.
- GitHub push and Vercel deployment pending.
