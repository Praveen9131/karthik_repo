import { companies } from "../data/companies.js";

function Arrow() {
  return <span className="fp-arrow">→</span>;
}

/* code.in-style dark stat-card panel for the hero's right column. */
function HeroPanel() {
  return (
    <aside className="fp-hero-panel">
      <div className="hero-stat-card wide">
        <div>
          <span className="sc-big">#1</span>
          <span className="sc-label">flagship track built for Agentic AI</span>
        </div>
        <div className="sc-right">
          <span className="sc-big">30</span>
          <span className="sc-label">week structured curriculum</span>
        </div>
      </div>

      <div className="hero-stat-grid">
        <div className="hero-stat-card">
          <span className="sc-big">2</span>
          <span className="sc-label">flagship tracks — Agentic AI and DSA</span>
        </div>
        <div className="hero-stat-card">
          <span className="sc-big">6 mo</span>
          <span className="sc-label">to job-ready</span>
        </div>
        <div className="hero-stat-card">
          <span className="sc-big">100%</span>
          <span className="sc-label">project-first, no filler theory</span>
        </div>
        <div className="hero-stat-card">
          <span className="sc-big">3+ yrs</span>
          <span className="sc-label">
            real GenAI engineering experience behind the syllabus
          </span>
        </div>
      </div>

      <div className="hero-stat-card companies-row">
        <div className="mini-logos" aria-hidden="true">
          {companies.slice(0, 5).map((c) => (
            <span key={c.name} className="mini-logo">
              {c.mono}
            </span>
          ))}
        </div>
        <span className="companies-note">
          Curriculum covers RAG, LangGraph, CrewAI, and production MLOps
        </span>
      </div>
    </aside>
  );
}

export default function Hero() {
  return (
    <section className="fp-hero">
      <div className="fp-hero-inner fp-hero-grid">
        <div className="fp-hero-copy">
          <div className="fp-badge">
            <span className="fp-badge-chip">2026 COHORT</span>
            <span className="fp-badge-text">
              The Generative &amp; Agentic AI program employers hire from
            </span>
          </div>

          <h1 className="fp-hero-title">
            Master Generative AI, Agentic AI &amp; DSA
          </h1>

          <p className="fp-hero-subhead">
            From &ldquo;can you code&rdquo; to &ldquo;can you build with AI.&rdquo;
          </p>

          <p className="fp-hero-sub">
            Land the roles everyone&apos;s hiring for. Sharpen your DSA for the
            technical rounds, then go from prompts to production: build real LLM
            apps, RAG systems, and autonomous agents that plan, use tools, and
            ship. The exact skillset recruiters screen for — taught project-first
            and timed to your placement season.
          </p>

          <p className="fp-hero-meta">
            Trusted by 7M+ learners and 2,000+ colleges. Institutions: bring an
            industry-aligned Gen AI + Agentic AI track to your campus and lift
            your placement outcomes.
          </p>

          <div className="fp-hero-ctas">
            <a href="#pdf-offer" className="fp-btn fp-btn-primary">
              Get the free Gen AI + Agentic AI roadmap <Arrow />
            </a>
            <a href="#pdf-offer" className="fp-btn fp-btn-secondary">
              Partner your college
            </a>
          </div>

          <div className="fp-hero-links">
            <a href="#">
              Returning student? Log in <Arrow />
            </a>
            <span className="fp-dot">·</span>
            <a href="#curriculum">
              Explore the curriculum <Arrow />
            </a>
          </div>
        </div>

        <HeroPanel />
      </div>
    </section>
  );
}
