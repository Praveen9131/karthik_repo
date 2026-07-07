import { personas } from "../data/content.js";

export default function Personas() {
  return (
    <section className="personas" id="personas">
      <div className="container">
        <div className="personas-intro">
          <p className="personas-eyebrow">Who is this for</p>
          <h2>Who actually signs up?</h2>
          <p className="personas-lead">
            Every batch looks different. Here&apos;s who we&apos;ve seen walk in
            — and walk out as hired AI engineers.
          </p>
        </div>
        <div className="persona-grid">
          {personas.map((p) => (
            <article key={p.title} className="persona-card">
              <span className={`persona-tag tag-${p.tag.toLowerCase()}`}>
                {p.tag}
              </span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
