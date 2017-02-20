//
//  Utility function to iterate through pixels array
//

const iterate = (pixels, rFunc, gFunc, bFunc) => {
    for (let i = 0, len = pixels.length; i < len; i += 4) {
    	let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        pixels[i] = rFunc(r, g, b);
        pixels[i + 1] = gFunc(r, g, b);
        pixels[i + 2] = bFunc(r, g, b);
    }
};

//
//  Sepia filter
//

export const sepia = (imageData) => {

    iterate(imageData.data, (r, g, b) => (r * 0.393) + (g * 0.769) + (b * 0.189),
                            (r, g, b) => (r * 0.349) + (g * 0.686) + (b * 0.168),
                            (r, g, b) => (r * 0.272) + (g * 0.534) + (b * 0.131));

    return imageData;
};

//
//  Invert filter
//

export const invert = (imageData) => {

    let negate = (n) => 255 - n;
    iterate(imageData.data, (r, g, b) => negate(r),
                            (r, g, b) => negate(g),
                            (r, g, b) => negate(b));

    return imageData;
};

//
//  B&W filter
//

export const grayscale = (imageData) => {

    let brightness = (r, g, b) => (r * 0.34) + (g * 0.5) + (b * 0.16);
    iterate(imageData.data, (r, g, b) => brightness(r, g, b),
                            (r, g, b) => brightness(r, g, b),
                            (r, g, b) => brightness(r, g, b));

    return imageData;
};