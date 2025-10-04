---
title: 博客与攻略中心系统规划
---

# 博客与攻略中心系统规划

## 1. 当前站点状况

- 现有代码中已集成 Fumadocs 内容引擎，并在配置中声明 `content/blog`、`content/author`、`content/category` 目录以及博客组件，但目录当前为空，线上页面 `/blog` 仅展示「即将上线」的占位内容。
- `src/components/blog` 下已提供列表卡片、分类筛选、分页等组件，可直接复用；`src/app/[locale]/(marketing)/blog` 下尚未接入内容源。
- 用户体系基于 Drizzle ORM + Postgres，拥有 `user`、`session` 等表，为评论系统和编辑端鉴权奠定基础。

> 结论：站点已有基础博客框架，但缺少实际内容源、后台管理与互动功能，需要进一步完善信息架构与互动设计。

## 2. 项目目标

1. 打造围绕《数码宝贝时空异客》的官方内容枢纽，覆盖攻略、活动、版本动态及社区精选。
2. 支持玩家在文章详情页发表心得、提问与补充攻略，形成高质量互动社区。
3. 提供多语言扩展能力（至少中英双语），确保多地区玩家均可阅读与参与。
4. 落地可执行的编辑流程与内容发布管线，降低团队维护成本。

## 3. 信息架构

### 3.1 内容类型

- **资讯类**：官方公告、版本更新、活动预告。
- **攻略类**：数码兽养成、团队配队、PVE/PVP 策略、关卡分章攻略。
- **专栏类**：开发者日志、世界观翻译、战术深度解析、玩家访谈。
- **多媒体**：图集、短视频、组合技能演示（可内嵌 YouTube/BiliBili）。

### 3.2 分类与标签

- 一级分类建议包含「最新资讯」「PVE 攻略」「PVP 战术」「资源刷取」「社区精选」。
- 标签用于细分数码兽、阵营、主角章节、版本号、玩法关键词（例：`亚古兽`、`时空裂缝`、`v1.2.0`）。
- 分类面向导航与 SEO，标签面向站内搜索与相关推荐算法。

### 3.3 用户角色

- **游客**：浏览文章、阅读评论、通过社交链接分享。
- **注册玩家**：提交评论、点赞、收藏文章、关注作者。
- **作者/编辑**：撰写草稿、提交审核、管理评论。
- **管理员**：分配权限、发布文章、设定首页推荐位、封禁违规账号。

## 4. 内容模型设计

### 4.1 MDX Frontmatter 方案

```mdx
---
title: "究极体解锁全指南"
slug: "mega-evolution-complete-guide"
description: "逐章解析究极体解锁条件与素材分布"
date: "2024-08-18"
updated: "2024-09-02"
author: "kano"
categories:
  - "pve-guides"
tags:
  - "亚古兽"
  - "究极体"
  - "进化素材"
hero:
  src: "/images/blog/mega-evolution.jpg"
  alt: "究极体演化"
readingTime: 8
locale: ["zh", "en"]
featured: true
series: "时空裂缝篇"
---
```

- `readingTime` 用于列表展示阅读时长；`series` 支持多篇连载内容；`locale` 控制多语言页面。
- 富文本正文可使用组件（如技能表、数据比对表）提升攻略可读性。

### 4.2 数据库表（Drizzle）

| 表名 | 关键字段 | 说明 |
| ---- | -------- | ---- |
| `blog_posts` | `id`, `slug`, `title`, `status`, `locale`, `published_at`, `updated_at` | 文章主表，`status` 包含 draft/review/published/archived |
| `blog_post_meta` | `post_id`, `category`, `tags`, `reading_time`, `hero_src`, `hero_alt` | 存储结构化属性，可与 MDX 同步或改为 JSONB |
| `blog_comments` | `id`, `post_id`, `user_id`, `parent_id`, `content`, `status`, `created_at` | 评论树结构，`status` 用于审核（pending/approved/rejected） |
| `blog_comment_reactions` | `comment_id`, `user_id`, `reaction` | 点赞/踩/表情等互动 |
| `blog_bookmarks` | `user_id`, `post_id`, `created_at` | 收藏功能，便于生成「我的收藏」页面 |
| `blog_post_views` | `post_id`, `date`, `views` | 聚合每日浏览量，供热门文章排序 |

