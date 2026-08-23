/* ============================================================
   PukhACC — data.js
   The content layer + the ACC object model (the "fidelity
   contract"). Every module's copy lives here as declarative
   blocks; app.js renders blocks, tour.js binds the hotspots.

   Object model mirrors real ACC structure (Azaraki's fidelity
   contract, Halakukhan's honesty bar):
     Account → Project → Folder → File
     Roles: Account Admin / Project Admin / role-scoped viewer|editor
     Objects: Issues, Submittals, Transmittals, Permissions
   All copy is plain-language, zero assumed ACC vocabulary.
   ============================================================ */

/* ------------------------------------------------------------------
   NAVIGATION MODEL
   ------------------------------------------------------------------ */
const SECTIONS = [
  {
    id: "m0", num: "M0", label: "ACC from zero", est: "12", items: [
      { id: "m0-welcome", num: "M0.1", label: "Welcome & how to use" },
      { id: "m0-products", num: "M0.2", label: "The five products" },
      { id: "m0-object",   num: "M0.3", label: "Project · Folder · File" },
      { id: "m0-cde",      num: "M0.4", label: "What a CDE is" },
      { id: "m0-stack",    num: "M0.5", label: "ACC in the program stack" },
    ]
  },
  {
    id: "map", num: "MAP", label: "The exposure map", est: "5", items: [
      { id: "map-read",  num: "MAP.1", label: "How to read it" },
    ]
  },
  {
    id: "t1", num: "T1", label: "Governance — access", est: "8", items: [
      { id: "t1-intro",   num: "T1.1", label: "Permissions as exposure" },
      { id: "t1-roles",   num: "T1.2", label: "The ACC roles" },
      { id: "t1-scheme",  num: "T1.3", label: "A real permission scheme" },
      { id: "t1-questions", num: "T1.4", label: "Questions to ask" },
    ]
  },
  {
    id: "t2", num: "T2", label: "Data management", est: "8", items: [
      { id: "t2-intro",    num: "T2.1", label: "What is sensitive" },
      { id: "t2-lifecycle", num: "T2.2", label: "Record vs working copy" },
      { id: "t2-cde4",     num: "T2.3", label: "The four-zone CDE" },
      { id: "t2-questions", num: "T2.4", label: "Questions to ask" },
    ]
  },
  {
    id: "t3", num: "T3", label: "Integration", est: "8", items: [
      { id: "t3-intro",    num: "T3.1", label: "The seams" },
      { id: "t3-docs",     num: "T3.2", label: "EIR · AIR · MIDP" },
      { id: "t3-mbs",      num: "T3.3", label: "Federation & token economics" },
      { id: "t3-questions", num: "T3.4", label: "Questions to ask" },
    ]
  },
  {
    id: "cases", num: "CASE", label: "Case studies", est: "15", items: [
      { id: "case-intro", num: "CASE.0", label: "How these work" },
      { id: "case-t1",    num: "CASE.1", label: "The ballooning shared role" },
      { id: "case-t2",    num: "CASE.2", label: "The superseded drawing" },
      { id: "case-t3",    num: "CASE.3", label: "The unauthorized export path" },
      { id: "case-t4",    num: "CASE.4", label: "High-speed rail: the real deployment" },
    ]
  },
  {
    id: "ahead", num: "NEXT", label: "Where this is heading", est: "10", items: [
      { id: "ahead-intro",   num: "NEXT.1", label: "AI as the next actor" },
      { id: "ahead-vectors", num: "NEXT.2", label: "Three exposure vectors" },
      { id: "ahead-map",     num: "NEXT.3", label: "The projected exposure map" },
    ]
  },
  {
    id: "close", num: "CLOSE", label: "What you leave with", est: "3", items: [
      { id: "close-map", num: "CLOSE.1", label: "Your exposure map" },
    ]
  },
];

/* ------------------------------------------------------------------
   VIEWS — one content array per nav item
   Block types rendered by app.js:
     kicker, h1, lead, h2, h3, p, bullets, callout, tiles, table,
     acc (workspace sim), map (exposure map), question (question card),
     divider, footer
   ------------------------------------------------------------------ */

