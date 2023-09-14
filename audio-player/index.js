const audioItems = [
    {singer: 'Группа Земляне',
    title: 'Трава у дома',
    author: 'Владимир Мигуля',
    composer: 'Владимир Мигуля',
    src: 'https://3fc4ed44-3fbc-419a-97a1-a29742511391.selcdn.net/coub_storage/coub/simple/cw_looped_audio_med/c29ea98e878/b8bf70003b626e1e149a1/1691324771_mp3-med.mp3',
    image: 'https://illustrators.ru/uploads/illustration/image/1447329/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82.jpg',
    },

    {singer: 'Николай Рыбников',
    title: 'Марш высотников',
    author: 'Владимир Котов',
    composer: 'Родион Щедрин',
    src: 'https://3fc4ed44-3fbc-419a-97a1-a29742511391.selcdn.net/coub_storage/coub/simple/cw_looped_audio_med/610ef0b73ba/bb2c503b79e0bd1a5dcdc/1690396593_mp3-med.mp3',
    image: 'https://i1.sndcdn.com/artworks-vZXnIRoMFS4t2MHk-wU576Q-t500x500.jpg',
    },

    {singer: 'Рей Паркер-младший',
    title: 'Ghostbusters',
    author: 'Рей Паркер-младший',
    composer: 'Рей Паркер-младший',
    src: 'https://3fc4ed44-3fbc-419a-97a1-a29742511391.selcdn.net/coub_storage/coub/simple/cw_looped_audio_med/d4e2dbaf219/c8b04bbc72151aafd1c50/1689772258_mp3-med.mp3',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJ9xa8zEKPmTp-qefv2pLfLPUzDW_hz09Kg&usqp=CAU',
    },
]

const btnPower = document.querySelector('.main__power');
const btnNext = document.querySelector('.btn-next');
const btnPrevious = document.querySelector('.btn-previous');
const btnPlayPause = document.querySelector('.btn-play');

const tvScreenPart = document.querySelectorAll('.tv__screen__part');
const tvScreenImage = document.querySelector('.tv__screen__image');

const description = document.querySelector('.tv__screen__description');
const title = document.querySelector('.track__title');
const singer = document.querySelector('.track__singer');
const author = document.querySelector('.track__author');
const composer = document.querySelector('.track__composer');

const trackLength = document.querySelector('.track__length');
const trackCurrentTime = document.querySelector('.track__currentTime');

const rangeLength = document.querySelector('.length');

const audio = new Audio();

let isPower = false;
let isPlayed = false;

let currentTime;

let timeOutWhiteFade;
let timeOutCurrentTime;
// let timeOutWhiteHide;
let activeImage;


function changeIcoForPause() {
    const ico = btnPlayPause.firstElementChild;
    ico.src = './images/pause.png';
    ico.alt = 'pause track logo';
}

function changeIcoForPlay() {
    const ico = btnPlayPause.firstElementChild;
    ico.src = './images/play.png';
    ico.alt = 'play track logo';
}

function changeBtnForPause() {
    btnPlayPause.classList.add('main__controls__btn-pause');
}

function changeBtnForPlay() {
    btnPlayPause.classList.remove('main__controls__btn-pause');
}

function changeBtnPowerForOn() {
    btnPower.classList.add('main__power-on');
}

function changeBtnPowerForOff() {
    btnPower.classList.remove('main__power-on');
}

function pause() {
    audio.pause();
    currentTime = audio.currentTime;
    isPlayed = false;
    changeBtnForPause();
    changeIcoForPause();
}

function playAudio() {
    audio.src = audioItems[activeImage].src;
    audio.currentTime = currentTime || 0;
    audio.play();
    console.log();
    isPlayed = true;
    changeBtnForPlay();
    changeIcoForPlay();
}

function play() {
    if (isPlayed) {
        pause();
        return;
    }
    playAudio();
}

function playNextTrack() {
    currentTime = 0;
    playAudio();
}

function stopPlay() {
    if (isPlayed) {
        audio.pause();
        currentTime = 0;
        isPlayed = false;
        activeImage = undefined;
        return;
    }
    changeBtnForPlay();
    changeIcoForPlay();
}

function addCountToImage() {
    activeImage += 1;
    if (activeImage == audioItems.length) {
        activeImage = 0;
    }
}

