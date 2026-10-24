<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data'

const props = defineProps({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
})

const filtered = computed(() => posts.filter(post => post.category === props.category))
</script>

<template>
  <div class="blog-shell archive-shell">
    <p class="eyebrow">TOPIC / {{ category }}</p>
    <h1>{{ title }}</h1>
    <p class="archive-description">{{ description }}</p>
    <p class="results-label">共 {{ filtered.length }} 篇文章</p>
    <a v-for="post in filtered" :key="post.url" class="journal-row" :href="withBase(post.url)">
      <time class="archive-date">{{ post.date }}</time>
      <div class="row-content"><div class="row-meta">{{ post.category }}</div><h2>{{ post.title }}</h2><p>{{ post.description }}</p></div>
      <span class="row-arrow" aria-hidden="true">↗</span>
    </a>
    <p v-if="!filtered.length" class="empty-state">
      这里还没有文章。新建文章时，把顶部的 category 设为“{{ category }}”，保存后就会自动归到这里。
    </p>
    <a class="quiet-link topic-back" :href="withBase('/')">返回主页 <span>↗</span></a>
  </div>
</template>
