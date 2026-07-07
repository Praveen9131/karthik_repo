import { projects } from "../data/content.js";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-head">
          <h2>Build practically. Portfolio, not toy demos.</h2>
          <p>Flagship projects · Generative &amp; Agentic AI</p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <article key={p.title} className="project-card">
              <span className="project-kind">{p.kind}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
