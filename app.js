const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('music-cover');

// Song Titles
const songs = ['Breathe', 'Do It for Me Now', 'Epic Holiday', 'Gift', 'Kiss and Tell', 'Letters to God', 'Rite of Spring', 'Shove', 'Sirens', 'Soul Survivor', 'The Flight of Apollo'];

//Keep track of song
let songIndex = 0;

//Load song details into Dom
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/AngelsAndAirwaves/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

//Play Song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//Pause Song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

//Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//Set Progress Bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event Listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

//Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time&Song update
audio.addEventListener('timeupdate', updateProgress);

//Click on Progress bar
progressContainer.addEventListener('click', setProgress);

//Song Ends
audio.addEventListener('ended', nextSong);