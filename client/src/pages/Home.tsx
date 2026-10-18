import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { articles, categories, media, tags } from "@shared/content";
import { Header, Footer } from "@/components/SiteChrome";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  const featured = articles.filter(article => article.featured);
  const search = new URLSearchParams(window.location.search);
  const initialCategory = search.get("category");
  const initialTag = search.get("tag");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [category, setCategory] = useState(initialCategory && categories.includes(initialCategory) ? initialCategory : "全部");
  const [activeTag, setActiveTag] = useState(initialTag && tags.includes(initialTag) ? initialTag : "全部");
  const activeFeatured = featured[featuredIndex];
  const filteredArticles = useMemo(() => articles.filter(article => {
    const categoryMatches = category === "全部" || article.category === category;
    const tagMatches = activeTag === "全部" || article.tags.includes(activeTag);
    return categoryMatches && tagMatches;
  }), [category, activeTag]);

  function goTo(index: number) {
    setFeaturedIndex((index + featured.length) % featured.length);
  }

  return (
    <div className="site-page">
      <Header />
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">独立观点，长期主义</p>
            <h1>把值得被记住的判断，<em>做成</em>持续生长的内容。</h1>
            <p className="hero-dek">NORTHLINE INSIGHTS 为愿意思考的增长团队，拆解内容、搜索与品牌之间真正有用的联系。</p>
            <a className="text-link" href="#latest">浏览最新洞察 <ArrowDownMark /></a>
          </div>
          <div className="hero-art" aria-label="由纸张、线条与暗金色组成的抽象编辑插图" role="img">
            <img src={media.hero} alt="" />
            <span className="hero-art__caption">VOL. 01 — CONTENT AS AN ASSET</span>
          </div>
        </section>

        <section className="featured-section shell" aria-labelledby="featured-title">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">编辑精选</p><h2 id="featured-title">现在，值得花时间读的。</h2></div>
            <div className="carousel-controls" aria-label="精选文章切换">
              <span>{String(featuredIndex + 1).padStart(2, "0")} <i /> {String(featured.length).padStart(2, "0")}</span>
              <button onClick={() => goTo(featuredIndex - 1)} aria-label="上一篇精选文章"><ArrowLeft size={19} /></button>
              <button onClick={() => goTo(featuredIndex + 1)} aria-label="下一篇精选文章"><ArrowRight size={19} /></button>
            </div>
          </div>
          <article className="featured-story">
            <div className="featured-story__visual">
              {activeFeatured.cover ? <img src={activeFeatured.cover} alt="" /> : <div className="feature-fallback"><span>NOTE / {String(featuredIndex + 1).padStart(2, "0")}</span><b>{activeFeatured.visualNote}</b></div>}
            </div>
            <div className="featured-story__copy">
              <p className="article-card__meta"><span>{activeFeatured.category}</span><span>{activeFeatured.readTime}</span></p>
              <h3>{activeFeatured.title}</h3>
              <p>{activeFeatured.dek}</p>
              <Link className="round-link" href={`/articles/${activeFeatured.slug}`}>阅读文章 <ArrowUpRight size={18} /></Link>
              <div className="featured-author"><span className="author-stamp">{activeFeatured.author.slice(0, 1)}</span><span><b>{activeFeatured.author}</b><small>{activeFeatured.role}</small></span></div>
            </div>
          </article>
        </section>

        <section className="latest-section" id="latest">
          <div className="shell">
            <div className="section-heading section-heading--split"><div><p className="eyebrow">最新发布</p><h2>从一个好问题开始。</h2></div><p className="section-aside">让内容成为一种持续被检验、被回看的专业表达。</p></div>
            <div className="filter-bar" aria-label="文章筛选">
              <div className="filter-group"><span>栏目</span>{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={category === item ? "selected" : ""} aria-pressed={category === item}>{item}</button>)}</div>
              <div className="filter-group filter-group--tags"><span>标签</span><button onClick={() => setActiveTag("全部")} className={activeTag === "全部" ? "selected" : ""} aria-pressed={activeTag === "全部"}>全部</button>{tags.map(item => <button key={item} onClick={() => setActiveTag(item)} className={activeTag === item ? "selected" : ""} aria-pressed={activeTag === item}>#{item}</button>)}</div>
            </div>
            <div className="article-grid">
              {filteredArticles.length > 0 ? filteredArticles.map((article, index) => <ArticleCard article={article} index={index} key={article.slug} />) : <p className="empty-state">尚未找到同时匹配这些条件的文章。试试清除筛选条件。</p>}
            </div>
          </div>
        </section>

        <section className="archive-strip shell">
          <div><p className="eyebrow">从过去的判断中，找到新的线索</p><h2>观点有来处，<br />也该有去处。</h2></div>
          <div className="archive-strip__action"><p>所有文章按时间和主题持续编排。回到曾经的问题，也许会得到新的答案。</p><Link className="text-link" href="/archive">浏览内容归档 <ArrowRight size={18} /></Link></div>
        </section>

        <section className="mid-newsletter"><div className="shell mid-newsletter__inner"><div><p className="eyebrow eyebrow--gold">NORTHLINE LETTER</p><h2>少一点噪音，<br />多一点能带走的判断。</h2></div><NewsletterForm source="home" compact /></div></section>
      </main>
      <Footer />
    </div>
  );
}

function ArrowDownMark() { return <ChevronDown size={17} strokeWidth={1.6} />; }
