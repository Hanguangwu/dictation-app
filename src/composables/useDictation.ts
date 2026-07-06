import { ref, computed } from 'vue'
import type { DictationItem, DictationMode, InputMode, AnswerResult, SessionState } from '../types/dictation'
import { generateNumberItems } from '../engines/numberEngine'
import { generateDateItems } from '../engines/dateEngine'
import { createAudioEngine } from '../engines/audioEngine'
import { matchAnswer, generateWrongOptions } from '../utils/answerMatcher'

export function useDictation(mode: DictationMode, inputMode: InputMode) {
  const state = ref<SessionState>('idle')
  const items = ref<DictationItem[]>([])
  const currentIndex = ref(0)
  const results = ref<AnswerResult[]>([])
  const wrongOptions = ref<string[]>([])
  const audioEngine = createAudioEngine()

  const currentItem = computed(() => items.value[currentIndex.value] ?? null)
  const score = computed(() => results.value.filter(r => r.correct).length)
  const totalItems = computed(() => items.value.length)
  const isLastItem = computed(() => currentIndex.value >= items.value.length - 1)

  function generateItems(): DictationItem[] {
    if (mode === 'numbers') return generateNumberItems(10)
    if (mode === 'dates') return generateDateItems(10)
    const numbers = generateNumberItems(5)
    const dates = generateDateItems(5)
    return [...numbers, ...dates].sort(() => Math.random() - 0.5)
  }

  async function startSession() {
    items.value = generateItems()
    currentIndex.value = 0
    results.value = []
    state.value = 'ready'
    await playCurrent()
  }

  async function playCurrent() {
    if (!currentItem.value) return
    state.value = 'playing'
    try {
      await audioEngine.speak(currentItem.value.text)
      state.value = 'answering'
      if (inputMode === 'multiple-choice') {
        const allTexts = items.value.map(i => i.text)
        wrongOptions.value = generateWrongOptions(currentItem.value.text, allTexts)
      }
    } catch {
      state.value = 'answering'
    }
  }

  function submitAnswer(userAnswer: string) {
    if (!currentItem.value) return
    const correct = matchAnswer(userAnswer, currentItem.value)
    results.value.push({ item: currentItem.value, userAnswer, correct })
    state.value = 'evaluating'
  }

  function next() {
    if (isLastItem.value) {
      state.value = 'complete'
    } else {
      currentIndex.value++
      playCurrent()
    }
  }

  function replay() {
    playCurrent()
  }

  function reset() {
    state.value = 'idle'
    items.value = []
    currentIndex.value = 0
    results.value = []
    wrongOptions.value = []
  }

  return {
    state, items, currentIndex, currentItem,
    results, score, totalItems, isLastItem, wrongOptions,
    startSession, submitAnswer, next, replay, reset, audioEngine
  }
}
