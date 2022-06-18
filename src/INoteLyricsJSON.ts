import { NoteJSON } from '@tonejs/midi/dist/Note'

export interface INoteLyricsJSON extends NoteJSON {
  text: string
}
