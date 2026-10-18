import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { articles } from "@shared/content";
import { Footer, Header } from "@/components/SiteChrome";

type ArchiveMonth = { key: string; year: string; label: string; articles: typeof articles };

const monthFormatter = new Intl.DateTimeFormat("zh-CN", { month: "long" });

function buildArchive(): ArchiveMonth[] {
  const buckets = new Map<string, typeof articles>();
  articles.forEach(article => {
    const key = article.date.slice(0, 7);
    buckets.set(key, [...(buckets.get(key) ?? []), article]);
  });

  return [...buckets.entries()].sort(([a], [b]) => b.localeCompare(a)).map(([key, monthArticles]) => {
    const [year, month] = key.split("-");
    return {
      key,
      year,
      label: monthFormatter.format(new Date(Number(year), Number(month) - 1, 1)),
      articles: monthArticles.sort((a, b) => b.date.localeCompare(a.date)),
    };
  });
}

export default function Archive() {
  const archiveMonths = buildArchive();
  const currentYear = archiveMonths[0]?.year ?? "";

  return <div className="site-page archive-page"><Header /><main className="shell archive-main"><header className="archive-heading"><p className="eyebrow">内容归档</p><h1>从过去的判断，<br /><em>看见</em>持续的思考。</h1><p>一篇文章是一个时点上的回答。归档让它们在新的问题里，继续发挥作用。</p></header><div className="archive-index"><span>{currentYear}</span><ChevronDown size={18} /><span>共 {articles.length} 篇</span></div><div className="archive-list">{archiveMonths.map(month => <section className="archive-month" key={month.key}><div className="archive-month__label"><span>{month.label}</span><p>{month.year} 年 · {month.articles.length} 篇文章</p></div><div>{month.articles.map(article => <Link href={`/articles/${article.slug}`} className="archive-entry" key={article.slug}><span className="archive-entry__date">{article.date.slice(-2)}</span><div><p>{article.category} · {article.readTime}</p><h2>{article.title}</h2></div><ArrowRight size={19} /></Link>)}</div></section>)}</div></main><Footer /></div>;
}
