// Virual proxy shows that you have a resource when you may not actually have it yet.

// This example shows an image fetch only when it is drawn (only required when drawn).

class Image1 {
    public url: string;
    constructor(url: string) {
        this.url = url;
        console.log(`Loading image from ${this.url}`);
    }

    draw() {
        console.log(`Drawing image ${this.url}`);
    }
}

class LazyImage {
    public url: string;
    private image: Image1 | undefined;
    constructor(url: string) {
        this.url = url;
        this.image;
    }

    draw() {
        if (!this.image) {
            this.image = new Image1(this.url);
        }
        this.image.draw();
    }
}

function drawImage(img: LazyImage) {
    console.log('About to draw the image');
    img.draw();
    console.log('Done drawing the image');
}

let img = new LazyImage('http://pokemon.com/pikachu.png');
drawImage(img);
