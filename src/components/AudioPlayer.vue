<script setup lang="ts">
defineProps<{ disabled: boolean }>()
const emit = defineEmits<{ play: [] }>()
</script>

<template>
  <button class="audio-btn" :disabled="disabled" @click="emit('play')">
    <span class="play-icon">🔊</span>
    <span>Play</span>
  </button>
</template>

<style scoped>
.audio-btn {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 1rem 2rem; font-size: 1.2rem;
  background: #4a90d9; color: white; border: none; border-radius: 50px;
  cursor: pointer; margin: 1rem 0; transition: background 0.2s;
}
.audio-btn:hover:not(:disabled) { background: #357abd; }
.audio-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.play-icon { font-size: 1.5rem; }
</style>
