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
    src: '',
    image: 'https://i1.sndcdn.com/artworks-vZXnIRoMFS4t2MHk-wU576Q-t500x500.jpg',
    },

    {singer: 'Рей Паркер-младший',
    title: 'Ghostbusters',
    author: 'Рей Паркер-младший',
    composer: 'Рей Паркер-младший',
    src: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJ9xa8zEKPmTp-qefv2pLfLPUzDW_hz09Kg&usqp=CAU',
    },
]

const btnPower = document.querySelector('.main__power');
const btnNext = document.querySelector('.btn-next');
const btnPrevious = document.querySelector('.btn-previous');
const btnPlayPause = document.querySelector('.btn-play');

const tvScreenPart = document.querySelectorAll('.tv__screen__part');
const tvScreenImage = document.querySelector('.tv__screen__image');

const audio = new Audio();

let isPower = false;
let isPlayed = false;

let currentTime;

let timeOutWhiteFade;
// let timeOutWhiteHide;
let activeImage;


function pause() {
    audio.pause();
    currentTime = audio.currentTime;
    isPlayed = false;
}

function play() {
    if (isPlayed) {
        pause();
        return;
    }
    audio.src = audioItems[activeImage].src;
    audio.currentTime = currentTime || 0;
    audio.play();
    isPlayed = true;
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

function showNextImage() {
    imageRemoveFadeOut() ;
    tvScreenImage.src = audioItems[activeImage].image;
    tvScreenImage.classList.add('tv__screen__image-fadein');
    play();
    isPlayed = true;
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
    addCountToImage();
    imageFadeOut();
}

function previousTrack() {
    removeCountToImage();
    imageFadeOut();
}

function powerOn() {
    btnPower.classList.add('main__power-on');
    tvScreenPart.forEach(element => {
        element.classList.add('tv__screen__part-on');
    });
    timeOutWhiteFade = window.setTimeout(imageFadeOut, 1000);
}

function powerOff() {
    btnPower.classList.remove('main__power-on');
    tvScreenPart.forEach(element => {
        element.classList.remove('tv__screen__part-on');
    });
    tvScreenImage.classList.remove('tv__screen__image-hide');
    window.clearTimeout(timeOutWhiteFade);
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