function removeCountToImage() {
    activeImage -= 1;
    if (activeImage < 0) {
        activeImage = audioItems.length - 1;
    }
}

function changeImageDescription() {
    title.textContent = audioItems[activeImage].title;
    singer.textContent = audioItems[activeImage].singer;
    author.textContent = audioItems[activeImage].author;
    composer.textContent = audioItems[activeImage].composer;
}

function hideDescription() {
    description.classList.remove('tv__screen__description-show');
}

function showDescription() {
    description.classList.add('tv__screen__description-show');
}

function showNextImage() {
    imageRemoveFadeOut();
    tvScreenImage.src = audioItems[activeImage].image;
    tvScreenImage.classList.add('tv__screen__image-fadein');
    changeImageDescription();
    showDescription();
    playNextTrack();
}

function checkAnimation(event) {
    if (event.animationName === "fade-out") {
        if (!activeImage) {
            activeImage = 0;
        }
        showNextImage();
    }
    if (event.animationName === "fade-in") {
        imageRemoveFadeIn();
    }
}

tvScreenImage.addEventListener('animationend', checkAnimation);

function imageRemoveFadeOut() {
    tvScreenImage.classList.remove('tv__screen__image-fadeout');
}

function imageRemoveFadeIn() {
    tvScreenImage.classList.remove('tv__screen__image-fadein');
}

function imageFadeOut() {
    tvScreenImage.classList.add('tv__screen__image-fadeout');
}

function nextTrack() {
    if (isPower) {
        addCountToImage();
        imageFadeOut();
        hideDescription();
        clearInterval(timeOutCurrentTime);
    }
}

function previousTrack() {
    if (isPower) {
        removeCountToImage();
        imageFadeOut();
        hideDescription();
    }
}

function changeScreen() {
    tvScreenImage.src = "https://cdn.ebaumsworld.com/mediaFiles/picture/566750/85829554.gif";
}

function powerOn() {
    changeBtnPowerForOn();
    tvScreenPart.forEach(element => {
        element.classList.add('tv__screen__part-on');
    });
    timeOutWhiteFade = window.setTimeout(imageFadeOut, 1000);
}

function clearIntervals() {
    clearTimeout(timeOutWhiteFade);
    clearInterval(timeOutCurrentTime);
}

function powerOff() {
    changeBtnPowerForOff();
    tvScreenPart.forEach(element => {
        element.classList.remove('tv__screen__part-on');
    });
    tvScreenImage.classList.remove('tv__screen__image-hide');
    clearIntervals();
    stopPlay();
    hideDescription();
    changeScreen();
    clearTrackLenth();
    clearTrackCurrentTime();
}

function powerOnOff() {
    //power on
    if (!isPower) {
        powerOn();
        isPower = true;
        return;
    }
    //power off
    powerOff();;
    isPower = false;
}

btnPower.addEventListener('click', powerOnOff);

btnNext.addEventListener('click', nextTrack);

btnPrevious.addEventListener('click', previousTrack);

btnPlayPause.addEventListener('click', play);

audio.addEventListener('loadeddata', getTrackLength);

audio.addEventListener('ended', nextTrack);

audio.addEventListener('play', getCurrentTimeTrack);

function getTrackLength() {
   changeTrackLength(audio.duration);
   startTrackCurrentTime();
}

function getCurrentTimeTrack() {
    timeOutCurrentTime = setInterval(changeTrackCurrentTime, 500);
}

function changeTrackLength(length) {
    trackLength.textContent = returnLengthInFormat(length);
}

function startTrackCurrentTime() {
    trackCurrentTime.textContent = '0:00';
}

function changeTrackCurrentTime() {
    trackCurrentTime.textContent = returnLengthInFormat(audio.currentTime);
    rangeLength.value = getRangeLength(audio.currentTime);
}

function getRangeLength(length) {
    return Math.round(length / audio.duration * 100);
}

function returnLengthInFormat(length) {
    const minutes = Math.floor(length / 60);
    const seconds = (Math.round(length % 60)).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function clearTrackLenth() {
    trackLength.textContent = '';
}

function clearTrackCurrentTime() {
    trackCurrentTime.textContent = '';
    rangeLength.value = 0;
}