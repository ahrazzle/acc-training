#!/usr/bin/env node
/* ============================================================
   acc-training — render smoke test
   Run: node tests/render-smoke.mjs

   Boots the REAL tour.js + app.js against a minimal DOM stub and
   drives every view through the app's own hashchange navigation,
   asserting each view renders without throwing and that its h1
   lands in the output. This catches data<->renderer contract
   breaks that static validation cannot (bad block shapes at
   render time, exceptions in renderers, dead navigation targets).
   ============================================================ */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (p) => readFileSync(path.join(root, p), "utf8");

/* ---------- minimal DOM stub ---------- */
class ClassList {
  constructor() { this._s = new Set(); }
  add(...c) { c.forEach((x) => this._s.add(x)); }
  remove(...c) { c.forEach((x) => this._s.delete(x)); }
  toggle(c, f) { if (f === undefined) f = !this._s.has(c); f ? this._s.add(c) : this._s.delete(c); }
  contains(c) { return this._s.has(c); }
}
class El {
  constructor(tag) {
    this.tagName = tag; this.children = []; this._html = "";
    this.className = ""; this.dataset = {}; this.style = {};
    this.hidden = false; this.disabled = false; this.textContent = "";
    this.classList = new ClassList(); this._listeners = {};
    this.scrollTop = 0;
  }
  set innerHTML(v) { this._html = String(v); }
  get innerHTML() { return this._html; }
  appendChild(c) { this.children.push(c); return c; }
  prepend(c) { this.children.unshift(c); return c; }
  remove() {}
  scrollIntoView() {}
  addEventListener(t, f) { (this._listeners[t] = this._listeners[t] || []).push(f); }
  setAttribute() {}
  getAttribute() { return null; }
  querySelector() { return new El("div"); }
  // Real querySelectorAll is indexable AND iterable; only renderCase
  // indexes into it (beatEls[bi]), everything else uses forEach.
  querySelectorAll() {
    return new Proxy([], {
      get(target, prop) {
        if (prop === "length") return 64;
        if (typeof prop === "string" && /^\d+$/.test(prop)) return new El("div");
        const v = target[prop];
        return typeof v === "function" ? v.bind(target) : v;
      },
    });
  }
  dump() { return this._html + this.children.map((c) => (c.dump ? c.dump() : "")).join(""); }
}

const byId = {};
const listeners = { hashchange: [] };
const documentStub = {
  getElementById: (id) => (byId[id] = byId[id] || new El("div")),
  createElement: (t) => new El(t),
  createTreeWalker: () => ({ nextNode: () => null }),
  addEventListener: (t, f) => { (listeners[t] = listeners[t] || []).push(f); },
  querySelector: () => new El("div"),
  querySelectorAll: () => [],
  documentElement: new El("html"),
};
const localStorageStub = { _s: {}, getItem(k) { return this._s[k] ?? null; }, setItem(k, v) { this._s[k] = v; }, removeItem(k) { delete this._s[k]; } };
const locationStub = { hash: "" };
const historyStub = { replaceState() {} };

/* ---------- load data.js (window shim), then tour+app in one scope ---------- */
const window = { scrollTo() {}, addEventListener: documentStub.addEventListener };
new Function("window", read("js/data.js"))(window);

const appSrc = read("js/tour.js") + "\n" + read("js/app.js");
new Function(
  "window", "document", "localStorage", "location", "history", "NodeFilter", "setTimeout",
  appSrc
)(window, documentStub, localStorageStub, locationStub, historyStub, { SHOW_TEXT: 4 }, () => 0);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const main = documentStub.getElementById("main");

/* ---------- drive every view through hashchange ---------- */
let failures = 0;
const navIds = [];
window.SECTIONS.forEach((s) => s.items.forEach((it) => navIds.push(it.id)));

for (const id of navIds) {
  try {
    locationStub.hash = "#" + id;
    listeners.hashchange.forEach((f) => f());
    const html = main.dump();
    const h1 = (window.VIEWS[id] || []).find((b) => b.t === "h1");
    if (!h1) throw new Error("no h1 block");
    // NOTE: the stub has no text nodes, so PukhNaming's in-place DOM
    // transform is a no-op here; assert on the raw (escaped) string.
    if (!html.includes(esc(h1.x))) throw new Error("h1 not found in rendered output");
    if (html.length < 200) throw new Error("suspiciously small render (" + html.length + " chars)");
  } catch (e) {
    failures++;
    console.error(`FAIL  render("${id}"): ${e.message}`);
  }
}

if (!failures) console.log(`ok    rendered all ${navIds.length} views without exceptions; h1 present in each`);
else console.log(`\n${failures} render failure(s)`);
process.exit(failures ? 1 : 0);
