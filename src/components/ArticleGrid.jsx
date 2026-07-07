import ArticleCard from "./ArticleCard.jsx";
import { articles } from "../data/articles.js";

export default function ArticleGrid() {
  return (
    <section className="articles" id="articles">
      <div className="container">
        <div className="section-head">
          <h2>From the Codai.ai blog</h2>
          <p>Fig. 02–{String(articles.length + 1).padStart(2, "0")} · Supporting reads</p>
        </div>
        <div className="article-grid">
          {articles.map((article, i) => (
            <ArticleCard
              key={article.title}
              article={article}
              figure={String(i + 2).padStart(2, "0")}
            />
          ))}
        </div>
        <div className="articles-more">
          <a href="#" className="link-arrow">
            Browse all Codai.ai articles →
          </a>
        </div>
      </div>
    </section>
  );
}
