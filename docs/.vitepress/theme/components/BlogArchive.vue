<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data'
const query = ref('')
const category = ref('全部')
const categories = computed(() => ['全部', ...new Set(posts.map(post => post.category))])
const filtered = computed(() => posts.filter(post => (category.value === '全部' || post.category === category.value) && `${post.title} ${post.description}`.toLowerCase().includes(query.value.trim().toLowerCase())))
</script>

<template>
  <div class="blog-shell archive-shell">
    <p class="eyebrow">THE ARCHIVE</p><h1>每一篇，都是一次积累。</h1><p class="archive-description">关于学习、技术，以及值得留下的思考。</p>
    <div class="archive-controls"><div class="category-tabs" aria-label="按分类筛选"><button v-for="item in categories" :key="item" type="button" :class="{ selected: category === item }" :aria-pressed="category === item" @click="category = item">{{ item }}</button></div><input v-model="query" type="search" aria-label="筛选文章标题和简介" placeholder="筛选标题或简介…"></div>
    <p class="results-label">共 {{ filtered.length }} 篇文章</p>
    <a v-for="post in filtered" :key="post.url" class="journal-row" :href="withBase(post.url)"><time class="archive-date">{{ post.date }}</time><div class="row-content"><div class="row-meta">{{ post.category }}</div><h2>{{ post.title }}</h2><p>{{ post.description }}</p></div><span class="row-arrow" aria-hidden="true">↗</span></a>
    <p v-if="!filtered.length" class="empty-state">没有找到相关文章，试试其他关键词。</p>
  </div>
</template>