const VIEWS = {

/* ============ MODULE 0 — ACC FROM ZERO ============ */

"m0-welcome": [
  { t: "kicker", x: "Module 0 · ACC from zero" },
  { t: "h1", x: "Welcome — what this tour is for" },
  { t: "lead", x: "You are a Project Lead whose teams manage Data & Integration and Governance on a Metrolinx capital program. Your team will work inside Autodesk Construction Cloud (ACC). You do not need to operate it — you need to understand it well enough to direct, oversee, and ask the right questions." },
  { t: "callout", kind: "accent", title: "How this tour works", x: "Everything is in plain language — no assumed ACC vocabulary. Move through the modules in order. Each section ends with the questions a lead should be able to ask. The centerpiece is the exposure map: one artifact you take away that shows who — and what AI — can see which data." },
  { t: "h2", x: "What ACC is, in one sentence" },
  { t: "p", x: "Autodesk Construction Cloud is a connected set of cloud tools that holds the documents, 3D models, and field records of a construction project in one place — so everyone on the program works from the same current information instead of emailing files." },
  { t: "h2", x: "Why it matters to you" },
  { t: "bullets", items: [
    "Your teams' day-to-day work happens inside it — documents, models, permissions.",
    "It is a governed environment: who can see what is controlled, and auditable.",
    "It does not stand alone — it exchanges data with other systems (Aconex, SharePoint, schedule and cost tools).",
    "AI is entering the picture on all three of those fronts — a projected actor the tour returns to in its closing chapter.",
  ]},
  { t: "callout", kind: "highlight", title: "The through-line", x: "One question runs through every module: who can see and touch what data on the program today — and what will change when an AI becomes one of the actors? The today-state comes first; the AI is a projected overlay this tour teaches you to read." },
  { t: "footer", x: "Next: the five products that make up ACC." },
],

"m0-products": [
  { t: "kicker", x: "Module 0 · ACC from zero" },
  { t: "h1", x: "The five products" },
  { t: "lead", x: "ACC is not one app. It is a family of products that share the same projects and the same data. Knowing which product does what is most of the vocabulary you need." },
  { t: "tiles", items: [
    { name: "Docs", tag: "document control", x: "The library: drawings, specifications, contracts, transmittals, review workflows. This is where the governed files live and where their approval history is kept." },
    { name: "Build", tag: "field & quality", x: "The field: issues, checklists, daily logs, quality and safety records collected on site, linked back to the model and documents." },
    { name: "Model Coordination", tag: "3D clash detection", x: "The 3D: federated models from every discipline merged together, clash detection run, and issues assigned to the right party to fix." },
    { name: "Takeoff", tag: "quantities", x: "The numbers: measuring quantities straight off 2D sheets or 3D models to support estimating and cost control." },
    { name: "BIM 360 / ACC Core", tag: "shared foundation", x: "The plumbing: account, projects, members, and permissions that every product above sits on top of." },
  ]},
  { t: "callout", nofn: true, kind: "accent", title: "The name on the box", x: "ACC was rebranded Autodesk Forma in March 2026 — same platform, same tools, no data migration, no workflow changes. The products now carry Forma names: Docs is Forma Data Management, Build is Forma Build, Takeoff is Forma Takeoff. You will hear both names for a while. This tour can show either: use the 'Product names' switch in the sidebar to flip between Forma naming (what the product shows now) and ACC naming (what teammates may still say)." },
  { t: "h2", x: "A mental model" },
  { t: "p", x: "Think of a construction program as three conversations happening at once — the documents (Docs), the field (Build), and the model (Model Coordination). ACC gives each conversation a shared table, and the same permission system decides who sits at each table." },
  { t: "p", x: "A subway program uses all of them. Design teams work in Docs and Model Coordination; field teams work in Build; estimators work in Takeoff. Your data-management and governance teams touch the whole family — which is why the tour covers all five, not one." },
  { t: "footer", x: "Next: how projects, folders, and files fit together." },
],

"m0-object": [
  { t: "kicker", x: "Module 0 · ACC from zero" },
  { t: "h1", x: "Project · Folder · File" },
  { t: "lead", x: "Everything in ACC hangs off a simple three-level structure. Understanding it is understanding the whole object model." },
  { t: "h2", x: "The hierarchy" },
  { t: "table", head: ["Level", "What it is", "Example on a Metrolinx program"], rows: [
    ["Account", "The whole organisation's space in ACC", "Metrolinx (or the delivery entity's account)"],
    ["Project", "One job with its own folders, members, and permissions", "Ontario Line — Package S12 (Civil)"],
    ["Folder", "The structure inside a project, usually mapped to the work breakdown", "Design / Drawings / 04-Structural"],
    ["File", "One document or model with version history and a status", "S12-DWG-STR-0042_Rev C.pdf"],
  ], mono: [3] },
  { t: "h2", x: "Simulated view — a Docs project" },
  { t: "p", x: "This is what a governed Docs workspace looks like. Hover or click any highlighted element to learn what it is." },
  { t: "acc", id: "acc-docs", titlebar: { logo: "ACC", crumb: "Ontario Line · Package S12 · Docs", badge: "Project Member" },
    tools: ["Documents", "Transmittals", "Submittals", "Issues", "Members", "Settings"],
    activeTool: "Documents",
    tree: { root: "Package S12 (Civil)", folders: [
      "01-Project-Management", "02-Design", "03-Drawings", "04-Models", "05-Specs", "06-Correspondence", "07-Field",
    ]},
    files: [
      ["S12-DWG-STR-0042_Rev C.pdf", "03-Drawings / 04-Structural", "In Review", "ok"],
      ["S12-MDL-STN-0011_Rev B.rvt", "04-Models / 01-Stations", "Approved", "ok"],
      ["S12-SPC-0007_Rev A.pdf", "05-Specs", "Draft", "warn"],
      ["S12-TRN-0210_Rev 0.pdf", "06-Correspondence", "Approved", "ok"],
      ["S12-FLD-CC-018.pdf", "07-Field / Checklists", "In Review", "ok"],
    ],
    hotspots: [
      { id: "hs-proj", sel: ".acc-crumb", title: "The project", tag: "Hierarchy", body: "This is the project — one job with its own folders, members, and permissions. Your teams likely have several: one per package or line." },
      { id: "hs-toolbar", sel: ".acc-toolbar", title: "The products' tools", tag: "Product family", body: "The tabs are the products' tools. Documents and Transmittals belong to Docs; Issues spans Build and Model Coordination. You are seeing the Docs surface." },
      { id: "hs-tree", sel: ".acc-tree", title: "The folder tree", tag: "Hierarchy", body: "Folders map to the program's work breakdown. The naming convention — 01-Project-Management, 02-Design, 03-Drawings — is a governance choice, and an enforced one on an ISO 19650-aligned program." },
      { id: "hs-files", sel: ".acc-files", title: "Files, not just names", tag: "Object model", body: "Every file carries a version (Rev C) and a status (Draft, In Review, Approved). The status is what controls whether it can be used for construction. That status discipline is the heart of document control." },
      { id: "hs-badge", sel: ".acc-badge", title: "You are a role", tag: "Permissions", body: "This badge is your permission role — what you can see and do here. Your role, and everyone else's, is the single most important thing to understand in ACC. Track 1 is built entirely around it." },
    ] },
  { t: "footer", x: "Next: what a CDE is — the concept behind all of this." },
],

"m0-cde": [
  { t: "kicker", x: "Module 0 · ACC from zero" },
  { t: "h1", x: "What a CDE is" },
  { t: "lead", x: "The abbreviation you will hear most from your teams is CDE — Common Data Environment. It is the idea that makes ACC make sense." },
  { t: "h2", x: "The idea" },
  { t: "p", x: "Before a CDE, documents live in many places — personal drives, email threads, someone's desktop — and nobody can be sure they are looking at the current version. A CDE is one agreed, governed place for the project's information, with three properties:" },
  { t: "bullets", items: [
    "Single source of truth — one authoritative copy of each artifact, not ten.",
    "Version and status control — you can always tell which revision is current and whether it is approved for use.",
    "Access control and audit — who saw or changed what is recorded and reviewable.",
  ]},
  { t: "callout", kind: "accent", title: "Key fact for you", x: "On Metrolinx capital delivery the CDE is not a single system. The program stack runs several concurrently — ACC, Aconex, and SharePoint — each with its own role. That coexistence is the real integration story (Track 3)." },
  { t: "h2", x: "Why the CDE matters to governance" },
  { t: "p", x: "The CDE is where the rules become real. ISO 19650-style naming, review-and-approval workflows, and audit trails are not documents about the data — they are the operating rules of the CDE. When your governance team talks about enforcement, they mean what happens inside here." },
  { t: "footer", x: "Next: where ACC sits in the program's wider stack." },
],

"m0-stack": [
  { t: "kicker", x: "Module 0 · ACC from zero" },
  { t: "h1", x: "ACC in the program stack" },
  { t: "lead", x: "ACC is one node in a larger ecosystem. The program's information flows across systems, and the seams between them are where integration risk lives." },
  { t: "h2", x: "The real stack (grounded in the Ontario Line / GO Expansion programs)" },
  { t: "table", head: ["Layer", "System", "Role in the flow"], rows: [
    ["Design authoring", "Revit · Civil 3D · InfraWorks", "Where models and drawings are made"],
    ["GIS / reality", "ArcGIS + cloud connector", "Geospatial context and reality capture (~4 TB of LiDAR on Ontario Line)"],
    ["Common data environments", "ACC · Aconex · SharePoint", "The governed homes for documents and models — all three in use"],
    ["Schedule", "Oracle Primavera P6", "The programme of works, linked to documents and models"],
    ["Cost / contract", "Oracle Unifier", "Cost control, contract administration"],
    ["Data integration", "FME", "Moving and transforming data between systems"],
  ]},
  { t: "h2", x: "Reading this diagram as a lead" },
  { t: "p", x: "Information moves left to right and back: authors create in the design tools, governed copies land in the CDEs, and schedule and cost systems consume them. Your integration team owns the seams — the connectors, the exports, the handoffs. Your governance team owns the rules that say what may cross each seam." },
  { t: "callout", kind: "highlight", title: "The design seam is tighter than it looks", x: "Docs is now the common data environment for all of Forma — and a Docs Essentials tier now ships inside standalone AutoCAD, Revit, and Civil 3D subscriptions. So the design tools your authors use feed the same governed CDE by default, which makes the authoring-to-CDE seam one of the most direct in the whole stack." },
  { t: "callout", kind: "warn", title: "The AI wrinkle", x: "Every one of these systems is capable of feeding AI — and when AI arrives on the program, each one becomes a place where it could read, or leak, data. That is the projected overlay this tour teaches you to read — in the closing chapter, 'Where this is heading'." },
  { t: "footer", x: "Next: the centerpiece — the exposure map." },
],

/* ============ CENTERPIECE — EXPOSURE MAP ============ */

"map-read": [
  { t: "kicker", x: "Centerpiece · The exposure map" },
  { t: "h1", x: "How to read the exposure map" },
  { t: "lead", x: "This is the one artifact you take away from the tour. It answers the through-line question for today's program: who can see and touch what data. The AI layer is a projected overlay on the same map — you will learn to read that in the closing chapter." },
  { t: "p", x: "The map is a matrix. Columns are data surfaces (the kinds of information a subway program holds). Rows are the ACC roles that can reach them. The cells say how much each role can see and do. This is the human access map — the truth about the program as it operates today." },
  { t: "map", id: "map-full", ai: "off", title: "Permission & exposure map" },
  { t: "h2", x: "The legend" },
  { t: "table", head: ["Cell colour", "What it means", "Example"], rows: [
    ["No access (grey)", "The role cannot even see this data exists", "A field viewer cannot see the cost register"],
    ["View (green)", "Read the data — see it, but not change it", "A reviewer can open drawings but not edit them"],
    ["Edit (amber)", "Create and change within a scope", "A Docs editor can move files inside their folder"],
    ["Admin (red)", "Full control, including who else has access", "A Project Admin grants and revokes roles"],
  ], mono: [0] },
  { t: "h2", x: "The projected AI layer" },
  { t: "p", x: "The toggle above the map switches on the projected AI layer. It is labelled 'projected' deliberately: AI is not yet an actor on the program, and nothing here is a current diagnosis. What the toggle shows is where the same map will move when AI arrives — the roles an AI will inherit, and the data it will then be able to reach. You read this map human-first, and the AI layer as its projected future." },
  { t: "callout", kind: "highlight", title: "How you use this map", x: "You do not memorise it. You use it as a diagnostic: pick any data your team handles, find who can reach it today, and ask whether that reach is justified. When AI arrives, the same reach becomes the AI's boundary — which is exactly why the today-state must be right first." },
  { t: "footer", x: "Next: Track 1 — how permissions actually work today." },
],

"ahead-map": [
  { t: "kicker", x: "Where this is heading · The projected exposure map" },
  { t: "h1", x: "What the map looks like when AI is an actor" },
  { t: "lead", x: "This is the exposure map with the AI layer projected on. Everything highlighted here is where the map will move when AI arrives — not a diagnosis of anything true today." },
  { t: "p", x: "Each outlined surface is an exposure vector: a place where governed data will be reachable by an AI. Each vector carries the diagnostic question a lead should be able to ask the moment AI appears on the program." },
  { t: "map", id: "map-ahead", ai: "on", title: "Exposure map — projected AI layer" },
  { t: "callout", kind: "danger", title: "The finding that frames all three", x: "Metrolinx's information-governance documents — the EIR, AIR, MIDP — were written before AI could read a CDE. None of the governance you rely on was written for LLM ingestion. The gap is not a theory; it is the projected state. Your value as the person who sees it now is to ask the questions no written rule yet answers — before the AI arrives." },
  { t: "footer", x: "Next: what you leave with — your exposure map." },
],

/* ============ TRACK 1 — GOVERNANCE / ACCESS ============ */

"t1-intro": [
  { t: "kicker", x: "Track 1 · Governance — access controls" },
  { t: "payoff", what: "track", x: "you can ask who holds Admin, who is on each shared role, whether access is actually audited \u2014 and what the AI will inherit when it arrives." },
  { t: "h1", x: "Permissions as exposure" },
  { t: "lead", x: "Access controls are not an IT detail. On a governed program, the permission model IS the boundary that decides what can be seen and done — and it will be the same boundary an AI inherits when it arrives." },
  { t: "h2", x: "The governing idea" },
  { t: "p", x: "Every person in ACC holds a role, and every role has a reach: what data it can see, and what it can do to it. Nothing is 'just visible' — visibility is always granted by a role. When your governance team configures ACC, what they are really doing is deciding the shape of that reach, person by person, role by role." },
  { t: "h2", x: "Why this is a lead's concern" },
  { t: "bullets", items: [
    "Roles drift. People change jobs, contractors leave, shared roles accumulate members nobody reviews.",
    "The broadest roles — Account Admin, Project Admin — carry the widest reach and the fewest checks.",
    "When AI arrives it will inherit roles — so every access decision you make today becomes an AI-exposure decision tomorrow.",
  ]},
  { t: "callout", kind: "warn", title: "The trap to look for", x: "A 'shared role' — one role many people sit in — is the classic failure. It is convenient, and it hides who actually did what. On a governed program, shared roles are where audit trails go to die." },
  { t: "footer", x: "Next: the actual ACC roles and what each can reach." },
],

"t1-roles": [
  { t: "kicker", x: "Track 1 · Governance — access controls" },
  { t: "h1", x: "The ACC roles" },
  { t: "lead", x: "ACC's permission model is short to learn: four broad role levels, and role-scoped memberships inside each product. Every role has a reach — this is the row structure of the exposure map." },
  { t: "p", x: "The exposure map you met in the centrepiece is built from these rows: each role here is one row there, and the cells say how far that role's reach goes. This is the raw material every real project then builds its own scheme on top of." },
  { t: "table", head: ["Role", "Reach", "Typical holder"], rows: [
    ["Account Admin", "The whole account: projects, members, and every permission across them", "Program IT / platform owner"],
    ["Project Admin", "One project: folders, files, and who is granted what inside it", "Project information manager"],
    ["Project Member — Editor", "Create and change within granted folders and tools", "Engineers, document controllers"],
    ["Project Member — Viewer", "See what is granted, change nothing", "Reviewers, auditors, leads"],
    ["Role-scoped (per product)", "A narrow slice — e.g. Docs editor only, or Model Coordination viewer", "Discipline-specific staff"],
  ]},
  { t: "h2", x: "The ladder, in plain words" },
  { t: "p", x: "From the bottom: a viewer can look but not touch. An editor can create and change within their slice. A Project Admin controls the slices themselves — who gets in, and what they can reach. An Account Admin controls everything across all projects. Each step up is a step wider in reach and a step higher in risk." },
  { t: "callout", kind: "highlight", title: "The governance question in one line", x: "Every reach should be the minimum needed for the job — and should be periodically re-audited, because roles do not shrink on their own." },
  { t: "footer", x: "Next: the questions a lead asks about governance today." },
],

"ahead-intro": [
  { t: "kicker", x: "Where this is heading · AI as the next actor" },
  { t: "payoff", what: "chapter", x: "you can explain the three ways AI will touch governed data, name the two obligations that already exist, and carry the one question that converts the gap into a decision." },
  { t: "h1", x: "AI is not here yet — but it is coming" },
  { t: "lead", x: "Everything so far is about who can see and touch what data on the program today. This chapter is about the next actor class: AI. It is not running on the program yet — but the software it will ride on is already in ACC, and the obligation to govern it already exists." },
  { t: "h2", x: "Why a whole chapter on a projected actor" },
  { t: "p", x: "The permission model you learned in Track 1 was designed for one actor class — humans. AI is a second actor class that will inherit the same roles. When it arrives it will not have its own permissions; it will use whichever human's role it is granted. That makes every access decision you make today the entire boundary on the AI tomorrow — which is exactly why the today-state must be right first." },
  { t: "h2", x: "The two facts that frame this chapter" },
  { t: "bullets", items: [
    "The obligation already exists. Ontario's Responsible Use of Artificial Intelligence Directive applies to Metrolinx as a provincial crown agency, and mandates AI risk assessment across the full lifecycle — design, procurement, deployment, operation. But no program-level rule yet governs AI over ACC/Aconex data: the obligation exists, the CDE-specific answer is unwritten.",
    "The contract does not block the path. Autodesk's Acceptable Use Policy (late-2025 revision) permits customers to train their own models on their own data. So an external LLM over exported ACC data is contractually open — and project-governance ungoverned.",
  ]},
  { t: "callout", kind: "warn", title: "Not a slide titled 'AI'", x: "The two facts are framing, not content. The content is the three exposure vectors on the next page — each with a different risk, a different boundary, and a different question. One of those questions (the Ontario AI Directive) is the sharpest in the whole package, because it converts the gap from a scary void into a checkable, named obligation." },
  { t: "callout", kind: "accent", title: "Ask internally", x: "Whether Metrolinx has a non-public AI policy cannot be verified from outside. When you are back on the job, that is a legitimate question to put to your own team — the answer, either way, tells you where the governance actually stands." },
  { t: "footer", x: "Next: the three exposure vectors, in detail." },
],

"t1-scheme": [
  { t: "kicker", x: "Track 1 \u00b7 Governance \u2014 a real permission scheme" },
  { t: "h1", x: "How a real rail project names and scopes its roles" },
  { t: "lead", x: "The ACC roles you just met are the platform's raw materials. A real project then builds its own scheme on top of them \u2014 one that decides who can see what by name, and by folder. This is how a 70 km high-speed rail deployment actually did it." },
  { t: "p", x: "The four platform tiers \u2014 admin, editor, viewer, role-scoped \u2014 are the palette. This project painted with them in a disciplined way, so that every reach on the exposure map has an explainable reason behind it." },
  { t: "h2", x: "The user-level scheme: COMPANY_DISCIPLINE_ROLE" },
  { t: "p", x: "Every user's permission is derived from a three-part identity \u2014 the company they belong to, the workstream and discipline they sit in, and the role they hold. A tunnel engineer at Egis on the rail alignment is named something like EGIS_TUNNEL_SENIOR-ENGINEER. The scheme makes every reach explainable: you can always say why a person can see what they see, because their name says what they are." },
  { t: "table", head: ["Part", "What it names", "Example"], rows: [
    ["Company", "The organisation the person belongs to", "EGIS"],
    ["Workstream & Discipline", "Which part of the programme and which trade", "TUNNEL"],
    ["Role", "What they are allowed to do", "SENIOR-ENGINEER"],
  ], mono: [0] },
  { t: "h2", x: "The folder-level rules: zone decides the reach" },
  { t: "p", x: "Beyond the user scheme, the deployment layered rules on top of folders, so what you can do also depends on where the file sits \u2014 not just who you are. That is a second control axis on top of the exposure map." },
  { t: "table", head: ["Zone", "Visibility rule", "Modification rule"], rows: [
    ["WIP", "Teams see and access only the folder they work in", "Work freely inside it"],
    ["Shared \u2014 Internal", "All folders visible to the team", "Modify your own folder only"],
    ["Shared \u2014 Client", "All folders visible", "Modify your own folder only"],
    ["Final Publication", "All folders visible", "Modify your own only; copy/paste rejected"],
  ]},
  { t: "callout", kind: "highlight", title: "The governance gem \u2014 copy/paste rejected", x: "In the final zone, copying and pasting files is rejected by the tool itself. That is a genuine anti-proliferation control: a record cannot be silently forked into a stray copy that then gets treated as current. It is exactly the kind of hard rule a lead should know to ask whether their own programme enforces." },
  { t: "callout", kind: "warn", title: "Honest sourcing", x: "This is Egis's scheme from their high-speed rail deployment \u2014 a real, working example to understand, not Metrolinx's scheme. Metrolinx's own capital delivery is ISO 19650-aligned house style; the COMPANY_DISCIPLINE_ROLE naming may or may not be what your programme uses. Ask your governance team which scheme is in force." },
  { t: "footer", x: "Next: the questions a lead asks about governance today." },
],


"t1-questions": [
  { t: "kicker", x: "Track 1 · Governance — your close" },
  { t: "h1", x: "Questions to ask your teams" },
  { t: "lead", x: "A lead does not need to answer these \u2014 a lead needs to ask them, and to recognise a weak answer. The first four govern the program as it operates today; the last is the projected question you ask before AI arrives. This is the accountability layer of the tour." },
  { t: "question", x: "Who holds Account Admin and Project Admin today — and is that list current?", body: "Admin roles are the widest reach in the system. The answer should name people, not 'the IT team', and should show a recent review date. If it is vague, the access model is ungoverned." },
  { t: "question", x: "Who is granted on each shared role — and who last audited that?", body: "Shared roles hide individual accountability. A strong answer names an audit cadence and a finding. A weak answer is 'everyone who needs it'." },
  { t: "question", x: "Is there an access-control audit trail \u2014 and can you show me the last review?", body: "The audit trail is the proof that governance is real, not documented. If there is no trail, there is no governance to rely on." },
  { t: "question", x: "Who owns the review-workflow templates \u2014 and who audits that teams haven't reconfigured them?", body: "On a real rail deployment, the first review workflow failed precisely this way: teams misconfigured the destination folder, technical validator, and quality checker, until the process was, in the BIM manager's words, 'a rusty sword'. The fix was twin per-discipline review workflows with presets. The lesson is the frame of this whole tour: configuration is governance, and configuration drifts. A strong answer names the template owner and an audit cadence." },
  { t: "question", x: "And when the AI assistant arrives \u2014 what will it be able to see, and whose role will it inherit?", body: "The projected question. The Assistant will see exactly what the widest role that uses it can see. The answer should name the role it would inherit and who will own that decision. 'We haven't thought about it yet' is an honest \u2014 and normal \u2014 current state." },
  { t: "callout", kind: "accent", title: "The pattern", x: "Notice the shape: every question asks for a name, a date, or a decision \u2014 the evidence that access is actually controlled, not merely described. And one thesis runs through them all: configuration is governance, and configuration drifts. The roles, the zones, the review workflows, the switched-off features \u2014 each was a one-time decision that quietly rots until someone audits it. Asking who decided, and who re-audits, is the whole job in one habit." },
  { t: "footer", x: "Next: Track 2 — what data on a subway program is sensitive, and how it is protected." },
],

/* ============ TRACK 2 — DATA MANAGEMENT / PROTECTION ============ */

"t2-intro": [
  { t: "kicker", x: "Track 2 · Data management — data protection" },
  { t: "payoff", what: "track", x: "you can say what is sensitive on a subway programme, whether the naming and status rules are actually enforced, and which export paths are governed." },
  { t: "h1", x: "What is sensitive on a subway program" },
  { t: "lead", x: "Data protection in a megaproject is not mostly about personal data. The sensitive information is the program's commercial, technical, and security-adjacent assets — and AI will raise the stakes on all of them when it arrives." },
  { t: "h2", x: "The three classes your teams must classify" },
  { t: "table", head: ["Class", "What it is", "Why exposure hurts"], rows: [
    ["Commercial / proprietary", "Third-party design models, suppliers' intellectual property, bid and cost data", "Legal and commercial damage; loss of trust from the market"],
    ["Security-adjacent", "Station layouts, tunnel alignments, security systems, crowd-flow data", "Physical and security risk if released to the wrong hands"],
    ["Contract-controlled", "Information whose use is limited by contract terms, regardless of sensitivity", "Contract breach, even when the data is 'not secret'"],
  ]},
  { t: "h2", x: "Why classification is urgent now" },
  { t: "p", x: "An AI ingests whatever it is pointed at and does not self-censor. If a document is in the governed environment and a role with reach exists, then when AI arrives that role's AI will be able to read it. Classification — knowing which class each artifact is — is the only thing that lets anyone decide whether the AI should be pointed at it at all." },
  { t: "callout", kind: "warn", title: "The data-protection trap", x: "'It's on the CDE, so it's controlled' is a false comfort. Control is not where the file sits — it is who can reach it from there. A governed file in a wide role is effectively public to everyone in that role today, and to that role's AI tomorrow." },
  { t: "footer", x: "Next: the lifecycle — record vs working copy, and the as-built endgame." },
],

"t2-lifecycle": [
  { t: "kicker", x: "Track 2 · Data management — lifecycle" },
  { t: "h1", x: "Record vs working copy" },
  { t: "lead", x: "A governed CDE runs on a simple discipline: there is one record of each artifact, and everything else is a working copy that must never be treated as the truth." },
  { t: "p", x: "Recall the CDE idea from Module 0: one agreed, governed place for the project's information. This page is where that idea becomes a rule \u2014 the discipline that decides which of the files in there is the one anyone may build from." },
  { t: "h2", x: "The two kinds of file" },
  { t: "table", head: ["Kind", "What it is", "The rule"], rows: [
    ["Record", "The authoritative, versioned, status-controlled file in the CDE", "Only a record may be used for construction or decision"],
    ["Working copy", "A draft or exchange copy outside the record flow", "Never rely on it; never circulate it as current"],
  ]},
  { t: "h2", x: "The lifecycle that ends in handover" },
  { t: "p", x: "An artifact moves from working (draft) to shared (in review) to published (approved) to as-built — and the end of the line on a subway program is not construction closeout. Metrolinx's stated target is a digital twin linked to its asset-information systems: the as-built record handed to operations and maintenance. The data your teams manage today is the asset record of tomorrow." },
  { t: "bullets", items: [
    "Versioning: every change is a new revision with a status — never overwrite a record.",
    "Approval: a file is not 'approved' until the review workflow says so, on record.",
    "Handover: at closeout the governed records become the operator's asset data. Garbage records in = a broken digital twin out.",
  ]},
  { t: "callout", kind: "accent", title: "The lead's stake", x: "The digital-twin target means data quality is not a documentation nicety — it is the eventual product your program delivers to the operator. A governance lead protects that pipeline." },
  { t: "footer", x: "Next: the questions a lead asks about data management." },
],

"ahead-vectors": [
  { t: "kicker", x: "Where this is heading · Three exposure vectors" },
  { t: "h1", x: "Three ways AI will touch governed data" },
  { t: "lead", x: "When AI arrives, it will touch program data in exactly three ways. Each has a different risk, a different boundary, and a different question — and none of them is a slide titled 'AI'." },
  { t: "h2", x: "Vector 1 — the Assistant inside ACC" },
  { t: "p", x: "Autodesk's own Assistant is built into the product. It retrieves and summarises project data scoped by the same permission roles the human holds, and it cites its sources — so inside ACC, AI visibility is role-bounded and traceable. But the data it reads flows to Autodesk's cloud, under the data-processing agreement, not under project governance." },
  { t: "bullets", items: [
    "When it arrives it will see exactly what the widest role that uses it can see — no separate 'AI permission' exists to configure.",
    "The data it reads leaves the governed environment for Autodesk's cloud even if the answer stays inside ACC.",
    "The rule to hold: whatever a role grants a human, it will grant that human's AI. Broaden a role, and you broaden the AI's view too.",
  ]},
  { t: "callout", kind: "danger", title: "Ask", x: "When the Assistant ships, what will it be able to see, through whose role — and who will own that decision?" },
  { t: "h2", x: "Vector 2 — external LLM tooling on exports" },
  { t: "p", x: "Organisation-level AI tools ingest exports that crossed the export/exchange seam. Once out of ACC, no ACC permission bounds the data. And the contract does not block the path: Autodesk's Acceptable Use Policy (late-2025 revision) permits customers to train their own models on their own data. So this route is contractually open — and project-governance ungoverned." },
  { t: "table", head: ["Export path", "Governed today?", "The exposure"], rows: [
    ["Formal transmittal through Docs", "Yes — logged and auditable", "Controlled; the exit is visible"],
    ["Shared-link download by a role holder", "Partially — who, not what", "A holder can feed a file to an external AI without a trace"],
    ["Copy-paste / screenshot into a chat tool", "No", "Invisible; the classic quiet exit"],
  ]},
  { t: "p", x: "The obligation to govern this already exists: Ontario's Responsible Use of Artificial Intelligence Directive applies to Metrolinx as a provincial crown agency and mandates AI risk assessment across the lifecycle. The CDE-specific answer is unwritten — which is the gap, and the point. (Whether Metrolinx holds a non-public AI policy can only be confirmed internally.)" },
  { t: "callout", kind: "danger", title: "Ask", x: "Where is the program's AI risk assessment required by Ontario's AI Directive, and does it cover the ACC/Aconex data flow?" },
  { t: "h2", x: "Vector 3 — agents with inherited roles" },
  { t: "p", x: "An agent is not a chat tool someone uses. It is an automated actor — a script, a bot, an AI agent — that holds a real role's access and acts with it: reading folders, answering queries, moving data, at machine speed and scale." },
  { t: "bullets", items: [
    "One credential becomes an always-on reader of everything that role can see.",
    "Agents multiply access: one shared-role credential can become hundreds of agent sessions.",
    "Agents can be pointed at governed data with no human looking at each request — the audit trail shows the credential, not the intent.",
  ]},
  { t: "callout", kind: "danger", title: "Ask", x: "Does the program treat a credentialed agent as a 'user' in any audit — and would it know if one acted on sensitive data?" },
  { t: "footer", x: "Next: the projected exposure map." },
],

"t2-cde4": [
  { t: "kicker", x: "Track 2 \u00b7 Data management \u2014 the four-zone CDE" },
  { t: "h1", x: "The four-zone common data environment" },
  { t: "lead", x: "\u201cRecord vs working copy\u201d stops being abstract once you see how a real rail project structures its CDE. This deployment ran four zones in strict sequence \u2014 and the file's zone decided both its visibility and what anyone was allowed to do with it." },
  { t: "zones", title: "The collaborative area \u2014 four zones, one direction of travel",
    zones: [
      { name: "WIP", tag: "day-to-day production", rule: "Teams see and access only their own folder", action: "Working files live here; teams work freely inside their slice", format: "Native (Revit / Civil 3D)" },
      { name: "Shared \u2014 Internal", tag: "internal collaboration", rule: "All folders visible; teams modify their own only", action: "Files copied here for internal review; NWC caches generated", format: "Native + NWC" },
      { name: "Shared \u2014 Client", tag: "client collaboration", rule: "All folders visible; modify own only; copy/paste rejected", action: "Packages published for the client to review", format: "NWC \u2192 NWD" },
      { name: "Final Publication", tag: "the record", rule: "All folders visible; modify own only; copy/paste rejected", action: "The approved record \u2014 the basis for construction and handover", format: "NWD (published)" },
    ],
    cadence: "Weekly cycle: teams produce in WIP through the week, exchange into Shared on a fixed day, client review runs against Shared-Client, and approved work lands in Final Publication. The NWC caches refresh weekly so every coordination view reads current geometry." },
  { t: "h2", x: "What moves through the zones" },
  { t: "p", x: "Files change form as they travel: native design files in WIP, Navisworks caches (NWC) generated at the internal-shared boundary so geometry can be viewed without the authoring tool, and published NWD packages for client and final review. The file progression is the data-flow spine of the whole process." },
  { t: "callout", kind: "accent", title: "Record vs working copy, made concrete", x: "WIP is working \u2014 nobody treats it as truth. Final Publication is record \u2014 nobody builds from anything else. The four zones give the discipline from Track 2 a physical home: the answer to \u201cwhich file is current?\u201d is always \u201cthe one in the zone the process says is authoritative.\u201d" },
  { t: "footer", x: "Next: the questions a lead asks about data management." },
],


"t2-questions": [
  { t: "kicker", x: "Track 2 · Data management — your close" },
  { t: "h1", x: "Questions to ask your teams" },
  { t: "lead", x: "The accountability layer for data protection: each question probes whether protection is enforced, not just described." },
  { t: "question", x: "Is the ISO 19650-aligned naming convention actually enforced in ACC, or just documented?", body: "A documented standard nobody enforces is a fiction. The answer should show a naming audit or a validation step — not a PDF." },
  { t: "question", x: "How are the three sensitive classes (commercial, security-adjacent, contract-controlled) marked and restricted in the CDE?", body: "Classification must exist as a permission consequence, not a label in a spreadsheet. If nothing restricts access differently by class, classification is decoration." },
  { t: "question", x: "Which export paths are approved for program data — and who approved them?", body: "Every seam should have an owner and a decision. If the answer is 'people just export what they need', the seam is ungoverned." },
  { t: "question", x: "What happens to records at handover — and what is the quality gate before they become the operator's asset data?", body: "The digital-twin endgame means the handover is a product, not a chore. A weak answer treats closeout as a box to tick." },
  { t: "callout", kind: "accent", title: "The pattern", x: "Same shape as Track 1: every question asks for evidence — an audit, an owner, a gate — rather than accepting a policy statement." },
  { t: "footer", x: "Next: Track 3 — the integration seams, and the documents written to govern them." },
],

/* ============ TRACK 3 — INTEGRATION ============ */

"t3-intro": [
  { t: "kicker", x: "Track 3 · Integration — the seams" },
  { t: "payoff", what: "track", x: "you can name the seams between the systems on a rail programme, read the EIR, AIR and MIDP, and ask who owns each crossing \u2014 and what an AI would inherit on it." },
  { t: "h1", x: "Integration is about seams" },
  { t: "lead", x: "Integration does not mean 'ACC talks to everything'. It means there are specific, named seams between ACC and the rest of the program's stack — and each seam is a place where data moves, and where exposure can happen." },
  { t: "h2", x: "The real seams on this program" },
  { t: "table", head: ["Seam", "What crosses it", "The exposure"], rows: [
    ["Authoring → ACC", "Design models and drawings from Revit / Civil 3D / InfraWorks", "Early unapproved data entering the governed environment"],
    ["ACC ↔ Aconex ↔ SharePoint", "Documents and correspondence between the three CDEs", "Each platform has its own permission model — a file governed in ACC is only as governed as its copy elsewhere"],
    ["ACC → schedule / cost", "Document and model references consumed by P6 and Unifier", "Cost and contract data mixed with technical data in one flow"],
    ["ACC → AI tooling", "Exports and assistant queries (the three exposure vectors)", "The seam this tour exists to make visible"],
  ]},
  { t: "h2", x: "Coexistence, not migration" },
  { t: "p", x: "On Metrolinx capital delivery, ACC is already in production — but it runs alongside Aconex and SharePoint, each a governed home for part of the information. The integration story is coexistence and exchange, not 'moving everything into one system'. Your integration team's real job is making the seams between platforms work, and stay governed." },
  { t: "callout", kind: "highlight", title: "The lead's frame", x: "Every integration decision is a permission decision in disguise. Whoever designs a connector is deciding what data an external system — and eventually an AI — can reach. Integration and access control are the same conversation." },
  { t: "footer", x: "Next: the documents that govern the flow — EIR, AIR, MIDP." },
],

"t3-docs": [
  { t: "kicker", x: "Track 3 · Integration — the governing documents" },
  { t: "h1", x: "EIR · AIR · MIDP — the rules of the flow" },
  { t: "lead", x: "Your teams will name these three documents constantly. They are the program's information contract: what information is needed, who must deliver it, and when." },
  { t: "p", x: "You just saw the seams \u2014 the points where data crosses between systems. These documents are the rules written to govern those crossings: they decide what information may move, to what standard, and by when." },
  { t: "table", head: ["Document", "Stands for", "What it governs"], rows: [
    ["EIR", "Exchange Information Requirements", "What information the client requires, and the standards it must meet — the 'what' of the flow"],
    ["AIR", "Asset Information Requirements", "What information the operator needs to run and maintain the asset — the 'endgame' of the flow"],
    ["MIDP", "Master Information Delivery Plan", "Who delivers what, when — the 'who and when' of the flow"],
  ]},
  { t: "h2", x: "Why these matter to you" },
  { t: "p", x: "They are the bridge between the project and the operator. The EIR sets the standard, the AIR names what the asset needs at the end, and the MIDP schedules delivery. Together they are the contract behind the digital-twin target — and they are written in an ISO 19650-aligned house style that Metrolinx calls its own (the CADD/BIM Standards Manual and its supporting documents)." },
  { t: "callout", kind: "danger", title: "The gap that frames this tour", x: "None of these documents was written for AI. They govern exchange between humans and systems, not ingestion by language models. The exposure you learn to see in this tour sits precisely in that unwritten space." },
  { t: "footer", x: "Next: the questions a lead asks about integration." },
],

"t3-mbs": [
  { t: "kicker", x: "Track 3 \u00b7 Integration \u2014 federation & token economics" },
  { t: "h1", x: "The model federation tree \u2014 and what access really costs" },
  { t: "lead", x: "The \u201cRevit \u2192 ACC\u201d line in the stack diagram is really a tree. On the rail deployment, roughly 150 discipline models were coordinated up through two levels into a single federated model \u2014 and each level of access came with a different tool, and a different token cost." },
  { t: "mbs", title: "The model breakdown structure (MBS)",
    levels: [
      { label: "Discipline models", count: "~150 models", x: "Alignment, track, earthworks, tunnels, stations, railway systems \u2014 each team's own model" },
      { label: "1st-level coordination", count: "8+ models", x: "Per-asset coordination: Station 1, Line 1, Station 2, Depot 1 \u2026 each combining its discipline models" },
      { label: "2nd-level coordination", count: "cross-asset", x: "Coordination across the assets into the full project picture" },
      { label: "Federated model", count: "1", x: "The single coordinated model \u2014 what reviews, clash detection, and the client consume" },
    ],
    note: "Each coordination level links Navisworks caches (NWC) generated from the discipline models; the coordination space and its views are published where reviewers consume them, so reading the federated model never requires the authoring tools." },
  { t: "h2", x: "Four ways to access a model \u2014 and the token economics" },
  { t: "p", x: "Reading the same model is not one activity. The deployment distinguished four access modes, and they split into two token classes \u2014 a governance and cost seam in its own right." },
  { t: "table", head: ["Access mode", "What you can do", "Token cost"], rows: [
    ["Viewer \u2014 desktop", "View models, view issues", "Requires software install; no subscription tokens"],
    ["Viewer \u2014 mobile", "View models and issues on the move", "Consumes Docs tokens"],
    ["Review / Collaboration", "Clash detection, create and manage issues, 4D simulation", "Consumes BIM Collaborate Pro tokens"],
    ["QTO", "Quantities from the model", "Part of the collaboration tier"],
  ]},
  { t: "callout", kind: "warn", title: "The feature-shutdown decision", x: "The deployment deliberately did NOT activate clash detection or QTO inside ACC \u2014 the team found it slowed web-server synchronisation. They ran clashes in Navisworks Manage and synced the issues into ACC instead. That is a real tool-configuration governance decision: features that are switched off are as much a policy choice as features that are on." },
  { t: "callout", kind: "danger", title: "Ask", x: "Which ACC features are switched off on our programme \u2014 and who decided, and why? Configuration is governance, and configuration drifts." },
  { t: "h2", x: "The second control axis" },
  { t: "p", x: "The exposure map models role-level reach \u2014 who can see what. The rail deployment adds two more axes on top. Zone-based control: what you can do depends on where the file sits (copy/paste rejected in Final regardless of who you are). And cost-per-reach: two people can read the same model and burn different token classes. For a lead over data and integration, that opens a new diagnostic family." },
  { t: "callout", kind: "highlight", title: "The review-loop decision", x: "The deployment used Docs Reviews as the collaborative review tool rather than full design collaboration \u2014 deliberately, because a single process works for all file types, adds validation on share, and is cheaper in token consumption. That trade-off is exactly the kind of decision a lead should expect their teams to have made, and to be able to explain." },
  { t: "callout", kind: "accent", title: "Tracking the plan", x: "Insights and Power BI were wired to track production against the MIDP \u2014 so the information-delivery plan was not a document but a live dashboard. Ask whether your programme's MIDP is tracked the same way, or just filed." },
  { t: "footer", x: "Next: the questions a lead asks about integration." },
],


"t3-questions": [
  { t: "kicker", x: "Track 3 \u00b7 Integration \u2014 your close" },
  { t: "h1", x: "Questions to ask your teams" },
  { t: "lead", x: "The accountability layer for integration: naming the seams and the rules that govern what crosses them. The first two questions govern today's program; the last two are the projected questions you ask before AI is added to the flow." },
  { t: "question", x: "Which of the three CDEs (ACC, Aconex, SharePoint) is authoritative for which artifact type?", body: "Coexistence only works if each platform has a clear role. If no one can say who is authoritative for what, data is duplicated with no owner." },
  { t: "question", x: "What crosses each integration seam \u2014 and is each crossing logged?", body: "A governed seam has an audit trail. The absence of a trail on any seam means that seam is uncontrolled, whatever the policy says." },
  { t: "question", x: "And when an AI is added to the data flow \u2014 who signs off the rule that governs it, and whose role does it inherit?", body: "The projected question. The answer should place the AI on a named seam (inside ACC, on an export path, or as an agent) and name a decision owner. 'It's still being discussed' is honest \u2014 and is itself the current-state finding." },
  { t: "question", x: "And when AI agents arrive \u2014 could a role be exercised by an unattended agent, and would we know?", body: "The projected question. If the answer is 'we would not know', the audit capability itself is the gap to fix first \u2014 before the agents arrive." },
  { t: "callout", kind: "accent", title: "The pattern", x: "Once more, the same shape: name the thing, name the owner, show the trail. Integration governance is seam-by-seam evidence." },
  { t: "footer", x: "Next: where this is heading \u2014 AI as the next actor." },
],

/* ============ CASE STUDIES — guided detective sequences ============ */

"case-intro": [
  { t: "kicker", x: "Case studies · How these work" },
  { t: "payoff", what: "chapter", x: "you can spot a governance failure, locate it on the exposure map, and land the question that exposes it \u2014 on four real situations, three synthetic and one from an actual high-speed rail deployment." },
  { t: "h1", x: "Put the map to work" },
  { t: "lead", x: "The tracks taught you the mechanics. These three cases show you the situations a Project Lead actually meets — each one a realistic moment on a subway program where governance, data, or integration was put to the test." },
  { t: "h2", x: "The three-beat sequence" },
  { t: "bullets", items: [
    "Beat 1 \u2014 Spot: open the situation, find what's wrong.",
    "Beat 2 \u2014 Locate: place the exposure on the map \u2014 whose reach made this possible?",
    "Beat 3 \u2014 Land: the diagnostic question you would ask your team.",
  ]},
  { t: "p", x: "Each case is guided, not graded \u2014 there is no failing. The beats reveal the reasoning step by step, so you form the hypothesis before you read the answer. That is what turns the exposure map from something you read into something you use." },
  { t: "callout", kind: "warn", title: "Synthetic data, on purpose", x: "Every project, file name, and number in these cases is fabricated but realistic. Real Metrolinx program data is contract-controlled and does not belong in a training artifact \u2014 the scenarios teach the same logic without touching anything sensitive." },
  { t: "footer", x: "Next: Case 1 \u2014 the ballooning shared role." },
],

"case-t1": [
  { t: "kicker", x: "Case 1 \u00b7 Track 1 \u2014 Governance" },
  { t: "h1", x: "The ballooning shared role" },
  { t: "case",
    track: "",
    title: "",
    situation: "Package S12's 'Project Team' shared role was created for eight people. A routine access-control audit has just found it has forty-seven members \u2014 and the role can manage its own membership.",
    beats: [
      { label: "Beat 1 \u00b7 Spot", intro: "Open the permissions view the audit produced. Find what it flagged.",
        blocks: [
          { t: "table", head: ["Role", "Members", "Access level", "Last reviewed"], danger: [[1,1],[1,2]],
            rows: [
              ["S12-Project Team (shared)", "8 \u2192 47", "Edit + can manage members", "14 months ago"],
              ["S12-Structural Editors", "12", "Edit (Docs only)", "3 months ago"],
              ["S12-Field Viewers", "23", "View (Build only)", "6 months ago"],
            ]},
          { t: "reveal", title: "What the audit found", x: "The role was never re-audited. Each of the 47 members can edit project files \u2014 and because the role 'can manage members', any one of them can grant access to someone else. That is exactly the drift Track 1 warned about: a shared role where the audit trail goes to die." },
        ]},
      { label: "Beat 2 \u00b7 Locate", intro: "Where does this live on the exposure map? The shared role sits in the editor tier \u2014 with a twist.",
        blocks: [
          { t: "map", id: "case1-map", pins: ["projEditor"], title: "Exposure map \u2014 the editor tier" },
          { t: "callout", kind: "warn", title: "The twist", x: "A shared role does not just widen one row. It widens every person on the row \u2014 and 'can manage members' means the role can widen itself. When AI inherits this role, it inherits the reach of all 47 members at once." },
        ]},
      { label: "Beat 3 \u00b7 Land", intro: "The diagnostic question a lead asks:",
        blocks: [
          { t: "question", x: "Who is granted on each shared role \u2014 and who last audited it?", body: "A strong answer names an audit cadence and a finding \u2014 a date, not 'everyone who needs it'. The failure here is not the tool; it is that no one looked for 14 months." },
        ]},
    ]},
],

"case-t2": [
  { t: "kicker", x: "Case 2 \u00b7 Track 2 \u2014 Data management" },
  { t: "h1", x: "The superseded drawing" },
  { t: "case",
    track: "",
    title: "",
    situation: "Rev C of structural drawing S12-DWG-STR-0042 was approved and published. Two weeks later, a contractor received a fabrication package that was built from Rev A \u2014 a revision that was superseded months ago.",
    beats: [
      { label: "Beat 1 \u00b7 Spot", intro: "Open the document register. Trace where the wrong revision came from.",
        blocks: [
          { t: "table", head: ["File", "Status", "Referenced in", "Last shared"], danger: [[1,0],[1,2]],
            rows: [
              ["S12-DWG-STR-0042_Rev C.pdf", "Approved", "Model package \u2014 final", "12 days ago"],
              ["S12-DWG-STR-0042_Rev A.pdf", "In Review", "Model package \u2014 fabrication", "12 days ago"],
              ["S12-DWG-STR-0042_Rev B.pdf", "Archived", "\u2014", "5 months ago"],
            ]},
          { t: "reveal", title: "What went wrong", x: "Rev A was a working copy that was never archived or removed from the shared folder. When the model was federated for fabrication, the process picked the folder's latest revision by version number \u2014 and the working copy outranked the record. Status discipline broke: a non-record became the basis of fabrication." },
        ]},
      { label: "Beat 2 \u00b7 Locate", intro: "This is a record-vs-working-copy failure. Where on the map does the reach that made it possible sit?",
        blocks: [
          { t: "map", id: "case2-map", pins: ["docsScoped"], title: "Exposure map \u2014 the Docs slice" },
          { t: "callout", kind: "highlight", title: "The record rule", x: "The file had the right name \u2014 the naming convention worked. What failed was the rule that only a record may be used for construction. The federation read the folder, not the record; whoever can edit the folder could have prevented it." },
        ]},
      { label: "Beat 3 \u00b7 Land", intro: "The diagnostic question a lead asks:",
        blocks: [
          { t: "question", x: "Is the ISO 19650-aligned naming convention actually enforced in ACC \u2014 or just documented?", body: "A documented standard nobody enforces is a fiction. The answer should show a naming or status audit \u2014 a validation step that catches a Rev A sitting where only a record should be \u2014 not a PDF that describes the rule." },
        ]},
    ]},
],

"case-t3": [
  { t: "kicker", x: "Case 3 \u00b7 Track 3 \u2014 Integration" },
  { t: "h1", x: "The unauthorized export path" },
  { t: "case",
    track: "",
    title: "",
    situation: "An integration review found a shared link from ACC to an external file-share that a contractor set up 'so the design team could send us files faster.' The link grants view access to the whole Package S12 Docs folder. Separately, a staffer pasted a schedule PDF into a public AI chat tool.",
    beats: [
      { label: "Beat 1 \u00b7 Spot", intro: "Open the export-path register. Find the seams that are not governed.",
        blocks: [
          { t: "table", head: ["Export path", "Governed?", "Audit trail"], danger: [[1,1],[2,0],[2,1]],
            rows: [
              ["Formal transmittal through Docs", "Yes \u2014 logged", "Visible"],
              ["Shared link \u2014 folder-wide, unlogged", "No", "None"],
              ["Copy-paste into a public AI chat tool", "No", "None"],
            ]},
          { t: "reveal", title: "The two open seams", x: "A folder-wide shared link with no log, and a quiet paste into an AI tool. Neither appears in any audit. This is exactly the export seam from Track 3 \u2014 and it is the surface where AI exposure starts: once data crosses an ungoverned seam, no ACC permission bounds it." },
        ]},
      { label: "Beat 2 \u00b7 Locate", intro: "Who can reach the data that crossed these seams? Pin the rows on the map.",
        blocks: [
          { t: "map", id: "case3-map", pins: ["projViewer", "docsScoped"], title: "Exposure map \u2014 who could hold the link" },
          { t: "callout", kind: "danger", title: "The obligation that already exists", x: "Ontario's Responsible Use of Artificial Intelligence Directive applies to Metrolinx and mandates AI risk assessment across the lifecycle. The rule exists \u2014 but no CDE-specific answer is written for the export seam yet. That is the gap, and this case is where it shows up." },
        ]},
      { label: "Beat 3 \u00b7 Land", intro: "The diagnostic questions a lead asks:",
        blocks: [
          { t: "question", x: "Which export paths are approved for program data \u2014 and who approved them?", body: "Every seam should have an owner and a decision. If the answer is 'people just export what they need', the export seam is ungoverned \u2014 and 'anyone can download anything' is the working reality." },
          { t: "question", x: "And where is the AI risk assessment required by Ontario's AI Directive \u2014 does it cover the ACC/Aconex data flow?", body: "The sharper follow-up. The obligation is checkable and named; the CDE-specific answer is what is unwritten. Asking this is how a lead converts a gap into a decision." },
        ]},
    ]},
],

"case-t4": [
  { t: "kicker", x: "Case 4 \u00b7 Real-world reference" },
  { t: "h1", x: "The high-speed rail deployment" },
  { t: "case",
    track: "", title: "",
    situation: "A 70 km strategic high-speed line in the Middle-East \u2014 182 people across four countries (England 12, India 68, France 60, Middle-East 42), concept design delivered in 12 months, and a client requirement for a full-Autodesk environment. This is the real deployment the four-zone CDE, the COMPANY_DISCIPLINE_ROLE scheme, and the federation tree all come from.",
    beats: [
      { label: "Beat 1 \u00b7 Spot", intro: "Open the zone register from the weekly coordination cycle. Find the escape.",
        blocks: [
          { t: "table", head: ["Model", "From zone", "To zone", "Review pass"], danger: [[1,2],[1,3]],
            rows: [
              ["Track corridor federation (NWC)", "WIP", "Shared \u2014 Internal", "Reviewed"],
              ["Station 2 architectural model", "WIP", "Shared \u2014 Client", "None"],
              ["Tunnel systems federation", "Shared \u2014 Internal", "Final Publication", "Approved"],
            ]},
          { t: "reveal", title: "What the register shows", x: "The Station 2 model jumped from WIP straight to the client zone, skipping the internal review pass. The weekly federated-model refresh read the published space and pulled it \u2014 so the client saw geometry that had never been internally checked. Zone discipline broke: a file moved between zones by whoever could click, not by the process." },
        ]},
      { label: "Beat 2 \u00b7 Locate", intro: "This is the zone-based control axis. Pin the role whose reach let it happen.",
        blocks: [
          { t: "map", id: "case4-map", pins: ["projEditor"], title: "Exposure map \u2014 who could write the client zone" },
          { t: "callout", kind: "highlight", title: "Role vs zone", x: "The exposure map shows the role that could reach the client zone. But the real control lives in the zone rules: in the deployment, moving into Shared-Client should have required the review pass \u2014 the process, not the permission, is what governs the seam. A lead asks whether the process is enforced by the tool, or only by convention." },
        ]},
      { label: "Beat 3 \u00b7 Land", intro: "The diagnostic questions a lead asks:",
        blocks: [
          { t: "question", x: "Which zone is authoritative \u2014 and how does a file move between zones: by process, or by whoever can click?", body: "A strong answer names the gate and who enforces it. If 'sharing' is a one-click hop out of WIP, the zone model is decoration, not control." },
          { t: "question", x: "Is the review loop enforced before anything reaches the client \u2014 or is client-share the same as share-all?", body: "The escape in this case was a missing review pass. The question exposes whether the programme's own client boundary has a gate." },
        ]},
    ]},
  { t: "h2", x: "The quantified outcomes \u2014 read with the right scepticism" },
  { t: "p", x: "The deployment reports steep efficiency gains. They are the credibility anchor for why governance-and-discipline pays \u2014 and they are vendor-reported, so a lead should know their provenance before citing them." },
  { t: "table", head: ["Outcome", "Reported figure"], rows: [
    ["Coordination & federated-model update hours", "\u221280% \u2014 15 h/week down to 3 h/week"],
    ["Rework hours from C3D design changes", "\u221235%"],
    ["Section-view deliverable time", "\u221270%"],
    ["Long-profile view time", "\u221250%"],
    ["Xref and layer handling time", "\u221285%"],
  ]},
  { t: "callout", kind: "danger", title: "Provenance \u2014 read these as vendor-reported", x: "These figures are from Egis's own presentation \u2014 Autodesk University 2024 class CI1657, 'Mastering Collaboration in High-Speed Rail Projects', by Egis's Joao Alves Correa and Alexis Meresse \u2014 about an Egis deployment on an Autodesk product. The deck itself carries 'Generated by Copilot \u2014 Microsoft Bing Enterprise.' The claims are not independently audited and no baseline methodology is published. Treat them as directional evidence, not verified results \u2014 and never cite them to an auditor as audited numbers." },
  { t: "callout", kind: "danger", title: "Two more honesty notes", x: "One, the client and project location are contractually anonymized \u2014 the presenters say verbatim that for confidential reasons they cannot give the full context of the project. Two, the spoken session cites 40% for the Civil rework reduction while the deck reports 35%; both come from the same presentation, and the deck figure is what this tour carries. If a watcher ever hears the video, the mismatch is visible \u2014 so it is flagged here rather than hidden." },
  { t: "callout", kind: "warn", title: "Transferable reference, not Metrolinx-documented", x: "This is Egis's Middle-East high-speed rail project \u2014 a real Autodesk deployment whose anatomy transfers directly to rail programmes, but it is not a Metrolinx programme. Use it to understand how a working deployment is structured; confirm Metrolinx's own schemes with your teams." },
  { t: "h2", x: "The deployment that this learner's own team will resemble" },
  { t: "p", x: "The rollout itself is a template for how the learner's team will be onboarded onto ACC: 7 training sessions, 164 of 182 people trained (85%), project-specific ACC user guides including video content, and a near support network of BIM-coordinators as first-line contacts. The same pattern \u2014 train a large share of the population, then lean on named focal points \u2014 is how a programme absorbs a new platform without a helpdesk bottleneck." },
  { t: "footer", x: "Next: where this is heading \u2014 AI as the next actor." },
],

/* ============ CLOSE ============ */

"close-map": [
  { t: "kicker", x: "Close · What you leave with" },
  { t: "h1", x: "Your exposure map" },
  { t: "lead", x: "The tour's whole purpose is that you leave able to read and use one artifact: the permission-and-exposure map. Today it answers who can see what. The AI layer is the projected overlay — the same map, further out — and you now know how to read both." },
  { t: "map", id: "map-close", ai: "off", title: "Permission & exposure map" },
  { t: "h2", x: "The three questions you now carry" },
  { t: "bullets", items: [
    "Who can see and touch this data today — and is that reach justified?" ,
    "What data is sensitive enough that its reach must be the minimum needed?" ,
    "Where data moves across a seam, is the crossing governed — and what will change when an AI is one of the actors?" ,
  ]},
  { t: "h2", x: "The one finding to remember" },
  { t: "p", x: "The governance that protects this program — the EIR, the AIR, the MIDP, the ISO 19650-aligned standards — was written before AI could read a CDE. Today the map is governed by human roles, and that is the right order. When AI arrives it will inherit those same roles — and the unwritten gap is where your teams will work. You do not need to close the gap alone. You need to see it, name it, and ask the questions — and now you can." },
  { t: "callout", kind: "accent", title: "Back on the job", x: "Walk into your next team meeting with the exposure map in mind and one diagnostic ready: pick a data type your team handles, and ask who can reach it today, whether that reach is justified — and what will change when an AI inherits it. That one habit is the whole tour, in practice." },
  { t: "footer", x: "End of tour. This shell is the fidelity-accurate object model of ACC — what you learned here transfers to the real product." },
],

};

