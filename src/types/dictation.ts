export type DictationMode = 'numbers' | 'dates' | 'mixed'
// 'mixed': 5 number items + 5 date items per session
export type InputMode = 'typing' | 'multiple-choice'
export type DateFormat = 'us' | 'uk'

export interface NumberItem {
  kind: 'number'
  value: number
  text: string
}

export interface DateItem {
  kind: 'date'
  date: Date
  text: string
  format: DateFormat
}

export type DictationItem = NumberItem | DateItem

export interface AnswerResult {
  item: DictationItem
  userAnswer: string
  correct: boolean
}

export type SessionState =
  | 'idle'
  | 'selecting-mode'
  | 'ready'
  | 'playing'
  | 'answering'
  | 'evaluating'
  | 'complete'
