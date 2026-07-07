import { useState } from "react";

const navLinks = [
  { label: "Generative AI", href: "#curriculum" },
  { label: "Agentic AI", href: "#curriculum" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Placements", href: "#track-dsa" },
  { label: "For Institutions", href: "#pdf-offer", caret: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fp-nav">
      <div className="fp-nav-inner">
        <a href="#" className="fp-brand" aria-label="codai home">
          <img src="/codai-logo.png" alt="codai" className="fp-logo-img" />
        </a>

        <div className="fp-nav-links">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="fp-nav-link">
              {item.label}
              {item.caret && <span className="fp-caret">⌄</span>}
            </a>
          ))}
        </div>

        <div className="fp-nav-actions">
          <a href="#" className="fp-nav-btn fp-nav-login">
            Log in
          </a>
          <a href="#" className="fp-nav-btn fp-nav-cta">
            Free AI Roadmap
          </a>
        </div>

        <button
          className="fp-nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="fp-nav-mobile">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="fp-nav-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <hr />
          <a href="#" className="fp-nav-link">
            Log in
          </a>
          <a href="#" className="fp-nav-btn fp-nav-cta" onClick={() => setOpen(false)}>
            Free AI Roadmap
          </a>
        </div>
      )}
    </nav>
  );
}
