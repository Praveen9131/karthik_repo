// Splits the single-page curriculum source into one static route per course,
// rendered as a Udemy-style "Course content" accordion.
//
//   scripts/curriculum.src.html  (authoring master: all 6 courses)
//        │  node scripts/build-curriculum.mjs
//        ▼
//   public/curriculum/style.css              (shared Udemy-accordion styles)
//   public/curriculum/accordion.js           (expand/collapse-all behavior)
//   public/curriculum/python-oops.html       (one route per course …)
//   public/curriculum/dsa.html
//   public/curriculum/competitive.html
//   public/curriculum/data-science.html
//   public/curriculum/generative-ai.html
//   public/curriculum/agentic-ai.html
//
// Each page renders ONE course as a collapsible syllabus. The syllabus data is
// parsed straight out of the source panels — edit the source, re-run this.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(resolve(root, 'scripts/curriculum.src.html'), 'utf8');
const outDir = resolve(root, 'public/curriculum');
mkdirSync(outDir, { recursive: true });

// Course order + route slugs.
const courses = [
  { id: 't1', slug: 'python-oops' },
  { id: 't2', slug: 'dsa' },
  { id: 't3', slug: 'competitive' },
  { id: 't4', slug: 'data-science' },
  { id: 't5', slug: 'generative-ai' },
  { id: 't6', slug: 'agentic-ai' },
];

const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// --- Parse each course panel into structured data -------------------------
function parsePanel(inner) {
  const headBlock = (inner.match(/<div class="course-head">([\s\S]*?)<\/div>/) || ['', ''])[1];
  const title = stripTags((headBlock.match(/<h2>([\s\S]*?)<\/h2>/) || [, 'Course'])[1]);
  const badges = [...headBlock.matchAll(/<span class="badge">([\s\S]*?)<\/span>/g)].map((m) =>
    stripTags(m[1])
  );
  const desc = (inner.match(/<p class="course-desc">([\s\S]*?)<\/p>/) || ['', ''])[1].trim();

  const modules = [];
  const detailsRe = /<details[^>]*>([\s\S]*?)<\/details>/g;
  let d;
  while ((d = detailsRe.exec(inner))) {
    const block = d[1];
    const summary = (block.match(/<summary>([\s\S]*?)<\/summary>/) || ['', ''])[1];
    const code = stripTags((summary.match(/<span class="mod">([\s\S]*?)<\/span>/) || ['', ''])[1]);
    const dur = stripTags((summary.match(/<span class="dur">([\s\S]*?)<\/span>/) || ['', ''])[1]);
    const modTitle = stripTags(
      summary.replace(/<span class="mod">[\s\S]*?<\/span>/, '').replace(/<span class="dur">[\s\S]*?<\/span>/, '')
    );

    // Walk the topics block in document order: an <h4> opens a new group,
    // each <ul> appends its items to the current group (or a headless group).
    const topics = (block.match(/<div class="topics">([\s\S]*?)<\/div>/) || ['', ''])[1];
    const groups = [];
    let current = null;
    const tokRe = /<h4>([\s\S]*?)<\/h4>|<ul>([\s\S]*?)<\/ul>/g;
    let t;
    while ((t = tokRe.exec(topics))) {
      if (t[1] !== undefined) {
        current = { heading: stripTags(t[1]), items: [] };
        groups.push(current);
      } else {
        const items = [...t[2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => stripTags(m[1]));
        if (!current) {
          current = { heading: '', items: [] };
          groups.push(current);
        }
        current.items.push(...items);
      }
    }
    const lectures = groups.reduce((s, g) => s + g.items.length, 0);
    modules.push({ code, title: modTitle, dur, groups, lectures });
  }
  return { title, badges, desc, modules };
}

// --- Inline SVG icons (no icon-font / external dependency) ------------------
const icons = {
  chev: `<svg class="chev" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
  play: `<svg class="ic-play" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
};

// --- Render one course page -------------------------------------------------
function renderModule(mod, i) {
  const groupsHtml = mod.groups
    .map((g) => {
      const cap = g.heading ? `<div class="lec-group">${g.heading}</div>` : '';
      const rows = g.items
        .map(
          (it) => `
          <div class="lec-row">
            <span class="lec-left">${icons.play}<span class="lec-title">${it}</span></span>
          </div>`
        )
        .join('');
      return cap + rows;
    })
    .join('');

  const meta = [`${mod.lectures} lectures`, mod.dur].filter(Boolean).join(' &bull; ');

  return `
    <details class="mod-item"${i === 0 ? ' open' : ''}>
      <summary class="mod-head">
        <span class="mod-head-left">
          ${icons.chev}
          <span class="mod-code">${mod.code}</span>
          <span class="mod-title">${mod.title}</span>
        </span>
        <span class="mod-meta">${meta}</span>
      </summary>
      <div class="mod-body">${groupsHtml}</div>
    </details>`;
}

function pageHtml(course) {
  const c = parsePanel(course.panel);
  const sections = c.modules.length;
  const totalLectures = c.modules.reduce((s, m) => s + m.lectures, 0);
  const periods = (c.badges.find((b) => /period/i.test(b)) || '').trim();

  const badgesHtml = c.badges
    .map((b) => `<span class="badge">${b.toUpperCase()}</span>`)
    .join('');

  const summaryLine = [
    `${sections} sections`,
    `${totalLectures} lectures`,
    periods ? periods : null,
  ]
    .filter(Boolean)
    .join(' &bull; ');

  const projectText = stripTags(
    (course.panel.match(/<div class="project">[\s\S]*?<p>([\s\S]*?)<\/p>/) || ['', ''])[1]
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.title} — Codai.ai Curriculum</title>
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/curriculum/style.css">
</head>
<body>
<div class="wrap">
  <a class="back" href="/#curriculum">&larr; Back to Codai.ai</a>

  <header class="course-hero">
    <div class="kicker">Course syllabus</div>
    <h1>${c.title}</h1>
    ${c.desc ? `<p class="hero-sub">${c.desc}</p>` : ''}
    <div class="badges">${badgesHtml}</div>
  </header>

  <div class="content-bar">
    <h2>Course content</h2>
    <button type="button" class="toggle-all" data-toggle-all>Expand all sections</button>
  </div>
  <div class="content-meta">${icons.layers}<span>${summaryLine} total</span></div>

  <div class="accordion">
    ${c.modules.map(renderModule).join('\n')}
  </div>

  ${
    projectText
      ? `<div class="project-card">
    <div class="project-label">Course project</div>
    <p>${projectText}</p>
  </div>`
      : ''
  }

  <footer class="course-footer">
    <span>&copy; 2026 Codai.ai</span>
    <a href="/#curriculum">Explore all courses &rarr;</a>
  </footer>
</div>
<script src="/curriculum/accordion.js"></script>
</body>
</html>
`;
}

// --- Shared stylesheet (Udemy-style accordion, warm InteligenAI palette) ----
const style = `/* ============================================================
   Codai.ai — Course syllabus, Udemy-style accordion.
   Warm cream surfaces, orange accents, collapsible modules.
   Display: Poppins · Body: Open Sans
   ============================================================ */
:root{
  --page:#FBF3EA; --card:#FDF1E4; --ink:#241C14; --ink-2:#3A2F23;
  --muted:#7A6A58; --muted-2:#9C8B78; --accent:#E8734A; --accent-strong:#D95B2E;
  --badge-bg:#FCE3D0; --badge-bd:#F0B58C; --line:#F0D8BE; --line-soft:#F5EBDD;
  --head-open:#FBE7D3; --head-closed:#FFFBF6; --play:#C99A6E;
  --display:"Poppins",system-ui,sans-serif; --body:"Open Sans",system-ui,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--page);color:var(--ink);font-family:var(--body);line-height:1.6;
  -webkit-font-smoothing:antialiased}
::selection{background:rgba(232,115,74,.28)}
a{color:inherit;text-decoration:none}
svg{display:block}

.wrap{max-width:56rem;margin:0 auto;padding:2rem 1.25rem 5rem}

.back{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--body);
  font-size:.85rem;font-weight:600;color:var(--muted);margin-bottom:1.5rem;transition:color .15s}
