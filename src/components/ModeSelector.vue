<script setup lang="ts">
import type { DictationMode } from '../types/dictation'

const emit = defineEmits<{
  select: [mode: DictationMode]
}>()
</script>

<template>
  <div class="mode-selector">
    <h1>English Dictation</h1>
    <p class="subtitle">Practice numbers and dates in English</p>
    <h2>Choose your topic</h2>
    <div class="buttons">
      <button class="mode-btn" @click="emit('select', 'numbers')">
        <span class="icon">🔢</span>
        <span class="label">Numbers</span>
        <span class="desc">Practice numbers from 0 to millions</span>
      </button>
      <button class="mode-btn" @click="emit('select', 'dates')">
        <span class="icon">📅</span>
        <span class="label">Dates</span>
        <span class="desc">Practice dates in US &amp; UK formats</span>
      </button>
      <button class="mode-btn" @click="emit('select', 'mixed')">
        <span class="icon">🔀</span>
        <span class="label">Mixed</span>
        <span class="desc">Random mix of numbers and dates</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.mode-selector { text-align: center; padding: 2rem; max-width: 600px; margin: 0 auto; }
.subtitle { color: #666; margin-bottom: 2rem; }
.buttons { display: flex; flex-direction: column; gap: 1rem; }
.mode-btn {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem; border: 2px solid #e0e0e0; border-radius: 12px;
  background: white; cursor: pointer; font-size: 1rem;
  transition: all 0.2s;
}
.mode-btn:hover { border-color: #4a90d9; box-shadow: 0 2px 8px rgba(74,144,217,0.15); }
.icon { font-size: 1.5rem; }
.label { font-weight: 600; font-size: 1.1rem; min-width: 80px; }
.desc { color: #888; font-size: 0.9rem; }
</style>
