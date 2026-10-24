import DefaultTheme from 'vitepress/theme'
import BlogHome from './components/BlogHome.vue'
import BlogArchive from './components/BlogArchive.vue'
import CategoryArchive from './components/CategoryArchive.vue'
import ArchivedImage from './components/ArchivedImage.vue'
import PostMeta from './components/PostMeta.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogHome', BlogHome)
    app.component('BlogArchive', BlogArchive)
    app.component('CategoryArchive', CategoryArchive)
    app.component('ArchivedImage', ArchivedImage)
    app.component('PostMeta', PostMeta)
  }
}
