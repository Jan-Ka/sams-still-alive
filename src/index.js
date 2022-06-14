import * as Tone from 'tone';
import * as song from './still_alive_lyrics.mid.json';
import * as quotes from './random_quotes.json';

const speech = window.speechSynthesis;

/** @type {HTMLButtonElement} */
const controlButton = document.getElementById("control");
/** @type {HTMLDivElement} */
const settings = document.getElementById("settings");
/** @type {HTMLDivElement} */
const instructions = document.getElementById("instructions");
/** @type {HTMLSelectElement} */
const settingsSelect = document.getElementById("voice");
/** @type {HTMLDivElement} */
const terminal = document.getElementById("terminal");

setControlIcon();
controlButton.focus();

let voiceOptions = [];
let selectedVoice = null;

speech.onvoiceschanged = () => {
    const voices = speech.getVoices();

    for (const voice of voices) {
        voiceOptions.push([voice.name, voice]);
    }
}

controlButton.onclick = (e) => {
    const stage = parseInt(controlButton.dataset.stage, 10)

    if (isNaN(stage)) {
        console.error("Unknown stage.")
        return;
    }

    switch (stage) {
        case 0:
            playSetup();
            controlButton.dataset.stage = 1;
            setControlIcon();
            break;
        case 1:
            startMusic();
            controlButton.dataset.stage = 2;
            setControlIcon();
            break;
        case 2:
            stopMusic();
            controlButton.dataset.stage = 1;
            setControlIcon();
            break;
        default:
            console.warn(`Unhandled stage ${stage}`);
            break;
    }
}

function playSetup() {
    settings.classList.remove("hidden");

    if (voiceOptions.length === 0) {
        settingsSelect.innerHTML = `<option>No Voices available. Press the ◉ Button Again.</option>`;
        settingsSelect.disabled = true;
        return;
    }

    voiceOptions.sort((a, b) => {
        const compareLang = a[1].lang.localeCompare(b[1].lang);
        if (compareLang == 0) {
            return a[0].localeCompare(b[0]);
        }

        return compareLang;
    });

    for (const voiceOption of voiceOptions) {
        const option = document.createElement("option");
        option.textContent = `${voiceOption[0]} (${voiceOption[1].lang})`;
        option.value = voiceOption[0];
        option.dataset.name = voiceOption[0];
        option.dataset.lang = voiceOption[1].lang;

        if (voiceOption[1].default === true) {
            option.selected = true;
            selectedVoice = voiceOption[1];
        }

        settingsSelect.appendChild(option);
    }

    settingsSelect.onchange = (e) => {
        console.log(`voice changed to ${e.target.value}`);
        selectedVoice = voiceOptions.find((voiceOption) => voiceOption[0] === e.target.value)[1];

        const randomQuoteIndex = Math.floor(Math.random() * quotes.length);

        const utterance = new SpeechSynthesisUtterance(quotes[randomQuoteIndex]);
        utterance.voice = selectedVoice;
        speech.speak(utterance);
    };

    settingsSelect.disabled = false;
    instructions.classList.add("hidden");
}

function startMusic() {
    settings.classList.add("hidden");
    terminal.classList.remove("hidden");

    controlButton.dataset.playing = true;

    Tone.Transport.bpm.value = song.header.tempos[0].bpm;
    const now = Tone.now() + 0.5;

    for (const track of song.tracks) {
        // skip lyrics sounds
        if (track.name === "lyrics") {
            if (track.notes.length <= 0) {
                continue;
            }

            const part = new Tone.Part((time, note) => {
                Tone.Draw.schedule(() => {
                    // console.log("time:", note)
                    if (note.text) {
                        const utterance = new SpeechSynthesisUtterance(note.text);
                        utterance.rate = 0.8;
                        utterance.pitch = 1.2;
                        utterance.voice = selectedVoice;
                        speech.speak(utterance);
                    }
                });
            }, track.notes);

            part.start();

            continue;
        }

        let synth = null;

        switch (track.instrument.number) {
            case 0: // drums
                synth = new Tone.MembraneSynth({
                    envelope: {
                        attack: 0.02,
                        decay: 0.1,
                        sustain: 0.3,
                        release: 1,
                    },
                    detune: -1200
                }).toDestination();
                synth.volume.value = -10;
                break;
            case 8: // celesta
                synth = new Tone.MetalSynth().toDestination();
                synth.volume.value = -10;
            default:
                synth = new Tone.PolySynth(Tone.Synth, {
                    envelope: {
                        attack: 0.02,
                        decay: 0.1,
                        sustain: 0.3,
                        release: 1
                    }
                }).toDestination();
                break;
        }

        const part = new Tone.Part((time, note) => {
            synth.triggerAttackRelease(
                note.name,
                note.duration,
                time,
                note.velocity
            );
        }, track.notes);

        part.start();
    }

    Tone.Transport.start();
}

function stopMusic() {
    settings.classList.remove("hidden");
    terminal.classList.add("hidden");

    controlButton.dataset.playing = false;
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
}

function setControlIcon() {
    if (controlButton.dataset.stage === "0") {
        controlButton.textContent = "◉";
        return;
    }

    if (controlButton.dataset.playing === "true") {
        controlButton.textContent = "▧";
        return;
    }

    controlButton.textContent = "▷";
}