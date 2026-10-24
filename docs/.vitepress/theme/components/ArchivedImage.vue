<script setup>
import { ref } from 'vue'
defineProps({ src: { type: String, required: true }, caption: { type: String, default: '原文插图' } })
const failed = ref(false)
</script>

<template>
  <figure class="archived-image">
    <img v-if="!failed" :src="src.replace(/^http:/, 'https:')" :alt="caption" loading="lazy" @error="failed = true">
    <div v-else class="image-unavailable"><span>▧</span><p>{{ caption }} · 原图片暂时无法加载</p><a :href="src" target="_blank" rel="noopener noreferrer">查看原图片链接 ↗</a></div>
  </figure>
</template>
