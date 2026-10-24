import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'WonderfulBing',
  description: '记录学习，积累思考。WonderfulBing 的个人博客。',
  base: '/',
  cleanUrls: false,
  sitemap: { hostname: 'https://wonderfulbing.github.io' },
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'WonderfulBing',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/WonderfulBing' }],
    search: {
      provider: 'local',
      options: { locales: { root: { translations: {
        button: { buttonText: '搜索文章', buttonAriaLabel: '搜索文章' },
        modal: { noResultsText: '未找到相关内容', resetButtonTitle: '清空搜索', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
      } } } }
    },
    outline: { level: [2, 3], label: '文章目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    footer: { message: '记录学习，积累思考。', copyright: '© WonderfulBing' }
  }
})
