# NORTHLINE INSIGHTS

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The manuscript image assets used by the blog are checked into `client/public/media` so they work on both Manus and static hosting.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.

## GitHub Pages

The static site is deployed at <https://rrryyyasdf000.github.io/zhangsan.gtthub/>. A push to `main` runs `.github/workflows/deploy-pages.yml`; the build creates per-page HTML, a sitemap, robots rules and a 404 page. GitHub Pages does not run the app server or database, so the static deployment disables newsletter capture and displays a notice. The Manus full-stack deployment retains the original subscription API.

See [GITHUB_PAGES.md](GITHUB_PAGES.md) for deployment details.
