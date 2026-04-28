export interface NoteJSON {
  time: number
  midi: number
  name: string
  velocity: number
  duration: number
  ticks: number
  durationTicks: number
}

export interface INoteLyricsJSON extends NoteJSON {
  text: string
}
