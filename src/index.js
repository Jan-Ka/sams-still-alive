const speech = window.speechSynthesis;

/** @type {HTMLButtonElement} */
const controlButton = document.getElementById("control");
/** @type {HTMLDivElement} */
const settings = document.getElementById("settings");
/** @type {HTMLSelectElement} */
const settingsSelect = document.getElementById("voice");

controlButton.focus();

let voiceOptions = [];

speech.onvoiceschanged = () => {
    const voices = speech.getVoices();

    for (const voice of voices) {
        voiceOptions.push([voice.name, voice.lang, voice.default]);
    }
}

controlButton.onclick = (e) => {
    settings.classList.remove("hidden");

    if (voiceOptions.length === 0) {
        settingsSelect.innerHTML = `<option>No Voices available. Press the ◉ Button Again.</option>`;
        settingsSelect.disabled = true;
        return;
    }

    voiceOptions.sort((a, b) => {
        const compareLang = a[1].localeCompare(b[1]);
        if (compareLang == 0) {
            return a[0].localeCompare(b[0]);
        }

        return compareLang;
    });

    for (const voiceOption of voiceOptions) {
        const option = document.createElement("option");
        option.textContent = `${voiceOption[0]} (${voiceOption[1]})`;
        option.dataset.name = voiceOption[0];
        option.dataset.lang = voiceOption[1];

        if (voiceOption[2] === true) {
            option.selected = true;
        }

        settingsSelect.appendChild(option);
    }

    settingsSelect.disabled = false;

    setControlIcon();
}

function setControlIcon() {
    if (controlButton.dataset.playing === "true") {
        controlButton.textContent = "■";
        return;
    }

    controlButton.textContent = "▶";
}