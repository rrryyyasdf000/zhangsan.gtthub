export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; quote: string; attribution: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "chart"; eyebrow: string; title: string; data: { label: string; value: number; note: string }[] }
  | { type: "video"; title: string; duration: string; description: string };

export type Article = {
  slug: string;
  category: string;
  tags: string[];
  title: string;
  dek: string;
  author: string;
  role: string;
  date: string;
  displayDate: string;
  readTime: string;
  featured?: boolean;
  cover?: string;
  visualNote: string;
  accent: "gold" | "charcoal" | "ink";
  blocks: ContentBlock[];
};

declare const __PUBLIC_BASE_PATH__: string;

function staticBasePath() {
  const configured = typeof __PUBLIC_BASE_PATH__ !== "undefined"
    ? __PUBLIC_BASE_PATH__
    : typeof process !== "undefined" ? process.env.PUBLIC_BASE_PATH || "/" : "/";
  return configured.endsWith("/") ? configured : `${configured}/`;
}

const staticAsset = (file: string) => `${staticBasePath()}${file}`;

export const media = {
  hero: staticAsset("media/hero.webp"),
  contentSystem: staticAsset("media/content-system.webp"),
  searchJourney: staticAsset("media/search-journey.webp"),
  brandMark: staticAsset("northline-mark.svg"),
};

