import type { INoteLyricsJSON } from './INoteLyricsJSON'
import type { IMidiLyricsJSON } from './IMidiLyricsJSON'

type ToneModule = typeof import('tone')
type Disposable = { dispose: () => unknown }

type OnWantsToSpeek = (note: INoteLyricsJSON) => void

/**
 * Caroline likes to sing songs
 */
export class Caroline {

  private _song: IMidiLyricsJSON | null = null
  private _tone: ToneModule | null = null
  private _preloadPromise: Promise<void> | null = null
  private _onwantstospeek: OnWantsToSpeek = () => true
  private _parts: Disposable[] = []
  private _synths: Disposable[] = []

  set onwanttospeek (v: OnWantsToSpeek | undefined) {
    if (typeof v === 'undefined') {
      this._onwantstospeek = () => true
      return
    }

    this._onwantstospeek = v
  }

  get onwanttospeek () {
    return this._onwantstospeek
  }

  preload (): Promise<void> {
    if (!this._preloadPromise) {
      this._preloadPromise = (async () => {
        const [toneModule, songModule] = await Promise.all([
          import('tone'),
          import('./still_alive_lyrics.midi.json')
        ])
        this._tone = toneModule
        this._song = songModule.default as IMidiLyricsJSON
      })()
    }
    return this._preloadPromise
  }

  async startPlaying () {
    await this.preload()
    if (!this._tone || !this._song) {
      throw new Error('Caroline failed to preload')
    }

    this._disposeAll()

    const { Transport, Part, Draw, start } = this._tone

    await start()

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
        }, track.notes)

        lyricsPart.start()
        this._parts.push(lyricsPart)

        continue
      }

      const synth = this._getSynthForNote(track.instrument.name);
      this._synths.push(synth)

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
      this._parts.push(songPart)
    }

    Transport.start()
  }

  stopPlaying () {
    if (!this._tone) return
    const { Transport } = this._tone
    Transport.stop()
    Transport.cancel(0)
    this._disposeAll()
  }

  private _disposeAll () {
    for (const part of this._parts) part.dispose()
    for (const synth of this._synths) synth.dispose()
    this._parts = []
    this._synths = []
  }

  private _getSynthForNote (instrument: string) {
    if (!this._tone) {
      throw new Error('Tone module not loaded')
    }
    const { MonoSynth, PolySynth, Synth, MembraneSynth } = this._tone

    switch (instrument) {
      case 'voice oohs':
        return new MonoSynth({
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
          volume: -20
        }).toDestination();
      case 'electric bass (finger)': // Bass
        return new MonoSynth({
          volume: -10
        }).toDestination();
      case 'standard kit': // drums 1, drums 2
        return new MembraneSynth({
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

  private _startUtterance (note: INoteLyricsJSON) {
    this._onwantstospeek.call(this, note)
  }

  private _isLyricsNote (x: unknown): x is INoteLyricsJSON {
    return Object.prototype.hasOwnProperty.call(x, 'text')
  }
}
