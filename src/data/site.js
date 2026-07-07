// Single source of truth for branding — rename the brand here and it
// changes everywhere on the site.
export const site = {
  name: "Codai.ai",
  established: 2008,
  tagline:
    "India's employability partner for the AI era. 7M+ learners, 2,000+ college partners, and 18 years of placement training — now rebuilt around Generative AI and Agentic AI, the two skills every 2026 recruiter screens for first.",
  nav: [
    { label: "Generative AI", href: "#curriculum", active: true },
    { label: "Agentic AI", href: "#curriculum" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Placements", href: "#track-dsa" },
    { label: "For Institutions", href: "#pdf-offer" },
  ],
  login: { label: "Log in", href: "#" },
  primaryCta: { label: "Free AI Roadmap", href: "#pdf-offer" },
  stats: [
    { value: "7M+", label: "careers shaped" },
    { value: "2,000+", label: "campus partners" },
    { value: "18 yrs", label: "of placement training" },
    { value: "6 mo", label: "to Gen AI + Agentic AI job-ready" },
  ],
  footer: {
    columns: [
      {
        title: "Programs",
        links: [
          { label: "Generative AI", href: "#curriculum" },
          { label: "Agentic AI", href: "#curriculum" },
          { label: "Machine & Deep Learning", href: "#curriculum" },
          { label: "NLP & Transformers", href: "#curriculum" },
          { label: "DSA & Placement", href: "#track-dsa" },
        ],
      },
      {
        title: "For Students",
        links: [
          { label: "The 6-month curriculum", href: "#curriculum" },
          { label: "Placement prep", href: "#track-dsa" },
          { label: "Free AI roadmap", href: "#pdf-offer" },
          { label: "Articles", href: "#articles" },
        ],
      },
      {
        title: "For Institutions",
        links: [
          { label: "Partner with us", href: "#pdf-offer" },
          { label: "On-campus programs", href: "#pdf-offer" },
          { label: "Placement outcomes", href: "#pdf-offer" },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
    ],
    bottomCta: { label: "Free Gen AI + Agentic AI Roadmap →", href: "#pdf-offer" },
  },
};
