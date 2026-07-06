import type { DateItem, DateFormat } from '../types/dictation'
import { numberToWords } from './numberEngine'

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

function ordinalDay(n: number): string {
  const ordinals: Record<number, string> = {
    1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth',
    6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth',
    11: 'eleventh', 12: 'twelfth', 13: 'thirteenth', 14: 'fourteenth',
    15: 'fifteenth', 16: 'sixteenth', 17: 'seventeenth', 18: 'eighteenth',
    19: 'nineteenth', 20: 'twentieth', 21: 'twenty-first', 22: 'twenty-second',
    23: 'twenty-third', 24: 'twenty-fourth', 25: 'twenty-fifth',
    26: 'twenty-sixth', 27: 'twenty-seventh', 28: 'twenty-eighth',
    29: 'twenty-ninth', 30: 'thirtieth', 31: 'thirty-first'
  }
  return ordinals[n] || `${n}th`
}

function yearToWords(year: number): string {
  if (year === 2000) return 'two thousand'
  if (year >= 2001 && year <= 2009) {
    return `two thousand ${ONES[year % 10]}`
  }
  if (year >= 2010 && year <= 2099) {
    if (Math.random() > 0.5) {
      const tens = Math.floor((year % 100) / 10)
      const ones = year % 10
      if (tens === 0) return `twenty ${ONES[ones]}`
      if (ones === 0) return `twenty ${TENS[tens]}`
      return `twenty ${TENS[tens]} ${ONES[ones]}`
    } else {
      return `two thousand ${numberToWords(year % 100)}`
    }
  }
  if (year >= 1900 && year <= 1999) {
    const a = Math.floor(year / 100)
    const b = year % 100
    if (b === 0) return `${ONES[a]} hundred`
    if (b < 10) return `${ONES[a]} oh ${ONES[b]}`
    return `${ONES[a]} ${numberToWords(b)}`
  }
  return numberToWords(year)
}

function dateToWords(date: Date, format: DateFormat): string {
  const month = MONTHS[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  const dayOrdinal = ordinalDay(day)
  const yearText = yearToWords(year)

  if (format === 'us') {
    return `${month} ${dayOrdinal}, ${yearText}`
  } else {
    return `the ${dayOrdinal} of ${month}, ${yearText}`
  }
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomDate(): Date {
  const year = randomInt(1900, 2099)
  const month = randomInt(0, 11)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const day = randomInt(1, daysInMonth)
  return new Date(year, month, day)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateDateItems(count: number): DateItem[] {
  const items: DateItem[] = []
  for (let i = 0; i < count; i++) {
    const date = generateRandomDate()
    const format: DateFormat = Math.random() > 0.5 ? 'us' : 'uk'
    const text = dateToWords(date, format)
    items.push({ kind: 'date', date, text, format })
  }
  return shuffle(items)
}
