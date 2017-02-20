require('webrtc-adapter');
import {sepia, invert, grayscale} from './filters';

//
//  DOM elements
//

let currentFilter = null;

const virtualVideo = window.video = document.getElementById('virtual-video');
const cameraView = document.getElementById('camera-view');
const snapshotView = document.getElementById('snapshot-view');

const filterButtons = document.querySelectorAll('button.button-filter');
const snapshotButton = document.querySelector('button.button-snapshot');

const constraints = {
    audio: false,
    video: {
        width: 1280,
        facingMode: 'user'
    }
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
                break;
        }

        cameraContext.putImageData(imageData, 0, 0);
    }, 33);

};

//
//  Event listeners
//

filterButtons.forEach((b) => {
    b.addEventListener('click', (e) => {
        currentFilter = e.target.id;
        filterButtons.forEach((_b) => {
            _b.classList.remove('active');
        });
        e.target.classList.add('active');
    });
});

snapshotButton.addEventListener('click', () => {
    snapshotView.src = cameraView.toDataURL('png');
});

virtualVideo.addEventListener('canplay', () => {
    cameraView.width = getComputedStyle(virtualVideo, null).width.replace('px', '');
    cameraView.height = getComputedStyle(virtualVideo, null).height.replace('px', '');
    document.getElementById('no-filter').classList.add('active');
});

//
//  Callbacks for getUserMedia()
//

const onMediaStream = (stream) => {
    window.stream = stream;
    virtualVideo.srcObject = stream;
    drawStream();
};

const onNoMediaStream = (error) => {
    let errStr = `${error}`;
    console.log(errStr);
    alert(errStr);
};

//
//  Entry point
//

navigator.mediaDevices.getUserMedia(constraints).then(onMediaStream).catch(onNoMediaStream);
