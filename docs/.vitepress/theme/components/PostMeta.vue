<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>
<template><div class="post-meta"><span>{{ String(frontmatter.date || '').slice(0, 10) }}</span><span>·</span><span>{{ frontmatter.category || '随笔' }}</span></div></template>
