// VARIABLES
const drumElements = document.querySelectorAll(".drumElement");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const bpmSlider = document.getElementById("bpmSlider");
const bpmLabel = document.getElementById("bpmLabel");

// OBJECTS
const drumTracks = {
    kick: {
        name: '707 Kick',
        track: document.querySelector(".kick"),
        samplePath: 'samples/tr707/BassDrum1.wav'
    },
    snare: {
        name: '707 Snare',
        track: document.querySelector(".snare"),
        samplePath: 'samples/tr707/Snare1.wav'
    },
    clap: {
        name: '707 Clap',
        track: document.querySelector(".clap"),
        samplePath: 'samples/tr707/HandClap.wav'
    },
    hiHat: {
        name: '707 HiHat',
        track: document.querySelector(".hiHat"),
        samplePath: 'samples/tr707/HhC.wav'
    },
    crash: {
        name: '707 Crash',
        track: document.querySelector(".crash"),
        samplePath: 'samples/tr707/Crash.wav'
    }
};

// INITIALIZE
let stepCounter = 0;
let bpm = bpmSlider.value;
let playSequence;
bpmLabel.textContent = `${bpm}-BPM`;

// FUNCTIONS
const sequence = () => {
    stepCounter = (stepCounter % 16) + 1;
    Object.values(drumTracks).forEach(playDrumSequence);
};

const resetCurrentStep = ({ track }) => {
    const currentElement = track.querySelector(`.drumElement:nth-child(${stepCounter})`);
    track.querySelectorAll(".drumElement").forEach(element => {
        element.classList.remove("currentStep");
    });
    currentElement.classList.add("currentStep");
};

const checkActivated = ({ track, samplePath }) => {
    const currentElement = track.querySelector(`.drumElement:nth-child(${stepCounter})`);
    if (currentElement.classList.contains("activated")) {
        let sample = new Audio(samplePath);
        sample.preload = "auto";
        sample.play();
    }
};

const playDrumSequence = (drum) => {
    checkActivated(drum);
    resetCurrentStep(drum);
};

// EVENT LISTENERS
document.addEventListener("click", (event) => {
    if (event.target.matches('.drumElement')) {
        event.target.classList.toggle("activated");
    }
});

bpmSlider.addEventListener("input", () => {
    bpm = bpmSlider.value;
    clearInterval(playSequence);
    if (startButton.classList.contains("startSequence")) {
        playSequence = setInterval(sequence, 60000 / bpm);
    }
    bpmLabel.textContent = `${bpm}-BPM`;
});

startButton.addEventListener("click", () => {
    if (startButton.classList.contains("startSequence")) {
        clearInterval(playSequence);
        stepCounter = 0;
        startButton.textContent = "START";
    } else {
        playSequence = setInterval(sequence, 60000 / bpm);
        startButton.textContent = "PAUSE";
    }
    startButton.classList.toggle("startSequence");
});

resetButton.addEventListener("click", () => {
    document.querySelectorAll(".drumElement.activated").forEach((element) => {
        element.classList.remove("activated");
    });
});
