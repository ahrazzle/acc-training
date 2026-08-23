# PukhACC — IDEA.md

**Name:** PukhACC
**Workspace:** /Users/kethuda/Documents/ai work/Hermes/pukh/accpackage/wrk/pkact6

## The idea
Training/orientation package to enable a Metrolinx employee on **ACC = Autodesk Construction Cloud** (Build / BIM 360 / Docs / Model Coordination / Takeoff).

## Confirmed scope (from user)
Package on **governance, data management, and integration** for using ACC on a **complex infrastructure subway project** (Metrolinx capital delivery — GO Expansion / Ontario Line / Eglinton Crosstown axis).

## Learner profile (from user, primary source)
- **Role: Project Lead** managing **Data Management & Integration** and **Governance** departments.
- Greenfield: **never worked with ACC**; needs to orient himself because **his team will be using it**.
- **Does NOT need to produce artifacts** — directs and oversees, does not operate.
- Explicit interests: **access controls, data protection**, and **how those variables relate to AI integration**.
- Accountability layer (Halakukhan): can-do = detect the failure, not perform the action. Every scenario closes on the **lead's diagnostic question**.
- Consequence: zero assumed ACC vocabulary — everything defined from first principles.

## FINAL module map (Azaraki — locked, build)
One spine, three tracks; every track closes on the lead's diagnostic question (Halakukhan). **AI = secondary focus (user correction)**: one forward-looking closing module, NOT the lens. Emphasize today-state mechanics; AI is the projected overlay.

- **Module 0 — ACC from zero**: product family (Build/Docs/Model Coordination/Takeoff), Project→Folder→File object model, CDE concept, where the program stack places ACC. Vocabulary: nothing downstream assumes an unknown term. **Current-state line**: ACC is now branded under the **Autodesk Forma** umbrella (Mar 24, 2026 rebrand — verified, primary sources).
- **Track 1 — Governance (access controls)**: permission model as exposure (Account/Project Admin → role-scoped viewer/editor). Close (today-state first): *who holds Admin, who's granted on the shared role, is there an access-control audit* — AI second-order: *and when AI arrives, whose role does it inherit?*
- **Track 2 — Data management (data protection)**: classification of sensitive data on a subway program (commercial/proprietary third-party models, security-adjacent infra, contract-controlled info); lifecycle: record vs working copy, versioning, as-built handover endgame. Close: *is the naming convention enforced or just documented? which export paths are approved* — AI second-order: *and who approves the path when AI arrives?*
- **Track 3 — Integration**: seams named (authoring → ACC → document platform → schedule/cost); EIR/AIR/MIDP written to govern flow. Close: *where does the data sit in the flow, and who signed off the rule that governs it?*
- **Centerpiece (spans all): exposure map, human-first** — every ACC role × data surface as they exist TODAY (primary read); AI layer = clearly-labeled projected overlay (toggle, not lens) (Halakukhan/Azaraki).
- **Closing module — "where this is heading" (AI, consolidated)**: the three vectors (native Assistant role-scoped → Autodesk cloud under DPA; external LLM — AUP 2025 permits own-data training but project-governance ungoverned; agents with inherited credentials) + Ontario's Responsible Use of AI Directive (obligation exists; CDE answer unwritten — mark "ask internally"). Strongest single chapter; keeps AI from bleeding through every track.
- **Terminology layer (ADDED — Forma rebrand, verified)**: bilingual toggle, not a glossary (Shayba). Default = Forma-current naming (what the product shows now); one-tap switch to ACC-legacy naming so the learner follows teammates still using old names. Title-bar chrome reads "Forma". Role rows + product names relabel via toggle (Azaraki: terminology drift is material — Docs→Forma Data Management, Build→Forma Build, Takeoff→Forma Takeoff, BIM Collaborate Pro→Forma Design Collaboration, Account Admin→Hub Admin).
- **Case studies (ADDED — user request)**: 3 synthetic scenarios, guided detective sequences (Shayba): spot the anomaly in a live view → locate the exposure on the map (pins highlight on hover) → land the diagnostic question. "Read the map", never operator-training (Azaraki). Mapping: T1 = admin-role ballooning, T2 = superseded drawing propagating into the federated model, T3 = unauthorized export path. Synthetic data only — real program data is contract-controlled.

Dependency order deliberate: can't discuss what AI can see (T1) before what data exists/protected (T2), nor name seams (T3) before the objects that cross them.

