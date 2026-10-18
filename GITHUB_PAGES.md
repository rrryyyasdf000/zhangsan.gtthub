# GitHub Pages 部署

- 发布地址：<https://rrryyyasdf000.github.io/zhangsan.gtthub/>
- 源分支：`main`
- 自动发布：`.github/workflows/deploy-pages.yml` 在推送到 `main` 后构建并部署 `dist/public`。
- 构建命令：`pnpm install --frozen-lockfile` 后运行 `pnpm build:static`。
- 静态站点包含首页、主题、归档、各文章的预渲染 HTML、站点地图、robots 与 404 页面。
- 此 GitHub Pages 静态版不运行服务端或数据库，新闻订阅输入会禁用并显示提示；Manus 全栈项目中的订阅功能仍按原服务运行。
