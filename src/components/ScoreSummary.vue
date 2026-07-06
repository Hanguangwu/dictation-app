<script setup lang="ts">
import type { AnswerResult } from '../types/dictation'

defineProps<{
  results: AnswerResult[]
  score: number
  total: number
}>()

const emit = defineEmits<{ restart: [] }>()
</script>

<template>
  <div class="summary">
    <h2>Session Complete</h2>
    <div class="score-display">{{ score }} / {{ total }} correct</div>
    <div class="pct">{{ Math.round((score / total) * 100) }}%</div>
    <ul class="result-list">
      <li v-for="(r, i) in results" :key="i" :class="r.correct ? 'correct' : 'wrong'">
        <span class="indicator">{{ r.correct ? '✅' : '❌' }}</span>
        <span class="item-text">{{ r.item.text }}</span>
        <span v-if="!r.correct" class="user-answer">(you: {{ r.userAnswer }})</span>
      </li>
    </ul>
    <button class="restart-btn" @click="emit('restart')">Restart</button>
  </div>
</template>

<style scoped>
.summary { text-align: center; padding: 1rem; }
.score-display { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; }
.pct { font-size: 2.5rem; color: #4a90d9; font-weight: 800; margin-bottom: 1.5rem; }
.result-list { list-style: none; padding: 0; text-align: left; max-width: 400px; margin: 0 auto 1.5rem; }
.result-list li { padding: 0.4rem 0; display: flex; gap: 0.5rem; align-items: center; }
.result-list .indicator { flex-shrink: 0; }
.result-list .item-text { flex: 1; }
.result-list .user-answer { color: #888; font-size: 0.85rem; }
.restart-btn {
  padding: 0.75rem 2rem; background: #4a90d9; color: white;
  border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;
}
.restart-btn:hover { background: #357abd; }
</style>
