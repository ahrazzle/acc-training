#!/usr/bin/env node
/* ============================================================
   acc-training — content validation harness
   Run: npm test   (or: node tests/validate.mjs)

   Checks the declarative content layer (js/data.js) against the
   renderer's contract (js/app.js):
     - nav <-> views cross-references (no orphans, no dead links)
     - every view starts with a kicker and ends with a footer
     - every block type is one the renderer handles
     - exposure-map pins reference real MAP rows; map ids are unique
     - table danger/mono indexes are in bounds
     - nav numbering is strictly increasing per section and unique
     - per-block structural requirements (case beats, questions,
       acc sims, zones, mbs, reveals)
     - PukhNaming.transform() is idempotent over all content strings
       (the transform runs over already-transformed text at render)
   Exit code 0 = green, 1 = failures. Warnings go to stderr.
   ============================================================ */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Load data.js with a window shim (it is a plain script, not a module).
const window = {};
const src = readFileSync(path.join(root, "js", "data.js"), "utf8");
new Function("window", src)(window);
const { SECTIONS, VIEWS, MAP, HOTSPOTS, PukhNaming } = window;

let failures = 0;
let warnings = 0;
const fail = (msg) => { failures++; console.error("FAIL  " + msg); };
const warn = (msg) => { warnings++; console.error("warn  " + msg); };
const ok = (msg) => console.log("ok    " + msg);

/* Known block types — must match renderBlock() + renderers in app.js */
const KNOWN_BLOCKS = new Set([
  "kicker", "h1", "lead", "h2", "h3", "p", "bullets", "callout", "tiles",
  "table", "acc", "map", "question", "divider", "footer",
  "payoff", "case", "reveal", "zones", "mbs",
]);

/* ---------- A. nav <-> views cross-references ---------- */
const navIds = new Set();
SECTIONS.forEach((s) => s.items.forEach((it) => navIds.add(it.id)));
const viewIds = new Set(Object.keys(VIEWS));
for (const id of navIds) if (!viewIds.has(id)) fail(`nav item "${id}" has no VIEWS entry`);
for (const id of viewIds) if (!navIds.has(id)) fail(`VIEWS["${id}"] is orphaned (not in SECTIONS)`);
ok(`nav <-> views: ${navIds.size} views, no orphans`);

/* ---------- B. kicker-first / footer-last convention ---------- */
for (const id of navIds) {
  const blocks = VIEWS[id];
  if (!Array.isArray(blocks) || blocks.length === 0) { fail(`VIEWS["${id}"] is empty`); continue; }
  if (blocks[0].t !== "kicker") fail(`VIEWS["${id}"] does not start with a kicker`);
  // Case-study views close on the detective sequence itself (the case
  // block carries its own "Done" state); everything else ends on a footer.
  const last = blocks[blocks.length - 1].t;
  if (last !== "footer" && last !== "case") fail(`VIEWS["${id}"] ends with "${last}", expected footer or case`);
}
ok("all views start with kicker, end with footer");

/* ---------- C/D/E + per-block structure ---------- */
const mapIds = new Set();
const rowKeys = new Set(MAP.rows.map((r) => r.key));

