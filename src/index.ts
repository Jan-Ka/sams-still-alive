import { Caroline } from './Caroline'
import { ControlButton, CONTROL_BUTTON_STATES } from './ControlButton'
import { Sam } from './Sam'
import { VoiceSelect } from './VoiceSelect'

const controlButton = new ControlButton(document.getElementById('control') as HTMLButtonElement)
const voiceSelect = new VoiceSelect(document.getElementById('voice') as HTMLSelectElement)

const sam = new Sam()
const caroline = new Caroline()

const settings = document.getElementById('settings') as HTMLDivElement
const instructions = document.getElementById('instructions') as HTMLDivElement
const terminal = document.getElementById('terminal') as HTMLDivElement
const testVoiceButton = document.getElementById('test') as HTMLButtonElement

let playing = false;

setControlIcon()
controlButton.focus()

controlButton.onclick = () => {
  const stage = controlButton.stage
  switch (stage) {
    case 0:
      playSetup()
      controlButton.stage = 1
      setControlIcon()
      break
    case 1:
      startMusic()
      controlButton.stage = 2
      setControlIcon()
      break
    case 2:
      stopMusic()
      controlButton.stage = 1
      setControlIcon()
      break
    default:
      console.warn(`Unhandled stage ${stage}`)
      break
  }
}

function playSetup () {
  settings.classList.remove('hidden')

  voiceSelect.onenabledchanged = (isDisabled) => {
    console.debug('index', isDisabled)
    testVoiceButton.disabled = isDisabled;
  }

  voiceSelect.onchange = (selectedVoice) => {
    console.debug(`voice changed to ${selectedVoice.name}`)
    sam.changeVoice(selectedVoice)

    sam.sayRandom()
  }

  sam.onvoiceschanged = (voices) => {
    console.debug('index voices changed')
    voiceSelect.updateVoices(voices)
  }

  testVoiceButton.onclick = () => {
    sam.sayRandom()
  }

  sam.updateVoices()

  caroline.onwanttospeek = (note) => {
    sam.saySentence(note.text)
  }

  instructions.classList.add('hidden')
}

function startMusic () {
  settings.classList.add('hidden')
  terminal.classList.remove('hidden')

  caroline.startPlaying()
  playing = true
}

function stopMusic () {
  settings.classList.remove('hidden')
  terminal.classList.add('hidden')

  caroline.stopPlaying()
  playing = false
}

function setControlIcon () {
  if (controlButton.stage === 0) {
    controlButton.setIcon(CONTROL_BUTTON_STATES.SETUP)
    return
  }

  if (playing) {
    controlButton.setIcon(CONTROL_BUTTON_STATES.STOP)
    return
  }

  controlButton.setIcon(CONTROL_BUTTON_STATES.PLAY)
}
