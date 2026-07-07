import { site } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="footer-logo" aria-label={`${site.name} home`}>
              <img src="/codai-logo-light.png" alt="codai" className="footer-logo-img" />
            </a>
            <p>{site.tagline}</p>
          </div>
          {site.footer.columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 {site.name} · est. {site.established}
          </span>
          <a href={site.footer.bottomCta.href} className="link-arrow light">
            {site.footer.bottomCta.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
