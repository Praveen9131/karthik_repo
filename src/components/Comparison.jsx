import { comparison } from "../data/content.js";

export default function Comparison() {
  return (
    <section className="comparison" id="comparison">
      <div className="container">
        <div className="section-head">
          <h2>Not all AI programs are created equal</h2>
          <p>The usual route vs Codai.ai</p>
        </div>
        <div className="compare">
          <div className="compare-col compare-a">
            <h3>{comparison.a}</h3>
            <ul>
              {comparison.rows.map((r) => (
                <li key={r.label}>
                  <span className="compare-label">{r.label}</span>
                  <span className="compare-val">{r.a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="compare-col compare-b">
            <h3>{comparison.b}</h3>
            <ul>
              {comparison.rows.map((r) => (
                <li key={r.label}>
                  <span className="compare-label">{r.label}</span>
                  <span className="compare-val">
                    <span className="compare-tick" aria-hidden="true">
                      ✓
                    </span>
                    {r.b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
