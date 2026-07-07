import { companies } from "../data/companies.js";

function Logo({ name, mono }) {
  return (
    <div className="logo-item" title={name}>
      <span className="logo-mono" aria-hidden="true">
        {mono}
      </span>
      <span className="logo-name">{name}</span>
    </div>
  );
}

export default function LogoMarquee() {
  // Duplicate the list so the marquee loops seamlessly.
  const row = [...companies, ...companies];
  return (
    <section className="logo-marquee" aria-label="Where our learners get hired">
      <p className="logo-marquee-eyebrow">Where our learners get hired</p>
      <div className="logo-track-wrap">
        <div className="logo-track">
          {row.map((c, i) => (
            <Logo key={`${c.name}-${i}`} name={c.name} mono={c.mono} />
          ))}
        </div>
      </div>
    </section>
  );
}
