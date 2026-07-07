import { steps } from "../data/content.js";

export default function Admissions() {
  return (
    <section className="admissions" id="admissions">
      <div className="container">
        <div className="section-head">
          <h2>How to get in</h2>
          <p>Applications are free · Barely takes 2 minutes</p>
        </div>
        <div className="step-grid">
          {steps.map((s) => (
            <article key={s.n} className="step-card">
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
