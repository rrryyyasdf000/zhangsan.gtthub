import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Footer, Header } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <div className="site-page">
      <Header />
      <main className="notfound shell">
        <div className="notfound-inner">
          <p className="eyebrow">404 / NOT FOUND</p>
          <h1>这条线索，<br />暂时断开了。</h1>
          <p>你访问的页面不存在，或已被移动。回到首页，继续从一个好问题开始。</p>
          <Link className="text-link" href="/"><ArrowLeft size={17} />返回首页</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
