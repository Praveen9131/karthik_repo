import { tracks } from "../data/tracks.js";

export default function Curriculum() {
  return (
    <section className="curriculum" id="curriculum">
      <div className="container">
        <div className="section-head">
          <h2>A Python-first curriculum that builds to Generative &amp; Agentic AI</h2>
          <p>Six courses · Fundamentals of Programming &amp; OOPs → DSA &amp; CP → Data Science → Gen AI → Agentic AI</p>
        </div>
        <div className="track-grid">
          {tracks.map((track) => (
            <article
              key={track.code}
              className="track-card"
              id={track.code === "02" ? "track-dsa" : undefined}
            >
              <div className="track-head">
                <span className="track-code">Course {track.code}</span>
              </div>
              <h3>{track.title}</h3>
              <p className="track-desc">{track.description}</p>
              <ul className="track-modules">
                {track.modules.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <div className="track-meta">
                <span>{track.duration}</span>
                <span>{track.projects}</span>
              </div>
              {track.href && (
                <a
                  className="track-more"
                  href={track.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View full syllabus →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
