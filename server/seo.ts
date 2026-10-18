import { articles, getArticle, media } from "../shared/content";

type SeoPage = {
  title: string;
  description: string;
  type: "website" | "article";
  status: number;
  body: string;
  image?: string;
  structuredData?: Record<string, unknown>;
};

const siteName = "NORTHLINE INSIGHTS";
const defaultDescription = "NORTHLINE INSIGHTS 探索内容系统、搜索体验与品牌叙事，帮助增长团队把专业判断转化为长期有效的内容资产。";
const previewOrigin = "https://8328-ikblqn4pz5iwc3mh39e24-8d1d10b5.us5.manus.computer";

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#039;" })[character] ?? character);
}

function siteOrigin() {
  const candidate = (process.env.PUBLIC_SITE_URL || previewOrigin).replace(/\/$/, "");
  return candidate && /^https:\/\//.test(candidate) ? candidate : undefined;
}

function basePrefix() {
  const value = process.env.PUBLIC_BASE_PATH || "/";
  const cleaned = value.replace(/^\/+|\/+$/g, "");
  return cleaned ? `/${cleaned}` : "";
}

function sitePath(path: string) {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${basePrefix()}${suffix}` || "/";
}

function absoluteSiteUrl(path: string) {
  const origin = siteOrigin();
  return origin ? `${origin}${sitePath(path)}` : undefined;
}

function homeBody() {
  const articleLinks = articles
    .slice(0, 4)
    .map(article => `<li><a href="${sitePath(`/articles/${article.slug}`)}">${escapeHtml(article.title)}</a><p>${escapeHtml(article.dek)}</p></li>`)
    .join("");
  return `<main id="seo-content"><header><p>内容营销博客</p><h1>把值得被记住的判断，做成持续生长的内容。</h1><p>${escapeHtml(defaultDescription)}</p></header><section aria-labelledby="featured-heading"><h2 id="featured-heading">精选洞察</h2><ul>${articleLinks}</ul></section><nav aria-label="内容浏览"><a href="${sitePath("/topics")}">按主题浏览</a><a href="${sitePath("/archive")}">按时间归档</a></nav></main>`;
}

function articlePage(slug: string): SeoPage {
  const article = getArticle(slug);
  if (!article) return notFoundPage();

  const articleUrl = absoluteSiteUrl(`/articles/${article.slug}`);
  const imageUrl = siteOrigin() ? `${siteOrigin()}${article.cover || media.hero}` : undefined;
  const blocks = article.blocks.map(block => {
    if (block.type === "heading") return `<h2>${escapeHtml(block.text)}</h2>`;
    if (block.type === "quote") return `<blockquote><p>${escapeHtml(block.quote)}</p><footer>${escapeHtml(block.attribution)}</footer></blockquote>`;
    if (block.type === "image") return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}" /><figcaption>${escapeHtml(block.caption)}</figcaption></figure>`;
    if (block.type === "chart") return `<section><h2>${escapeHtml(block.title)}</h2><ul>${block.data.map(item => `<li>${escapeHtml(item.label)}：${escapeHtml(item.note)}（${item.value}%）</li>`).join("")}</ul></section>`;
    if (block.type === "video") return `<section><h2>${escapeHtml(block.title)}</h2><p>${escapeHtml(block.description)}（${escapeHtml(block.duration)}）</p></section>`;
    return `<p>${escapeHtml(block.text)}</p>`;
  }).join("");
  const body = `<main id="seo-content"><article><p>${escapeHtml(article.category)} · ${escapeHtml(article.readTime)}</p><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.dek)}</p><p>作者：${escapeHtml(article.author)}，${escapeHtml(article.role)}。发布于 <time datetime="${article.date}">${escapeHtml(article.displayDate)}</time>。</p>${blocks}<p>主题：${article.tags.map(tag => `<a href="${sitePath(`/topics?tag=${encodeURIComponent(tag)}`)}">${escapeHtml(tag)}</a>`).join("，")}</p></article></main>`;

  return {
    title: `${article.title}｜${siteName}`,
    description: `${article.dek} 阅读 NORTHLINE INSIGHTS，了解内容系统、搜索体验与可持续增长的实践方法。`,
    type: "article",
    status: 200,
    body,
    image: imageUrl,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.dek,
      datePublished: article.date,
      author: { "@type": "Person", name: article.author },
      publisher: { "@type": "Organization", name: siteName },
      ...(articleUrl ? { mainEntityOfPage: articleUrl, url: articleUrl } : {}),
      ...(imageUrl ? { image: imageUrl } : {}),
    },
  };
}

