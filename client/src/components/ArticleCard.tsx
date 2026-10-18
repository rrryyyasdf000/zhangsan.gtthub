import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Article } from "@shared/content";

export default function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <article className="article-card">
      <Link href={`/articles/${article.slug}`} className={`article-visual article-visual--${article.accent}`} aria-label={`阅读：${article.title}`}>
        {article.cover ? (
          <img src={article.cover} alt="" />
        ) : (
          <div className="visual-composition" aria-hidden="true">
            <span className="visual-number">0{index + 1}</span>
            <span className="visual-ring" />
            <span className="visual-line visual-line--one" />
            <span className="visual-line visual-line--two" />
            <p>{article.visualNote}</p>
          </div>
        )}
      </Link>
      <div className="article-card__meta"><span>{article.category}</span><span>{article.readTime}</span></div>
      <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
      <p className="article-card__dek">{article.dek}</p>
      <div className="article-card__foot"><span>{article.displayDate}</span><Link href={`/articles/${article.slug}`} aria-label={`阅读 ${article.title}`}><ArrowUpRight size={19} /></Link></div>
    </article>
  );
}
