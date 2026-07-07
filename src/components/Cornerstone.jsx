import ArticleCard from "./ArticleCard.jsx";
import { cornerstone } from "../data/articles.js";

export default function Cornerstone() {
  return (
    <section className="cornerstone" id="cornerstone">
      <div className="container">
        <div className="section-head">
          <h2>Start reading here</h2>
          <p>The pillar guide</p>
        </div>
        <ArticleCard article={cornerstone} featured />
      </div>
    </section>
  );
}
