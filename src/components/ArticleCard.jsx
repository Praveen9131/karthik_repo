// Article card. Shows a real image when the article has one; otherwise it is
// a text-only card (no placeholder graphic).
export default function ArticleCard({ article, featured = false }) {
  const hasMedia = !!article.image;
  const cls = [
    "article-card",
    featured ? "featured" : "",
    hasMedia ? "" : "no-media",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={article.href} className={cls}>
      {hasMedia && (
        <img className="card-thumb" src={article.image} alt="" loading="lazy" />
      )}
      <div className="card-body">
        <span className="card-tag">{article.category}</span>
        {featured ? <h2>{article.title}</h2> : <h3>{article.title}</h3>}
        <p>{article.description}</p>
        <div className="card-meta">
          <span>{article.date}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
        {featured && <span className="card-cta">Read the full roadmap →</span>}
      </div>
    </a>
  );
}
