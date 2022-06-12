setup(document.getElementById("content"));

async function setup(parent) {
    const contentContainer = parent;
    // const contentContainer = document.getElementById("content");
    const control = document.getElementById("control")

    clear(contentContainer);

    // not really happy doing it this way
    // but it is convenient and allows to
    // overwrite the target if required
    newLine = newLine.bind({ target: contentContainer });
    getCurrentCursorSpace = getCurrentCursorSpace.bind({ target: contentContainer });

    control.addEventListener("click", (e) => {
        const target = e.target;
        const isPlaying = target.dataset.playing === "true";

        if (isPlaying) {
            target.innerHTML = "▶";
            target.dataset.playing = false;
        } else {
            target.innerHTML = "■";
            target.dataset.playing = true;
        }
    });

    control.disabled = false;

    const setupLines = [
        "Press the ▶ Play button to begin setup.",
        "This is required because modern Browsers save you from having random crap played",
        "",
        "Aren't they nice?"
    ];

    for (const line of setupLines) {
        await write(line);
    }

    console.log("Ready to Start");
}

async function write(sentence, withNewLine = true, delay = 100) {
    const target = await getWriteSpace();
    const letters = sentence.split("");
    let i = 0;

    while (i < letters.length) {
        await wait(delay);
        target.append(letters[i]);
        i++;
    }

    if (withNewLine) {
        await wait(delay);
        return newLine();
    }

    return true;
}

async function newLine() {
    /** @type {HTMLDivElement} */
    const target = this.target;

    // there should only be one, this is just precaution
    const allCursors = target.querySelectorAll("#cursor")
    for (const cursor of [...allCursors]) {
        cursor.remove();
    }

    const currentLines = target.querySelectorAll(".line.current")
    for (const line of [...currentLines]) {
        line.className = "line";
    }

    const newline = document.createElement("span");
    newline.classList.add("line", "current");
    newline.innerHTML = `<span></span><span id="cursor">&nbsp;</span>`;

    target.appendChild(newline);

    return true;
}

async function getCurrentCursorSpace() {
    /** @type {HTMLDivElement} */
    const target = this.target;

    return target.querySelector(".line.current span:first-of-type");
}

async function getWriteSpace() {
    const cursorSpace = await getCurrentCursorSpace();

    if (cursorSpace instanceof HTMLElement) {
        return cursorSpace;
    }

    await newLine();
    return getCurrentCursorSpace();
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function clear(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}