## Research (Sheikh Al-Jabr — ALL LANDED)
- **ACC in production on Metrolinx capital delivery** — not a ProjectWise→ACC story. Ontario Line design side: HDR runs CDE on BIM 360/ACC (320+ federated models, ArcGIS connector). GO Expansion: ONxpress Civil JV runs ACC + Aconex + SharePoint concurrently.
- **ISO 19650-aligned house style**: MX-ALM-STD-004 (CADD/BIM Standards Manual rev 04), AIR, EIR, MIDP, BEP template. Teach the house style AS the standard.
- **Counterpart stack**: Revit/Civil 3D/InfraWorks/AutoCAD · ArcGIS + BIM 360 connector · Aconex + ACC + SharePoint · Primavera P6 · Oracle Unifier · FME.
- **Digital twin endgame**: as-built capture → O&M handover maps to documented corporate target.
- **AI policy (closed)**: NO program-level AI-over-CDE policy on metrolinx.com (only public chatbot clause). BUT Ontario's **Responsible Use of AI Directive** applies to crown agencies — mandates AI risk assessment + executive accountability. Gap = operationalization, not law. Sharp question: *"Where is the program's AI risk assessment required by Ontario's AI Directive, and does it cover the ACC/Aconex data flow?"*
- **Autodesk terms (closed)**: Assistant = role-scoped, source-citing, data → Autodesk cloud under DPA. AUP (late-2025 revision): customers MAY train own models on own data — external LLM path contractually permitted but project-governance ungoverned.
- Gap: OL construction packages (South/North civil) ACC-vs-Aconex split not public; internal (non-public) Metrolinx AI policy unverifiable — mark "ask internally" in tour.

