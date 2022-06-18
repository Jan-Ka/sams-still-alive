import { join, dirname } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { Midi } from '@tonejs/midi'
import { IMidiLyricsJSON, ITrackLyricsJSON } from '../src/IMidiLyricsJSON'

const fileDir = dirname(__filename);

const midiFilePath = join(fileDir, 'still_alive_lyrics.midi')
const lyricsPath = join(fileDir, 'still_alive_lyrics.json')
const outputPath = join(fileDir, '..', 'src', 'still_alive_lyrics.midi.json')


console.debug(`load midi file from ${midiFilePath}`)
console.debug(`load lyrics file from ${lyricsPath}`)
console.debug(`save lyrics file to ${outputPath}`)

async function getMidi () {

  const file = await readFile(midiFilePath)
  const arrBuffer = new ArrayBuffer(file.length)
  const typedArray = new Uint8Array(arrBuffer)

  for (let i = 0; i < file.length; i++) {
    typedArray[i] = file[i]

  }

  return new Midi(typedArray)
}

async function getLyrics (): Promise<string[]> {
  const file = await readFile(lyricsPath, 'utf-8')

  const lyrics = JSON.parse(file)

  return lyrics
}

async function processMidi (): Promise<void> {
  const lyrics = await getLyrics()

  const midiJSON = (await getMidi()).toJSON()
  const midiLyricsJSON: IMidiLyricsJSON = {
    header: midiJSON.header,
    tracks: []
  }

  for (const track of midiJSON.tracks) {
    if (track.notes.length <= 0) {
      continue;
    }

    const trackLyricsJSON: ITrackLyricsJSON = {
      name: track.name,
      notes: [],
      channel: track.channel,
      instrument: track.instrument,
      controlChanges: track.controlChanges,
      pitchBends: track.pitchBends,
      endOfTrackTicks: track.endOfTrackTicks
    }

    // Lyrics
    if (track.instrument.number === 121) {
      trackLyricsJSON.name = 'lyrics';

      trackLyricsJSON.notes = track.notes.map((note, i) => {
        return {
          ...note,
          text: lyrics[i]
        }
      })
    } else {
      trackLyricsJSON.notes = track.notes
    }

    midiLyricsJSON.tracks.push(trackLyricsJSON)
  }

  updateLyricsJson(midiLyricsJSON)
}

async function updateLyricsJson (midiLyricsJSON: IMidiLyricsJSON) {
  try {
    await writeFile(outputPath, JSON.stringify(midiLyricsJSON))
  } catch (e) {
    console.warn(e)
  }
}

processMidi()

