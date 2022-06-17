// import * as Tone from 'tone'
import * as midi from './still_alive_lyrics.mid.json'
import { Draw, MembraneSynth, MonoSynth, Part, PolySynth, Synth, Transport } from 'tone'
import { MidiJSON } from '@tonejs/midi'
import { NoteJSON } from '@tonejs/midi/dist/Note'

export type OnWantsToSpeek = (note: LyricsNote) => void

export interface LyricsNote extends NoteJSON {
  text: string
}

/**
 * Caroline likes to sing songs
 */
export class Caroline {

  private _song: MidiJSON
  private _onwantstospeek: OnWantsToSpeek = () => true

  set onwanttospeek (v: OnWantsToSpeek | undefined) {
    if (typeof v === 'undefined') {
      this._onwantstospeek = () => true
      return
    }

    this._onwantstospeek = v
  }

  constructor () {
    this._song = midi as MidiJSON
  }

  startPlaying () {
    Transport.bpm.value = this._song.header.tempos[0].bpm

    for (const track of this._song.tracks) {
      // skip lyrics sounds
      if (track.name === 'lyrics') {
        if (track.notes.length <= 0) {
          continue
        }

        const lyricsPart = new Part((time, note) => {
          if (this._isLyricsNote(note)) {
            Draw.schedule(() => {
              this._startUtterance(note);
            }, time)
          }

          // Draw.schedule(() => {
          //   if (note.text) {
          //     const utterance = new SpeechSynthesisUtterance(note.text)
          //     utterance.rate = 0.8
          //     utterance.pitch = 1.2
          //     utterance.volume = 1.2
          //     utterance.voice = selectedVoice.voice
          //     speech.speak(utterance)
          //   }
          // })
        }, track.notes)

        lyricsPart.start()

        continue
      }

      const synth = this._getSynthForNote(track.instrument.name);

      const songPart = new Part((time, note) => {
        try {
          synth
            .triggerAttackRelease(
              note.name,
              note.duration,
              time,
              note.velocity
            )
        } catch (e) {
          //TODO: investigate which notes are played at the wrong timing
          console.warn(e, time, track.instrument.name, note)
        }
      }, track.notes)

      songPart.start();
    }

    Transport.start()
  }

  stopPlaying () {
    Transport.stop()
    Transport.cancel(0)
  }

  private _getSynthForNote (instrument: string) {
    switch (instrument) {
      case 'voice oohs':
        return new MonoSynth({
          // pitch: -2,
          detune: -1200,
          volume: -20
        }).toDestination();
      case 'orchestral harp': // Guitar 1
        return new PolySynth(Synth, {
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1
          },
          volume: -10
        }).toDestination();
      case 'acoustic guitar (steel)': // Guitar 2, Guitar 3
        return new MonoSynth({
          // pitch: -1,
          volume: -20
        }).toDestination();
      case 'electric bass (finger)': // Bass
        return new MonoSynth({
          // pitch: -5,
          // sustain: 1.3,
          volume: -10
        }).toDestination();
      case 'standard kit': // drums 1, drums 2
        return new MembraneSynth({
          // pitch: -5,
          detune: -2500,
          pitchDecay: 0.05,
          volume: -20
        }).toDestination();
      case 'celesta':
        return new MonoSynth({
          volume: -20
        }).toDestination();
      default:
        return new MonoSynth({
          volume: -100
        }).toDestination();
    }
  }

  private _startUtterance (note: LyricsNote) {
    this._onwantstospeek.call(this, note)
  }

  private _isLyricsNote (x: unknown): x is LyricsNote {
    return Object.prototype.hasOwnProperty.call(x, 'text')
  }
}
