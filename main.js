// Playlist Element.
const playlist = document.querySelector(".playlist");

const previous_btn = document.getElementById("previous-btn");
const play_pause_btn = document.getElementById("play-pause");
const next_btn = document.getElementById("next-btn");

let conver_svg = false;
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
        class="lucide lucide-play-icon lucide-play"
        >
        <path
            d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
        />
    </svg>
`;

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

let last_music = [
    {
        name: "solo",
        artist: "clean bandit & demi lovato",
        song_src: "Music/Clean Bandit - Solo (feat. Demi Lovato) [Official Video] [8JnfIa84TnU].webm",
        status: false,
        index: 0,
    },
    {
        name: "",
        artist: "",
        song_src: "",
        status: false,
        index: 0,
    }
];

let playlist_content = [
    {
        name: "solo",
        artist: "clean bandit & demi lovato",
        current_status: "idle",
        id: 0,
        song_src: "Music/Clean Bandit - Solo (feat. Demi Lovato) [Official Video] [8JnfIa84TnU].webm",
        song_btn: document.createElement("button"),

    },
    {
        name: "eyes closed",
        artist: "jisoo & zayn",
        current_status: "idle",
        id: 0,
        song_src: "Music/JISOO X ZAYN - EYES CLOSED (OFFICIAL MV) [EN1tMeXQii0].webm",
        song_btn: document.createElement("button"),

    },
    {
        name: "a thousand years",
        artist: "jhon michael howell & JVKE & ZVC",
        current_status: "idle",
        id: 0,
        song_src: "Music/John Michael Howell, JVKE, ZVC - A Thousand Years (Cinematic Version) [IlW7QgdQfKg].webm",
        song_btn: document.createElement("button"),

    },
    {
        name: "dangerously",
        artist: "charlie puth",
        current_status: "idle",
        id: 0,
        song_src: "Music/Charlie Puth - Dangerously [Official Video] [TBXQu8ORnBQ].webm",
        song_btn: document.createElement("button"),

    },
    {
        name: "7 rings",
        artist: "ariana grande",
        current_status: "idle",
        id: 0,
        song_src: "Music/Ariana Grande - 7 rings (Official Video) [QYh6mYIJG2Y].webm",
        song_btn: document.createElement("button"),

    },

];

playlist_content.forEach((songs, index) => {
    songs.id = index + 1;
    songs.song_btn.innerText = songs.name;
    songs.song_btn.classList.add("song-btn");
    playlist.appendChild(songs.song_btn);
    
});

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
        last_music[1].artist = songs_event.artist;
        last_music[1].song_src = songs_event.song_src;

        if(last_music[0].name == last_music[1].name){
            current_index = last_music[0].index;

            audio.src = last_music[0].song_src;
            audio.play();
            
            songs_event.current_status = "run";
            current_song.innerText = current_index + 1;
            duplicate_code();

        }
        
        else if(last_music[0].name != last_music[1].name){            
            last_music[0].index = index;
            current_index = last_music[0].index;
            
            last_music[0].name = last_music[1].name;
            last_music[0].artist = last_music[1].artist;
            last_music[0].song_src = last_music[1].song_src;
            
            audio.src = last_music[0].song_src;
            audio.play();
            
            songs_event.current_status = "run";
            
            current_song.innerText = current_index + 1;
            duplicate_code();
            
        }
        
    });
});

// Complete Working On This Tomorrow And Inshallah U'll Get The Solution🤲.

previous_btn.addEventListener("click", () => {
    previous_song();

    current_song.innerText = current_index + 1;
    playlist_content[current_index].current_status = "run";
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
        
        playlist_content[current_index].current_status = "run";
        current_song.innerText = current_index + 1;
        duplicate_code();
        
    }
    
    else{
        play_pause_btn.innerHTML = pause_svg;
        audio.pause();
        
        current_song.innerText = current_index + 1;
        playlist_content[current_index].current_status = "pause";
        duplicate_code();
        
    }
    
});

next_btn.addEventListener("click", () => {
    next_song();

    current_song.innerText = current_index + 1;    
    playlist_content[current_index].current_status = "run";
    duplicate_code();

    conver_svg = true;
    play_pause_btn.innerHTML = play_svg;
});


audio.addEventListener("timeupdate",() => {
    
    if(audio.currentTime >= audio.duration)
        next_song();

});

let next_song = function(){
    current_index = (current_index + 1) % playlist_content.length;
    audio.src = playlist_content[current_index].song_src;
    
    audio.play().catch(error => {
        console.log("Nothing Importent, Inshallah");
        
    });
}

let previous_song = function(){
    current_index = (current_index - 1 + playlist_content.length) % playlist_content.length;
    audio.src = playlist_content[current_index].song_src;
    
    audio.play().catch(error => {
        console.log("Nothing Importent, Inshallah");
        
    });
}


// My Attempts Old Codes

// const song_btn = document.createElement("button");

// if(playlist_content[current_index + 1].id != last_music[0].index){
//     playlist_content[current_index + 1].current_status = "idle";
    
// }
// console.log(playlist_content[current_index].current_status);

// current_song.innerText = current_index + 1;

// songs_event.the_song.currentTime = 0;
// songs_event.the_song.play();
// song_name.innerText = last_music[0].name;
// artist_name.innerText = last_music[0].artist;
// status_song.innerText = playlist_content[current_index].current_status;
// playlist_content[last_music[0].index].the_song.pause();
// audio.pa();

// songs_event.the_song.currentTime = 0;
// songs_event.the_song.play();
// song_name.innerText = last_music[0].name;
// artist_name.innerText = last_music[0].artist;
// status_song.innerText = playlist_content[current_index].current_status;

// playlist_content.forEach((seek_bar_song) => {
    // console.log("I told you;)");

// });

// playlist_content[current_index].the_song.play();
// song_name.innerText = last_music[0].name;
// artist_name.innerText = last_music[0].artist;
// status_song.innerText = playlist_content[current_index].current_statu;
// console.log(playlist_content[current_index].song_src.duration);
// song_name.innerText = last_music[0].name;
// artist_name.innerText = last_music[0].artist;
// status_song.innerText = playlist_content[current_index].current_statu;

// last_music[0].index += 1;

// playlist_content[current_index].current_status = "run";

// // song_name.innerText = last_music[0].name;
// // artist_name.innerText = last_music[0].artist;

// // status_song.innerText = playlist_content[current_index].current_status;

// duplicate_code();
// current_song.innerText = current_index;

// console.log("Done");

// else{
//     console.log("sorry");
// }

//     if(last_music[0].index == playlist_content.length){
    //         playlist_content[last_music[0].index].the_song.pause();
//         playlist_content[last_music[0].index].the_song.currentTime = 0;

//         last_music[0].index = 0;

//         play_pause_btn.innerHTML = play_svg;
//         playlist_content[last_music[0].index].the_song.play();
        
//         playlist_content[last_music[0].index].current_statu = "run";
        
//         song_name.innerText = last_music[0].name;
//         artist_name.innerText = last_music[0].artist;
        
//         current_song.innerText = last_music[0].index + 1;
//         status_song.innerText = playlist_content[last_music[0].index].current_statu;
//     }
    
//     else{
//         playlist_content[last_music[0].index].the_song.pause();
//         last_music[0].index += 1;

//         play_pause_btn.innerHTML = play_svg;
//         playlist_content[last_music[0].index].the_song.play();
        
//         playlist_content[last_music[0].index].current_statu = "run";
        
//         song_name.innerText = last_music[0].name;
//         artist_name.innerText = last_music[0].artist;
        
//         current_song.innerText = last_music[0].index + 1;
//         status_song.innerText = playlist_content[last_music[0].index].current_statu;
//     }

// let next = playlist_content[last_music[0].index].song_btn.nextElementSibling;
// console.log(`The Next Song ${playlist_content[last_music[0].index].song_btn.nextElementSibling}`);

// last_music[0].index = last_music[1].index;

// last_music[0].index = index;
// last_music[0].index = index;

// console.log(last_music[0]);
// console.log(last_music[0]);

// playlist_content.forEach(() => {

// });

// seek_bar_song.pause();

// seek_bar_song.play();

// last_music[0].current_status_bool = !last_music[0].current_status_bool;
// conver_svg = last_music[0].current_status_bool;

// function play_pause_btn(song){

// last_music[1]["the_song"] = songs_event.song_btn;

// last_music[0].status = !last_music[0].status;

// last_music[0].status = !last_music[0].status;

// if(last_music[0].status){


    // console.log("Done");
    
// }
// else{
//     songs_event.the_song.pause();

//     songs_event.current_status = "pause";
    
//     song_name.innerText = songs_event.name;
//     artist_name.innerText = songs_event.artist;

//     status_song.innerText = songs_event.current_status;
//     console.log(`Didn't Work:(`);
    
