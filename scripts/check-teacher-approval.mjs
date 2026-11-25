// Run: npm exec --yes --package=@electric-sql/pglite@0.6.0 -- node scripts/check-teacher-approval.mjs
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { delimiter, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2] || process.env.PATH.split(delimiter)
  .map(path => resolve(path, '../@electric-sql/pglite/dist/index.js')).find(existsSync);
assert(modulePath, 'Run using the npm exec command at the top of this file, or supply the PGlite module path.');
const { PGlite } = await import(pathToFileURL(modulePath).href);
const db = new PGlite();
await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE SCHEMA auth;
  CREATE TABLE auth.users(id uuid PRIMARY KEY, email text, email_confirmed_at timestamptz);
  CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  GRANT USAGE ON SCHEMA auth TO authenticated; GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
  CREATE TABLE public.user_activity(user_id uuid PRIMARY KEY REFERENCES auth.users(id));`);
const ids = {
  developer: '11111111-1111-1111-1111-111111111111', teacher: '22222222-2222-2222-2222-222222222222',
  student: '33333333-3333-3333-3333-333333333333', otherAdmin: '44444444-4444-4444-4444-444444444444',
  stranger: '55555555-5555-5555-5555-555555555555', unverified: '66666666-6666-6666-6666-666666666666',
  legacy: '77777777-7777-7777-7777-777777777777',
  secondDeveloper: '88888888-8888-8888-8888-888888888888', unverifiedSecond: '99999999-9999-9999-9999-999999999999',
};
for (const [kind, id] of Object.entries(ids)) {
  const email = ['developer', 'unverified'].includes(kind) ? 'abdulhalimroslan@gmail.com' : ['secondDeveloper', 'unverifiedSecond'].includes(kind) ? 'ahalimroslan@gmail.com' : kind === 'otherAdmin' ? 'g-41192875@moe-dl.edu.my' : `${kind}@example.test`;
  await db.query('INSERT INTO auth.users VALUES ($1,$2,$3)', [id, email, ['unverified', 'unverifiedSecond'].includes(kind) ? null : new Date().toISOString()]);
}
const login = async kind => db.exec(`SET ROLE authenticated; SET request.jwt.claim.sub = '${ids[kind]}'`);
const register = (name = 'Guru Test', school = 'Sekolah Test', code = 'ABC1234') => db.query('SELECT * FROM public.register_teacher($1,$2,$3)', [name, school, code]);
const account = async id => (await db.query('SELECT *, created_at::text AS requested_at FROM public.teacher_accounts WHERE user_id=$1', [id])).rows[0];
const review = (approve, requestedAt) => db.query('SELECT * FROM public.review_teacher_request($1,$2,$3)', [ids.teacher, approve, requestedAt]);
const lookup = () => db.query("SELECT * FROM public.find_report_school('ABC1234')");
const submit = () => db.query("SELECT public.submit_school_report('ABC1234','Pelajar Test','4 Amanah','4',$1::jsonb,NULL) AS id", [JSON.stringify([{id:'v1',title:'Daya',form:4,completionPercentage:75,quiz:{correct:4,total:5,percentage:80}}])]);

await db.exec(readFileSync(new URL('../supabase/migrations/202611250001_teacher_reports.sql', import.meta.url), 'utf8'));
await login('legacy');
await register('Guru Lama', 'Sekolah Lama', 'OLD1234');
await db.exec('RESET ROLE');
await db.exec(readFileSync(new URL('../supabase/migrations/202611250002_teacher_approval.sql', import.meta.url), 'utf8'));
await db.exec(readFileSync(new URL('../supabase/migrations/202611250003_second_developer.sql', import.meta.url), 'utf8'));
await login('legacy');
assert.equal((await account(ids.legacy)).approval_status, 'pending'); // No grandfathered self-approval.
await login('teacher');
await register();
let request = await account(ids.teacher);
assert.equal(request.approval_status, 'pending');
assert.equal((await lookup()).rows.length, 0);
await assert.rejects(db.query("UPDATE public.teacher_accounts SET approval_status='approved' WHERE user_id=$1", [ids.teacher]));
await assert.rejects(review(true, request.requested_at));
await login('student');
await assert.rejects(submit()); // RPC cannot write reports for unapproved teacher.
for (const kind of ['otherAdmin', 'stranger', 'unverified', 'unverifiedSecond']) {
  await login(kind);
  await db.exec("SET request.jwt.claim.email = 'abdulhalimroslan@gmail.com'");
  assert.equal((await db.query('SELECT public.is_teacher_approver() AS allowed')).rows[0].allowed, false);
  await assert.rejects(review(true, request.requested_at));
  assert.equal((await db.query('SELECT * FROM public.teacher_accounts')).rows.length, 0);
}
await login('developer');
assert.equal((await db.query('SELECT public.is_teacher_approver() AS allowed')).rows[0].allowed, true);
assert.equal((await db.query('SELECT * FROM public.teacher_accounts')).rows.length, 2);
await assert.rejects(review(true, '2000-01-01T00:00:00Z'));
await assert.rejects(review(null, request.requested_at));
await review(true, request.requested_at);
let approved = await account(ids.teacher);
assert.equal(approved.approval_status, 'approved');
assert.equal(approved.reviewed_by, ids.developer);
assert(approved.reviewed_at);
await assert.rejects(review(false, request.requested_at));
await login('student');
assert.equal((await lookup()).rows.length, 1);
const firstReport = (await submit()).rows[0].id;
assert.equal((await submit()).rows[0].id, firstReport);
await login('teacher');
assert.equal((await db.query('SELECT * FROM public.school_reports')).rows.length, 1);
await register();
assert.equal((await account(ids.teacher)).approval_status, 'approved'); // Unchanged approved profile stays approved.
await register('Guru Test', 'Sekolah Baru');
request = await account(ids.teacher);
assert.equal(request.approval_status, 'pending');
assert.equal(request.reviewed_by, null);
assert.equal((await db.query('SELECT * FROM public.school_reports')).rows.length, 0);
await login('student');
assert.equal((await lookup()).rows.length, 0);
await assert.rejects(submit());
assert.equal((await db.query('SELECT * FROM public.school_reports')).rows.length, 1); // Own report retained.
await login('secondDeveloper');
assert.equal((await db.query('SELECT public.is_teacher_approver() AS allowed')).rows[0].allowed, true);
await assert.rejects(review(true, approved.requested_at)); // Applicant changed data after review list loaded.
await review(false, request.requested_at);
assert.equal((await account(ids.teacher)).approval_status, 'rejected');
assert.equal((await account(ids.teacher)).reviewed_by, ids.secondDeveloper);
await login('teacher');
await register('Guru Test', 'Sekolah Baru');
request = await account(ids.teacher);
assert.equal(request.approval_status, 'pending');
await login('developer');
await review(true, request.requested_at);
await login('stranger');
assert.equal((await db.query('SELECT * FROM public.school_reports')).rows.length, 0);
await db.exec("RESET ROLE; SET ROLE anon; SET request.jwt.claim.sub = ''");
await assert.rejects(db.query('SELECT public.is_teacher_approver()'));
await assert.rejects(lookup());
await assert.rejects(review(true, request.requested_at));
await db.close();
console.log('Teacher approval checks passed: both verified developers only, pending/rejected gates, RLS, approval/rejection/resubmission, stale-review protection, legacy accounts, report access.');
