import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { articles, categories, tags } from "@shared/content";
import ArticleCard from "@/components/ArticleCard";
import { Footer, Header } from "@/components/SiteChrome";

export default function Topics() {
  const initialTag = new URLSearchParams(window.location.search).get("tag");
  const [selected, setSelected] = useState(initialTag && tags.includes(initialTag) ? initialTag : "全部");
  const results = useMemo(() => selected === "全部" ? articles : articles.filter(article => article.category === selected || article.tags.includes(selected)), [selected]);
  return <div className="site-page topics-page"><Header /><main><section className="topics-hero shell"><p className="eyebrow">内容主题</p><h1>从问题出发，找到下一条<br /><em>值得阅读的</em>线索。</h1><p>这些主题不是栏目边界，而是团队在长期增长中反复需要处理的问题。</p></section><section className="topics-directory shell"><div className="topic-menu"><p>按栏目</p>{categories.map(item => <button key={item} className={selected === item ? "selected" : ""} onClick={() => setSelected(item)}>{item}<span>{item === "全部" ? articles.length : articles.filter(article => article.category === item).length}</span></button>)}<p className="topic-menu__label">按标签</p>{tags.map(item => <button key={item} className={selected === item ? "selected" : ""} onClick={() => setSelected(item)}>#{item}<span>{articles.filter(article => article.tags.includes(item)).length}</span></button>)}</div><div className="topic-results"><div className="topic-results__heading"><p className="eyebrow">{selected === "全部" ? "全部洞察" : selected}</p><span>{results.length} 篇文章</span></div><div className="article-grid article-grid--topics">{results.map((article, index) => <ArticleCard article={article} index={index} key={article.slug} />)}</div>{results.length === 0 && <div className="empty-state">暂时还没有相关内容。<Link href="/">回到全部文章 <ArrowRight size={16} /></Link></div>}</div></section></main><Footer /></div>;
}
