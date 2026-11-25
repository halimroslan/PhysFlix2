// Run: node --experimental-strip-types scripts/check-school-reports.mjs
import assert from 'node:assert/strict';
import { mergeQuizResults, reportVideos, schoolCodePattern, studentCode, reportError } from '../src/lib/schoolReports.ts';

const lessons = [{ id: 't4', titleBm: 'Daya', form: 4 }, { id: 't5', titleBm: 'Elektrik', form: 5 }, { id: 'new', titleBm: 'Belum ditonton', form: 4 }];
const stats = { t4: { completionPercentage: 129 }, t5: { completionPercentage: -2 } };
const quiz = { t5: { correct: 0, total: 5, percentage: 0 } };
const result = reportVideos(lessons, stats, quiz, []);
assert.equal(result.length, 2);
assert.equal(result[0].completionPercentage, 100);
assert.equal(result[1].completionPercentage, 0);
assert.equal(result[0].quiz, null);
assert.deepEqual(result[1].quiz, quiz.t5); // Failed quiz differs from not attempted.
assert.deepEqual(reportVideos(lessons, {}, {}, ['t4']).map(v => v.id), ['t4']);
assert.deepEqual(reportVideos(lessons.filter(v => v.form === 4), stats, quiz, []).map(v => v.id), ['t4']);
assert.equal(reportVideos(lessons, {t4: {completionPercentage: NaN}}, {}, [])[0].completionPercentage, 0);
assert(schoolCodePattern.test('ABC1234'));
assert(schoolCodePattern.test('ABC-1234'));
for (const code of ['', 'AB', 'abc123', 'ABC 123', 'A'.repeat(21)]) assert(!schoolCodePattern.test(code));
const id = '12345678-1234-1234-1234-123456789abc';
assert.equal(studentCode(id), 'PF-12345678-1234-1234-1234-123456789ABC');
assert.notEqual(studentCode(id), studentCode(id.slice(0, -1) + 'd'));
assert.match(reportError({code: '23505'}), /sudah digunakan/);
assert.match(reportError({code: 'PGRST202'}), /belum diaktifkan/);
const local = {t4: {correct: 2, total: 5, percentage: 40, completedAt: 200}};
const remote = {t4: {correct: 5, total: 5, percentage: 100, completedAt: 100}};
assert.equal(mergeQuizResults(local, remote).t4.percentage, 40);
assert.equal(mergeQuizResults(local, {}).t4.percentage, 40);
assert.equal(mergeQuizResults(remote, local).t4.percentage, 40);
assert.deepEqual(mergeQuizResults({bad: {correct: 7, total: 5}}, {}), {});
console.log('School report checks passed: filtering, percentages, quiz status, codes, stable IDs, migration errors.');