/* ------------------------------------------------------------------
   EXPOSURE MAP DATA — shared by all three map render sites
   Columns: the data surfaces. Rows: ACC roles.
   aiSurfaces: the three vectors, each a set of cells it can reach
   (as row keys) + its diagnostic question.
   ------------------------------------------------------------------ */

const MAP = {
  cols: [
    { key: "docs",   label: "Docs — drawings & records" },
    { key: "build",  label: "Build — field & quality" },
    { key: "models", label: "Model Coordination — 3D" },
    { key: "takeoff",label: "Takeoff — quantities" },
    { key: "admin",  label: "Admin — roles & permissions" },
  ],
  rows: [
    { key: "accAdmin", label: "Account Admin", level: "admin",
      cells: { docs:"admin", build:"admin", models:"admin", takeoff:"admin", admin:"admin" },
      note: "Everything, everywhere, including who has access." },
    { key: "projAdmin", label: "Project Admin", level: "admin",
      cells: { docs:"edit", build:"edit", models:"edit", takeoff:"edit", admin:"admin" },
      note: "Full control inside one project, including roles." },
    { key: "projEditor", label: "Project Member — Editor", level: "edit",
      cells: { docs:"edit", build:"edit", models:"edit", takeoff:"view", admin:"rw" },
      note: "Creates and changes within granted folders and tools." },
    { key: "projViewer", label: "Project Member — Viewer", level: "ro",
      cells: { docs:"ro", build:"ro", models:"ro", takeoff:"ro", admin:"rw" },
      note: "Sees what is granted; changes nothing." },
    { key: "docsScoped", label: "Role-scoped — Docs only", level: "edit",
      cells: { docs:"edit", build:"rw", models:"rw", takeoff:"rw", admin:"rw" },
      note: "A narrow slice: this role reaches Docs only." },
    { key: "fieldScoped", label: "Role-scoped — Build only", level: "ro",
      cells: { docs:"rw", build:"edit", models:"rw", takeoff:"rw", admin:"rw" },
      note: "Field reach only: quality and safety records." },
  ],
  aiSurfaces: [
    {
      id: "ai-native", name: "Vector 1 · Native Assistant", where: "AI inside ACC",
      row: "inherits-any", color: "ai",
      body: "Inherits the exact role of the human using it. Data it reads flows to Autodesk's cloud.",
      q: "What can the assistant currently see — through whose role — and who decided that?",
      qShort: "What can the Assistant see?",
      reach: ["accAdmin", "projAdmin", "projEditor", "projViewer", "docsScoped", "fieldScoped"],
    },
    {
      id: "ai-llm", name: "Vector 2 · External LLM tooling", where: "AI outside, on exports",
      row: "export-seam", color: "ai",
      body: "Org-level AI ingests exports that crossed the export/exchange seam. No ACC permission bounds it once out — and Autodesk's Acceptable Use Policy (late-2025 revision) permits customers to train their own models on their own data. So this path is contractually open, but project-governance ungoverned: not blocked by Autodesk's terms, and not yet covered by program rules.",
      q: "Where is the program's AI risk assessment required by Ontario's AI Directive, and does it cover the ACC/Aconex data flow? (Ask internally: does a non-public Metrolinx AI policy exist?)",
      qShort: "Does Ontario's AI Directive risk assessment cover the ACC/Aconex data flow?",
      reach: ["docsScoped", "projViewer", "projEditor"],
    },
    {
      id: "ai-agent", name: "Vector 3 · Agents with inherited roles", where: "AI acting as someone",
      row: "inherits-any", color: "ai",
      body: "Automation moves with a human's credentials and role, at machine speed and scale.",
      q: "Could any role that reaches sensitive data be exercised by an unattended agent — and would we know?",
      qShort: "Could an agent act as this role?",
      reach: ["accAdmin", "projAdmin", "projEditor", "docsScoped"],
    },
  ],
  legend: [
    { cls: "map-rw", label: "No access — cannot see it exists" },
    { cls: "map-ro", label: "View — read only" },
    { cls: "map-edit", label: "Edit — create & change within scope" },
    { cls: "map-admin", label: "Admin — full control, incl. who has access" },
  ],
};