.back:hover{color:var(--accent)}

/* ---------- Hero ---------- */
.course-hero{background:var(--card);border:1px solid var(--line);border-radius:1rem;
  padding:1.75rem 1.75rem 1.85rem;margin-bottom:2rem}
.kicker{font-family:var(--body);font-size:.72rem;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:var(--accent)}
.course-hero h1{font-family:var(--display);font-weight:700;letter-spacing:-.02em;line-height:1.1;
  font-size:clamp(1.8rem,4vw,2.6rem);color:var(--ink);margin:.55rem 0 .6rem}
.hero-sub{color:var(--ink-2);font-size:1rem;max-width:44rem;margin-bottom:1.1rem}
.badges{display:flex;flex-wrap:wrap;gap:.55rem;margin-top:.35rem}
.badge{font-family:var(--body);font-size:.68rem;font-weight:700;letter-spacing:.06em;
  color:var(--accent);background:var(--badge-bg);border:1px solid var(--badge-bd);
  padding:.32rem .7rem;border-radius:999px}

/* ---------- Content bar ---------- */
.content-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:.4rem}
.content-bar h2{font-family:var(--display);font-weight:700;font-size:1.2rem;color:var(--ink)}
.toggle-all{font-family:var(--body);font-size:.85rem;font-weight:700;color:var(--accent-strong);
  background:none;border:none;cursor:pointer;text-underline-offset:3px}
.toggle-all:hover{text-decoration:underline}
.content-meta{display:flex;align-items:center;gap:.45rem;color:var(--muted);font-size:.85rem;
  margin-bottom:1rem}
