<script setup lang="ts">
import type { InputMode } from '../types/dictation'

const emit = defineEmits<{
  select: [mode: InputMode]
  back: []
}>()
</script>

<template>
  <div class="input-mode-selector">
    <h2>Choose input method</h2>
    <div class="buttons">
      <button class="mode-btn" @click="emit('select', 'typing')">
        <span class="icon">⌨️</span>
        <span class="label">Type it</span>
        <span class="desc">Type what you hear</span>
      </button>
      <button class="mode-btn" @click="emit('select', 'multiple-choice')">
        <span class="icon">✅</span>
        <span class="label">Multiple Choice</span>
        <span class="desc">Pick from 4 options</span>
      </button>
    </div>
    <button class="back-btn" @click="emit('back')">← Back</button>
  </div>
</template>

<style scoped>
.input-mode-selector { text-align: center; padding: 2rem; }
.buttons { display: flex; gap: 1rem; justify-content: center; margin: 1.5rem 0; flex-wrap: wrap; }
.mode-btn {
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  padding: 1.5rem; border: 2px solid #e0e0e0; border-radius: 12px;
  background: white; cursor: pointer; width: 200px; transition: all 0.2s;
}
.mode-btn:hover { border-color: #4a90d9; box-shadow: 0 2px 8px rgba(74,144,217,0.15); }
.icon { font-size: 2rem; }
.label { font-weight: 600; }
.desc { color: #888; font-size: 0.85rem; }
.back-btn { margin-top: 1rem; background: none; border: none; color: #888; cursor: pointer; font-size: 0.95rem; text-decoration: underline; }
</style>