> 建议通过 drizzle-kit 生成迁移，并在 CI 中自动执行 `pnpm drizzle-kit push`。

## 5. 页面与交互设计

### 5.1 路由结构

- `/blog`：主页，展示顶部焦点位、分类筛选、分页列表。
- `/blog/page/[page]`：分页路由，复用主页布局。
- `/blog/category/[slug]`：分类页，支持多语言 slug 映射。
- `/blog/[...slug]`：文章详情，支持多层路径（如 `/blog/guides/pve/mega-evolution`）。
- `/blog/series/[slug]`：可选，聚合同一系列文章。

### 5.2 主页模块建议

- **Hero Banner**：最新版本攻略或专题活动。
- **分类导航条**：针对 PC/移动端分别提供横向 Tab 与折叠面板。
- **热门推荐**：依据收藏数 + 浏览数排序，支持「近期热门 / 长期热门」切换。
- **社区精选**：引用评论数据，展示精彩讨论片段并链接到原文。
- **订阅引导**：保留现有「订阅更新」模块，可整合到侧边栏。

### 5.3 文章详情页

- 标题、作者、发布时间、阅读时长、分类标签区。
- 顶部 `Sticky` 目录（TOC），便于长篇攻略导航。
- 攻略元素模块：技能表格、敌方弱点图标、相关数码兽卡片。
- 底部互动：点赞、收藏、分享（Twitter、微博、Discord、QQ 频道）、相关推荐（同分类 + 最近更新）。
- 评论区支持树形回复、过滤（最新 / 最热 / 官方精选）、作者徽章。

### 5.4 评论体验

- 未登录点击「发表评论」时弹出登录模态，支持邮箱 + OAuth。
- 输入框支持 Markdown 精简语法、@提及、插入阵容图片（上传或选择数据库中角色）。
- 提交后进入 `pending` 状态，管理员审核后公开；可对可信用户启用自动通过。
- 违规举报按钮，触发后台通知并记录处理状态。

## 6. 权限与流程

| 角色 | 能力 |
| ---- | ---- |
| 管理员 | 审核/发布文章、管理分类、设置焦点位、批量处理评论、设定推荐算法权重 |
| 编辑 | 创建草稿、上传媒体、提交审核、回复评论（带官方标记） |
| 特邀作者 | 限定分类投稿，可申请专题位 |
| 玩家 | 评论、点赞、收藏、订阅、编辑个人资料 |

### 内容发布流

1. 作者在本地撰写 MDX（或通过 CMS 界面编辑），提交 PR。
2. CI 执行 lint、预览构建，预览链接供编辑检查格式和断链。
3. 通过后触发 `pnpm run content:sync`（待实现），将 Frontmatter 同步到 `blog_posts` 表，便于统计与推荐。
4. 发布后通知订阅者（邮件 / Discord / RSS）。

## 7. 评论系统技术方案

- **后端**：在 `/api/blog/comments` 下新增 RESTful 接口，包含 `GET /:postId`、`POST`、`PATCH/:id/status`、`DELETE/:id`。
- **鉴权**：复用现有会话中间件，未登录请求返回 `401`；管理员操作需额外角色校验。
- **防刷机制**：
  - 速率限制（per IP + per 用户），支持 Cloudflare Turnstile 或 hCaptcha。
  - 内容过滤：集成敏感词审查 + 简易 Markdown 白名单转义。
  - 评论深度限制（建议 3 层）。
- **缓存策略**：详情页初次 SSR 时从数据库读取评论，之后使用 SWR 轮询或 WebSocket 推送（可选）。
- **通知**：被 @ 的用户触发站内通知 + 邮件（可延后实现）。