export const articles: Article[] = [
  {
    slug: "content-systems-that-compound",
    category: "内容系统",
    tags: ["内容运营", "增长", "组织设计"],
    title: "让内容产生复利的，不是产量，而是系统",
    dek: "从选题、分发到复用，把一次判断变成可持续生长的内容资产。",
    author: "林嘉",
    role: "内容策略负责人",
    date: "2026-10-15",
    displayDate: "2026 年 10 月 15 日",
    readTime: "8 分钟阅读",
    featured: true,
    cover: media.contentSystem,
    visualNote: "内容不是一条流水线，而是一组彼此强化的信号。",
    accent: "gold",
    blocks: [
      { type: "paragraph", text: "大多数内容团队的瓶颈并不在写作能力，而在于每一篇文章都像一次从零开始的单点项目。选题没有被沉淀为问题库，读者反馈没有回到下一轮判断，真正有效的观点也没有被重新包装成可以抵达不同场景的资产。" },
      { type: "heading", text: "先定义你要重复回答的问题" },
      { type: "paragraph", text: "可持续的内容系统从一张问题地图开始：客户在评估前会问什么？团队内部反复需要解释什么？行业里有哪些问题正在被错误地回答？把这些问题按购买阶段、角色和证据强度排序，选题才会从灵感驱动变成有方向的投入。" },
      { type: "quote", quote: "内容策略的单位不是文章，而是一个被持续验证、持续被引用的判断。", attribution: "NORTHLINE 编辑部" },
      { type: "image", src: media.contentSystem, alt: "由深灰纸张与暗金线条组成的模块化纸雕结构", caption: "一套内容系统让同一个核心判断拥有多种抵达读者的方式。" },
      { type: "heading", text: "让复用成为创作流程的一部分" },
      { type: "paragraph", text: "在发布之前，就为一篇深度文章标记它可以拆出的图表、案例、框架、短观点和销售对话素材。这样做不是把内容切碎，而是根据读者的注意力与问题状态，为同一个观点设计不同的入口。" },
      { type: "chart", eyebrow: "内容资产结构", title: "一条核心洞察如何延展为多个触点", data: [{ label: "深度文章", value: 100, note: "建立完整论证" }, { label: "客户案例", value: 72, note: "补充真实证据" }, { label: "邮件洞察", value: 55, note: "形成低摩擦回访" }, { label: "销售素材", value: 38, note: "支持关键对话" }] },
      { type: "paragraph", text: "衡量系统是否运转，也不要只看单篇阅读量。更值得关注的是旧内容是否持续带来搜索访问，读者是否从一篇内容进入第二篇，订阅者是否愿意留下可用于后续沟通的真实信息。" },
    ],
  },
  {
    slug: "search-journeys-are-not-funnels",
    category: "搜索体验",
    tags: ["SEO", "用户旅程", "需求洞察"],
    title: "搜索旅程不是漏斗：如何为跳跃的需求设计内容",
    dek: "读者不会按你的栏目顺序了解问题。内容架构应当适应他们来回切换的判断方式。",
    author: "沈宁",
    role: "增长顾问",
    date: "2026-10-08",
    displayDate: "2026 年 10 月 8 日",
    readTime: "6 分钟阅读",
    featured: true,
    cover: media.searchJourney,
    visualNote: "读者从任何一个问题进入，也应当能找到下一步。",
    accent: "ink",
    blocks: [
      { type: "paragraph", text: "把用户旅程理解为线性漏斗，会让内容团队只为“下一步”写作。现实中，读者会在比较方案、寻找定义、验证风险和向同事解释之间来回跳转。一次搜索并不总是购买意图，却总在透露他们希望减少哪一种不确定性。" },
      { type: "image", src: media.searchJourney, alt: "深灰路径在象牙白纸面上汇入一个暗金色锚点", caption: "内容路径的作用不是强迫前进，而是降低下一次判断的成本。" },
      { type: "heading", text: "用相邻问题替代强制跳转" },
      { type: "paragraph", text: "比起在段尾放一个泛泛的“了解更多”，不如推荐读者此刻自然会产生的相邻问题。例如，在解释内容审计的方法后，链接到“哪些指标不值得追踪”；在比较渠道前，链接到“如何界定渠道的工作”。好的内链像编辑推荐，而不是转化机关。" },
      { type: "video", title: "编辑圆桌：理解非线性搜索意图", duration: "04:18", description: "视频模块可承载访谈、产品演示或客户观点，并与文字摘要、字幕和章节标记共同构成可索引的内容。" },
      { type: "quote", quote: "人们搜索的不是答案本身，而是一个足以继续行动的确定感。", attribution: "沈宁" },
    ],
  },
  {
    slug: "the-metric-is-memory",
    category: "品牌叙事",
    tags: ["品牌", "差异化", "内容运营"],
    title: "当所有人都在生产内容，真正的指标是被记住",
    dek: "建立辨识度，不靠更大声，而靠让观点、形式与读者的真实问题形成稳定连接。",
    author: "陆遥",
    role: "品牌主编",
    date: "2026-09-26",
    displayDate: "2026 年 9 月 26 日",
    readTime: "5 分钟阅读",
    featured: true,
    visualNote: "辨识度来自一次次一致的选择。",
    accent: "charcoal",
    blocks: [
      { type: "paragraph", text: "内容的可见度很重要，但仅有可见度并不会自动积累品牌。被读者记住的内容，往往同时拥有一套稳定的判断标准、一种可以被辨识的表达方式，以及一个明确知道自己服务谁的声音。" },
      { type: "heading", text: "从“说什么”延伸到“为什么是你说”" },
      { type: "paragraph", text: "不要把品牌表达理解为给每篇文章套相同的语气。更有价值的做法是持续回答几个只属于你的问题：你会反对行业里的哪种惯性？你愿意用什么证据改变看法？你会把什么复杂问题讲得更清楚？这些选择会在长期中形成记忆。" },
      { type: "quote", quote: "最有效的内容识别度，是读者在看见署名之前就能感到：这很像你们会提出的观点。", attribution: "陆遥" },
    ],
  },
  {
    slug: "distribution-is-product-design",
    category: "增长实践",
    tags: ["分发", "增长", "实验"],
    title: "把内容分发当作产品设计，而不是发布后的补救",
    dek: "当渠道、格式与受众问题在创作前被考虑，分发才有机会成为学习系统。",
    author: "许愿",
    role: "增长策略师",
    date: "2026-09-12",
    displayDate: "2026 年 9 月 12 日",
    readTime: "7 分钟阅读",
    visualNote: "在发布前，先想清楚内容将如何被打开。",
    accent: "gold",
    blocks: [
      { type: "paragraph", text: "分发常被留到文章发布之后，结果是团队只能把同一个链接推向所有渠道。更有效的方式是提前定义：这条内容在哪种情境下最有价值，读者会以什么问题打开它，又需要什么格式才能愿意保存或转发。" },
      { type: "chart", eyebrow: "分发设计", title: "每种渠道应承担不同的理解任务", data: [{ label: "搜索", value: 92, note: "回答明确问题" }, { label: "邮件", value: 76, note: "建立固定回访" }, { label: "社交片段", value: 48, note: "制造初步兴趣" }, { label: "客户对话", value: 63, note: "提供可信证据" }] },
      { type: "paragraph", text: "把每次分发当作一个假设：哪个标题能让正确的人停下？哪种切口最能让他们进入？测试的目的不是追逐短期点击，而是理解你正在吸引谁，以及他们之后会继续读什么。" },
    ],
  },
  {
    slug: "editorial-briefs-that-invite-expertise",
    category: "内容系统",
    tags: ["专家访谈", "流程", "内容运营"],
    title: "怎样的编辑 Brief，才能让专家愿意交出真知灼见",
    dek: "把“请分享观点”变成一套能减轻专家负担、提升内容密度的协作方式。",
    author: "林嘉",
    role: "内容策略负责人",
    date: "2026-08-29",
    displayDate: "2026 年 8 月 29 日",
    readTime: "4 分钟阅读",
    visualNote: "一个好的 Brief，是对对方时间与经验的尊重。",
    accent: "ink",
    blocks: [
      { type: "paragraph", text: "专家通常不缺经验，缺的是把经验转换成可分享内容的时间。优秀的编辑 Brief 应该说明读者是谁、他们已经知道什么、你真正想验证哪一个判断，以及访谈后会怎样处理材料。" },
      { type: "heading", text: "用问题拉出细节，而不是请求结论" },
      { type: "paragraph", text: "与其问“你怎么看趋势”，不如问“上一次你改变这个判断是什么时候，是什么证据让你改变？”这类问题会自然带来背景、取舍与案例，也能让内容避开千篇一律的专家语录。" },
    ],
  },
  {
    slug: "archive-a-point-of-view",
    category: "品牌叙事",
    tags: ["思想领导力", "编辑策略", "品牌"],
    title: "归档的价值：让观点有来处，也有去处",
    dek: "历史文章不是内容仓库。被组织得当的归档会把零散输出变成一条可追溯的思想线索。",
    author: "陆遥",
    role: "品牌主编",
    date: "2026-08-16",
    displayDate: "2026 年 8 月 16 日",
    readTime: "5 分钟阅读",
    visualNote: "长期主义，需要可以被回看的证据。",
    accent: "charcoal",
    blocks: [
      { type: "paragraph", text: "当读者能按时间、主题和问题重新找到过去的内容，归档就不再只是导航。它显示了一个团队如何思考、哪些观点被修正、哪些判断经受住了时间。这种可追溯性会让思想领导力更可信。" },
      { type: "quote", quote: "观点不是一次发布时成立，而是在被不断重新阅读、重新检验时成立。", attribution: "NORTHLINE 编辑部" },
    ],
  },
];

export const categories = ["全部", "内容系统", "搜索体验", "品牌叙事", "增长实践"];
export const tags = [...new Set(articles.flatMap(article => article.tags))];

export function getArticle(slug: string | undefined) {
  return articles.find((article) => article.slug === slug);
}

export function articlesForMonth(year: number, month: number) {
  return articles.filter((article) => {
    const [articleYear, articleMonth] = article.date.split("-").map(Number);
    return articleYear === year && articleMonth === month;
  });
}
