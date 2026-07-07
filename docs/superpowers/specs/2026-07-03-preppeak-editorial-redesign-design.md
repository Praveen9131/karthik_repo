# PrepPeak "AI for Engineers" — "Lab Record" Redesign

**Date:** 2026-07-03
**Status:** Approved autonomously (user AFK; request: "make the website international-standard level" per distilled aesthetics guidance)

## Goal

Replace the generic ed-tech look (white surface, coral accent, floating rounded cards)
with a distinctive, internationally credible design. Same content, same sections,
same data files — every visual decision rethought.

> **Revision note:** the first draft of this direction (warm cream paper + display
> serif + terracotta accent) was rejected during self-review as the current
> AI-default aesthetic. Replaced with a direction grounded in the subject's world.

## Direction: "The Lab Record"

Every Indian engineering student keeps a lab record book: green millimeter graph
sheets, blue-black fountain-pen ink, a red-ruled margin, a professor's red tick
marks. This page borrows that material world and executes it with modern editorial
discipline. It also maps directly onto machine learning: curves plotted on graph
paper are literally what learning looks like.

### Signature element

Article thumbnails are plotted **figures**: generative learning/loss curves drawn
on millimeter grid with axes and mono `FIG. NN` labels. The hero carries one large
skill-over-time curve with a dashed vertical marker at "placement season." A double
red margin rule runs down the left of the page on wide screens.

### Typography

- **Display / headings:** Bricolage Grotesque (variable, 600–800) — characterful
  grotesque with ink traps; huge tight headlines.
- **Body / UI:** Atkinson Hyperlegible (400/700) — humane, highly legible.
- **Meta / figure labels / axes:** Fragment Mono, uppercase, letterspaced.

### Color system (CSS variables)

- `--sheet: #f6f7f2` graph-sheet ground with green millimeter grid
  (repeating-linear-gradient, minor + major lines).
- `--ink: #1d2a38` blue-black pen ink for text; `--ink-soft` secondary.
- `--red: #cf3a28` red-pen accent: margin rule, ticks, active nav squiggle,
  primary CTA, hovers.
- Curve "pen" colors keyed by `tint`: ballpoint blue, green, red, ink, amber, violet.
- `--board: #12312a` blackboard green for the PDF band; `--ink-dark: #141d26`
  footer. Chalk-white text on both.

### Section treatments

- **Header:** clean bar, hairline rule, Bricolage wordmark with red ▲ peak mark,
  active/hover nav gets a red-pen squiggle underline (SVG data-URI). Mobile menu
  unchanged structurally (`.nav-toggle` / `.nav-mobile` preserved for ui-check.mjs).
- **Hero:** mono record-label eyebrow, huge Bricolage headline; right panel is a
  white "why this track works" sheet with red hand-drawn tick marks (not numbers —
  the three points are claims, not a sequence). Background: the big annotated
  hero curve.
- **Cornerstone:** flat feature panel, ink hairline border, large plotted-figure
  thumbnail, `FIG. 01`.
- **Article grid:** white sheet cards, hairline borders, figure thumbnails
  (`FIG. 02`–`13`, catalogue order), curve redraws on hover, lift + hard offset
  shadow.
- **PDF offer:** blackboard band, chalk-white display type, paper "stamp" button.
- **Footer:** ink band, mono column titles, oversized wordmark.

### Motion (CSS-only)

- One orchestrated page-load: staggered fade-rise on hero elements; hero curve
  draws itself (stroke-dashoffset).
- Micro-interactions: nav squiggle draw, card lift + curve redraw, arrow slide.
- All wrapped in `@media (prefers-reduced-motion: reduce)` guards.

## Constraints

- No new dependencies; Google Fonts swap in `index.html`.
- Data files (`site.js`, `articles.js`) untouched.
- Component structure and ui-check-critical class names preserved.
- Verify with `npm run build` + `node scripts/ui-check.mjs` screenshots at
  desktop/tablet/mobile.

## Alternatives considered

- **Dark IDE/terminal theme:** on-brand for "AI" but itself a cliché in developer
  education, and worse for long-form reading.
- **Swiss/brutalist grid:** distinctive but cold for a placement-prep brand
  serving Indian engineering students.
