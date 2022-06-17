import * as quotes from './random_quotes.json'

export type OnVoicesChanged = (voices: SpeechSynthesisVoice[]) => void;

/**
 * Sam talks through speechSynthesis
 */
export class Sam {
  private _speech = window.speechSynthesis
  private _voice: SpeechSynthesisVoice | null = null
  private _broken = false // true if speechSynthesis can't be accessed
  private _onvoiceschanged: OnVoicesChanged = () => true
  private _voices: SpeechSynthesisVoice[] = []

  set onvoiceschanged (v: OnVoicesChanged | undefined) {
    if (this._broken) {
      console.warn('sam can\'t attach to onvoiceschanged, they are currently broken')
      return
    }

    if (typeof v === 'undefined') {
      this._onvoiceschanged = () => true
      return
    }

    this._onvoiceschanged = v

    if (this._speech.onvoiceschanged === null) {
      this._speech.onvoiceschanged = this._speechOnVoicesChange
    }
  }

  get onvoiceschanged () {
    return this._onvoiceschanged
  }

  constructor (voice?: SpeechSynthesisVoice) {
    this._speechOnVoicesChange = this._speechOnVoicesChange.bind(this)

    // we can't output at the time of init
    if (typeof this._speech === "undefined") {
      this._broken = true;
    } else {
      this._speech = window.speechSynthesis;
      // this._speech.onvoiceschanged = this._speechOnVoicesChange
    }

    // I'd like to test positive for the type here but that throws an error
    if (!this._broken && typeof voice !== 'undefined') {
      this._voice = voice
    }
  }

  changeVoice (newVoice: SpeechSynthesisVoice) {
    this._voice = newVoice
  }

  updateVoices () {
    this._voices = this._speech.getVoices();

    this._onvoiceschanged.call(this, this._voices);
  }

  saySentence (sentence: string) {
    if (this._broken) {
      console.warn('sam can\'t say something, they are currently broken')
      return
    }

    if (sentence.length <= 0) {
      console.debug('sentence was empty')
      return
    }

    const utterance = new SpeechSynthesisUtterance()
    utterance.text = sentence
    utterance.voice = this._voice
    this._speech.speak(utterance)
  }

  sayRandom () {
    if (this._broken) {
      console.warn('sam can\'t say something, they are currently broken')
      return
    }

    const randomQuoteIndex = Math.floor(Math.random() * quotes.length)

    const utterance = new SpeechSynthesisUtterance(quotes[randomQuoteIndex])
    utterance.voice = this._voice
    this._speech.speak(utterance)
  }

  private _speechOnVoicesChange () {
    if (this._broken) {
      console.warn('sam can\'t update voices, they are currently broken')
      return
    }

    this.updateVoices()
  }
}
