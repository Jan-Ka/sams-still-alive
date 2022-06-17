// import * as Tone from 'tone'
// import * as quotes from './random_quotes.json'
import { ControlButton, CONTROL_BUTTON_STATES } from './ControlButton'
import { Sam } from './Sam'
import { VoiceSelect } from './VoiceSelect'

const controlButton = new ControlButton(document.getElementById('control') as HTMLButtonElement)
const voiceSelect = new VoiceSelect(document.getElementById('voice') as HTMLSelectElement)

const sam = new Sam()

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

  sam.updateVoices();

  instructions.classList.add('hidden')
}

function startMusic () {
  settings.classList.add('hidden')
  terminal.classList.remove('hidden')

  playing = true

  // Tone.Transport.bpm.value = song.header.tempos[0].bpm

  // const selectedVoice = voiceSelect.selectedVoice
  // const hasVoice = typeof selectedVoice !== "undefined";

  // for (const track of song.tracks) {
  //   // skip lyrics sounds
  //   if (track.name === 'lyrics' && hasVoice) {
  //     if (track.notes.length <= 0) {
  //       continue
  //     }

  //     const lyricsPart = new Tone.Part((_time, note) => {
  //       Tone.Draw.schedule(() => {
  //         if (note.text) {
  //           const utterance = new SpeechSynthesisUtterance(note.text)
  //           utterance.rate = 0.8
  //           utterance.pitch = 1.2
  //           utterance.volume = 1.2         
  //           utterance.voice = selectedVoice.voice
  //           speech.speak(utterance)
  //         }
  //       })
  //     }, track.notes)

  //     lyricsPart.start()

  //     continue
  //   }

  //   let synth = null

  //   switch (track.instrument.name) {
  //     case 'voice oohs':
  //       synth = new Tone.MonoSynth({
  //         pitch: -2,
  //         detune: -1200,
  //         volume: -10
  //       }).toDestination()
  //       break
  //     case 'orchestral harp': // Guitar 1
  //       synth = new Tone.PolySynth(Tone.Synth, {
  //         envelope: {
  //           attack: 0.02,
  //           decay: 0.1,
  //           sustain: 0.3,
  //           release: 1
  //         },
  //         volume: -10
  //       }).toDestination()
  //       break
  //     case 'acoustic guitar (steel)': // Guitar 2, Guitar 3
  //       synth = new Tone.MonoSynth({
  //         pitch: -1,
  //         volume: -20
  //       }).toDestination()
  //       break
  //     case 'electric bass (finger)': // Bass
  //       synth = new Tone.MonoSynth({
  //         pitch: -5,
  //         sustain: 1.3,
  //         volume: -10
  //       }).toDestination()
  //       break
  //     case 'standard kit': // drums 1, drums 2
  //       synth = new Tone.MembraneSynth({
  //         pitch: -5,
  //         detune: -2500,
  //         pitchDecay: 0.05,
  //         volume: -20
  //       }).toDestination()
  //       break
  //     case 'celesta':
  //       synth = new Tone.MonoSynth({
  //         volume: -20
  //       }).toDestination()
  //       break
  //     default:
  //       synth = new Tone.MonoSynth({
  //         volume: -100
  //       }).toDestination()
  //       break
  //   }

  //   const songPart = new Tone.Part((time, note) => {
  //     synth
  //       .triggerAttackRelease(
  //         note.name,
  //         note.duration,
  //         time,
  //         note.velocity
  //       )
  //   }, track.notes)

  //   songPart.start()
  // }

  // Tone.Transport.start()
}

function stopMusic () {
  settings.classList.remove('hidden')
  terminal.classList.add('hidden')

  playing = false
  // Tone.Transport.stop()
  // Tone.Transport.cancel(0)
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
