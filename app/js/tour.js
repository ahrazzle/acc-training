/* ============================================================
   PukhACC — tour.js
   The hotspot engine. Turns elements with class .hs into
   click-to-open popovers with "What is this" explanations.
   Read-mode only: no state, no grading, no action engine.

   API:
     Tour.bind(container)   — scan a rendered view for hotspots
     Tour.open(id, anchor)  — open a popover programmatically
     Tour.close()           — close the open popover
   ============================================================ */

const Tour = (() => {
  let popover = null;
  let currentId = null;

  function init() {
    popover = document.getElementById("popover");
    document.getElementById("popover-close").addEventListener("click", close);
    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!popover.hidden && !popover.contains(e.target) && !e.target.closest(".hs")) {
        close();
      }
    });
    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function bind(container) {
    container.querySelectorAll(".hs").forEach((el) => {
      const id = el.getAttribute("data-hs");
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentId === id && !popover.hidden) { close(); return; }
        open(id, el);
      });
    });
  }

  function findSpot(id) {
    const def = window.HOTSPOTS && window.HOTSPOTS[id];
    return def || { title: "About this", tag: "", body: "" };
  }

  function open(id, anchor) {
    const spot = findSpot(id);
    currentId = id;
    popover.hidden = false;

    const title = popover.querySelector(".popover-title");
    const body = popover.querySelector(".popover-body");
    const tag = body.querySelector(".pp-tag");
    title.textContent = spot.title || "About this";
    if (tag) tag.textContent = spot.tag || "";
    let copy = spot.body || "";
    // Match the current product naming (Forma transform when active).
    if (window.PukhNaming && window.PukhNaming.mode === "forma") copy = window.PukhNaming.transform(copy);
    body.querySelector(".pp-copy").innerHTML = copy;

    // Position below the anchor, clamped to viewport
    const r = anchor.getBoundingClientRect();
    const pW = popover.offsetWidth;
    const pH = popover.offsetHeight;
    let left = r.left + r.width / 2 - pW / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - pW - 8));
    let top = r.bottom + 10;
    if (top + pH > window.innerHeight - 8) {
      top = Math.max(8, r.top - pH - 10); // flip above
    }
    popover.style.left = left + "px";
    popover.style.top = top + "px";

    // Highlight the anchor
    document.querySelectorAll(".hs.hs-open").forEach((e) => e.classList.remove("hs-open"));
    anchor.classList.add("hs-open");
  }

  function close() {
    if (!popover) return;
    popover.hidden = true;
    currentId = null;
    document.querySelectorAll(".hs.hs-open").forEach((e) => e.classList.remove("hs-open"));
  }

  return { init, bind, open, close };
})();
