import type { HeaderJSON, TrackJSON } from '@tonejs/midi';
import type { NoteJSON } from '@tonejs/midi/dist/Note';
import type { INoteLyricsJSON } from './INoteLyricsJSON';

export interface IMidiLyricsJSON {
  header: HeaderJSON;
  tracks: ITrackLyricsJSON[];
}

export interface ITrackLyricsJSON extends TrackJSON {
  notes: (NoteJSON | INoteLyricsJSON)[];
}
