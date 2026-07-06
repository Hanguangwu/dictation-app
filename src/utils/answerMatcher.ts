import type { DictationItem } from '../types/dictation'

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[-,]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\band\b/g, '')
    .trim()
}

export function matchAnswer(userAnswer: string, item: DictationItem): boolean {
  const normalizedUser = normalize(userAnswer)
  const normalizedCorrect = normalize(item.text)
  return normalizedUser === normalizedCorrect
}

export function generateWrongOptions(correct: string, allTexts: string[]): string[] {
  const candidates = allTexts.filter(t => t !== correct)
  const shuffled = [...candidates].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}
