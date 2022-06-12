// from https://www.javascripttutorial.net/javascript-queue/
class Queue {
    constructor() {
        /** @type {Object<number, Promise<void>>} */
        this.fns = {};
        this.head = 0;
        this.tail = 0;
        this.interrupted = false;
    }
    /**
     * @param {Promise<void>} fn 
     */
    enqueue(fn) {
        this.fns[this.tail] = fn;
        this.tail++;
    }
    dequeue() {
        const item = this.fns[this.head];
        delete this.fns[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.fns[this.head];
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
    interrupt() {
        this.interrupted = true;
    }
    reset() {
        this.fns = {};
        this.head = 0;
        this.tail = 0;
        this.interrupted = false;
    }
    async poke() {
        while (!this.isEmpty) {
            if (this.interrupted) {
                this.reset();
                return;
            }

            const fn = this.dequeue();
            await fn();
        }
    }
}

run(document.getElementById("content"));

async function run(parent) {
    const contentContainer = parent;
    const control = document.getElementById("control")

    const globQueue = new Queue();

    // not really happy doing it this way
    // but it is convenient and allows to
    // overwrite the target if required
    newLine = newLine.bind({ target: contentContainer });
    getCurrentCursorSpace = getCurrentCursorSpace.bind({ target: contentContainer });
    handle = handle.bind({ queue: globQueue });

    control.addEventListener("click", async (e) => {
        const target = e.target;

        globQueue.interrupt();

        await playSetup(contentContainer);
        // const isPlaying = target.dataset.playing === "true";

        // if (isPlaying) {
        //     target.innerHTML = "▶";
        //     target.dataset.playing = false;
        // } else {
        //     target.innerHTML = "■";
        //     target.dataset.playing = true;
        // }
    });

    await playIntro(contentContainer, control, globQueue);

}

async function playIntro(parent, control, queue) {
    clear(parent);

    const introLines = [
        ["Press the ◉ button (or your enter key) to begin setup.", async () => {
            await wait(100);
            control.disabled = false;
            control.focus();
        }],
        "This is required because modern Browsers save you from having random crap played",
        "",
        "Aren't they nice?"
    ];

    for (const line of introLines) {
        handle(line);
    }

    console.log("Ready to Start");

    await queue.poke();
}

async function playSetup(parent) {
    clear(parent);

    const setupLines = [
        "Alright, let's setup our wonderful singing voice first.",
        ""
    ];

    for (const line of setupLines) {
        await handle(line);
    }
}

async function handle(line) {
    /** @type {Queue} */
    const queue = this.queue;

    // allows to interrupt earlier
    const perWordEnqueue = (line) => {
        const words = line.split(" ");
        const lastWord = words.splice(-1, 1);

        for (const word of words) {
            queue.enqueue(() => { return write(`${word} `, false) });
        }

        queue.enqueue(() => { return write(lastWord[0]) });
    };

    // shortcut for simple lines
    if (typeof line === "string") {
        // queue.enqueue(() => { return write(line) });
        perWordEnqueue(line);
        return;
    }

    if (!Array.isArray(line)) {
        console.log("And what am I supposed to do with that?", line);
        return;
    }

    for (const item of line) {
        const itemType = typeof item;
        switch (itemType) {
            case "string":
                // queue.enqueue(() => { return write(item) });
                perWordEnqueue(item);
                break;
            case "function":
                queue.enqueue(() => { return item() });
                break;
            default:
                console.log(`Unhandled type ${itemType}`, item);
        }
    }
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