function archivePage(): SeoPage {
  const items = articles.map(article => `<li><time datetime="${article.date}">${escapeHtml(article.displayDate)}</time> <a href="${sitePath(`/articles/${article.slug}`)}">${escapeHtml(article.title)}</a></li>`).join("");
  return {
    title: `内容归档与历史洞察｜${siteName}`,
    description: "按年份和月份回看 NORTHLINE INSIGHTS 的内容系统、搜索体验和增长实践。",
    type: "website",
    status: 200,
    body: `<main id="seo-content"><header><p>内容归档</p><h1>从过去的判断，看见持续的思考。</h1></header><section><h2>全部文章</h2><ul>${items}</ul></section></main>`,
  };
}

function topicsPage(): SeoPage {
  const categories = [...new Set(articles.map(article => article.category))];
  return {
    title: `内容主题与增长方法｜${siteName}`,
    description: "浏览 NORTHLINE INSIGHTS 关于内容系统、搜索体验、品牌叙事与增长实践的深度文章。",
    type: "website",
    status: 200,
    body: `<main id="seo-content"><header><p>内容主题</p><h1>从问题出发，找到下一条值得阅读的线索。</h1></header><nav aria-label="主题分类">${categories.map(category => `<a href="${sitePath(`/?category=${encodeURIComponent(category)}`)}">${escapeHtml(category)}</a>`).join(" ")}</nav></main>`,
  };
}

function notFoundPage(): SeoPage {
  return {
    title: `未找到页面｜${siteName}`,
    description: "此页面不存在或已被移动。请返回 NORTHLINE INSIGHTS 浏览最新洞察。",
    type: "website",
    status: 404,
    body: `<main id="seo-content"><h1>页面未找到</h1><p>你访问的页面不存在或已被移动。</p><a href="${sitePath("/")}">返回首页</a></main>`,
  };
}

export function getSeoPage(pathname: string): SeoPage {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (path === "/") {
    return {
      title: `内容系统、搜索体验与增长洞察｜${siteName}`,
      description: defaultDescription,
      type: "website",
      status: 200,
      body: homeBody(),
      image: siteOrigin() ? `${siteOrigin()}${media.hero}` : undefined,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        description: defaultDescription,
        ...(absoluteSiteUrl("/") ? { url: absoluteSiteUrl("/") } : {}),
      },
    };
  }
  if (path.startsWith("/articles/")) return articlePage(path.split("/")[2] ?? "");
  if (path === "/archive") return archivePage();
  if (path === "/topics") return topicsPage();
  return notFoundPage();
}

export function applySeoTemplate(template: string, pathname: string) {
  const page = getSeoPage(pathname);
  const canonical = page.status === 200 ? absoluteSiteUrl(pathname.split("?")[0]) : undefined;
  const structuredData = page.structuredData ? `<script type="application/ld+json">${JSON.stringify(page.structuredData).replace(/</g, "\\u003c")}</script>` : "";
  const canonicalTags = canonical
    ? `<link rel="canonical" href="${escapeHtml(canonical)}" /><meta property="og:url" content="${escapeHtml(canonical)}" />`
    : "";
  const imageTags = page.image ? `<meta property="og:image" content="${escapeHtml(page.image)}" /><meta name="twitter:image" content="${escapeHtml(page.image)}" />` : "";
  const head = `<title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}" /><meta name="keywords" content="内容营销, SEO, 增长策略, 内容系统, 品牌叙事" /><meta property="og:type" content="${page.type}" /><meta property="og:title" content="${escapeHtml(page.title)}" /><meta property="og:description" content="${escapeHtml(page.description)}" /><meta property="og:site_name" content="${siteName}" />${canonicalTags}${imageTags}<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escapeHtml(page.title)}" /><meta name="twitter:description" content="${escapeHtml(page.description)}" />${structuredData}${page.status === 404 ? '<meta name="robots" content="noindex" />' : ""}`;
  const withoutDefaultMetadata = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+(?:name|property)="(?:description|keywords|og:[^"]+|twitter:[^"]+)"[^>]*\/?\s*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*\/?\s*>/gi, "")
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  const htmlWithSeo = withoutDefaultMetadata.replace(/<\/head>/i, `${head}</head>`);
  const html = htmlWithSeo.replace('<div id="root"></div>', `<div id="root"></div><noscript>${page.body}</noscript>`);
  return { html, status: page.status };
}

export function sitemapXml() {
  const routes = ["/", "/topics", "/archive", ...articles.map(article => `/articles/${article.slug}`)];
  const items = routes.map(route => `  <url><loc>${absoluteSiteUrl(route)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

export function robotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${absoluteSiteUrl("/sitemap.xml")}\n`;
}
