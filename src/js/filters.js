export const sepia = (imageData) => {
    let pixels = imageData.data;

    for (let i = 0, len = pixels.length; i < len; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    }

    return imageData;
};

export const invert = (imageData) => {
    let pixels = imageData.data;

    for (let i = 0, len = pixels.length; i < len; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        pixels[i] = 255 - r;
        pixels[i + 1] = 255 - g;
        pixels[i + 2] = 255 - b;
    }

    return imageData;
};

export const grayscale = (imageData) => {
    let pixels = imageData.data;

    for (let i = 0, len = pixels.length; i < len; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        let brightness = (r * 0.34) + (g * 0.5) + (b * 0.16);
        pixels[i] = pixels[i + 1] = pixels[i + 2] = brightness;
    }

    return imageData;
};

export const chromakey = (imageData) => {
    let pixels = imageData.data;

    for (let i = 0, len = pixels.length; i < len; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        if ((r >= 100 && r <= 255) && (g >= 100 && g <= 255) && (b >= 100 && b <= 255)) {
            pixels[i] = 233;
            pixels[i + 1] = 30;
            pixels[i + 2] = 99;
        }//75 110 105
    } //73 65 40 102 81 70

    return imageData;
};