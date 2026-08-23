/* ============================================================
   PukhACC — app.js
   The renderer + router. Reads SECTIONS/VIEWS/MAP from data.js,
   renders the nav, renders each view's content blocks, and
   hands hotspot binding to tour.js.

   Block types handled:
     kicker, h1, lead, h2, h3, p, bullets, callout, tiles,
     table, acc (workspace sim), map (exposure map),
     question (question card), divider, footer
   ============================================================ */

(function () {
  const nav = document.getElementById("nav");
  const main = document.getElementById("main");

  /* ---------- Escape HTML for user-facing strings ---------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------- Navigation ---------- */
  function buildNav(activeId) {
    nav.innerHTML = "";
    const fmt = (s) => (window.PukhNaming && window.PukhNaming.mode === "forma") ? window.PukhNaming.transform(s) : s;
    window.SECTIONS.forEach((sec) => {
      const lbl = document.createElement("div");
      lbl.className = "nav-section-label";
      lbl.textContent = fmt(sec.label);
      nav.appendChild(lbl);

      sec.items.forEach((item) => {
        const b = document.createElement("button");
        b.className = "nav-item" + (item.id === activeId ? " active" : "");
        b.dataset.view = item.id;
        b.innerHTML = `<span class="nav-num">${esc(item.num)}</span><span>${esc(fmt(item.label))}</span>`;
        b.addEventListener("click", () => render(item.id));
        nav.appendChild(b);
      });
    });
  }

  /* ---------- Block renderers ---------- */
  function el(cls, html) {
    const d = document.createElement("div");
    d.className = cls;
    d.innerHTML = html;
    return d;
  }

  function renderBlock(b) {
    switch (b.t) {
      case "kicker":  return el("kicker", esc(b.x));
      case "h1":      return el("", `<h1>${esc(b.x)}</h1>`);
      case "lead":    return el("lead", esc(b.x));
      case "h2":      return el("", `<h2>${esc(b.x)}</h2>`);
      case "h3":      return el("", `<h3>${esc(b.x)}</h3>`);
      case "p":       return el("", `<p>${esc(b.x)}</p>`);
      case "divider": return el("divider", "");
      case "footer":  return el("footer-note", esc(b.x));

      case "bullets":
        return el("", `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`);

      case "callout":
        return el("callout " + (b.kind || ""),
          `<div class="callout-title">${esc(b.title || "")}</div>${esc(b.x)}`);

      case "tiles":
        return el("grid-3", b.items.map((t) => `
          <div class="tile">
            <div class="tile-name">${esc(t.name)}</div>
            <div class="tile-tag">${esc(t.tag || "")}</div>
            <p>${esc(t.x)}</p>
          </div>`).join(""));

      case "table": {
        const danger = new Set((b.danger || []).map(([r, c]) => r + ":" + c));
        return el("tbl-wrap", `<table class="tbl">
          <thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${b.rows.map((r, ri) => `<tr>${r.map((c, ci) => {
            const cls = danger.has(ri + ":" + ci) ? "cell-danger" : (b.mono && b.mono.indexOf(ci) > -1 ? "mono" : "");
            return `<td class="${cls}">${esc(c)}</td>`;
          }).join("")}</tr>`).join("")}</tbody>
        </table>`);
      }

      case "question": return renderQuestion(b);
      case "acc":      return renderAcc(b);
      case "map":      return renderMap(b);
      case "case":     return renderCase(b);
      case "reveal":   return renderReveal(b);
      case "zones":    return renderZones(b);
      case "mbs":      return renderMbs(b);
      case "payoff":   return renderPayoff(b);
      default:         return el("", "");
    }
  }

  /* ---------- Payoff line (ADHD adaptation: state the win up front) ---------- */
  function renderPayoff(b) {
    const d = document.createElement("div");
    d.className = "payoff";
    d.innerHTML = `<span class="payoff-k">By the end of this${b.what ? " " + esc(b.what) : ""}:</span> <span class="payoff-x">${esc(b.x)}</span>`;
    return d;
  }

  /* ---------- Question card (the accountability close) ---------- */
  function renderQuestion(b) {
    const d = document.createElement("div");
    d.className = "card";
    d.style.borderLeft = "4px solid var(--highlight)";
    d.innerHTML = `
      <div class="kicker" style="margin-bottom:6px">Diagnostic question</div>
      <h3 style="margin-bottom:8px">${esc(b.x)}</h3>
      <p style="margin:0">${esc(b.body || "")}</p>`;
    return d;
  }

  /* ---------- Reveal card (progressive disclosure inside a case beat) ---------- */
  function renderReveal(b) {
    const d = document.createElement("div");
    d.className = "reveal-box";
    d.innerHTML = `
      <button class="reveal-btn pp-btn primary" type="button">${esc(b.title || "Reveal")}</button>
      <div class="reveal-body hidden">${esc(b.x || "")}</div>`;
    const btn = d.querySelector(".reveal-btn");
    const body = d.querySelector(".reveal-body");
    btn.addEventListener("click", () => {
      const opening = body.classList.contains("hidden");
      body.classList.toggle("hidden", !opening);
      btn.textContent = opening ? "Hide" : (b.title || "Reveal");
    });
    return d;
  }

  /* ---------- Case study (guided detective sequence) ---------- */
  function renderCase(b) {
    const beats = b.beats || [];
    const d = document.createElement("div");
    d.className = "case-card";
    const trackHtml = b.track ? `<div class="kicker">${esc(b.track)}</div>` : "";
    const titleHtml = b.title ? `<h2>${esc(b.title)}</h2>` : "";
    d.innerHTML = `
      <div class="case-head">
        ${trackHtml}
        ${titleHtml}
        <div class="callout highlight"><div class="callout-title">Situation</div>${esc(b.situation || "")}</div>
      </div>
      <div class="case-beats">
        ${beats.map((bt, i) => `
          <div class="case-beat" data-beat="${i}" ${i === 0 ? "" : "hidden"}>
            <div class="case-beat-label">${esc(bt.label || "")}</div>
            <p class="case-beat-intro">${esc(bt.intro || "")}</p>
            <div class="case-beat-blocks"></div>
          </div>`).join("")}
      </div>
      <div class="case-nav">
        <span class="case-progress" id="case-progress"></span>
        <button class="pp-btn primary" id="case-next" type="button">Continue</button>
      </div>
      <div class="case-track" aria-hidden="true"><span class="case-track-fill" id="case-track-fill"></span></div>`;

    // Render each beat's blocks into its container.
    const beatEls = d.querySelectorAll(".case-beat");
    beats.forEach((bt, i) => {
      const box = beatEls[i].querySelector(".case-beat-blocks");
      (bt.blocks || []).forEach((bl) => box.appendChild(renderBlock(bl)));
    });

    // Beat sequencing: reveal one beat at a time.
    let cur = 0;
    const total = beats.length;
    const progress = d.querySelector("#case-progress");
    const next = d.querySelector("#case-next");
    const trackFill = d.querySelector("#case-track-fill");
    const show = (i) => {
      beatEls.forEach((be, bi) => { be.hidden = bi !== i; });
      progress.textContent = "Step " + (i + 1) + " of " + total;
      next.textContent = (i === total - 1) ? "Done" : "Continue";
      if (trackFill) trackFill.style.width = ((i + 1) / total * 100) + "%";
    };
    next.addEventListener("click", () => {
      if (cur < total - 1) {
        cur++;
        show(cur);
        const el2 = d.querySelector('.case-beat[data-beat="' + cur + '"]');
        if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        next.disabled = true;
        next.textContent = "Completed";
      }
    });
    show(0);
    return d;
  }

  /* ---------- Four-zone CDE pipeline ---------- */
  function renderZones(b) {
    const z = b.zones || [];
    const d = document.createElement("div");
    d.className = "zones";
    d.innerHTML = `
      <h3 style="margin-bottom:10px">${esc(b.title || "The collaborative area")}</h3>
      <div class="zones-flow">${z.map((zone, i) =>
        `<span class="zone-chip">${esc(zone.name)}</span>` + (i < z.length - 1 ? '<span class="zone-arrow" aria-hidden="true">→</span>' : "")
      ).join("")}</div>
      <div class="zones-grid">
        ${z.map((zone, i) => `
          <div class="zone-card ${i === z.length - 1 ? "zone-final" : ""}">
            <div class="zone-name">${esc(zone.name)}</div>
            <div class="zone-tag">${esc(zone.tag || "")}</div>
            <div class="zone-rule"><span class="zone-k">Rule:</span> ${esc(zone.rule)}</div>
            <div class="zone-action"><span class="zone-k">Happens:</span> ${esc(zone.action)}</div>
            <div class="zone-format"><span class="zone-k">Format:</span> ${esc(zone.format)}</div>
          </div>`).join("")}
      </div>
      ${b.cadence ? `<div class="callout accent"><div class="callout-title">The cadence</div>${esc(b.cadence)}</div>` : ""}`;
    return d;
  }

  /* ---------- Model federation tree (MBS) ---------- */
  function renderMbs(b) {
    const levels = b.levels || [];
    const d = document.createElement("div");
    d.className = "mbs";
    d.innerHTML = `
      <h3 style="margin-bottom:10px">${esc(b.title || "The model breakdown structure")}</h3>
      <div class="mbs-tree">
        ${levels.map((lv, i) => `
          <div class="mbs-level ${i === levels.length - 1 ? "mbs-federated" : ""}">
            <div class="mbs-level-head">
              <span class="mbs-label">${esc(lv.label)}</span>
              ${lv.count ? `<span class="pill accent">${esc(lv.count)}</span>` : ""}
            </div>
            <div class="mbs-x">${esc(lv.x)}</div>
          </div>`).join("")}
      </div>
      ${b.note ? `<div class="callout accent"><div class="callout-title">How it connects</div>${esc(b.note)}</div>` : ""}`;
    return d;
  }

  /* ---------- ACC workspace simulation (read-mode) ---------- */
  function renderAcc(b) {
    const tb = b.titlebar, t = b.tree, f = b.files;
    const treeHtml = `<div class="tree-root">${esc(t.root)}</div>` +
      t.folders.map((fd) => `<div class="tree-folder"><span class="tw">▸</span>${esc(fd)}</div>`).join("");
    const filesHtml = `<table class="acc-files">
        <thead><tr><th>File</th><th>Location</th><th>Status</th></tr></thead>
        <tbody>${f.map((row) => `
          <tr>
            <td class="file-name">${esc(row[0])}</td>
            <td>${esc(row[1])}</td>
            <td><span class="pill ${row[3] === "ok" ? "ok" : "warn"}">${esc(row[2])}</span></td>
          </tr>`).join("")}</tbody>
      </table>`;

    const d = document.createElement("div");
    d.className = "acc-shell";
    d.innerHTML = `
      <div class="acc-titlebar">
        <span class="acc-logo">Autodesk Construction Cloud</span>
        <span class="acc-crumb hs" data-hs="hs-proj">${esc(tb.crumb)}</span>
        <span class="acc-spacer"></span>
        <span class="acc-badge hs" data-hs="hs-badge">${esc(tb.badge)}</span>
      </div>
      <div class="acc-toolbar hs" data-hs="hs-toolbar">
        ${(b.tools || []).map((tl, i) =>
          `<span class="acc-tool${i === (b.tools || []).indexOf(b.activeTool) ? " active-tool" : ""}">${esc(tl)}</span>`).join("")}
      </div>
      <div class="acc-body">
        <div class="acc-tree hs" data-hs="hs-tree">${treeHtml}</div>
        <div class="acc-content"><div class="hs" data-hs="hs-files">${filesHtml}</div></div>
      </div>`;
    return d;
  }

  /* ---------- Theme control (persistent chrome) ---------- */
  function applyTheme(dark) {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    const ctrl = document.getElementById("theme-control");
    if (!ctrl) return;
    ctrl.classList.toggle("on", dark);
    ctrl.setAttribute("aria-checked", dark ? "true" : "false");
    const lbl = ctrl.querySelector(".theme-label");
    if (lbl) lbl.textContent = dark ? "Dark" : "Light";
  }

  function initTheme() {
    const ctrl = document.getElementById("theme-control");
    if (!ctrl) return;
    let dark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(dark);
    const toggle = () => {
      dark = document.documentElement.getAttribute("data-theme") !== "dark";
      applyTheme(dark);
      // Persist; try/catch so Safari private mode (storage throws) still
      // lets the toggle work for the session, just without persisting.
      try { localStorage.setItem("pukhacc-theme", dark ? "dark" : "light"); } catch (e) {}
    };
    ctrl.addEventListener("click", toggle);
    ctrl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  }

  /* ---------- Product-naming control (Forma current vs ACC legacy) ---------- */
  function applyNaming(legacy) {
    if (!window.PukhNaming) return;
    window.PukhNaming.setMode(legacy ? "acc" : "forma");
    const ctrl = document.getElementById("term-control");
    if (!ctrl) return;
    ctrl.classList.toggle("on", legacy);
    ctrl.setAttribute("aria-checked", legacy ? "true" : "false");
    const lbl = ctrl.querySelector(".theme-label");
    if (lbl) lbl.textContent = legacy ? "ACC names" : "Forma names";
  }

  function initNaming() {
    const ctrl = document.getElementById("term-control");
    if (!ctrl) return;
    let legacy = false;
    try { legacy = localStorage.getItem("pukhacc-naming") === "acc"; } catch (e) {}
    applyNaming(legacy);
    const toggle = () => {
      const wasLegacy = window.PukhNaming && window.PukhNaming.mode === "acc";
      applyNaming(!wasLegacy);
      try { localStorage.setItem("pukhacc-naming", wasLegacy ? "forma" : "acc"); } catch (e) {}
      // Re-render the current view + nav in the new naming.
      if (currentView) render(currentView);
    };
    ctrl.addEventListener("click", toggle);
    ctrl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  }

  /* ---------- Exposure map (the centerpiece) ---------- */
  function renderMap(b) {
    const M = window.MAP;
    const aiOn = b.ai === "on";
    const pins = b.pins || [];

    const d = document.createElement("div");
    d.className = "map-block";
    d.dataset.ai = aiOn ? "on" : "off";
    d.innerHTML = `
      <div class="map-controls">
        <span style="font-weight:600;color:var(--heading)">${esc(b.title || "Exposure map")}</span>
        <span class="acc-spacer" style="flex:1"></span>
        <button class="map-toggle ${aiOn ? "active" : ""}" data-ai="1" aria-pressed="${aiOn ? "true" : "false"}">
          <span class="dot"></span> Projected: AI layer
        </button>
      </div>
      <div class="legend">
        ${M.legend.map((l) => `<span class="lg"><span class="sw ${l.cls}"></span>${esc(l.label)}</span>`).join("")}
        ${pins.length ? `<span class="lg"><span class="sw sw-pin"></span>pinned = the exposure lives here</span>` : ""}
        <span class="lg" id="ai-legend" ${aiOn ? "" : "hidden"}><span class="sw sw-ai"></span>outlined = reachable once AI arrives (projected)</span>
      </div>
      <div class="tbl-wrap">${mapTableHtml(aiOn, pins)}</div>
      <div id="ai-vectors" ${aiOn ? "" : "hidden"}></div>`;

    d.querySelector(".map-toggle").addEventListener("click", () => {
      const on = d.dataset.ai !== "on";
      d.dataset.ai = on ? "on" : "off";
      d.querySelector(".map-toggle").classList.toggle("active", on);
      d.querySelector(".map-toggle").setAttribute("aria-pressed", on ? "true" : "false");
      d.querySelector("#ai-legend").hidden = !on;
      d.querySelector(".tbl-wrap").innerHTML = mapTableHtml(on, pins);
      d.querySelector("#ai-vectors").hidden = !on;
      if (on) d.querySelector("#ai-vectors").innerHTML = aiVectorsHtml();
    });

    if (aiOn) d.querySelector("#ai-vectors").innerHTML = aiVectorsHtml();
    return d;
  }

  function cellClass(level) {
    return { rw: "map-rw", ro: "map-ro", edit: "map-edit", admin: "map-admin" }[level] || "map-rw";
  }

  function fmt(s) {
    return (window.PukhNaming && window.PukhNaming.mode === "forma") ? window.PukhNaming.transform(s) : s;
  }

  function mapTableHtml(aiOn, pins) {
    const M = window.MAP;
    const pinSet = new Set(pins || []);
    // Which role rows are reachable by any AI surface?
    const reachable = new Set();
    if (aiOn) M.aiSurfaces.forEach((s) => s.reach.forEach((r) => reachable.add(r)));

    let html = `<table class="tbl">
      <thead><tr><th style="min-width:190px">Role</th>${M.cols.map((c) => `<th>${esc(fmt(c.label))}</th>`).join("")}<th>Note</th></tr></thead>
      <tbody>`;
    M.rows.forEach((r) => {
      const aiHit = reachable.has(r.key);
      const pinned = pinSet.has(r.key);
      const cls = [aiHit ? "ai-row" : "", pinned ? "map-pin-row" : ""].filter(Boolean).join(" ");
      html += `<tr class="${cls}">`;
      html += `<td class="mono"><span class="map-cell ${cellClass(r.level)}" style="font-family:var(--font-mono);font-weight:600">${esc(fmt(r.label))}</span>` +
        (pinned ? ' <span class="pill accent">PIN</span>' : "") + (aiHit ? ' <span class="pill danger">AI</span>' : "") + `</td>`;
      M.cols.forEach((c) => {
        const lv = r.cells[c.key] || "rw";
        html += `<td><span class="map-cell ${cellClass(lv)} ${aiHit ? "map-ai" : ""}">${esc(cellText(lv))}</span></td>`;
      });
      html += `<td class="small muted">${esc(fmt(r.note))}</td></tr>`;
    });
    html += `</tbody></table>`;
    return html;
  }

  function cellText(lv) {
    return { rw: "—", ro: "view", edit: "edit", admin: "admin" }[lv] || "—";
  }

  function aiVectorsHtml() {
    const M = window.MAP;
    let html = `<h3 style="margin-top:8px">AI exposure vectors — what each can reach</h3>
      <div class="grid-3">
        ${M.aiSurfaces.map((s) => {
          const roleNames = s.reach.map((r) => {
            const row = M.rows.find((x) => x.key === r);
            return row ? fmt(row.label.replace("Project Member — ", "").replace("Role-scoped — ", "")) : r;
          });
          return `
          <div class="tile" style="border-top-color:var(--highlight)">
            <div class="tile-name">${esc(fmt(s.name))}</div>
            <div class="tile-tag">${esc(fmt(s.where))}</div>
            <p>${esc(fmt(s.body))}</p>
            <p style="margin-top:8px"><span class="pill danger" style="margin-right:6px">Reaches</span>${esc(roleNames.join(" · "))}</p>
            <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line)">
              <div class="kicker" style="margin-bottom:4px">Ask</div>
              <div style="font-size:14px;color:var(--ink)">${esc(fmt(s.q))}</div>
            </div>
          </div>`;
        }).join("")}
      </div>`;
    return html;
  }

  /* ---------- View rendering ---------- */
  let currentView = null;

  // Apply Forma naming to text nodes IN PLACE (no innerHTML swap) so
  // listeners attached by interactive blocks (case beats, reveal, map)
  // survive the transform. Transforms are designed not to cascade, so
  // re-applying over already-transformed text is harmless.
  function transformDom(root) {
    if (!(window.PukhNaming && window.PukhNaming.mode === "forma")) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const tn of nodes) {
      const t = window.PukhNaming.transform(tn.nodeValue);
      if (t !== tn.nodeValue) tn.nodeValue = t;
    }
  }

  /* ---------- Elimination mechanic ("clear it, it's done") ----------
     Companion-object version (Shayba): a small token beside each
     text block; clicking it dismisses that block with a fast effect.
     State persists per content-derived key (Azaraki) so cleared blocks
     stay cleared across navigation/reload (Halakukhan) and an edited
     block reappears as new. Cosmetic only; reset in the chrome.
     Effects cycle per click; never block the next action (Shayba). */
  const Dismiss = (() => {
    const STORE = "pukhacc-cleared";
    const ELIGIBLE = { p: 1, lead: 1, bullets: 1, callout: 1, question: 1, tiles: 1, payoff: 1 };
    const EFFECTS = ["swipe", "shatter", "melt"];
    let cleared = null;
    let counterEl = null;

    function load() {
      if (cleared) return;
      cleared = {};
      try { cleared = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) { cleared = {}; }
    }
    function save() {
      try { localStorage.setItem(STORE, JSON.stringify(cleared)); } catch (e) {}
    }

    // Stable, content-derived key: same content -> same key; an edited
    // block -> a new key (so it reappears as something new to process).
    function contentKey(b, index) {
      let src = "";
      if (typeof b.x === "string") src = b.x;
      else if (b.title) src = b.title;
      else if (b.items) src = b.items.join("|");
      else if (b.name) src = b.name;
      else src = b.t + ":" + index;
      const clean = src.replace(/\s+/g, " ").trim().slice(0, 60);
      let h = 0;
      for (let i = 0; i < src.length; i++) { h = ((h << 5) - h + src.charCodeAt(i)) | 0; }
      return b.t + "::" + clean + "::" + Math.abs(h).toString(36);
    }

    function viewKey(viewId, block, index) { return viewId + "||" + contentKey(block, index); }

    function isCleared(vk) { return !!cleared[vk]; }
    function setCleared(vk) { cleared[vk] = 1; save(); }
    function clearAll() { cleared = {}; try { localStorage.removeItem(STORE); } catch (e) {} }

    // Count eliminable blocks in a view definition.
    function totalFor(blocks) { return blocks.filter((b) => ELIGIBLE[b.t]).length; }

    // How many stored-cleared keys belong to this view.
    function clearedFor(viewId) {
      let n = 0;
      for (const k in cleared) { if (k.startsWith(viewId + "||")) n++; }
      return n;
    }

    function setCounter(el) { counterEl = el; }

    function updateCounter() {
      if (!counterEl) return;
      const total = totalFor(window.VIEWS[currentView] || []);
      const done = clearedFor(currentView);
      counterEl.textContent = total ? (done + " of " + total + " cleared") : "";
    }

    // Attach a token to each eligible block (unless already cleared).
    // container.children[i] aligns with blocks[i] (each block renders
    // exactly one child; the crumb bar lives outside this container).
    function attach(viewId, blocks, container) {
      load();
      blocks.forEach((block, i) => {
        const el = container.children[i];
        if (!el || !ELIGIBLE[block.t]) return;
        const vk = viewKey(viewId, block, i);
        el.classList.add("dismissible");
        el.dataset.vk = vk;
        if (isCleared(vk)) el.classList.add("is-cleared");
        else addToken(el);
      });
    }

    function addToken(el) {
      const tok = document.createElement("button");
      tok.type = "button";
      tok.className = "dismiss-token";
      tok.title = "Done with this? Tap to clear it.";
      tok.setAttribute("aria-label", "Clear this element");
      tok.innerHTML = '<span class="dt-x">&#10005;</span>';
      tok.addEventListener("click", (e) => {
        e.stopPropagation();
        dismiss(el, tok);
      });
      el.appendChild(tok);
    }

    function dismiss(el, tok) {
      const vk = el.dataset.vk;
      if (!vk) return;
      setCleared(vk);
      if (tok) tok.remove();
      el.classList.remove("dismissible");
      const effect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)];
      el.classList.add("dismissing", "fx-" + effect);
      // Fast (300-400ms), and never blocks: the next click works
      // immediately because we don't await the animation.
      el.addEventListener("animationend", () => {
        el.classList.add("is-cleared");
        el.classList.remove("dismissing", "fx-" + effect);
      }, { once: true });
      updateCounter();
    }

    // Reset: restore all cleared blocks (clears stored state too).
    function reset() {
      clearAll();
      if (currentView) render(currentView);
    }

    return { attach, updateCounter, setCounter, reset, totalFor, clearedFor, ELIGIBLE };
  })();

  // Flatten SECTIONS into an ordered list of view refs + a lookup,
  // so the breadcrumb / progress bar can always say "where am I".
  const FLAT = (function () {
    const list = [];
    const byId = {};
    let idx = 0;
    window.SECTIONS.forEach((sec) => sec.items.forEach((it) => {
      byId[it.id] = { index: idx++, section: sec, item: it };
      list.push(it.id);
    }));
    return { list, byId };
  })();

  function render(viewId) {
    const blocks = window.VIEWS[viewId];
    if (!blocks) return;
    currentView = viewId;

    // Where-am-I breadcrumb + overall progress (persistent, view-level).
    main.innerHTML = "";
    const blockHost = document.createElement("div");
    blockHost.className = "view-blocks";
    const meta = FLAT.byId[viewId];
    if (meta) {
      const est = meta.section.est || "";
      const bar = document.createElement("div");
      bar.className = "crumb-bar";
      const sectionLabel = (window.PukhNaming && window.PukhNaming.mode === "forma") ? window.PukhNaming.transform(meta.section.label) : meta.section.label;
      const viewLabel = (window.PukhNaming && window.PukhNaming.mode === "forma") ? window.PukhNaming.transform(meta.item.label) : meta.item.label;
      bar.innerHTML = `
        <span class="crumb-sec">${esc(sectionLabel)}</span>
        <span class="crumb-sep">/</span>
        <span class="crumb-view">${esc(viewLabel)}</span>
        <span class="crumb-clear" id="crumb-clear"></span>
        <span class="crumb-progress">${esc(meta.item.num)} \u00b7 ${meta.index + 1} of ${FLAT.list.length}${est ? " \u00b7 ~" + esc(est) + " min" : ""}</span>`;
      main.appendChild(bar);
      Dismiss.setCounter(bar.querySelector("#crumb-clear"));
    }

    blocks.forEach((b) => {
      const el2 = renderBlock(b);
      if (!b.nofn) transformDom(el2);
      blockHost.appendChild(el2);
    });
    main.appendChild(blockHost);

    // Attach elimination tokens to eligible blocks (honours stored state).
    Dismiss.attach(viewId, blocks, blockHost);
    Dismiss.updateCounter();
    maybeShowHint();

    // Scroll to top, update nav
    main.scrollTop = 0;
    window.scrollTo(0, 0);
    buildNav(viewId);

    // Bind hotspots
    Tour.bind(main);

    // Deep-link: keep location.hash in sync (also enables back/forward)
    if (location.hash !== "#" + viewId) {
      try { history.replaceState(null, "", "#" + viewId); } catch (e) { /* file:// may refuse; ignore */ }
    }

    // Resume-point persistence: remember where the learner stopped so a
    // returning session lands here instead of at the start (ADHD adaptation).
    try { localStorage.setItem("pukhacc-view", viewId); } catch (e) {}
  }

  // One-time, subtle hint about the elimination tokens (invisible until used).
  function maybeShowHint() {
    let hinted = false;
    try { hinted = localStorage.getItem("pukhacc-hint") === "1"; } catch (e) {}
    if (hinted) return;
    if (Dismiss.totalFor(window.VIEWS[currentView] || []) === 0) return;
    const host = main.querySelector(".view-blocks");
    if (!host) return;
    const hint = document.createElement("div");
    hint.className = "hint-bar";
    hint.textContent = "Done with this? Tap the small \u2715 beside each block to clear it.";
    hint.addEventListener("click", () => hint.remove());
    host.prepend(hint);
    try { localStorage.setItem("pukhacc-hint", "1"); } catch (e) {}
    setTimeout(() => { if (hint.parentNode) hint.remove(); }, 6000);
  }

  /* ---------- Boot ---------- */
  Tour.init();
  initTheme();
  initNaming();

  // Reset control: restores every cleared block on the current view
  // and clears the stored state, so a reload doesn't undo the reset.
  const resetBtn = document.getElementById("reset-control");
  if (resetBtn) resetBtn.addEventListener("click", () => Dismiss.reset());

  // Arrow-key navigation: &#8592;/&#8594; step through the tour order.
  // Deep-links and the resume point still win on load.
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const idx = FLAT.byId[currentView] ? FLAT.byId[currentView].index : 0;
      const target = (e.key === "ArrowRight")
        ? Math.min(idx + 1, FLAT.list.length - 1)
        : Math.max(idx - 1, 0);
      if (target !== idx && FLAT.list[target]) {
        e.preventDefault();
        render(FLAT.list[target]);
      }
    }
  });

  // Resume point: honour an explicit deep-link first; otherwise restore
  // the last-viewed screen so a drop-in, drop-out learner picks up where
  // they left off instead of restarting.
  let initial = "";
  if (location.hash && window.VIEWS[location.hash.replace("#", "")]) {
    initial = location.hash.replace("#", "");
  } else {
    let last = null;
    try { last = localStorage.getItem("pukhacc-view"); } catch (e) {}
    initial = (last && window.VIEWS[last]) ? last : "m0-welcome";
  }
  render(initial);
  window.addEventListener("hashchange", () => {
    const v = location.hash.replace("#", "");
    if (window.VIEWS[v]) render(v);
  });
})();
