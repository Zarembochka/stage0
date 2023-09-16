const audioItems = [
    {singer: 'Земляне',
    title: 'Трава у дома',
    author: 'В. Мигуля',
    composer: 'В. Мигуля',
    src: 'https://drivemusic.club/dl/f3mR5zB6w1UNr3jhTE71zg/1694915148/download_music/2019/05/zemljane-trava-u-doma.mp3',
    image: 'https://illustrators.ru/uploads/illustration/image/1447329/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82.jpg',
    alt: '',
    },

    {singer: 'Кино',
    title: 'Хочу перемен!',
    author: 'В. Цой',
    composer: 'В. Цой',
    src: 'https://zamona.net/storage/music/75760.mp3',
    image: 'https://illustrators.ru/uploads/illustration/image/1447329/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82.jpg',
    alt: '',
    },

    {singer: 'Eurythmics',
    title: 'Sweet Dreams',
    author: 'A. Lennox.',
    composer: 'D. A. Stewart',
    src: 'https://cdn2.sefon.pro/prev/9Fatm8jXvjd_gcWnEx32og/1694917002/133/Eurythmics%20-%20Sweet%20Dreams%20%28192kbps%29.mp3',
    image: 'https://illustrators.ru/uploads/illustration/image/1447329/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82.jpg',
    alt: '',
    },

    {singer: 'N. A. Haddaway',
    title: 'What Is Love',
    author: 'T. Hendrik',
    composer: 'J. Torello',
    src: 'https://zamona.net/storage/music/82625.mp3',
    image: 'https://i1.sndcdn.com/artworks-vZXnIRoMFS4t2MHk-wU576Q-t500x500.jpg',
    alt: '',
    },

    {singer: 'B. Tyler',
    title: 'Holding Out for a Hero',
    author: 'D. Pitchford',
    composer: 'J. Steinman',
    src: 'https://cdn3.sefon.pro/prev/fsjP3cfh7-XN21ODFuY8SQ/1694917545/1/Bonnie%20Tyler%20-%20Holding%20Out%20For%20A%20Hero%20%28192kbps%29.mp3',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJ9xa8zEKPmTp-qefv2pLfLPUzDW_hz09Kg&usqp=CAU',
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

rangeBrightness.addEventListener('input', changeBrightness);

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

function changeBrightness() {
    const brightness = `brightness(${rangeBrightness.value}%)`;
    tvScreenImage.style.filter = brightness;
    description.style.filter = brightness;
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