function checkBlock(b, where) {
  if (!b || typeof b.t !== "string") { fail(`${where}: block missing type`); return; }
  if (!KNOWN_BLOCKS.has(b.t)) { fail(`${where}: unknown block type "${b.t}"`); return; }

  switch (b.t) {
    case "table": {
      const ncols = b.head.length;
      b.rows.forEach((r, ri) => {
        if (r.length !== ncols) fail(`${where}: table row ${ri} has ${r.length} cells, head has ${ncols}`);
      });
      (b.danger || []).forEach(([r, c]) => {
        if (r < 0 || r >= b.rows.length || c < 0 || c >= ncols) fail(`${where}: danger index [${r},${c}] out of bounds`);
      });
      (b.mono || []).forEach((c) => {
        if (c < 0 || c >= ncols) fail(`${where}: mono index ${c} out of bounds`);
      });
      break;
    }
    case "bullets":
      if (!Array.isArray(b.items) || b.items.length === 0) fail(`${where}: bullets with no items`);
      break;
    case "tiles":
      if (!Array.isArray(b.items) || b.items.length === 0) fail(`${where}: tiles with no items`);
      b.items.forEach((t, i) => { if (!t.name || !t.x) fail(`${where}: tile ${i} missing name/text`); });
      break;
    case "question":
      if (!b.x) fail(`${where}: question missing x`);
      if (!b.body) warn(`${where}: question missing body (renders empty paragraph)`);
      break;
    case "callout":
      if (!b.x) fail(`${where}: callout missing x`);
      break;
    case "map": {
      if (mapIds.has(b.id)) fail(`${where}: duplicate map id "${b.id}"`);
      mapIds.add(b.id);
      // ai is optional: omitted means "off" (renderMap treats any
      // non-"on" value as off; case-beat maps omit it deliberately).
      if (b.ai !== undefined && b.ai !== "on" && b.ai !== "off") fail(`${where}: map ai must be "on"|"off"`);
      (b.pins || []).forEach((p) => { if (!rowKeys.has(p)) fail(`${where}: map pin "${p}" is not a MAP row key`); });
      break;
    }
    case "case": {
      const beats = b.beats || [];
      if (beats.length === 0) fail(`${where}: case with no beats`);
      beats.forEach((bt, i) => {
        if (!bt.label || !bt.intro) fail(`${where}: case beat ${i} missing label/intro`);
        if (!Array.isArray(bt.blocks) || bt.blocks.length === 0) fail(`${where}: case beat ${i} has no blocks`);
        bt.blocks.forEach((bl, j) => checkBlock(bl, `${where} > beat ${i} > block ${j}`));
      });
      break;
    }
    case "reveal":
      if (!b.x) fail(`${where}: reveal missing x`);
      break;
    case "zones": {
      const zs = b.zones || [];
      if (zs.length === 0) fail(`${where}: zones with no zones`);
      zs.forEach((z, i) => { if (!z.name || !z.rule || !z.action || !z.format) fail(`${where}: zone ${i} missing name/rule/action/format`); });
      break;
    }
    case "mbs": {
      const ls = b.levels || [];
      if (ls.length === 0) fail(`${where}: mbs with no levels`);
      ls.forEach((l, i) => { if (!l.label || !l.x) fail(`${where}: mbs level ${i} missing label/text`); });
      break;
    }
    case "acc": {
      if (!b.titlebar || !b.tree || !Array.isArray(b.files)) fail(`${where}: acc block missing titlebar/tree/files`);
      (b.files || []).forEach((f, i) => { if (!Array.isArray(f) || f.length !== 4) fail(`${where}: acc file row ${i} must have 4 elements`); });
      if (b.tools && !b.tools.includes(b.activeTool)) fail(`${where}: acc activeTool not in tools`);
      break;
    }
    case "payoff":
      if (!b.x) fail(`${where}: payoff missing x`);
      break;
  }
}

for (const id of navIds) {
  (VIEWS[id] || []).forEach((b, i) => checkBlock(b, `${id}[${i}]`));
}
ok(`block structure checked across ${navIds.size} views (${mapIds.size} map instances)`);

/* ---------- F. nav numbering ---------- */
const seenNums = new Set();
SECTIONS.forEach((s) => {
  const suffixes = s.items.map((it) => {
    const prefix = s.num + ".";
    if (!it.num.startsWith(prefix)) { fail(`section ${s.id}: item ${it.id} num "${it.num}" does not start with "${prefix}"`); return NaN; }
    if (seenNums.has(it.num)) fail(`duplicate nav num "${it.num}"`);
    seenNums.add(it.num);
    return Number(it.num.slice(prefix.length));
  });
  for (let i = 1; i < suffixes.length; i++) {
    if (!(suffixes[i] > suffixes[i - 1])) fail(`section ${s.id}: nav nums not strictly increasing (${s.items[i - 1].num} -> ${s.items[i].num})`);
  }
});
ok("nav numbering strictly increasing and unique per section");

/* ---------- G. PukhNaming idempotency over all content ---------- */
const strings = [];
(function collect(v) {
  if (typeof v === "string") { strings.push(v); return; }
  if (Array.isArray(v)) { v.forEach(collect); return; }
  if (v && typeof v === "object") { Object.values(v).forEach(collect); }
})(VIEWS);
(function collect2(v) {
  if (typeof v === "string") { strings.push(v); return; }
  if (Array.isArray(v)) { v.forEach(collect2); return; }
  if (v && typeof v === "object") { Object.values(v).forEach(collect2); }
})(MAP);
(function collect3(v) {
  if (typeof v === "string") { strings.push(v); return; }
  if (Array.isArray(v)) { v.forEach(collect3); return; }
  if (v && typeof v === "object") { Object.values(v).forEach(collect3); }
})(HOTSPOTS);
SECTIONS.forEach((s) => { strings.push(s.label); s.items.forEach((it) => strings.push(it.label)); });

PukhNaming.setMode("forma");
let idemChecked = 0;
for (const s of strings) {
  const once = PukhNaming.transform(s);
  const twice = PukhNaming.transform(once);
  if (once !== twice) fail(`PukhNaming not idempotent on: ${JSON.stringify(s.slice(0, 80))}`);
  idemChecked++;
}
ok(`PukhNaming idempotent over ${idemChecked} content strings`);

console.log(`\n${failures} failure(s), ${warnings} warning(s) — ${navIds.size} views validated`);
process.exit(failures ? 1 : 0);