## 8. 推荐与数据面板

- 聚合 `blog_post_views` 与 `blog_bookmarks` 生成排行榜，为首页热门模块提供数据。
- 在管理后台展示：PV、UV、平均阅读时长（可与 GA4 数据交叉）；评论审核队列；用户举报列表。
- 预留「攻略热度」评分：浏览量 40%，收藏 40%，评论互动 20%。

## 9. 多语言策略

- 文章文件夹按语言划分：`content/blog/zh/...`、`content/blog/en/...`，借助 Fumadocs 的 `locale` 前缀生成本地化路由。
- 分类、标签、作者使用 `messages/*.json` 或单独的本地化文件维护映射。
- 评论暂以原文展示，可选启用自动翻译（与 DeepL API 等集成）作为增量需求。

## 10. 实施路线图

| 阶段 | 时间 | 重点 |
| ---- | ---- | ---- |
| Phase 0 | 1 周 | 清空占位文案，接入 MDX 列表、完善前端分页与分类组件 |
| Phase 1 | 2 周 | 建立内容模型、编写首批 10 篇攻略、完成多语言支持与基础 SEO |
| Phase 2 | 2 周 | 实现评论 API、前端评论区、管理端审核流、速率限制 |
| Phase 3 | 1 周 | 上线收藏/推荐、热门模块、首页 Hero 运营位 |
| Phase 4 | 持续 | 扩展系列化内容、作者体系、数据看板、自动化通知 |

## 11. 后续建议

- 选型 Headless CMS（如 Contentlayer + Git、Hygraph、Strapi）以便非技术成员编辑，并保留 MDX 回退方案。
- 考虑引入搜索服务（Algolia、Meilisearch）提供全文检索与标签联想，提高玩法攻略的可发现性。
- 与 Discord 或 QQ 频道打通，将精选讨论同步到博客评论区，扩大社区触达。
- 定期回顾评论数据与举报处理时效，以调整自动化安全策略。

## 12. 环境与基础设施准备清单

### 现有能力

- **Next.js + App Router**：已具备 SSR/ISR 能力，足以支撑博客首页、分类页、详情页的多语言渲染。
- **Fumadocs 内容引擎**：配置了 `content/blog` 等目录，可直接消费 MDX Frontmatter，适合首版内容发布。
- **Drizzle + Postgres**：数据库层已经通过 `DATABASE_URL` 接入配置和迁移体系，可承载评论、收藏等结构化数据。
- **Better Auth**：现有用户体系支撑评论登录、权限校验、管理员后台。
- **Cloudflare R2/S3 接口**：`env.example` 中已预留对象存储配置，可用于上传封面与攻略插图。
- **Turnstile Captcha、Resend、Discord Webhook**：环境变量全部预留，为后续风控、邮件和社区通知打好基础。

### 仍需补齐的项

- **填写环境变量**：在 `.env.local` 中补齐 `DATABASE_URL`、`BETTER_AUTH_SECRET`、社交登录与对象存储密钥，保证评论与多媒体上传可用。
- **数据库迁移**：按照内容模型新增 `blog_posts`、`blog_comments` 等表并运行 `pnpm drizzle-kit generate && pnpm drizzle-kit push`。
- **存储策略**：确定封面与用户上传图片的存储桶，配置 `STORAGE_*` 变量并在 Next.js 中开放访问域名。
- **邮件与通知**：若启用评论审核或订阅提醒，需要在 Resend 或 Discord 中创建密钥并填入 `RESEND_API_KEY`、`DISCORD_WEBHOOK_URL`。
- **安全风控**：开启 Turnstile（或其他验证码），并在评论 API 中集成速率限制依赖（如 `@upstash/ratelimit`）。
- **监控与日志**：为评论 API 配置日志管线（Logflare、Axiom 等）与错误告警，确保上线后可快速排查问题。

### 推荐启动顺序

