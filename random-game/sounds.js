const soundStart = new Audio();
const soundShoot = new Audio();
const soundHolyshit = new Audio();
const soundWin = new Audio();
const soundLosePart1 = new Audio();
const soundLosePart2 = new Audio();
const soundNewHighScore = new Audio();
const soundAccuracy = new Audio();
const soundRocket = new Audio();
const soundShotgun = new Audio();
const soundPlasma = new Audio();
const soundExcellent = new Audio();
const soundImpressive = new Audio();
const soundPerfect = new Audio();

const soundsFiveMatch = [soundExcellent, soundImpressive, soundPerfect];
const soundsThreeMatch = [soundPlasma, soundRocket, soundShotgun];

const muteSvg = `<svg width="35px" height="35px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M16 28.469c-6.887 0-12.469-5.582-12.469-12.469s5.582-12.469 12.469-12.469c6.886 0 12.469 5.582 12.469 12.469s-5.583 12.469-12.469 12.469zM11.997 9.473c-0.861 0-1.559 0.93-1.559 2.078s0.697 2.078 1.559 2.078c0.86 0 1.559-0.931 1.559-2.078 0-1.149-0.699-2.078-1.559-2.078zM11.849 18.391l-0.52 0.9 3.659 2.113-3.725 2.149 0.52 0.899 4.244-2.449 4.244 2.449 0.52-0.899-3.725-2.149 3.659-2.113-0.52-0.9-4.179 2.413-4.177-2.413zM20.047 9.481c-0.859 0-1.558 0.931-1.558 2.078s0.698 2.078 1.558 2.078c0.861 0 1.56-0.93 1.56-2.078-0.001-1.147-0.699-2.078-1.56-2.078z"></path>
</svg>`;
const volumeSvg = `<svg width="35px" height="35px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
<g id="scream">
<path d="M6.2861,17.8184A1,1,0,1,0,7.7,16.4043l-.7671-.7671L7.7,14.87a1,1,0,0,0-1.4141-1.414l-.7671.767-.767-.767A1,1,0,0,0,3.3379,14.87l.7671.7671-.7671.7671A1,1,0,1,0,4.752,17.8184l.767-.7671Z"/>
<path d="M54,53a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,54,53Zm0,4a1,1,0,1,1,1-1A1.0009,1.0009,0,0,1,54,57Z"/>
<circle cx="57" cy="45" r="1"/>
<path d="M30,9A24,24,0,1,0,54,33,24.0275,24.0275,0,0,0,30,9Zm0,46A22,22,0,1,1,52,33,22.0248,22.0248,0,0,1,30,55Z"/>
<path d="M25.249,14.5981a19.2238,19.2238,0,0,1,10.1641.1836.9889.9889,0,0,0,.2842.042,1,1,0,0,0,.2841-1.959,21.234,21.234,0,0,0-11.23-.2031,1,1,0,1,0,.498,1.9365Z"/>
<circle cx="37" cy="30" r="2"/>
<circle cx="23" cy="30" r="2"/>
<path d="M25.5547,27.7837a1.0645,1.0645,0,0,0,.1182.0068,1,1,0,0,0,.1181-1.9926c-.9844-.1207-3.706-.8008-4.4619-2.482a1,1,0,0,0-1.8242.82C20.8818,27.1968,25.3643,27.7612,25.5547,27.7837Z"/>
<path d="M33.4248,26.91a1,1,0,0,0,.9912.8808,1.0645,1.0645,0,0,0,.1182-.0068c.19-.0225,4.6728-.5869,6.05-3.6475a1,1,0,0,0-1.8242-.82c-.7559,1.6812-3.4776,2.3613-4.4619,2.482A1.001,1.001,0,0,0,33.4248,26.91Z"/>
<path d="M30,33.9722a13.9777,13.9777,0,0,0-12.457,7.7187,4.9638,4.9638,0,0,0-.15,4.1948,4.8578,4.8578,0,0,0,3.0332,2.7691A32.6367,32.6367,0,0,0,30,50.0278a32.6417,32.6417,0,0,0,9.5732-1.3725,4.8591,4.8591,0,0,0,3.0342-2.77,4.9638,4.9638,0,0,0-.15-4.1948A13.9777,13.9777,0,0,0,30,33.9722Z"/>
<path d="M53,20a.9974.9974,0,0,0,.6816-.2681l4-3.7251A1,1,0,0,0,57.7373,14.6L55.3838,12.03,57.707,9.707a1,1,0,0,0-1.414-1.414l-3,3a1,1,0,0,0-.03,1.3823l2.33,2.5439-3.2744,3.0489A1,1,0,0,0,53,20Z"/>
<path d="M13.0518,7.3164a1,1,0,0,0,1.3955.5781L15,7.6182V9a1,1,0,0,0,2,0V6a1,1,0,0,0-1.4473-.8945L14.584,5.59l-.6358-1.9062a1,1,0,1,0-1.8964.6328Z"/>
<path d="M59.8945,23.5527a1,1,0,0,0-1.3418-.4472l-2,1a1,1,0,0,0,.8946,1.789l2-1A1,1,0,0,0,59.8945,23.5527Z"/>
<path d="M44.999,10A.9979.9979,0,0,0,45.8,9.6l3-4a1,1,0,0,0-1.6-1.2l-3,4A1,1,0,0,0,44.999,10Z"/>
</g>
</svg>`;

