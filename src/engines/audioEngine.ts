export interface AudioEngine {
  speak(text: string): Promise<void>
  stop(): void
  setRate(rate: number): void
  isSpeaking(): boolean
}

export function createAudioEngine(): AudioEngine {
  let rate = 0.8

  function speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not available'))
        return
      }
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = rate
      utterance.pitch = 1

      utterance.onend = () => {
        resolve()
      }
      utterance.onerror = (e) => {
        reject(e)
      }

      window.speechSynthesis.speak(utterance)
    })
  }

  function stop(): void {
    window.speechSynthesis.cancel()
  }

  function setRate(newRate: number): void {
    rate = newRate
  }

  function isSpeaking(): boolean {
    return window.speechSynthesis.speaking
  }

  return { speak, stop, setRate, isSpeaking }
}
