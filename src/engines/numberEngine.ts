import type { NumberItem } from '../types/dictation'

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

function numberToWords(n: number): string {
  if (n === 0) return 'zero'

  // Handle decimals
  const parts = n.toString().split('.')
  if (parts.length === 2) {
    const intPart = numberToWords(parseInt(parts[0]))
    const fracPart = parts[1].split('').map(d => digitToWord(parseInt(d))).join(' ')
    return `${intPart} point ${fracPart}`
  }

  const abs = Math.abs(n)
  if (abs < 20) return ONES[abs]
  if (abs < 100) {
    const tens = TENS[Math.floor(abs / 10)]
    const ones = abs % 10
    return ones === 0 ? tens : `${tens}-${ONES[ones]}`
  }
  if (abs < 1000) {
    const hundreds = ONES[Math.floor(abs / 100)]
    const remainder = abs % 100
    const useAnd = Math.random() > 0.5
    return remainder === 0
      ? `${hundreds} hundred`
      : `${hundreds} hundred${useAnd ? ' and ' : ' '}${numberToWords(remainder)}`
  }
  // Thousands and millions
  const scales = ['', 'thousand', 'million']
  for (let i = scales.length - 1; i >= 1; i--) {
    const unit = Math.pow(1000, i)
    if (abs >= unit) {
      const count = Math.floor(abs / unit)
      const remainder = abs % unit
      const prefix = `${numberToWords(count)} ${scales[i]}`
      return remainder === 0 ? prefix : `${prefix} ${numberToWords(remainder)}`
    }
  }
  return n.toString()
}

function digitToWord(d: number): string {
  return ONES[d]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDecimal(): number {
  const int = randomInt(0, 100)
  const frac = randomInt(1, 99)
  return parseFloat(`${int}.${frac}`)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateNumberItems(count: number): NumberItem[] {
  const tiers: (() => number)[] = [
    () => randomInt(0, 20),
    () => randomInt(21, 99),
    () => randomInt(100, 999),
    () => randomInt(1000, 999999),
    () => Math.random() > 0.5 ? randomInt(1000000, 9999999) : randomDecimal(),
  ]

  const items: NumberItem[] = []
  for (let i = 0; i < count; i++) {
    const tier = tiers[i % tiers.length]
    const value = tier()
    items.push({ kind: 'number', value, text: numberToWords(value) })
  }
  return shuffle(items)
}

export { numberToWords }
