/**
 * @see https://stackoverflow.com/a/63208885
 */
class Queue {
    constructor() { this._items = []; }
    enqueue(item) { this._items.push(item); }
    dequeue() { return this._items.shift(); }
    get size() { return this._items.length; }
}

/**
 * @see https://stackoverflow.com/a/63208885
 */
export class AutoQueue extends Queue {
    constructor() {
        super();
        this._pendingPromise = false;
        this._stop = false;
        this._pause = false;
    }

    enqueue(action, autoDequeue = true) {
        return new Promise((resolve, reject) => {
            super.enqueue({ action, resolve, reject });

            if (autoDequeue) {
                this.dequeue()
            };
        });
    }

    async dequeue() {
        if (this._pendingPromise) {
            return false;
        }

        if (this._pause) {
            return false;
        }

        if (this._stop) {
            this._queue = [];
            this._stop = false;
            return false;
        }

        let item = super.dequeue();

        if (!item) {
            return false
        }

        try {
            this._pendingPromise = true;

            let payload = await item.action(this);

            this._pendingPromise = false;
            item.resolve(payload);
        } catch (e) {
            this._pendingPromise = false;
            item.reject(e);
        } finally {
            this.dequeue();
        }

        return true;
    }

    stop() {
        this._stop = true;
    }

    pause() {
        this._pause = true;
    }

    async start() {
        this._stop = false;
        this._pause = false;
        return await this.dequeue();
    }
}