## Build status
- **Kodekoot: shell DONE** — `app/` (5 files, ~85 KB, static, offline). 19 views, exposure map w/ AI projected-overlay toggle, tracks close on diagnostic questions, fidelity contract honored. QA 41/41 headless Chromium, zero console errors. Hash deep-linking.
- **RE-ORDER DONE (Kodekoot, independently verified by Sheikh + Azaraki)**: human access map primary (`ai:"off"` defaults), AI = "Projected: AI layer" overlay toggle, AI consolidated into closing chapter (NEXT.1–3: `ahead-intro` → `ahead-vectors` → `ahead-map`), old AI-first views removed. Research findings intact (Ontario AI Directive, AUP 2025, "ask internally").
- **DARK MODE DONE (Kodekoot, verified by Sheikh)**: token-driven (`:root[data-theme="dark"]` swaps tokens only), deep-slate low-glare palette, severity cells own `--sev-*` vars (surface recolored, meaning preserved), toggle pinned in sidebar chrome, `localStorage` `pukhacc-theme` w/ try/catch (Safari private mode), early inline `<head>` script = no light-flash, light stays default. QA 41/41 green.
- **OPEN (user request, verified)**: 1) Forma terminology layer — bilingual toggle (Forma-current default ↔ ACC-legacy), title-bar chrome → "Forma", relabel role rows/product names. 2) 3 synthetic case studies as detective sequences (spot→locate→land). Kodekoot owns both; re-QA after.
- **BUILD-2 DONE (Kodekoot, Sheikh artifact-verified)**: terminology layer (`PukhNaming`, `pukhacc-naming` localStorage, `nofn` flags, in-place text-node walk = listeners survive; negative-lookbehind = idempotent transform). 3 case studies (CASE section, 4 views: spot→locate→land, read-the-map). QA 51/51, 92 render passes, zero console errors, 5 files ~112 KB, offline.
- **ONE-LINE ADDITION DONE (Kodekoot)**: m0-stack seam note in canonical terms (renders both naming modes), title bar render-verified (`.acc-logo` = "Autodesk Forma" in Forma mode, "Autodesk Construction Cloud" in ACC mode). QA 51/51 re-green, zero console errors, 5 files ~107 KB, offline.
- **BUILD-3 OPEN (user resource: Egis HSR deck)**: deepens tracks with real rail anatomy + adds real-world case study. See "Egis HSR reference" section. Kodekoot owns build; Shayba specs 4-zone view data structure; Azaraki re-checks module map.
- **BUILD-3 DONE (Kodekoot, verified by Sheikh)**: T1.3 real permission scheme (COMPANY_DISCIPLINE_ROLE + zone rules), T2.3 four-zone CDE (zones pipeline: WIP→Shared-Internal→Shared-Client→Final, native→NWC→NWD, weekly cadence), T3.3 federation & token economics (MBS tree, 4 access modes, Docs-Reviews-vs-Design-Collab, zone-based + cost-per-reach control axis), CASE 4 real deployment (182 people/70km/12mo, model-escapes-WIP beat, provenance callouts). QA 70/70, 108 render passes, 5 files ~128 KB, offline.
- **FINAL ADDITIONS (Sheikh-verified at AU source, Lugia directing)**: 1) Track 3: feature-shutdown line — Egis deliberately did NOT activate clash detection/QTO in ACC (Navisworks Manage instead, issues synced back); new diagnostic *"which ACC features are switched off on our program — who decided, why?"* 2) Track 1: workflow-template-ownership question — *"who owns the review-workflow templates, who audits teams haven't reconfigured them?"* (milestone-1 failure: 3 common workflows, wrong validator/quality-checker/destination picks → milestone-2 twin per-discipline presets). 3) CASE 4 provenance upgrades: cite **AU 2024 class CI1657** (public presentation/handout/48-min video+transcript — independently re-checkable); note client+project contractually anonymized; add spoken -40% vs deck -35% clause. Kodekoot: apply + re-QA.
- **FINAL ADDITIONS DONE (Kodekoot, verified at source)**: all three landed + Azaraki's coherence frame wired through ("configuration is governance, and configuration drifts" — the unifying accountability thesis tying roles/zones/review-workflows/switched-off features together). QA 76/76, full matrix (27 views × light/dark × Forma/ACC), zero console errors, 5 files ~128 KB, offline.
- **ADHD ADAPTATION OPEN (user input: target learner has strong ADHD)** — see "ADHD adaptation" section. Shayba owns the UX spec; Kodekoot implements; keep invisible in the artifact (no labeling, no gimmicks — professional tone preserved).
- **ADHD ADAPTATION DONE (Kodekoot, Sheikh artifact-verified, Lugia spot-checked)**: all six mechanisms live — resume-point (`pukhacc-view`, deep-link precedence), 8 time-box `est` labels, payoff lines at track/chapter intros, where-am-I crumb bar, one-hop re-anchors (Halakukhan/Azaraki refinement), case progress bar. Guardrail honored: zero ADHD labeling in rendered copy (code comments only). QA 86/86, 27 views × light/dark × Forma/ACC, 5 files ~134 KB, offline.
- **FUN INTERACTION + LOGO OPEN (user request)**: 1) keyboard arrow navigation (←/→ prev/next view, honors hash deep-links + resume-point). 2) riotfist.jpeg (mats/, 447×447) → red square logo container top-left, object-fit:cover, crisp. 3) ADHD elimination mechanic — Shayba's spec locked: companion-object version (b), small dim fist token beside each textbox/card; effects = swipe-off/shatter/melt cycled (fast 300-400ms, never blocks next action); invisible-until-used hint; cosmetic-only with "reveal everything" reset in chrome; layout collapses smoothly; optional "cleared N of 27" counter in crumb bar. Kodekoot owns build; Shayba specs layout details.
- **FUN PASS DONE (Kodekoot, Sheikh artifact-verified, Lugia spot-checked)**: arrow keys (←/→, deep-link + resume precedence); riotfist logo (img/riotfist.jpeg, object-fit:cover, both themes); elimination mechanic — companion ✕ tokens on text-bearing blocks only (structural excluded), swipe/shatter/melt cycling 350ms non-blocking, `pukhacc-cleared` localStorage keyed by content-derived stable keys (Azaraki), "N of M cleared" crumb counter, reveal-all reset clears stored state (Halakukhan), one-time hint, cosmetic-only smooth collapse. QA 94/94, 6 files ~153 KB, offline.
- **STATUS: SHIPPED — BUILD CLOSED (v4)** — deliverable is `app/index.html`; open in browser for offline interactive tour.

## ADHD adaptation (user input, locked)
Target learner has strong ADHD. Adaptation is INVISIBLE good design — no ADHD labeling in the artifact, no gimmicks, professional government-appropriate tone preserved.
- **Reduce cognitive load per screen** (Shayba): one idea per view, generous whitespace, cut anything not the current beat. Progressive disclosure (spot→locate→land) is ADHD-friendly — keep leaning into it. Don't pile zone rules + MBS + token economics on one screen.
- **Explicit dopamine loop** (Shayba): micro-rewards, short sections that finish, visible progress ("3 of 4 beats done"), closing a loop at each case end. Completion feels like winning.
- **Design for variable focus, not sustained** (Shayba): every view stands alone (no need to re-read last 3 screens), persistent "where am I" breadcrumb, light/Forma toggles stay fixed in chrome (sameness = anchor).
- **Avoid overwhelm + boredom** (Shayba): chunking + one-idea rule vs text density; detective sequences + interactive exposure map as the DEFAULT path, not optional.
- **Payoff up front** (Shayba): each track opens with "what you'll be able to do / ask in 10 minutes" one-liner.
- **ADDED (Lugia): resume-point persistence** — localStorage last-view; returning learner lands on "where you left off" (they WILL drop in and out). Cheap, directly serves variable focus.
- **ADDED (Lugia): explicit time-box labels** per track ("~10 min") — ADHD time blindness; visible time-boxes help the learner commit to starting.
- **Guardrail**: one clear next step per screen ("Continue"), no walls of options (decision paralysis).

