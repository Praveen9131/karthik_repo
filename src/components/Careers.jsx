import { roles } from "../data/content.js";

export default function Careers() {
  return (
    <section className="careers" id="careers">
      <div className="container">
        <div className="section-head">
          <h2>Careers you&apos;ll be ready for</h2>
          <p>The roles hiring for Gen AI &amp; Agentic AI skills</p>
        </div>
        <div className="role-grid">
          {roles.map((r) => (
            <article key={r.title} className="role-card">
              <h3>{r.title}</h3>
              <p>{r.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
