require('webrtc-adapter');

import {sepia, invert, grayscale, chromakey} from './filters';


//
//  DOM elements
//

let currentFilter = '';

const virtualVideo = window.video = document.getElementById('virtual-video');
const cameraView = document.getElementById('camera-view');
const snapshotView = document.getElementById('snapshot-view');

const filterButtons = document.querySelectorAll('button.button-filter');
const snapshotButton = document.querySelector('button.button-snapshot');

const constraints = {
    audio: false,
    video: true
};

//
//  Main loop
//

const drawStream = () => {
    let cameraContext = cameraView.getContext('2d');

    window.setInterval(() => {
        cameraContext.drawImage(virtualVideo, 0, 0, cameraView.width, cameraView.height);
        let imageData = cameraContext.getImageData(0, 0, cameraView.width, cameraView.height);

        switch (currentFilter) {
            case 'sepia':
                imageData = sepia(imageData);
                break;
            case 'invert':
                imageData = invert(imageData);
                break;
            case 'grayscale':
                imageData = grayscale(imageData);
                break;
            default:
                imageData = chromakey(imageData);
                break;
        }

        cameraContext.putImageData(imageData, 0, 0);
    }, 33);

};

//
//  Callbacks for getUserMedia()
//

const onMediaStream = (stream) => {
    window.stream = stream;
    virtualVideo.srcObject = stream;
    drawStream();
};

const onNoMediaStream = (error) => {
    console.log(`No media stream, ${error}`);
};

navigator.mediaDevices.getUserMedia(constraints)
                        .then(onMediaStream)
                        .catch(onNoMediaStream);

//
//  Event listeners
//

filterButtons.forEach((b) => {
    b.addEventListener('click', (e) => {
        currentFilter = e.target.id;
    });
});

snapshotButton.addEventListener('click', () => {
    snapshotView.src = cameraView.toDataURL('png');
});

virtualVideo.addEventListener('canplay', () => {
    cameraView.width = getComputedStyle(virtualVideo, null).width.replace('px', '');
    cameraView.height = getComputedStyle(virtualVideo, null).height.replace('px', '');
});