/* ------------------------------------------------------------------
   PukhNaming — bilingual product naming (Azaraki's terminology layer,
   Shayba's "one artifact, both languages").
   ACC was rebranded Autodesk Forma (March 2026) — same platform, new
   names. The data layer below is written in ACC-legacy terms (the
   canonical source). PukhNaming.transform() rewrites to Forma-current
   naming when mode is "forma" (the default). When mode is "acc",
   transform() is the identity. Components call it on rendered text;
   blocks flagged nofn:true (text that names both products explicitly)
   are skipped so they read correctly in either mode.
   ------------------------------------------------------------------ */
const PukhNaming = {
  mode: "forma", // "forma" (default, what the product shows now) | "acc" (legacy)
  _rules: [
    [/\bAutodesk Construction Cloud\b/g, "Autodesk Forma"],
    [/\bBIM 360 \/ ACC Core\b/g,          "Forma Core"],
    [/\bBIM Collaborate Pro\b/g,          "Forma Design Collaboration"],
    [/\bAccount Admin\b/g,                "Hub Admin"],
    [/\bAccount Admins\b/g,               "Hub Admins"],
    [/\bDocs\b/g,                         "Forma Data Management"],
    // Build/Takeoff get lookbehinds so the output "Forma Build" is not
    // re-matched by the same rule (the transform must be idempotent —
    // it runs once per source render and again over pre-transformed text).
    [/(?<!Forma\s)\bBuild\b/g,            "Forma Build"],
    [/(?<!Forma\s)\bTakeoff\b/g,          "Forma Takeoff"],
    [/\bACC\b/g,                          "Forma"],
    [/\bAccount\b/g,                      "Hub"],
    [/\baccount\b/g,                      "hub"],
  ],
  setMode(m) { this.mode = (m === "acc") ? "acc" : "forma"; },
  transform(str) {
    if (this.mode !== "forma" || !str) return str;
    let s = str;
    for (const [re, to] of this._rules) s = s.replace(re, to);
    return s;
  },
};

