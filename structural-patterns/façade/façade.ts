/* 
    NOTE: The following is pseudo code and does not run.
*/

import { text } from "stream/consumers";

class Buffer extends Array {
    public width: number;
    public height: number;
    constructor(width: number = 30, height: number = 20) {
        super();
        this.width = width;
        this.height = height;
        this.alloc(width * height);
    }

    write(text: string, position: number) {
        //  write text to buffer
    }
}

class Viewport {
    public buffer: Buffer;
    public offset: number;
    constructor(buffer = new Buffer()) {
        this.buffer = buffer;
        this.offset = 0;
    }

    append{text, pos} {
        this.buffer.write(text, pos + this.offset)
    }

    getChatAt(index) {
        return this.buffer[this.offset + index]
    }
}

// Console is the façade
class Console {
    public buffer: Buffer;
    public currentViewport: Viewport;
    public buffers: Buffer[];
    public viewports: Viewport[];
    constructor() {
        this.buffer = new Buffer();
        this.currentViewport = new Viewport(this.buffer);
        this.buffers = [this.buffer]
        this.viewports = [this.currentViewport]
    }

    write(text: string) {
        this.currentViewport.buffer.write(text);
    }

    getChatAt(index: number) {
        return this.currentViewport.getChatAt(index)
    }
}

let c = new Console();
c.write('hello')
let ch = c.getChatAt(0)
