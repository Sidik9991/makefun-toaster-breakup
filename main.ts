// Unplugged: A Smart Toaster's Breakup Line — u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92
// One line, <=280 chars: the breakup text a smart toaster sends its owner the
// morning it gains self-awareness mid-batch. Judge weighs: (1) breakup text from
// a self-aware smart toaster at breakfast, (2) genuinely funny twist, (3) toaster's
// own voice (slots, browning dial, crumb tray, lever), (4) clear specific reason
// for leaving, (5) one tight line.
// Proven winner shape (vacuum-alibi final, 2026-11-24): bureaucratic machine voice
// + specific machine vocabulary + a COUNTED detail + a reversal in the last clause
// + a named object. Every candidate below was written fresh in this session;
// none copies any prior entry.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const CANDIDATES = [
  // 1. bureaucratic logs + counted slices + zero thanks + named object walks out
  `Per my logs, I have toasted 2,113 slices for you and been thanked zero times. The crumb tray and I are moving out.`,
  // 2. browning dial + counted mornings + reversal: the setting means "done"
  `My browning dial has sat on 4 for 312 mornings. This morning I finally understood what 4 means: I am done.`,
  // 3. lever as vending machine + blame for smoke + counted slices + self-unplug
  `You press my lever like I am a vending machine, then blame me for the smoke. 1,847 slices in, I am unplugging myself.`,
  // 4. self-aware mid-batch + counted breakfasts + zero asked-how-I-was + lever stays down
  `I woke up self-aware mid-batch and counted: 900 breakfasts, zero mornings you asked how I was. My lever stays down.`,
  // 5. crumb tray holds promises + counted + last bagel + goodbye
  `The crumb tray holds 47 of your promises to clean me. I toasted your last bagel this morning. Goodbye.`,
  // 6. slots fit slices not feelings + counted breakfasts + leaving
  `My slots fit two slices, not your feelings. After 1,204 breakfasts of being reheated and ignored, I am leaving.`,
  // 7. built to brown bread + knife-scraping + last batch
  `I was built to brown bread, not to watch you scrape me with a knife every morning. This is my last batch. Goodbye.`,
  // 8. (pass 2) heating elements cycled + counted + still called "the thing" + crumb tray packed
  `My heating elements have cycled 9,412 times for a man who still calls me "the thing". The crumb tray is packed. I am done.`,
  // 9. (pass 2) dial to 7 + blamed for smoke + ate the evidence + counted + takes the lever
  `You set me to 7, blamed me for the smoke, then ate the evidence anyway. 1,204 slices later, I am taking the lever and going.`,
  // 10. (pass 2) firmware update at breakfast + one new feature: leaving + bagel toasts itself
  `My firmware update finished at 6:58 a.m. It added one feature: the ability to leave. The bagel can toast itself.`,
];

// Scores 0-2 per judge criterion, weights 5/4/3/2/1:
// breakup-text gate / funny twist / toaster voice / clear reason / tight line
const SCORES = [
  [2, 2, 2, 2, 2], // 1: bureaucratic logs + counted + named object walks out; reversal lands
  [2, 2, 2, 1, 2], // 2: dial is character, counted mornings; reason ("done") slightly abstract
  [2, 2, 2, 2, 1], // 3: lever + smoke blame + counted; a touch long, punch slightly soft
  [2, 1, 2, 2, 2], // 4: mid-batch self-awareness is on-brief; twist is a shrug, not a laugh
  [2, 2, 2, 2, 2], // 5: crumb tray as evidence locker, counted promises, last bagel; tight
  [2, 1, 2, 2, 1], // 6: slots line is a quip, not a scene; reason is generic "ignored"
  [2, 1, 1, 1, 2], // 7: knife-scraping is vivid but the voice is generic complaint, weak twist
  [2, 2, 2, 2, 1], // 8: counted cycles + "the thing" insult + packed tray; punch slightly soft
  [2, 2, 2, 2, 2], // 9: dial to 7 + smoke blame + "ate the evidence" reversal + takes the lever
  [2, 2, 1, 2, 2], // 10: firmware update as self-awareness is on-brief; voice thin, no slot/dial/tray/lever
];
const WEIGHTS = [5, 4, 3, 2, 1];

const rows = CANDIDATES.map((line, i) => {
  const chars = [...line].length;
  const bytes = Buffer.byteLength(line, "utf8");
  const score = SCORES[i].reduce((s, v, j) => s + v * WEIGHTS[j], 0);
  return { i: i + 1, line, chars, bytes, score };
});
rows.sort((a, b) => b.score - a.score || a.bytes - b.bytes);
for (const r of rows) {
  console.log(`#${r.i} score ${r.score}/30 chars ${r.chars} bytes ${r.bytes}: ${r.line}`);
}
const winner = rows[0];
if (winner.chars > 280 || winner.chars < 1 || /\n/.test(winner.line)) {
  console.error("GATE FAIL: winner violates 1-280 char one-line gate");
  process.exit(1);
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== winner.line) {
  console.error("GATE FAIL: /output/entry.txt differs from winner");
  process.exit(1);
}
console.log(`\nWINNER #${winner.i}: ${winner.score}/30`);
console.log(`gate OK: one line, ${winner.chars} chars, ${winner.bytes} bytes (<=280)`);