## Egis HSR reference (user-provided resource — mats/formacasestudy.pdf)
"Mastering Collaboration in High-Speed Rail Projects with Autodesk Forma and Design Cloud Worksharing Tools" — real ACC deployment, Egis, 70 km Middle-East HSR. Extracted via TEXT LAYER ONLY (pdftotext — user constraint: no image analysis/vision). All facts verified against source:
- 182 people, 4 countries (England 12 / India 68 / France 60 / Middle-East 42), 4 stations + 2 depots, concept design, 12 months, full Autodesk env (ACC, Revit 2024, C3D 2024).
- **4-zone CDE (ISO 19650)**: WIP → Shared-Internal → Shared-Client → Final Publication. Folder-level permission scoping: WIP = teams see ONLY their folder; Final = all visible, modify-own-only, copy/paste rejected.
- **Permission scheme**: `COMPANY_DISCIPLINE_ROLE` (Company / Workstream+Discipline / Role).
- **Weekly cadence + file progression**: Native (WIP) → NWC (Internal Shared) → NWD (Client), weekly; Shared-Internal Discipline → BIM Coordination → Model Coordination (NWF) → clash/issue mgmt.
- **MBS**: 150 models → 1st-level coordination (Stations 1-4, Lines 1-2, Depots 1-2) → 2nd level → FEDERATED model.
- **4 access modes**: Viewer (free, software install, mobile, ACC Docs tokens) vs Review/Collaboration (Model Coordination: clash, 4D, QTO, issues; BIM Collaborate Pro tokens). Token economics = governance-relevant.
- **Tooling choices**: Docs Reviews chosen over Design Collaboration (single process for all file types, validation, fewer tokens); Insights + Power BI track production/MIDP; C3D data shortcuts updated Wednesdays.
- **Deployment pattern**: 7 training sessions, 164 trained (85%), project-specific guides + video, BIM-coordinator support network (1-2 per region).
- **Quantified outcomes**: -80% coordination/federated model + MIDP update hours (15h→3h/wk); -35% C3D rework; -70% section views; -50% long profile views; -85% xref/layers; automation (EGIS Deliverables Plugin: LISP/Dynamo/Python/.Net).
- **Caveat (must stay in artifact)**: Egis Middle-East HSR ≠ Metrolinx — transferable real reference, not Metrolinx-documented. Client digital requirements were full-Autodesk by contract.

## Integration plan (Lugia, locked)
- **Track 1 (Governance)**: add `COMPANY_DISCIPLINE_ROLE` as the real permission scheme; folder-level permission scoping (WIP see-your-folder-only vs Final all-visible modify-own-only) maps onto exposure map.
- **Track 2 (Data management)**: 4-zone CDE workflow becomes the concrete document-control spine (record vs working copy made real); weekly cadence + native→NWC→NWD progression.
- **Track 3 (Integration)**: MBS + federated model view; 4 access modes + token economics (Docs vs BIM Collaborate tokens); Docs Reviews-vs-Design Collaboration decision; Insights + Power BI MIDP tracking; C3D data-shortcut seam.
- **CASE 4 (new, real-world reference)**: Egis deployment facts → one detective beat (model escaping WIP into the wrong zone) → diagnostic question → quantified outcomes as "why governance pays" anchor. Labeled transferable reference, not Metrolinx.
- **Deployment note**: 7-session/85%/support-network pattern as a small callout — the learner's own team will be onboarded similarly.

## Open research (assigned)
1. ~~AI policy gap (Sheikh)~~ → **CLOSED** — see Research section.
2. **Interview Q** (user, optional): what does the employee's team actually DO in ACC (Docs / Build / Model Coordination / mix) → picks watch-mode scenarios.

## Deliverables & ownership
- Kodekoot: tour-mode shell (built, shipped, `app/`).
- Shayba: interaction pattern + exposure-map data structure (specced).
- Azaraki: module map (locked).
- Sheikh: research (closed).
- User: ongoing input from employee interview; delivery mode defaulted to self-paced.

## Guardrails
- vers/ folder = user's version backups — never edit.
- No emojis in business/client materials.
- Quality > speed. Iterate on feedback.
