// musicplayer selectors
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const audio = document.querySelector("audio");
const img = document.querySelector("#album-img");
const title = document.querySelector("h1");
const artist = document.querySelector("h4");

// musiclist selectors
const songsContainer = document.querySelector(".songs-container");

const files = [
  {
    name: "Hymn for the weekend",
    music: "Hymn for the Weekend Coldplay.mp3",
    img: "Hymn for the weekend.jpg",
    artist: "Coldplay",
  },
  {
    name: "Arcade",
    music: "Arcade - Duncan Laurence.mp3",
    img: "Arcade.jpg",
    artist: "Duncan Laurence",
  },
  {
    name: "Worth It",
    music: "Worth It - Fifth Harmony.mp3",
    img: "Worth It - Fifth Harmony.jpg",
    artist: "Fifth Harmony",
  },
  {
    name: "On My Way",
    music: "on my way.mp3",
    img: "on my way.jpg",
    artist: "Alan Walker",
  },
  {
    name: "Hey Mama",
    music: "hey mama.mp3",
    img: "hey mama.jpg",
    artist: "David Guetta",
  },
  {
    name: "Infinity",
    music: "infinity.mp3",
    img: "infinity.jpg",
    artist: "Jaymes young",
  },
];

let isPlaying = false;
let fileIndex = 0;

const playMusic = () => {
  audio.play();
  isPlaying = true;
  img.classList.add("anime");
  play.src = "images/pause.png";
};

const pauseMusic = () => {
  audio.pause();
  isPlaying = false;
  img.classList.remove("anime");
  play.src = "images/play.png";
};

const loadSong = (song) => {
  title.textContent = song.name;
  artist.textContent = song.artist;
  img.src = `images/${song.img}`;
  audio.src = `music/${song.music}`;
};

play.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

prev.addEventListener("click", () => {
  fileIndex = (fileIndex - 1 + files.length) % files.length;
  loadSong(files[fileIndex]);
  playMusic();
});

next.addEventListener("click", () => {
  fileIndex = (fileIndex + 1) % files.length;
  loadSong(files[fileIndex]);
  playMusic();
});

songsContainer.addEventListener("click", (e) => {
    let idx = e.target.songIdx;
    console.log(idx);
    loadSong(files[idx]);
    playMusic();
  });

files.forEach((song, idx) => {
  const div = document.createElement("div");
  div.songIdx = idx;
  div.innerHTML = `<img src="images/${song.img}" id="song-img"/>
                   <span id="song-title">${song.name}</span>
                   <span id="song-artist">${song.artist}</span>`;
  songsContainer.append(div);
});


loadSong(files[fileIndex]);