// }

// last_music[0]["the_song"] = last_music[1].the_song;

// if(last_music[0].status){


    // console.log("Done");
    
// }
// else{
//     songs_event.the_song.pause();
//     songs_event.current_status = "pause";

//     song_name.innerText = songs_event.name;
//     artist_name.innerText = songs_event.artist;

//     status_song.innerText = songs_event.current_status;
//     console.log(`Didn't Work:(`);
    
// }

// last_music[0].the_song.pause();

// songs_event.the_song.currentTime = 0;
// last_music[0].the_song.play();

// const play_playlist_svg = `
//     <svg
//         width="14"
//         height="14"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         stroke-width="2"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         class="lucide lucide-play-icon lucide-play"
//         >
//         <path
//             d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
//         />
//     </svg>
// `;

// if(songs_event.current_status){
//     current_music = songs_event.the_song;
//     current_music.play();
// }
// else{
//     current_music.pause();
// }

// const play_playlist_span = document.createElement("span");

// This Idea Won't Add For Some Problems.
// last_music[0].song_btn.innerHTML = play_playlist_svg;

// This Idea Won't Add For Some Problems.
// songs_event.song_btn.appendChild(play_svg);
// songs_event.song_btn.innerHTML += play_playlist_svg;
    
// playlist_content.forEach((songs) => {
    //     const choose_song_btn = document.createElement("button");
    
    //     choose_song_btn.innerText = songs.name;
    //     choose_song_btn.classList.add("choose-song-btn");

//     playlist.appendChild(play_song_btn);
// });

// let play_song_btn
