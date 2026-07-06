<script setup lang="ts">
import type { DictationItem } from '../types/dictation'

defineProps<{
  correct: boolean
  item: DictationItem
  isLast: boolean
}>()

const emit = defineEmits<{ next: [] }>()
</script>

<template>
  <div class="feedback" :class="{ correct, wrong: !correct }">
    <div class="icon">{{ correct ? '✅' : '❌' }}</div>
    <div class="message">
      {{ correct ? 'Correct!' : 'Incorrect' }}
    </div>
    <div v-if="!correct" class="correct-answer">
      Correct answer: <strong>{{ item.text }}</strong>
    </div>
    <button class="next-btn" @click="emit('next')">
      {{ isLast ? 'See Results' : 'Next ➜' }}
    </button>
  </div>
</template>

<style scoped>
.feedback {
  text-align: center; padding: 1.5rem; border-radius: 12px;
  margin: 1rem 0; border: 2px solid;
}
.feedback.correct { background: #e6f7e6; border-color: #52c41a; }
.feedback.wrong { background: #fff2f0; border-color: #ff4d4f; }
.icon { font-size: 2rem; margin-bottom: 0.5rem; }
.message { font-size: 1.3rem; font-weight: 600; margin-bottom: 0.5rem; }
.correct-answer { margin-bottom: 1rem; color: #555; }
.next-btn {
  padding: 0.6rem 1.5rem; background: #4a90d9; color: white;
  border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;
}
.next-btn:hover { background: #357abd; }
</style>
