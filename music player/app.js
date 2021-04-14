const playBtn = document.getElementById("playBtn");
const playIcon = document.querySelector(".fa-play");
const container = document.getElementById("container");
const song = document.getElementById("song");
const title = document.getElementById("now__playing");
const progress = document.querySelector(".progress");
const progressContainer = document.getElementById("progress__container");
const songLength = document.getElementById("song__duration");
const someTimestamp = document.getElementById("song__time");
const songTitle = document.getElementById("song__title");
const songCover = document.getElementById("song__cover");
const singers = document.getElementById("artist__title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

//Song / Artist titles

const songs = ["Motion Sickness", "Help", "Freaking Out The Neighborhood"];
const artists = ["Pheobe Bridgers", "The Front Bottoms", "Mac DeMarco"];
let songIndex = 2;

// Load song into DOM

loadSong(songs[songIndex]);

// Update the details of the song

function loadSong(audio) {
  songTitle.innerText = audio;
  singers.innerText = artists[songIndex];
  song.src = `music/${audio}.mp3`;
  songCover.src = `images/${audio}.jpeg`;
}

//Playsong

const playSong = () => {
  container.classList.add("play");
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
  title.innerHTML = "Now Playing";

  song.play();
};

//Pause song

const pauseSong = () => {
  container.classList.remove("play");
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  title.innerHTML = "Play Song!";
  song.pause();
};

//Prev song

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//Next song

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//Update the progress
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  songTime();

  //Timestamp of song
  const songTimeMinutes = Math.floor(song.currentTime / 60);
  const songTimeSeconds = Math.floor(song.currentTime - songTimeMinutes * 60);
  //Leading 0 second
  if (songTimeSeconds < 10) {
    someTimestamp.innerHTML = `${songTimeMinutes}:0${songTimeSeconds}`;
  } else {
    someTimestamp.innerHTML = `${songTimeMinutes}:${songTimeSeconds}`;
  }
};

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = song.duration;

  song.currentTime = (clickX / width) * duration;
}

function songTime() {
  const songMinutes = Math.floor(song.duration / 60);
  const songSeconds = Math.floor(song.duration - songMinutes * 60);

  if (songSeconds < 10) {
    songLength.innerHTML = `${songMinutes}:0${songSeconds}`;
  } else {
    songLength.innerHTML = `${songMinutes}:${songSeconds}`;
  }
}

//When to play

playBtn.addEventListener("click", () => {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Event Listeners

song.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
setInterval(updateProgress, 100);
window.addEventListener("load", songTime);
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
