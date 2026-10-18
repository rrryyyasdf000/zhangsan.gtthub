import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { articles } from "../shared/content";
import { applySeoTemplate, getSeoPage, robotsTxt, sitemapXml } from "../server/seo";

const outputDirectory = join(process.cwd(), "dist/public");
const publicOrigin = process.env.PUBLIC_SITE_URL;
if (!publicOrigin || !publicOrigin.startsWith("https://")) {
  throw new Error("PUBLIC_SITE_URL must be set to the public HTTPS origin used for GitHub Pages.");
}

const template = await readFile(join(outputDirectory, "index.html"), "utf8");
const routes = ["/", "/topics", "/archive", ...articles.map(article => `/articles/${article.slug}`)];

for (const route of routes) {
  const page = getSeoPage(route);
  const transformed = applySeoTemplate(template, route);
  const noscriptBlock = `<noscript>${page.body}</noscript>`;
  if (!transformed.html.includes(noscriptBlock)) {
    throw new Error(`Could not find SEO body placeholder for ${route}.`);
  }
  const html = transformed.html.replace(`<div id="root"></div>${noscriptBlock}`, `<div id="root">${page.body}</div>`);
  const relativePath = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  const destination = join(outputDirectory, relativePath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
  console.log(`Pre-rendered ${route} -> ${relativePath}`);
}

const notFound = getSeoPage("/404");
const notFoundHtml = applySeoTemplate(template, "/404").html
  .replace(`<div id="root"></div><noscript>${notFound.body}</noscript>`, `<div id="root">${notFound.body}</div>`);
await writeFile(join(outputDirectory, "404.html"), notFoundHtml, "utf8");
await writeFile(join(outputDirectory, "sitemap.xml"), sitemapXml(), "utf8");
await writeFile(join(outputDirectory, "robots.txt"), robotsTxt(), "utf8");
console.log("Generated 404.html, sitemap.xml, and robots.txt");