1. **准备本地环境**：复制 `env.example` 为 `.env.local`，补齐数据库、Auth、存储等关键变量。
2. **初始化数据库**：使用 Neon/Supabase 等托管 Postgres，配置好 `DATABASE_URL`，执行现有迁移再补充博客相关迁移。
3. **联通对象存储**：创建 R2 bucket，配置访问密钥与 `STORAGE_PUBLIC_URL`，验证图片上传/读取链路。
4. **配置鉴权与安全**：启用 Turnstile/登录方式，验证登录-评论提交流程。
5. **布署监控**：接入 GA4、日志和错误监控（Sentry/Axiom），为后续内容运营提供数据支持。

完成上述准备后，即可开始实现评论 API、内容同步任务以及前端交互模块。

## 13. 一日上线 MVP 方案

### 核心功能范围

- **文章展示**：沿用 MDX 文件（`content/blog/[category]/post.mdx`）存储文章，Frontmatter 仅保留 `title`、`slug`、`date`、`author`、`category`、`hero`、`published` 等最小字段。
- **专栏分类**：使用 `category` 字段映射到「攻略」「活动」「社区精选」三大主题，博客首页按分类分区展示即可满足「专栏功能」。
- **评论/留言**：开放文章详情页评论区，任何登录用户可发言；未登录提示一键登录（可先仅支持邮箱登录）。管理员在数据库手动检查 `approved` 字段即完成审核。

### 技术实现要点

- **页面层**：
  - `/blog`：调用现有 `BlogGrid` 组件，按 `category` 分栏渲染；若文章不足可先用「最新发布」+「按分类筛选」两块布局。
  - `/blog/[slug]`：在 MDX 页面底部引入评论表单与列表组件，使用 SWR 拉取/提交数据。
- **数据层**：新增单表 `blog_comments`：

  | 字段 | 类型 | 说明 |
  | ---- | ---- | ---- |
  | `id` | uuid | 主键 |
  | `post_slug` | text | 文章 slug，建立索引 |
  | `user_id` | text | 关联现有 `user.id`，未登录用户暂不支持 |
  | `display_name` | text | 评论显示名，从用户资料读取 |
  | `content` | text | Markdown/纯文本内容 |
  | `approved` | boolean | 默认 `true`，若需人工审核可改为 `false` |
  | `created_at` | timestamp | 默认 `now()` |

- **API**：在 `src/app/api/blog/comments/[slug]/route.ts` 下实现 `GET` / `POST`：
  - `GET`：`SELECT * FROM blog_comments WHERE post_slug=$slug AND approved=true ORDER BY created_at DESC`。
  - `POST`：校验登录态、长度限制（≤1000 字），写入数据库后返回新记录；可选调用 Turnstile 校验。
- **前端评论组件**：使用 `react-hook-form` + `zod` 简化校验，提交后乐观更新列表。失败时给出通用错误提示。

### 一天交付步骤建议

1. **准备数据**：创建 3 篇示例文章（攻略、活动、社区精选），放置于 `content/blog/zh/...`。
2. **接入列表页**：调整 `/blog` 页面读取 `blogSource.getPages`，渲染分类分区与最近更新。
3. **实现详情页布局**：在文章模板中加入作者信息、上一篇/下一篇占位、评论区挂钩。
4. **搭建评论 API + 数据表**：生成 `blog_comments` 迁移，编写 API Route 并连通 Drizzle。
5. **完成评论组件**：实现表单、列表、加载状态，保证提交后即时刷新。
6. **发布前检查**：手动补齐 `.env.local`，运行 `pnpm lint && pnpm test`（若有），部署至预览环境验证。

### 权宜取舍

- 暂不做评论通知、收藏、推荐算法，改为后续版本迭代。
- 若时间紧，可将登录限定为邮箱 OTP 或魔法链接，暂不整合 OAuth。
- 若后端实现风险较大，可临时接入 `Giscus`（GitHub Issues 驱动）作为评论区，待有空再切换到自建 API。

---

该规划为首版设计草案，可在实现过程中根据内容团队与玩家反馈迭代细节。
