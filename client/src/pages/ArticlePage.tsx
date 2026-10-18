import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, Share2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { articles, getArticle, media, type ContentBlock } from "@shared/content";
import { Footer, Header } from "@/components/SiteChrome";
import NewsletterForm from "@/components/NewsletterForm";
import NotFound from "./NotFound";

export default function ArticlePage() {
  const [, params] = useRoute("/articles/:slug");
  const article = getArticle(params?.slug);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title}｜NORTHLINE INSIGHTS`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", `${article.dek} 阅读 NORTHLINE INSIGHTS，了解内容系统、搜索体验与可持续增长的实践方法。`);
  }, [article]);

  if (!article) return <NotFound />;
  const related = articles.filter(item => item.slug !== article.slug && item.category === article.category).slice(0, 2);

  return (
    <div className="site-page article-page">
      <Header />
      <main>
        <article>
          <header className="article-header shell">
            <Link href="/" className="back-link"><ArrowLeft size={17} />全部洞察</Link>
            <div className="article-header__grid">
              <div className="article-header__meta"><p className="eyebrow">{article.category}</p><p>{article.displayDate}<br />{article.readTime}</p></div>
              <div><h1>{article.title}</h1><p className="article-header__dek">{article.dek}</p></div>
            </div>
            <div className="article-author-row"><div className="author-identity"><span className="author-stamp">{article.author.slice(0, 1)}</span><span><b>{article.author}</b><small>{article.role}</small></span></div><button className="share-button" onClick={() => navigator.clipboard?.writeText(window.location.href)}><Share2 size={16} />复制链接</button></div>
          </header>

          <div className="article-hero shell"><div className={`article-hero__frame article-visual--${article.accent}`}>{article.cover ? <img src={article.cover} alt="" /> : <div className="article-hero__note"><p>{article.category.toUpperCase()}</p><b>{article.visualNote}</b><span>NORTHLINE INSIGHTS / {article.date.slice(0, 4)}</span></div>}</div></div>

          <div className="article-layout shell">
            <aside className="article-rail"><p>本文关键词</p>{article.tags.map(tag => <Link href={`/topics?tag=${encodeURIComponent(tag)}`} key={tag}>#{tag}</Link>)}</aside>
            <div className="article-body">{article.blocks.map((block, index) => <ContentBlockView key={index} block={block} cover={article.cover} />)}</div>
          </div>
        </article>

        <section className="article-subscribe"><div className="shell article-subscribe__inner"><div><p className="eyebrow eyebrow--gold">继续思考</p><h2>把下一篇值得读的，<br />直接送到你手中。</h2></div><NewsletterForm source={`article-${article.slug}`} /></div></section>

        {related.length > 0 && <section className="related shell"><div className="section-heading section-heading--split"><div><p className="eyebrow">继续阅读</p><h2>沿着这个问题，再走一步。</h2></div></div><div className="related-list">{related.map(item => <Link href={`/articles/${item.slug}`} key={item.slug}><span>{item.category}</span><b>{item.title}</b><ArrowUpRight size={20} /></Link>)}</div></section>}
      </main>
      <Footer />
    </div>
  );
}

function ContentBlockView({ block, cover }: { block: ContentBlock; cover?: string }) {
  if (block.type === "heading") return <h2>{block.text}</h2>;
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "quote") return <blockquote><span>“</span><p>{block.quote}</p><footer>{block.attribution}</footer></blockquote>;
  if (block.type === "image") return <figure><img src={block.src} alt={block.alt} /><figcaption>{block.caption}</figcaption></figure>;
  if (block.type === "video") return <section className="video-block"><div className="video-block__top"><span>视频观点</span><small>{block.duration}</small></div><video controls preload="metadata" poster={cover ?? media.hero} aria-label={block.title}><source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />你的浏览器不支持视频播放。</video><div className="video-block__label"><span className="play-mark"><Play size={16} fill="currentColor" /></span><div><h3>{block.title}</h3><p>{block.description}</p></div></div></section>;
  return <section className="chart-block"><p className="eyebrow">{block.eyebrow}</p><h3>{block.title}</h3><div className="chart-bars">{block.data.map(item => <div className="chart-row" key={item.label}><div><span>{item.label}</span><small>{item.note}</small></div><div className="chart-track"><span style={{ width: `${item.value}%` }} /></div><b>{item.value}</b></div>)}</div></section>;
}
