<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [answer: string] }>()
defineProps<{ disabled: boolean }>()

const input = ref('')

function handleSubmit() {
  if (!input.value.trim()) return
  emit('submit', input.value.trim())
  input.value = ''
}
</script>

<template>
  <div class="typing-answer">
    <input
      v-model="input"
      type="text"
      :disabled="disabled"
      placeholder="Type what you heard..."
      @keyup.enter="handleSubmit"
    />
    <button :disabled="disabled || !input.trim()" @click="handleSubmit">
      Submit
    </button>
  </div>
</template>

<style scoped>
.typing-answer { display: flex; gap: 0.5rem; justify-content: center; margin: 1rem 0; }
input {
  padding: 0.75rem 1rem; font-size: 1.1rem; border: 2px solid #e0e0e0;
  border-radius: 8px; width: 300px; max-width: 80vw;
}
input:focus { outline: none; border-color: #4a90d9; }
button {
  padding: 0.75rem 1.5rem; background: #4a90d9; color: white;
  border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;
}
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
