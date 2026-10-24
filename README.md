# WonderfulBing 的个人博客

使用 VitePress 1.6.4 稳定版与 Vue 搭建。文章使用 Markdown 编辑，发布到现有 GitHub Pages 地址：https://wonderfulbing.github.io/ 。

## 第一次使用

1. 将整个项目放到 `D:\Blogs\WonderfulBing.github.io`，在 VS Code 中打开这个文件夹。
2. 从 VS Code 菜单选择“终端 → 新建终端”。
3. 运行 `npm install`（首次使用需要下载依赖）。
4. 运行 `npm run dev`，打开终端显示的本地网址，通常是 http://127.0.0.1:5173/ 。
5. 按 Ctrl+C 停止预览。

需要 Node.js 20 或更新版本，建议 Node.js 22 LTS。安装 Node 后若 npm 无法识别，请重新打开 VS Code，再运行 `node -v` 和 `npm -v`。

## 写新文章

在项目终端运行：

```sh
npm run new -- "我的第一篇文章"
```

脚本会在 `docs/posts/` 创建 Markdown 文件，自动填入中国时区的日期。根据内容把顶部的 `category` 设置为 `MCNP学习`、`运动解剖学` 或 `其他`，再填写简介并写正文。`post: true` 表示加入首页和文章列表。保存后本地预览自动更新，文章也会自动进入对应主题页。

也可以直接新建 `.md` 文件：

```markdown
---
title: 我的文章
date: "2026-10-24"
category: MCNP学习
post: true
description: 一句话介绍这篇文章。
---

# 我的文章

<PostMeta />

这里是正文，可以使用 **加粗**、列表、代码块和图片。
```

把图片放入 `docs/public/images/`，在正文里使用 `![图片说明](/images/图片文件名.png)` 引用。

## 常用修改位置

| 想修改什么 | 文件 |
| --- | --- |
| 新文章 | docs/posts/ |
| 从 Hexo 迁来的文章 | docs/2022/ |
| 网站名称、导航、搜索、页脚 | docs/.vitepress/config.mts |
| 首页文案 | docs/.vitepress/theme/components/BlogHome.vue |
| 关于我 | docs/about.md |
| 颜色、字体、布局 | docs/.vitepress/theme/style.css |
| 网站图标 | docs/public/favicon.svg |
| 图片 | docs/public/images/ |

首页和文章列表自动收集 `post: true` 的文章，不需要手动添加链接。文章页带目录，右上角搜索会检索正文。文章列表的输入框只筛选标题和简介。

## 发布到 GitHub

项目已包含 `.github/workflows/deploy.yml`。在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。

从迁移分支创建的合并请求通过后，将其合并到 `main`。以后在本地保存文章，然后使用 VS Code 的源代码管理提交并同步，或在项目终端运行：

```sh
git add .
git commit -m "更新博客"
git push
```

每次推送到 `main` 后，GitHub Actions 会构建并发布网站。先在 Actions 页面确认部署成功。更新前可运行 `npm run build` 检查构建。

如果你使用的是下载的 ZIP，里面不含 Git 历史。建议发布迁移后，通过 `git clone https://github.com/WonderfulBing/WonderfulBing.github.io.git` 重新克隆到 D 盘的空目录，再运行 `npm install`。不要用 ZIP 初始化的新仓库强制覆盖远端历史。

## 旧文章迁移

原仓库是 Hexo 的生成结果，只有 HTML，没有 Markdown 原稿。本项目从现有 HTML 恢复了两篇文章：

- 2022-10-27《模拟电子技术基础笔记（一）》
- 2022-10-18《Hello World》（旧 Hexo 入门文章）

旧文章继续使用原来的日期路径，包含原网址的 `index.html`。正文、引用、代码及原文插图均已保留。修正了电子笔记中错误显示的文章标题与部分标题层级；未对知识内容做改写。

`migration/original/` 保存未经改动的原始 HTML。`migration/articles.json` 保存迁移清单，`migration/image-report.json` 保存图片恢复记录。共 45 处图片引用、44 张不同图片，全部已下载到 `docs/public/images/legacy/`。原始来源链接也保留在报告中。迁移脚本仅用于追溯，日常写作不需要运行。

如果保留了原 Hexo 项目的 Markdown，可以以后用原稿替换恢复稿；网页无法还原 Markdown 的原始空格和标记写法。
