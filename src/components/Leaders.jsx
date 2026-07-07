import { leaders } from "../data/leaders.js";

// Turns a tag like "AI for Science" into a stable class suffix so each
// tag can carry its own accent: tag-ai-for-science.
const tagClass = (tag) =>
  "tag-" +
  tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function LeaderCard({ p }) {
  return (
    <article className="leader-card">
      <div className="leader-top">
        <div className="leader-photo">
          {p.image ? (
            <img src={p.image} alt={p.name} loading="lazy" />
          ) : (
            <span className="leader-monogram" aria-hidden="true">
              {initials(p.name)}
            </span>
          )}
        </div>
        <div className="leader-id">
          <h3>{p.name}</h3>
          <p className="leader-role">
            {p.org} · {p.role}
          </p>
        </div>
      </div>
      <span className={`leader-tag ${tagClass(p.tag)}`}>{p.tag}</span>
      <p className="leader-news">{p.news}</p>
      <span className="leader-when">{p.when}</span>
    </article>
  );
}

export default function Leaders() {
  // Duplicate the list so the single-row marquee loops seamlessly.
  const row = [...leaders, ...leaders];
  return (
    <section className="leaders" id="leaders">
      <div className="container">
        <div className="section-head">
          <h2>What AI leaders are saying in 2026</h2>
        </div>
      </div>
      <div className="leader-track-wrap">
        <div className="leader-track">
          {row.map((p, i) => (
            <LeaderCard key={`${p.slug}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
