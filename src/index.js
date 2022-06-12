import { AutoQueue } from './AutoQueue.mjs';
import { Writer } from './Writer.mjs';

run(document.getElementById("content"), document.getElementById("control"));

/**
 * 
 * @param {HTMLDivElement} parent 
 * @param {HTMLButtonElement} control 
 */
async function run(parent, control) {
    const contentContainer = parent;
    const controlButton = control;

    const globQueue = new AutoQueue();
    const globWriter = new Writer(contentContainer);

    globQueue.enqueue(playIntro(globWriter, controlButton));
}

/**
 * 
 * @param {Writer} writer 
 * @param {HTMLButtonElement} button
 */
function playIntro(writer, button) {
    const sceneQueue = new AutoQueue();

    button.addEventListener("click", () => {
        console.log("click");
        sceneQueue.stop();
    });

    const actions = [
        () => writer.clear(),
        // () => { writer.delay = 25; },
        "Press the ◉ button (or your enter key) to begin setup.",
        () => { button.disabled = false; button.focus(); },
        "",
        // () => { writer.delay = 100; },
        "This is required because modern Browsers save you from having random crap played",
        "",
        "Aren't they nice?"
    ];

    handleLine(writer, actions, sceneQueue);

    return () => { sceneQueue.start() };
}

/**
 * 
 * @param {Writer} writer
 * @param {(string|Function)[]} lines 
 * @param {AutoQueue} queue 
 */
function handleLine(writer, lines, queue) {
    for (const line of lines) {
        const lineType = typeof line;

        switch (lineType) {
            case "string":
                if (line.trim().length === 0) {
                    queue.enqueue(() => writer.newLine(), false);
                    break;
                }

                const words = line.split(" ");
                if (words.length > 5) {
                    const lastWord = words.splice(-1)[0];

                    for (const word of words) {
                        queue.enqueue(() => writer.write(`${word} `, false), false);
                    }

                    queue.enqueue(() => writer.write(lastWord), false)

                    break;
                }
                queue.enqueue(() => writer.write(line), false);
                break;
            case "function":
                queue.enqueue(line, false);
                break;
            default:
                console.debug(`Unhandled line type ${lineType}`, line);
                break;
        }
    }
}

// async function run(parent) {
//     const contentContainer = parent;
//     const control = document.getElementById("control")

//     const globQueue = new Queue();

//     // not really happy doing it this way
//     // but it is convenient and allows to
//     // overwrite the target if required
//     newLine = newLine.bind({ target: contentContainer });
//     getCurrentCursorSpace = getCurrentCursorSpace.bind({ target: contentContainer });

//     control.addEventListener("click", async (e) => {
//         // const target = e.target;

//         globQueue.interrupt();

//         await playSetup(contentContainer, control, globQueue);
//         // const isPlaying = target.dataset.playing === "true";

//         // if (isPlaying) {
//         //     target.innerHTML = "▶";
//         //     target.dataset.playing = false;
//         // } else {
//         //     target.innerHTML = "■";
//         //     target.dataset.playing = true;
//         // }
//     });

//     await playIntro(contentContainer, control, globQueue);
// }

// async function playIntro(parent, control, queue) {
//     queue.enqueue(() => { clear(parent) });

//     const introLines = [
//         [
//             // "Press the ◉ button (or your enter key) to begin setup.", async () => {
//             //     await wait(100);
//             //     control.disabled = false;
//             //     control.focus();
//             // }],
//             "Press t", async () => {
//                 await wait(100);
//                 control.disabled = false;
//                 control.focus();
//             }],
//         "This is required because modern Browsers save you from having random crap played",
//         "",
//         "Aren't they nice?"
//     ];

//     for (const line of introLines) {
//         handle(line, queue);
//     }

//     console.debug("poke intro");
//     await queue.poke();
// }

// async function playSetup(parent, control, queue) {
//     queue.enqueue(() => { clear(parent) });

//     control.disabled = true;

//     const setupLines = [
//         "Alright, let's setup our wonderful singing voice first.",
//         ""
//     ];

//     for (const line of setupLines) {
//         handle(line, queue);
//     }

//     console.debug("poke setup");
//     await queue.poke();
// }

// /**
//  * 
//  * @param {String | Array} line 
//  * @param {Queue} queue 
//  * @returns 
//  */
// async function handle(line, queue) {

//     // allows to interrupt earlier
//     const perWordEnqueue = (line) => {
//         const words = line.split(" ");
//         const lastWord = words.splice(-1, 1);

//         for (const word of words) {
//             queue.enqueue(() => { return write(`${word} `, false) });
//         }

//         queue.enqueue(() => { return write(lastWord[0]) });
//     };

//     // shortcut for simple lines
//     if (typeof line === "string") {
//         // queue.enqueue(() => { return write(line) });
//         perWordEnqueue(line);
//         return;
//     }

//     if (!Array.isArray(line)) {
//         console.log("And what am I supposed to do with that?", line);
//         return;
//     }

//     for (const item of line) {
//         const itemType = typeof item;
//         switch (itemType) {
//             case "string":
//                 // queue.enqueue(() => { return write(item) });
//                 perWordEnqueue(item);
//                 break;
//             case "function":
//                 queue.enqueue(() => { return item() });
//                 break;
//             default:
//                 console.log(`Unhandled type ${itemType}`, item);
//         }
//     }
// }



