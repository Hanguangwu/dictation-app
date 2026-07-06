<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  correctAnswer: string
  wrongOptions: string[]
  disabled: boolean
}>()

const emit = defineEmits<{ submit: [answer: string] }>()

const options = computed(() =>
  [...props.wrongOptions, props.correctAnswer].sort(() => Math.random() - 0.5)
)

function select(opt: string) {
  if (!props.disabled) emit('submit', opt)
}
</script>

<template>
  <div class="choices">
    <button
      v-for="opt in options"
      :key="opt"
      :disabled="disabled"
      @click="select(opt)"
    >
      {{ opt }}
    </button>
  </div>
</template>

<style scoped>
.choices { display: flex; flex-direction: column; gap: 0.75rem; align-items: center; margin: 1rem 0; }
button {
  width: 100%; max-width: 400px; padding: 0.85rem 1rem; font-size: 1rem;
  border: 2px solid #e0e0e0; border-radius: 8px; background: white;
  cursor: pointer; transition: all 0.2s;
}
button:hover:not(:disabled) { border-color: #4a90d9; background: #f0f6ff; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
