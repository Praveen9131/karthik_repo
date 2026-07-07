import { site } from "../data/site.js";
import CountUp from "./CountUp.jsx";

export default function StatStrip() {
  return (
    <section className="stats" aria-label="Codai.ai in numbers">
      <div className="container stats-inner">
        {site.stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>
              <CountUp value={s.value} />
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
