const elems = {
    albums: document.getElementById("albums")
};

fetch(`${window.location.origin}/data/data.json`).then(response => response.json().then(json => {
    const rootDir = "data";

    const albumsDir = `${rootDir}/albums`;
    for (const album of json.albums) {
        const albumDir = `${albumsDir}/${album}`;

        const elemAlbum = document.createElement("div");
        elems.albums.appendChild(elemAlbum);

        const elemCover = document.createElement("img");
        elemAlbum.appendChild(elemCover);
        elemCover.src = `${albumDir}/cover.jpg`;

        const elemName = document.createElement("b");
        elemAlbum.appendChild(elemName);
        elemAlbum.appendChild(document.createElement("br"));
        
        fetch(`${window.location.origin}/${albumDir}/data.json`).then(response => response.json().then(json => {
            elemName.innerText = json.name;

            const songsDir = `${albumDir}/songs`
            for (const song of json.songs) {
                const songDir = `${songsDir}/${song}`;

                const elemSong = document.createElement("a");
                elemAlbum.appendChild(elemSong);
                elemSong.href = `${window.location.origin}/song?${new URLSearchParams([
                    ["album", album],
                    ["song", song]
                ])}`;
                elemAlbum.appendChild(document.createElement("br"));

                fetch(`${window.location.origin}/${songDir}/data.json`).then(response => response.json().then(json => {
                    elemSong.innerText = json.name;
                }))
            }
        }));
    }
}));