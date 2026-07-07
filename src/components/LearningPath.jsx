import { path } from "../data/tracks.js";

export default function LearningPath() {
  return (
    <section className="path" id="path">
      <div className="container">
        <div className="section-head">
          <h2>Six months to Gen AI &amp; Agentic AI job-ready</h2>
          <p>One track · Six months · Portfolio by placement season</p>
        </div>
        <ol className="path-list">
          {path.map((step, i) => (
            <li
              key={step.month}
              className={i === path.length - 1 ? "path-step final" : "path-step"}
            >
              <span className="path-month">{step.month}</span>
              <span className="path-label">{step.label}</span>
            </li>
          ))}
        </ol>
        <p className="path-note">
          DSA and aptitude run alongside every month — weekly sheets, not a
          separate season.
        </p>
      </div>
    </section>
  );
}
