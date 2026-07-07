import { faqs } from "../data/content.js";

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-head">
          <h2>Common questions</h2>
          <p>Students &amp; institutions</p>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                <span>{f.q}</span>
                <span className="faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
