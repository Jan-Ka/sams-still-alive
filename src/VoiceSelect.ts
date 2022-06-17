import { clearAllChildNodes, slugify } from "./Utils";

export type VoiceOption = { key: string; voice: SpeechSynthesisVoice };

export type OnVoiceSelectChange = (selection: SpeechSynthesisVoice) => void;

export type OnVoiceSelectEnabledChange = (isDisabled: boolean) => void;

export class VoiceSelect {
  private _elem: HTMLSelectElement
  private _isRebuilding = false
  private _availableOptions: VoiceOption[] = []
  private _selectedVoice = ''
  private _onchange: OnVoiceSelectChange = () => true
  private _onenabledchange: OnVoiceSelectEnabledChange = () => true

  set isDisabled (v: boolean) {
    console.debug('voiceSelect enabled changed to', !v)

    this._elem.disabled = v
    this._elemOnEnabledChange(v)
  }

  get isDisabled () {
    return this._elem.disabled;
  }

  set onenabledchanged (v: OnVoiceSelectEnabledChange | undefined) {
    console.debug('voiceSelect onenabledchanged registered')

    if (typeof v === 'undefined') {
      this._onenabledchange = () => true
      return
    }

    this._onenabledchange = v
  }

  get onenabledchanged () {
    return this._onenabledchange
  }

  get selectedVoice () {
    return this._getSelectedVoice()
  }

  set onchange (v: OnVoiceSelectChange | undefined) {
    if (typeof v === 'undefined') {
      this._onchange = () => true
      return
    }

    this._onchange = v

    if (this._elem.onchange === null) {
      this._elem.onchange = this._elemOnChange
    }
  }

  get onchange () {
    return this._onchange
  }

  constructor (elem: HTMLSelectElement) {
    this._elemOnChange = this._elemOnChange.bind(this);

    this._elem = elem;
    // this._elem.onchange = this._elemOnChange
  }

  updateVoices (newVoices: SpeechSynthesisVoice[]) {
    this._isRebuilding = true;

    this._availableOptions = newVoices.map((voice) => {
      return {
        key: slugify(voice.name),
        voice: voice
      }
    });

    clearAllChildNodes(this._elem)

    if (this._availableOptions.length === 0) {
      this.isDisabled = true;
      const option = document.createElement('option')
      option.textContent = 'No Voices available on your System'
      this._elem.appendChild(option)

      return
    }

    this._availableOptions.sort(function byLangThenName (a, b) {
      const compareLang: number = a.voice.lang.localeCompare(b.voice.lang)
      if (compareLang === 0) {
        return a.voice.name.localeCompare(b.voice.name)
      }

      return compareLang
    })

    const longestNameLength = this._availableOptions.reduce((i, c) => {
      return i < c.voice.name.length ? c.voice.name.length : i
    }, 0)

    for (const voiceOption of this._availableOptions) {
      const option = document.createElement('option')
      option.textContent = `${voiceOption.voice.name.padEnd(longestNameLength, ' ')} (${voiceOption.voice.lang})`
      const optionKey = voiceOption.key
      option.value = optionKey

      if (voiceOption.voice.default === true) {
        option.selected = true
        this._selectedVoice = optionKey
      }

      this._elem.appendChild(option)
    }

    this._isRebuilding = false
    this.isDisabled = false
  }

  private _elemOnChange () {
    if (this._isRebuilding) {
      return
    }

    this._selectedVoice = this._elem.value
    const selectedOption = this._getSelectedVoice()

    if (typeof selectedOption === 'undefined') {
      this._selectedVoice = ''
      this.updateVoices([])
      console.warn(new RangeError("Selected Voice was outside of available Voices"))
      return
    }

    this._onchange.call(this, selectedOption.voice)
  }

  private _elemOnEnabledChange (isDisabled: boolean) {
    console.log('voiceSelect', isDisabled)
    this._onenabledchange.call(this, isDisabled)
  }

  private _getSelectedVoice () {
    if (this._selectedVoice.length === 0) {
      return undefined
    }

    return this._availableOptions.find((option) => {
      return option.key === this._selectedVoice
    })
  }
}
