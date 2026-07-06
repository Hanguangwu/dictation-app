<script setup lang="ts">
import { ref } from 'vue'
import type { DictationMode, InputMode } from './types/dictation'
import ModeSelector from './components/ModeSelector.vue'
import InputModeSelector from './components/InputModeSelector.vue'
import DictationSession from './components/DictationSession.vue'

const step = ref<'mode' | 'input-mode' | 'session'>('mode')
const dictationMode = ref<DictationMode>('numbers')
const dictationInputMode = ref<InputMode>('typing')
const sessionKey = ref(0)

function onModeSelect(mode: DictationMode) {
  dictationMode.value = mode
  step.value = 'input-mode'
}

function onInputModeSelect(mode: InputMode) {
  dictationInputMode.value = mode
  step.value = 'session'
  sessionKey.value++
}

function onRestart() {
  step.value = 'mode'
}

function onBack() {
  step.value = 'mode'
}
</script>

<template>
  <div class="app">
    <ModeSelector v-if="step === 'mode'" @select="onModeSelect" />
    <InputModeSelector
      v-else-if="step === 'input-mode'"
      @select="onInputModeSelect"
      @back="onBack"
    />
    <DictationSession
      v-else-if="step === 'session'"
      :key="sessionKey"
      :mode="dictationMode"
      :input-mode="dictationInputMode"
      @restart="onRestart"
    />
  </div>
</template>
