import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { media } from "@shared/content";
import NewsletterForm from "./NewsletterForm";

const basePath = import.meta.env.BASE_URL;
const navItems = [
  { href: `${basePath}topics`, route: "/topics", label: "主题" },
  { href: `${basePath}archive`, route: "/archive", label: "归档" },
  { href: `${basePath}#newsletter`, route: "", label: "订阅" },
];

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="NORTHLINE INSIGHTS 首页">
      <span className="brand-mark" aria-hidden="true"><img src={media.brandMark} alt="" /></span>
      <span>NORTHLINE<span className="wordmark-light">/</span>INSIGHTS</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Wordmark />
        <nav className={`main-nav ${open ? "main-nav--open" : ""}`} aria-label="主导航">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className={(location === item.route || (item.route === "/topics" && location.startsWith("/topics"))) ? "is-active" : ""} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a className="nav-arrow" href={`${basePath}#newsletter`} onClick={() => setOpen(false)} aria-label="订阅洞察"><ArrowUpRight size={18} /></a>
        </nav>
        <button className="menu-button" aria-label={open ? "关闭导航" : "打开导航"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="newsletter">
      <div className="shell footer-top">
        <div className="footer-copy">
          <p className="eyebrow eyebrow--gold">NORTHLINE LETTER</p>
          <h2>让下一次判断，<br />比这一次更清晰。</h2>
          <p>每月两次，拆解内容、搜索与增长系统里真正影响长期结果的选择。</p>
        </div>
        <NewsletterForm source="footer" />
      </div>
      <div className="shell footer-bottom">
        <Wordmark />
        <p>© 2026 NORTHLINE. 为愿意思考的增长团队而写。</p>
        <div className="footer-links"><Link href="/topics">主题</Link><Link href="/archive">归档</Link></div>
      </div>
    </footer>
  );
}
