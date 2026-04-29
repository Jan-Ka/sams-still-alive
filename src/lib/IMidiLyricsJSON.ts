import type { HeaderJSON, TrackJSON } from '@tonejs/midi';
import type { INoteLyricsJSON, NoteJSON } from './INoteLyricsJSON';

export interface IMidiLyricsJSON {
  header: HeaderJSON;
  tracks: ITrackLyricsJSON[];
}

export interface ITrackLyricsJSON extends TrackJSON {
  notes: (NoteJSON | INoteLyricsJSON)[];
}