window.PukhNaming = PukhNaming;

/* Export for app.js / tour.js */
window.SECTIONS = SECTIONS;
window.VIEWS = VIEWS;
window.MAP = MAP;

/* ------------------------------------------------------------------
   HOTSPOTS — "what is this" explanations for the workspace sims.
   id must match data-hs attributes in the acc blocks. The tour
   engine (tour.js) renders these into popovers on click.
   ------------------------------------------------------------------ */
const HOTSPOTS = {
  "hs-proj": {
    title: "The project",
    tag: "Hierarchy",
    body: "<p>This is the <b>project</b> — one job with its own folders, members, and permissions. Your teams likely have several: one per package or line.</p>",
  },
  "hs-toolbar": {
    title: "The products' tools",
    tag: "Product family",
    body: "<p>The tabs are the products' tools. <b>Documents</b> and <b>Transmittals</b> belong to Docs; <b>Issues</b> spans Build and Model Coordination. This is the Docs surface.</p>",
  },
  "hs-tree": {
    title: "The folder tree",
    tag: "Hierarchy",
    body: "<p>Folders map to the program's <b>work breakdown</b>. The naming convention — 01-Project-Management, 02-Design, 03-Drawings — is a governance choice, and an enforced one on an ISO 19650-aligned program.</p>",
  },
  "hs-files": {
    title: "Files, not just names",
    tag: "Object model",
    body: "<p>Every file carries a <b>version</b> (Rev C) and a <b>status</b> (Draft, In Review, Approved). The status is what controls whether it can be used for construction. That status discipline is the heart of document control.</p>",
  },
  "hs-badge": {
    title: "You are a role",
    tag: "Permissions",
    body: "<p>This badge is your <b>permission role</b> — what you can see and do here. Your role, and everyone else's, is the single most important thing to understand in ACC. Track 1 is built entirely around it.</p>",
  },
};

window.HOTSPOTS = HOTSPOTS;

