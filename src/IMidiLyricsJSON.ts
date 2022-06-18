import { HeaderJSON, TrackJSON } from "@tonejs/midi"
import { NoteJSON } from "@tonejs/midi/dist/Note";
import { INoteLyricsJSON } from "./INoteLyricsJSON";

export interface IMidiLyricsJSON {
  header: HeaderJSON
  tracks: ITrackLyricsJSON[]
}

export interface ITrackLyricsJSON extends TrackJSON {
  notes: (NoteJSON | INoteLyricsJSON)[];
}
