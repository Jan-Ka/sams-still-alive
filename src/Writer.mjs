export class Writer {

    static GetWriteSpace(target) {
        const cursorSpace = Writer.GetCursorSpace(target);

        if (cursorSpace instanceof HTMLElement) {
            return cursorSpace;
        }

        return Writer.AddNewLine(target);
    }

    /**
     * 
     * @param {HTMLElement} target 
     * @returns {HTMLElement | null}
     */
    static GetCursorSpace(target) {
        return target.querySelector(".line.current span:first-of-type");
    }

    /**
     * 
     * @param {HTMLDivElement} target 
     * @returns {HTMLSpanElement} Newly created Cursor Space
     */
    static AddNewLine(target) {
        // remove all cursors
        // there should only be one, this is just precaution
        const allCursors = target.querySelectorAll("#cursor")
        for (const cursor of [...allCursors]) {
            cursor.remove();
        }

        // remove all lines marked as current
        // there should only be one, the last one, this is just precaution
        const currentLines = target.querySelectorAll(".line.current")
        for (const line of [...currentLines]) {
            line.className = "line";
        }

        const newline = document.createElement("span");
        newline.classList.add("line", "current");
        newline.innerHTML = `<span></span><span id="cursor">&nbsp;</span>`;

        const child = target.appendChild(newline);

        return child.querySelector(".line.current span:first-of-type");
    }

    set delay(val) {
        this.__delay = val;
    }

    get delay() {
        return this.__delay;
    }

    constructor(target, delay = 100) {
        /** @type {HTMLDivElement} */
        this.__target = target;
        this.__delay = delay;
    }

    async newLine() {
        await this.__wait(this.__delay);
        Writer.AddNewLine(this.__target);
    }

    async write(sentence, withNewLine = true) {
        try {
            const target = Writer.GetWriteSpace(this.__target);
            const letters = sentence.split("");
            let i = 0;

            while (i < letters.length) {
                await this.__wait(this.__delay);
                target.append(letters[i]);
                i++;
            }

            if (withNewLine) {
                await this.newLine(this.__delay);
            }

            return true;

        } catch (e) {
            console.debug(e);
            throw new Error(`Could not write sentence: ${sentence}`);
        }
    }

    async clear() {
        while (this.__target.firstChild) {
            this.__target.removeChild(this.__target.firstChild);
        }

        return true;
    }

    __wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// export async function write(sentence, withNewLine = true, delay = 100) {
//     const target = await getWriteSpace();
//     const letters = sentence.split("");
//     let i = 0;

//     while (i < letters.length) {
//         await wait(delay);
//         target.append(letters[i]);
//         i++;
//     }

//     if (withNewLine) {
//         await wait(delay);
//         return newLine();
//     }

//     return true;
// }

// export async function getWriteSpace() {
//     const cursorSpace = await getCurrentCursorSpace();

//     if (cursorSpace instanceof HTMLElement) {
//         return cursorSpace;
//     }

//     await newLine();
//     return getCurrentCursorSpace();
// }

// export async function getCurrentCursorSpace() {
//     /** @type {HTMLDivElement} */
//     const target = this.target;

//     return target.querySelector(".line.current span:first-of-type");
// }

// export async function newLine() {
//     /** @type {HTMLDivElement} */
//     const target = this.target;

//     // there should only be one, this is just precaution
//     const allCursors = target.querySelectorAll("#cursor")
//     for (const cursor of [...allCursors]) {
//         cursor.remove();
//     }

//     const currentLines = target.querySelectorAll(".line.current")
//     for (const line of [...currentLines]) {
//         line.className = "line";
//     }

//     const newline = document.createElement("span");
//     newline.classList.add("line", "current");
//     newline.innerHTML = `<span></span><span id="cursor">&nbsp;</span>`;

//     target.appendChild(newline);

//     return true;
// }

// export function wait(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export function clear(elem) {
//     while (elem.firstChild) {
//         elem.removeChild(elem.firstChild);
//     }
// }