// Playlist Element.
const playlist = document.querySelector(".playlist");
const music_list = document.querySelector("#music-list");

const previous_btn = document.getElementById("previous-btn");
const play_pause_btn = document.getElementById("play-pause-btn");
const next_btn = document.getElementById("next-btn");

let conver_svg = false;

const pause_svg = `
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-play-icon lucide-play"
        >
        <path
            d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
        />
    </svg>
`;

const play_svg = `
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-pause-icon lucide-pause"
        >
        <rect x="14" y="3" width="5" height="18" rx="1" />
        <rect x="5" y="3" width="5" height="18" rx="1" />
    </svg>
`;

// song-info Elements(span).
const song_name = document.getElementById("song-name");
const artist_name = document.getElementById("artist-name");

const status_song = document.getElementById("status-song");
const current_song = document.getElementById("current-song");
const repeat_song = document.getElementById("repeat-song");
const shuffle_song = document.getElementById("shuffle-song");

const audio = new Audio();

let current_index = 0;

let last_music = [];

let playlist_content = [
    
    {

        id: 0,
        name: "solo",
        artist: "clean bandit & demi lovato",
        current_status: "idle",
        song_src: "Music/Clean Bandit - Solo (feat. Demi Lovato) [Official Video] [8JnfIa84TnU].webm",
        song_btn: document.createElement("button"),
        
    },
    {

        id: 0,
        name: "eyes closed",
        artist: "jisoo & zayn",
        current_status: "idle",
        song_src: "Music/JISOO X ZAYN - EYES CLOSED (OFFICIAL MV) [EN1tMeXQii0].webm",
        song_btn: document.createElement("button"),

    },
    {

        id: 0,
        name: "a thousand years",
        artist: "jhon michael howell & JVKE & ZVC",
        current_status: "idle",
        song_src: "Music/John Michael Howell, JVKE, ZVC - A Thousand Years (Cinematic Version) [IlW7QgdQfKg].webm",
        song_btn: document.createElement("button"),

    },
    {
        
        id: 0,
        name: "dangerously",
        artist: "charlie puth",
        current_status: "idle",
        song_src: "Music/Charlie Puth - Dangerously [Official Video] [TBXQu8ORnBQ].webm",
        song_btn: document.createElement("button"),
        
    },
    {
        
        id: 0,
        name: "7 rings",
        artist: "ariana grande",
        current_status: "idle",
        song_src: "Music/Ariana Grande - 7 rings (Official Video) [QYh6mYIJG2Y].webm",
        song_btn: document.createElement("button"),
        
    },
    {
        
        id: 0,
        name: "the color of you",
        artist: "alina baraz - floating ft. khalid",
        current_status: "idle",
        song_src: "Music/Alina Baraz - Floating ft. Khalid (filous Remix) [Official Audio] [d2ftOyb9FVs].webm",
        song_btn: document.createElement("button"),

    },
    {
        
        id: 0,
        name: "less than a lover",
        artist: "JENNIE",
        current_status: "idle",
        song_src: "Music/JENNIE - Less than a Lover (Official Video) [_IT83Y_HcAw].webm",
        song_btn: document.createElement("button"),
        
    },
    // {

        //     id: 0,
        //     name: "attention",
        //     artist: "charle path",
        //     current_status: "idle",
        //     song_src: "https://open.spotify.com/track/5cF0dROlMOK5uNZtivgu50?si=62f573a4788a4e35",
        //     song_btn: document.createElement("button"),
        
    // },
        
];
    
playlist_content.forEach((songs, index) => {
    
    const music_list_content = document.createElement("li");

    songs.id = index + 1;
    songs.song_btn.innerText = songs.name;

    songs.song_btn.classList.add("song-btn");
    music_list_content.appendChild(songs.song_btn);

    music_list.appendChild(music_list_content);
    playlist.appendChild(music_list);
    // playlist.appendChild(songs.song_btn);
    
});

// This List To Save The Last Song Played
last_music = [
    
    {
    
        id: playlist_content[0].id,
        name: playlist_content[0].name,
        artist: playlist_content[0].artist,
        song_src: playlist_content[0].song_src,
    
    },
    {
    
        id: 0,
        name: "",
        artist: "",
        song_src: "",
    
    }

];

let duplicate_code = function(){

    song_name.innerText = playlist_content[current_index].name;
    artist_name.innerText = playlist_content[current_index].artist;
    status_song.innerText = playlist_content[current_index].current_status;

};

// Working Abt That Tomorrow Inshallah You Will find The Solution🤲.
playlist_content.forEach((songs_event, index) => {

    songs_event.song_btn.addEventListener("click", () => {

        play_pause_btn.innerHTML = play_svg;
        conver_svg = true;
        
        last_music[1].name = songs_event.name;
        last_music[1].id = songs_event.id;
        last_music[1].artist = songs_event.artist;
        last_music[1].song_src = songs_event.song_src;

        if(last_music[0].id == last_music[1].id){

            current_index = index;

            audio.src = last_music[0].song_src;
            audio.play();
            
            songs_event.current_status = "live";
            current_song.innerText = current_index + 1;
            duplicate_code();

        }else if(last_music[0].id != last_music[1].id){    

            last_music[0].id = last_music[1].id;
            current_index = index;
            
            last_music[0].name = last_music[1].name;
            last_music[0].artist = last_music[1].artist;
            last_music[0].song_src = last_music[1].song_src;
            
            audio.src = last_music[0].song_src;
            audio.play();
            
            songs_event.current_status = "live";
            current_song.innerText = current_index + 1;
            duplicate_code();
            
        }
        
    });

});

// Complete Working On This Tomorrow And Inshallah U'll Get The Solution🤲.
previous_btn.addEventListener("click", () => {

    previous_song();

    playlist_content[current_index].current_status = "live";
    current_song.innerText = current_index + 1;
    
    duplicate_code();
    
    conver_svg = true;
    play_pause_btn.innerHTML = play_svg;

});

// Conversion SVG To Play/Pause SVGs And Play/Pause Musics.
play_pause_btn.addEventListener("click", () => {

    conver_svg = !conver_svg;
    
    if(conver_svg){

        play_pause_btn.innerHTML = play_svg;
        if(audio.currentTime == 0)
            audio.src = playlist_content[current_index].song_src;
        
        audio.play();
        
        playlist_content[current_index].current_status = "live";
        current_song.innerText = current_index + 1;
        duplicate_code();
        
    }else{
     
        play_pause_btn.innerHTML = pause_svg;
        audio.pause();
        
        playlist_content[current_index].current_status = "pause";
        current_song.innerText = current_index + 1;
        duplicate_code();
        
    }
    
});

next_btn.addEventListener("click", () => {

    next_song();

    playlist_content[current_index].current_status = "live";
    current_song.innerText = current_index + 1;
    
    duplicate_code();

    conver_svg = true;
    play_pause_btn.innerHTML = play_svg;

});


audio.addEventListener("timeupdate",() => {
    
    if(audio.currentTime >= audio.duration){

        next_song();
        playlist_content[current_index].current_status = "live";
        
        current_song.innerText = current_index + 1;
        duplicate_code();

    }

});

let next_song = function(){

    current_index = (current_index + 1) % playlist_content.length;
    audio.src = playlist_content[current_index].song_src;
    
    audio.play().catch(error => {

        console.log("Nothing Important, Inshallah");
        
    });
}

let previous_song = function(){

    current_index = (current_index - 1 + playlist_content.length) % playlist_content.length;
    audio.src = playlist_content[current_index].song_src;
    
    audio.play().catch(error => {

        console.log("Nothing Important, Inshallah");
        
    });
}
