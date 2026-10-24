<script setup>
import { data as posts } from '../posts.data'
import { withBase } from 'vitepress'
const categories = [
  { name: 'MCNP学习', description: '持续整理 MCNP 的基础知识、建模方法与学习记录。', link: '/categories/mcnp.html' },
  { name: '运动解剖学', description: '记录运动相关的人体结构、肌肉功能与动作分析。', link: '/categories/sports-anatomy.html' },
  { name: '其他', description: '收纳已有文章，以及 MCNP 之外的学习与建站记录。', link: '/categories/other.html' }
]
const countFor = (category) => posts.filter(post => post.category === category).length
</script>

<template>
  <div class="blog-shell">
    <section class="blog-hero">
      <div class="hero-copy">
        <p class="eyebrow">WONDERFULBING / 学习与记录</p>
        <h1>把学到的，<br>慢慢变成<span>自己的。</span></h1>
        <p class="hero-description">记录知识，也记录思考。<br>让每一次探索，都留下可以回望的痕迹。</p>
        <a class="quiet-link" :href="withBase('/posts/')">浏览全部文章 <span>↗</span></a>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="orbit"></div><div class="book"><span>NOTES</span><b>学而时习之</b><i>WonderfulBing</i></div><span class="art-caption">LEARN · THINK · WRITE</span></div>
    </section>
    <section class="topic-section">
      <div class="section-heading"><div><p class="eyebrow">TOPICS</p><h2>按主题阅读</h2></div></div>
      <div class="topic-grid">
        <a v-for="topic in categories" :key="topic.name" class="topic-card" :href="withBase(topic.link)">
          <span class="topic-count">{{ String(countFor(topic.name)).padStart(2, '0') }} 篇</span>
          <h3>{{ topic.name }}</h3>
          <p>{{ topic.description }}</p>
          <span class="topic-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
    <section class="recent-section">
      <div class="section-heading"><div><p class="eyebrow">THE JOURNAL</p><h2>最近写下的 <span>{{ String(posts.length).padStart(2, '0') }}</span></h2></div><a :href="withBase('/posts/')">全部文章 →</a></div>
      <a v-for="(post, index) in posts.slice(0, 5)" :key="post.url" class="journal-row" :href="withBase(post.url)">
        <span class="row-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="row-content"><div class="row-meta">{{ post.date }}<span>{{ post.category }}</span></div><h3>{{ post.title }}</h3><p>{{ post.description }}</p></div>
        <span class="row-arrow" aria-hidden="true">↗</span>
      </a>
      <p v-if="!posts.length" class="empty-state">第一篇记录，即将开始。</p>
    </section>
    <aside class="home-note"><span>✳</span><p>不必一次写得完美。<br><strong>让知识在记录中生长。</strong></p><a :href="withBase('/about.html')">关于这个小站 ↗</a></aside>
  </div>
</template>

