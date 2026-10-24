---
title: VitePress 博客入门：修改主页、写文章和发布
date: "2026-10-24"
category: 使用指南
post: true
description: 在 VS Code 中修改主页、撰写 Markdown 文章、预览并发布博客的操作指南。
---

# VitePress 博客入门：修改主页、写文章和发布

<PostMeta />

这篇指南介绍如何编辑主页、写新文章、在电脑上预览，以及把更新发布到 GitHub Pages。

## 先打开博客并预览

在 VS Code 中选择“文件 → 打开文件夹”，打开 `D:\Blogs\WonderfulBing.github.io`。首次使用时，从菜单选择“终端 → 新建终端”，运行：

```sh
npm install
```

安装完成后启动本地预览：

```sh
npm run dev
```

打开终端显示的网址，通常是 `http://127.0.0.1:5173/`。保存文件后页面会自动更新；按 `Ctrl+C` 停止预览。

## 修改主页

主页的不同部分由不同文件管理：

| 要修改的内容 | 文件 |
| --- | --- |
| 首页大标题和介绍 | `docs/.vitepress/theme/components/BlogHome.vue` |
| 网站名称、导航和页脚 | `docs/.vitepress/config.mts` |
| 颜色、字体和页面布局 | `docs/.vitepress/theme/style.css` |
| 关于页面 | `docs/about.md` |
| 网站图标 | `docs/public/favicon.svg` |

在 VS Code 左侧展开文件夹，双击文件编辑。先找到对应的中文文字并替换，按 `Ctrl+S` 保存，再看本地预览效果。顶部菜单在 `config.mts` 的 `themeConfig.nav` 中调整；颜色和排版在 `style.css` 中调整。如果暂时不熟悉 CSS，可以先改标题和介绍文字。

## 写一篇新博客

在 VS Code 终端运行下面的命令，把引号里的文字换成你的文章标题：

```sh
npm run new -- "我的第一篇文章"
```

脚本会在 `docs/posts/` 新建一篇带日期的 Markdown 文件。编辑文件开头的文章信息：

```yaml
---
title: 我的第一篇文章
date: "2026-10-24"
category: 学习笔记
post: true
description: 用一句话介绍文章内容。
---
```

在文章信息下面写正文：

```markdown
# 我的第一篇文章

<PostMeta />

这里开始写正文。

## 一个小标题

可以写段落、列表和链接。
```

`post: true` 会让文章显示在首页和文章列表中。`title` 是标题，`category` 是分类，`description` 是简介。使用 `##`、`###` 添加小标题，文章页会自动生成目录。

Markdown 常用写法：

**粗体文字**

- 第一项
- 第二项

[链接文字](https://example.com)

### 添加图片

把图片放进 `docs/public/images/`，例如 `docs/public/images/my-photo.jpg`，然后在文章中引用：

```markdown
![图片说明](/images/my-photo.jpg)
```

## 预览和发布

运行 `npm run dev` 后检查首页、文章列表和新文章。发布时需要把修改推送到 GitHub 仓库的 `main` 分支，GitHub Actions 会自动构建并部署。推送后，在 GitHub 仓库的 **Actions** 页面查看部署任务；成功后网站会更新到 [wonderfulbing.github.io](https://wonderfulbing.github.io/)。

如果 VS Code 左侧“源代码管理”显示文件改动，可以填写提交说明并提交，再选择“同步更改”或“推送”。也可以在终端执行：

```sh
git add .
git commit -m "新增博客文章"
git push
```

### ZIP 解压目录的说明

ZIP 不包含 Git 历史和远端地址。如果“源代码管理”里没有仓库，当前目录无法直接推送。应先克隆 GitHub 仓库，再在克隆后的文件夹维护文章：

```sh
git clone https://github.com/WonderfulBing/WonderfulBing.github.io.git
```

克隆后用 VS Code 打开该文件夹，运行 `npm install` 和 `npm run dev`。首次迁移时，把 VitePress 文件放进克隆目录并保留 `.git` 文件夹；不要在 ZIP 目录中新建 Git 仓库后强行覆盖远端历史。

## 常用位置

- 新文章：`docs/posts/`
- 主页：`docs/.vitepress/theme/components/BlogHome.vue`
- 导航和网站配置：`docs/.vitepress/config.mts`
- 主题样式：`docs/.vitepress/theme/style.css`
- 图片：`docs/public/images/`
- 关于页面：`docs/about.md`

先在本地预览确认，再提交和推送，主页、文章和图片就会一起更新。

