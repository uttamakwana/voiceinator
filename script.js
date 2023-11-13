const listOfVoices = document.querySelector('[name="voice"]');
const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
const textarea = document.querySelector('[name="text"]');
const msg = new SpeechSynthesisUtterance();
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const options = document.querySelectorAll("[name='text'], [type='range']");
let voices = [];

msg.text = textarea.value;

function populateVoices() {
    voices = this.getVoices();
    listOfVoices.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join("");
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    console.log(msg.voice);
    toggleSound();
}

function toggleSound(startOver = true) {
    console.log("first")
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOptions() {
    msg[this.name] = this.value;
    toggleSound();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
listOfVoices.addEventListener("change", setVoice);

speakButton.addEventListener("click", () => {
    speechSynthesis.speak(msg);
})
stopButton.addEventListener("click", () => toggleSound(false));

options.forEach(option => option.addEventListener("change", setOptions))