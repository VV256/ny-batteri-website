const elems = {
    title: document.getElementsByTagName("title")[0],
    name: document.getElementById("name"),
    lyricsBox: document.getElementById("lyrics-box"),
    downloadBox: document.getElementById("download-box"),
    downloadLink: document.getElementById("download-box").firstElementChild,
    play: document.getElementById("play"),
    cover: document.getElementById("cover")
};

const searchParams = new URLSearchParams(window.location.search);
const album = searchParams.get("album");
const song = searchParams.get("song");

const albumDir = `data/albums/${album}`;
const songDir = `${albumDir}/songs/${song}`;

const audioPath = `${songDir}/audio.mp3`;

elems.downloadLink.href = audioPath;
elems.downloadLink.download = `${song}.mp3`;
elems.cover.src = `${albumDir}/cover.jpg`;

const playSource = document.createElement("source");
elems.play.appendChild(playSource);
playSource.src = audioPath;
playSource.type = "audio/mpeg";
elems.play.load();

fetch(`${window.location.origin}/${songDir}/data.json`).then(response => response.json().then(json => {
    elems.title.innerText = json.name;
    elems.name.innerText = json.name;

    for (const line of json.lyrics) {
        elems.lyricsBox.innerHTML += `${line}<br/>`;
    }
}));