.content-meta svg{color:var(--accent)}

/* ---------- Accordion ---------- */
.accordion{border:1px solid var(--line);border-radius:.85rem;overflow:hidden;background:#fff}
.mod-item{border-top:1px solid var(--line)}
.mod-item:first-child{border-top:none}

.mod-head{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;
  gap:.9rem;padding:.95rem 1.1rem;background:var(--head-closed);transition:background .15s;
  -webkit-tap-highlight-color:transparent}
.mod-head::-webkit-details-marker{display:none}
.mod-item[open] .mod-head{background:var(--head-open)}
.mod-head:hover{background:var(--head-open)}
.mod-head-left{display:flex;align-items:center;gap:.7rem;min-width:0}
.chev{color:var(--ink);flex:none;transition:transform .2s ease}
.mod-item[open] .chev{transform:rotate(180deg)}
.mod-code{font-family:var(--body);font-size:.72rem;font-weight:700;color:var(--accent);flex:none}
.mod-title{font-family:var(--display);font-weight:600;font-size:.98rem;color:var(--ink);
  line-height:1.35;min-width:0}
.mod-meta{font-size:.78rem;color:var(--muted);white-space:nowrap;flex:none}

.mod-body{background:#fff;border-top:1px solid var(--line-soft)}
.lec-group{font-family:var(--body);font-size:.7rem;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;color:var(--muted-2);padding:.85rem 1.2rem .35rem 2.85rem}
.lec-row{display:flex;align-items:center;justify-content:space-between;gap:.9rem;
  padding:.6rem 1.2rem .6rem 2.85rem;border-top:1px solid var(--line-soft)}
.lec-group + .lec-row{border-top:none}
.lec-left{display:flex;align-items:center;gap:.65rem;min-width:0}
.ic-play{color:var(--play);flex:none}
.lec-title{font-size:.9rem;color:var(--ink-2);line-height:1.4}

/* ---------- Project card ---------- */
.project-card{margin-top:1.5rem;border:1.5px dashed var(--accent);background:#FCE9D9;
  border-radius:.85rem;padding:1.1rem 1.3rem}
.project-label{font-family:var(--body);font-size:.72rem;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;color:var(--accent-strong);margin-bottom:.4rem}
.project-card p{font-size:.92rem;color:var(--ink-2);line-height:1.6}

/* ---------- Footer ---------- */
.course-footer{display:flex;align-items:center;justify-content:space-between;gap:1rem;
  margin-top:2.5rem;padding-top:1.25rem;border-top:1px solid var(--line);
  font-size:.82rem;color:var(--muted)}
.course-footer a{font-weight:700;color:var(--accent-strong)}
.course-footer a:hover{text-decoration:underline}

@media(max-width:560px){
  .mod-meta{display:none}
  .lec-group,.lec-row{padding-left:1.2rem}
}
`;

// --- Expand / collapse-all behavior ----------------------------------------
const accordionJs = `// Course-syllabus accordion: native <details> + expand/collapse-all.
(function () {
  var btn = document.querySelector('[data-toggle-all]');
  var items = Array.prototype.slice.call(document.querySelectorAll('details.mod-item'));
  if (!btn || !items.length) return;
  function allOpen() { return items.every(function (d) { return d.open; }); }
  function sync() { btn.textContent = allOpen() ? 'Collapse all sections' : 'Expand all sections'; }
  btn.addEventListener('click', function () {
    var open = allOpen();
    items.forEach(function (d) { d.open = !open; });
    sync();
  });
  items.forEach(function (d) { d.addEventListener('toggle', sync); });
  sync();
})();
`;

// --- Write everything -------------------------------------------------------
const panels = {};
const panelRe = /<section class="panel[^"]*" id="(t\d)"[^>]*>([\s\S]*?)<\/section>/g;
let m;
while ((m = panelRe.exec(src))) panels[m[1]] = m[2];

writeFileSync(resolve(outDir, 'style.css'), style);
writeFileSync(resolve(outDir, 'accordion.js'), accordionJs);

for (const c of courses) {
  if (!panels[c.id]) throw new Error(`missing panel ${c.id} in source`);
  writeFileSync(resolve(outDir, `${c.slug}.html`), pageHtml({ ...c, panel: panels[c.id] }));
}

// Redirect the old single-page URL to the first course route.
writeFileSync(
  resolve(root, 'public/curriculum.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=/curriculum/${courses[0].slug}.html">
<link rel="canonical" href="/curriculum/${courses[0].slug}.html">
<title>Course Curriculum — Codai.ai</title>
</head>
<body>
<p>Redirecting to <a href="/curriculum/${courses[0].slug}.html">the curriculum</a>…</p>
</body>
</html>
`
);

console.log(`Generated ${courses.length} Udemy-style course routes + style.css + accordion.js`);
console.log(courses.map((c) => `  /curriculum/${c.slug}.html`).join('\n'));
