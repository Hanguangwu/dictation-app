<script setup lang="ts">
import { onMounted } from 'vue'
import type { DictationMode, InputMode } from '../types/dictation'
import { useDictation } from '../composables/useDictation'
import AudioPlayer from './AudioPlayer.vue'
import TypingAnswer from './TypingAnswer.vue'
import MultipleChoice from './MultipleChoice.vue'
import ResultFeedback from './ResultFeedback.vue'
import ScoreSummary from './ScoreSummary.vue'

const props = defineProps<{
  mode: DictationMode
  inputMode: InputMode
}>()

const emit = defineEmits<{ restart: [] }>()

const {
  state, currentItem, currentIndex, totalItems, results,
  score, wrongOptions, isLastItem,
  startSession, submitAnswer, next, replay
} = useDictation(props.mode, props.inputMode)

onMounted(() => {
  startSession()
})
</script>

<template>
  <div class="session">
    <div v-if="state === 'complete'">
      <ScoreSummary
        :results="results"
        :score="score"
        :total="totalItems"
        @restart="emit('restart')"
      />
    </div>
    <div v-else class="session-content">
      <div class="progress">Question {{ currentIndex + 1 }} / {{ totalItems }}</div>
      <AudioPlayer
        :disabled="state !== 'answering'"
        @play="replay"
      />
      <TypingAnswer
        v-if="props.inputMode === 'typing'"
        :disabled="state !== 'answering'"
        @submit="submitAnswer"
      />
      <MultipleChoice
        v-else-if="props.inputMode === 'multiple-choice' && currentItem"
        :correct-answer="currentItem.text"
        :wrong-options="wrongOptions"
        :disabled="state !== 'answering'"
        @submit="submitAnswer"
      />
      <ResultFeedback
        v-if="state === 'evaluating' && results.length > 0"
        :correct="results[results.length - 1].correct"
        :item="results[results.length - 1].item"
        :is-last="isLastItem"
        @next="next"
      />
    </div>
  </div>
</template>

<style scoped>
.session { width: 100%; max-width: 500px; margin: 0 auto; padding: 2rem; }
.session-content { text-align: center; }
.progress { font-size: 0.95rem; color: #888; margin-bottom: 1rem; }
</style>
