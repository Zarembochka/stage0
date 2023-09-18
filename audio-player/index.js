const audioItems = [
    {singer: 'Земляне',
    title: 'Трава у дома',
    author: 'В. Мигуля',
    composer: 'В. Мигуля',
    src: './music/zemljane-trava-u-doma.mp3',
    image: './images/covers/1.jpg',
    alt: '',
    },

    {singer: 'Кино',
    title: 'Хочу перемен!',
    author: 'В. Цой',
    composer: 'В. Цой',
    src: './music/kino-hochu-peremen.mp3',
    image: './images/covers/2.jpg',
    alt: '',
    },

    {singer: 'Eurythmics',
    title: 'Sweet Dreams',
    author: 'A. Lennox.',
    composer: 'D. Stewart',
    src: './music/eurythmics-sweet-dreams-are-made-of-this.mp3',
    image: './images/covers/3.jpg',
    alt: '',
    },

    {singer: 'Dire Straits',
    title: 'Money for Nothing',
    author: 'M. Knopfler',
    composer: 'Sting',
    src: './music/Money for Nothing.mp3',
    image: './images/covers/4.jpg',
    alt: '',
    },

    {singer: 'B. Tyler',
    title: 'Holding Out for a Hero',
    author: 'D. Pitchford',
    composer: 'J. Steinman',
    src: './music/bonnie-tyler-holding-out-for-a-hero.mp3',
    image: './images/covers/5.jpg',
    alt: '',
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

const rangeVolume = document.querySelector('.volume');
const progress = document.querySelector('.progress');
const rangeLength = document.querySelector('.length');
const rangeBrightness = document.querySelector('.brightness');

const audio = new Audio();

let isPower = false;
let isPlayed = false;
let isPaused = false;

let currentTime;

let timeOutWhiteFade;
let timeOutCurrentTime;

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
    isPaused = true;
    changeBtnForPause();
    changeIcoForPause();
}

function playAudio() {
    if (isPaused) {
        audio.currentTime = currentTime;
        clearInterval(timeOutCurrentTime);
    } else {
        audio.currentTime = currentTime || 0;
        // audio.src = audioItems[activeImage].src;
    }
    audio.volume = rangeVolume.value / 100;
    audio.play();
    isPlayed = true;
    isPaused = false;
    changeBtnForPlay();
    changeIcoForPlay();
}

function play() {
    if (!isPower) {
        return;
    }
    if (isPlayed) {
        pause();
        return;
    }
    playAudio();
}

function playNextTrack() {
    currentTime = 0;
    audio.src = audioItems[activeImage].src;
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
    tvScreenImage.classList.add('tv__screen__image-fadein');
}

function powerOn() {
    changeBtnPowerForOn();
    tvScreenPart.forEach(element => {
        element.classList.remove('tv__screen__part-off');
        element.classList.add('tv__screen__part-on');
    });
    timeOutWhiteFade = setTimeout(imageFadeOut, 1000);
    currentTime = 0;
}

function clearIntervals() {
    clearTimeout(timeOutWhiteFade);
    clearInterval(timeOutCurrentTime);
}

function tvscreenPowerOff() {
    tvScreenPart.forEach(element => {
        element.classList.remove('tv__screen__part-on');
        element.classList.add('tv__screen__part-off');
    });
}

function powerOff() {
    stopPlay();
    clearIntervals();
    hideDescription();
    changeScreen();
    clearTrackLength();
    clearTrackCurrentTime();
    timeOutWhiteFade = setTimeout(tvscreenPowerOff, 1000);
    changeBtnPowerForOff();
}

function powerOnOff() {
    //power on
    if (!isPower) {
        isPower = true;
        powerOn();
        return;
    }
    //power off
    isPower = false;
    powerOff();
}

btnPower.addEventListener('click', powerOnOff);

btnNext.addEventListener('click', nextTrack);

btnPrevious.addEventListener('click', previousTrack);

btnPlayPause.addEventListener('click', play);

audio.addEventListener('loadeddata', getTrackLength);

audio.addEventListener('ended', nextTrack);

audio.addEventListener('play', getTrackCurrentTime);

rangeLength.addEventListener('click', changeTrackCurrentTime);

rangeVolume.addEventListener('input', setTrackVolume);
rangeVolume.addEventListener('wheel', setTrackVolumeByMouse);

rangeBrightness.addEventListener('input', changeBrightness);
rangeBrightness.addEventListener('wheel', changeBrightnessByMouse);

tvScreenImage.addEventListener('click', play);

function getTrackLength() {
   startTrackCurrentTime();
   setTrackLength(audio.duration);
}

function getTrackCurrentTime() {
    timeOutCurrentTime = setInterval(setTrackCurrentTime, 500);
}

function setTrackLength(length) {
    trackLength.textContent = returnLengthInFormat(length);
}

function startTrackCurrentTime() {
    trackCurrentTime.textContent = '0:00';
}

function setTrackCurrentTime() {
    if (isPower) {
        trackCurrentTime.textContent = returnLengthInFormat(audio.currentTime);
        progress.style.width = Math.round(audio.currentTime / audio.duration * 100) + '%'
    }
}

function changeTrackCurrentTime(event) {
    if (isPower) {
        const inputWidth = parseInt(window.getComputedStyle(rangeLength).width);
        currentTime = Math.round(event.offsetX * Math.round(audio.duration) / inputWidth);
        audio.currentTime = currentTime;
    }
}

function setTrackVolume() {
    audio.volume = rangeVolume.value / 100;
}

function setTrackVolumeByMouse(event) {
    const value = event.wheelDelta;
    if (value > 0) {
        rangeVolume.value = +rangeVolume.value + 5;
    } else {
        rangeVolume.value = +rangeVolume.value - 5;
    }
    setTrackVolume();
}

function changeBrightness() {
    const brightness = `brightness(${rangeBrightness.value}%)`;
    tvScreenImage.style.filter = brightness;
    description.style.filter = brightness;
}

function changeBrightnessByMouse(event) {
    const value = event.wheelDelta;
    if (value > 0) {
        rangeBrightness.value = +rangeBrightness.value + 5;
    } else {
        rangeBrightness.value = +rangeBrightness.value - 5;
    }
    changeBrightness();
}

function getRangeLength(length) {
    return Math.round(length / audio.duration * 100);
}

function returnLengthInFormat(length) {
    const minutes = Math.floor(length / 60);
    const seconds = (Math.round(length % 60)).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function clearTrackLength() {
    trackLength.textContent = '';
}

function clearTrackCurrentTime() {
    trackCurrentTime.textContent = '';
    progress.style.width = 0;
}