let isSound = true;

const volume = document.querySelector('.btn-volume');

function playSoundStart() {
    soundStart.play();
}

function playSoundShoot() {
    soundShoot.play();
    soundShoot.currentTime = 0;
}

function playSoundLose() {
    soundLosePart2.play();
    soundLosePart2.currentTime = 0;
}

function playSoundLose2() {
    soundLosePart1.play();
    soundLosePart1.currentTime = 0;
}

function playSoundWin() {
    soundWin.play();
    soundWin.currentTime = 0;
}

function playSoundNewHighScore() {
    soundNewHighScore.play();
    soundNewHighScore.currentTime = 0;
}

soundLosePart2.addEventListener('ended', playSoundLose2);

function playSoundMatch(element) {
    element.play();
    element.currentTime = 0;
}

function getSoundFiveMatch() {
    const randomInt = getRandomInt(soundsFiveMatch.length);
    return soundsFiveMatch[randomInt];
}

function getSoundThreeMatch() {
    const randomInt = getRandomInt(soundsThreeMatch.length);
    return soundsThreeMatch[randomInt];
}

function getSoundMatch(count) {
    if (count >= 7) {
        return soundHolyshit;
    }
    if (count >= 4) {
        return getSoundFiveMatch();
    }
    return getSoundThreeMatch();
}

function muteOn() {
    soundShoot.muted = true;
    soundHolyshit.muterd = true;
    soundAccuracy.muted = true;
    soundShotgun.muted = true;
    soundPlasma.muted = true;
    soundExcellent.muted = true;
    soundImpressive.muted = true;
    soundLosePart1.muted = true;
    soundLosePart2.muted = true;
    soundNewHighScore.muted = true;
    soundPerfect.muted = true;
    soundRocket.muted = true;
}

function muteOff() {
    soundShoot.muted = false;
    soundHolyshit.muterd = false;
    soundAccuracy.muted = false;
    soundShotgun.muted = false;
    soundPlasma.muted = false;
    soundExcellent.muted = false;
    soundImpressive.muted = false;
    soundLosePart1.muted = false;
    soundLosePart2.muted = false;
    soundNewHighScore.muted = false;
    soundPerfect.muted = false;
    soundRocket.muted = false;
}

function muteOnOff() {
    if (isSound) {
        volume.innerHTML = muteSvg;
        muteOn();
    } else {
        volume.innerHTML = volumeSvg;
        muteOff();
    }
    isSound = !isSound;
}

function loadSoundStart() {
    soundStart.src = './sounds/start.mp3';
}

function loadSoundShoot() {
    soundShoot.src = './sounds/Shoot.wav';
}

function loadSoundThreeMatch() {
    soundPlasma.src = './sounds/Plasma.mp3';
    soundRocket.src = './sounds/Rocket.mp3';
    soundShotgun.src = './sounds/Shotgun.mp3';
}

function loadSoundFiveMatch() {
    soundExcellent.src = './sounds/Excellent.mp3';
    soundImpressive.src = './sounds/Impressive.mp3';
    soundPerfect.src = './sounds/Perfect.mp3';
}

function loadSoundNineMatch() {
    soundHolyshit.src = './sounds/holyshit.wav';
}

function loadSoundWin() {
    soundWin.src = './sounds/win.mp3';
}

function loadSoundLose() {
    soundLosePart1.src = './sounds/yousuck.wav';
    soundLosePart2.src = './sounds/you_lose.wav';
}

function loadSoundNewHighScore() {
    soundNewHighScore.src = './sounds/new_high_score.wav';
}

function loadSounds() {
    loadSoundStart();
    loadSoundShoot();
    loadSoundThreeMatch();
    loadSoundFiveMatch();
    loadSoundNineMatch();
    loadSoundWin();
    loadSoundLose();
    loadSoundNewHighScore();
}

volume.addEventListener('click', muteOnOff);