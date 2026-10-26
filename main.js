// Playlist Element.
const playlist = document.querySelector(".playlist");
const music_list = document.getElementById("music-list");

const repeat_btn = document.getElementById("repeat-btn");
const previous_btn = document.getElementById("previous-btn");
const play_pause_btn = document.getElementById("play-pause-btn");
const next_btn = document.getElementById("next-btn");
const shuffle_btn = document.getElementById("shuffle-btn");

// Convert SVG Variable.
let conver_repeat_btn_svg = false;
let conver_play_btn_svg = false;
let conver_shuffle_btn_svg = false;

// SVG Icons Constant.
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

const shuffle_on_svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shuffle preview-icon">
            <path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/>
            <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/>
            <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/>
            <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/>
    </svg>
`;

const shuffle_off_svg = `
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L9.5 9.5M14.5 14.5L21 21M21 21H16M21 21V16M4 20L21 3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

const repeat_on_svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat preview-icon">
            <path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
            <path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>
    </svg>
`;

const repeat_off_svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-off preview-icon"><path d="M11.656 6H21l-4-4"/>
            <path d="M17.898 17.898A4 4 0 0 1 17 18H3l4-4"/><path d="m2 2 20 20"/>
            <path d="M21 13v1a4 4 0 0 1-.171 1.159"/><path d="m21 6-4 4"/>
            <path d="M3 11v-1a4 4 0 0 1 3.102-3.898"/><path d="m7 22-4-4"/>
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

let playlist_content = []

const display_playlist = () => {

    playlist_content.forEach((songs, index) => {

        const music_list_content = document.createElement("li");

        songs.id = index + 1;

        songs.song_btn = document.createElement("button");

        songs.song_btn.innerText = songs.name;
        songs.song_btn.title = songs.name;

        songs.song_btn.classList.add("song-btn");
        music_list_content.appendChild(songs.song_btn);

        music_list.appendChild(music_list_content);
            
    });
}

const button_events = () => {

    playlist_content.forEach((songs_event, index) => {
        
        songs_event.song_btn.addEventListener("click", () => {

            play_pause_btn.innerHTML = play_svg;
            conver_play_btn_svg = true;
            
            if(current_index == index){
                
                current_click_song();
                
                audio.src = playlist_content[current_index].song_src;
                
                audio.play();
                
                songs_event.current_status = "live";
                current_song.innerText = current_index + 1;
                song_info();
                
            }else if(current_index != index){

                previous_click_song();
                
                current_index = index;
                
                current_click_song();
                
                audio.src = playlist_content[current_index].song_src;

                audio.play();
                
                songs_event.current_status = "live";
                current_song.innerText = current_index + 1;
                song_info();
                
            }
            
        });

    });

}

const fetch_playlist = async () => {

    try{

        const response = await fetch("Playlist_Music.json");

        if(!response.ok){

            throw new Error("Failed To Fetch Playlist...");
        
        }

        playlist_content = await response.json();

        display_playlist();

        button_events();
        
    }catch(error){

        console.error("Can't Load Music", error);
    
    }
}

fetch_playlist();

const shuffle = () => {

    return Math.floor(Math.random() * playlist_content.length);

}

const song_info = () => {

    song_name.innerText = playlist_content[current_index].name;
    artist_name.innerText = playlist_content[current_index].artist;
    status_song.innerText = playlist_content[current_index].current_status;

};

const current_click_song = () => {

    let weight = window.innerWidth <= 480 ? "900" : "600";

    playlist_content[current_index].song_btn.style.cssText = 
        `
            color: #0000ff;
            font-weight: ${weight};
        `;
        
};

const previous_click_song = () => {

    playlist_content[current_index].song_btn.style.cssText =
        `
            color: #000000;
            font-weight: none;
        `;
};

// Complete Working On This Tomorrow And Inshallah U'll Get The Solution🤲.
previous_btn.addEventListener("click", () => {

    previous_click_song();

    previous_song();
            
    current_click_song();

    playlist_content[current_index].current_status = "live";
    current_song.innerText = current_index + 1;
    
    song_info();
    
    conver_play_btn_svg = true;
    play_pause_btn.innerHTML = play_svg;

});

// Conversion SVG To Play/Pause SVGs And Play/Pause Musics.
const play_pause_fun = () => {
    
    conver_play_btn_svg = !conver_play_btn_svg;
    
    if(conver_play_btn_svg){

        current_click_song();
        play_pause_btn.title = "Play Song";

        play_pause_btn.innerHTML = play_svg;

        if(audio.currentTime == 0)
            audio.src = playlist_content[current_index].song_src;

        audio.play();
        
        playlist_content[current_index].current_status = "live";
        current_song.innerText = current_index + 1;
        song_info();
        
    }else{
        play_pause_btn.title = "Pause Song";

        play_pause_btn.innerHTML = pause_svg;

        audio.pause();
        
        playlist_content[current_index].current_status = "pause";
        current_song.innerText = current_index + 1;
        song_info();
        
    }
}

play_pause_btn.addEventListener("click", () => {

    play_pause_fun();

});

repeat_btn.addEventListener("click", () => {

    conver_repeat_btn_svg = !conver_repeat_btn_svg;

    if(conver_repeat_btn_svg){

        repeat_btn.innerHTML = repeat_on_svg;
        repeat_btn.title = "Repeat ON";
        repeat_song.textContent = "ON";
        
    }else{
        
        repeat_btn.innerHTML = repeat_off_svg;
        repeat_btn.title = "Repeat OFF";
        repeat_song.textContent = "OFF";

    }

});

shuffle_btn.addEventListener("click", () => {

    conver_shuffle_btn_svg = !conver_shuffle_btn_svg;

    if(conver_shuffle_btn_svg){

        shuffle_btn.innerHTML = shuffle_on_svg;
        shuffle_btn.title = "Shuffle ON";
        shuffle_song.textContent = "ON";
        
    }else{
        
        shuffle_btn.innerHTML = shuffle_off_svg;
        shuffle_btn.title = "Shuffle OFF";
        shuffle_song.textContent = "OFF";

    }

});

// window.addEventListener("keydown", (event) => {

//     if(event.code === "Space"){
//         play_pause_fun();
//     }

// });

next_btn.addEventListener("click", () => {

    previous_click_song();

    next_song();

    current_click_song();

    playlist_content[current_index].current_status = "live";
    current_song.innerText = current_index + 1;
    
    song_info();

    conver_play_btn_svg = true;
    play_pause_btn.innerHTML = play_svg;

});

audio.onended = () => {

    previous_click_song();

    if(conver_repeat_btn_svg){

        audio.src = playlist_content[current_index].song_src;
        audio.play();

    }
    else if(conver_shuffle_btn_svg){

        current_index = shuffle();
        audio.src = playlist_content[current_index].song_src;
        audio.play();

    }else{

        next_song();
    
    }

    current_click_song();
    
    playlist_content[current_index].current_status = "live";
    
    current_song.innerText = current_index + 1;
    song_info();
}

const next_song = () => {

    current_index = (current_index + 1) % playlist_content.length;
    audio.src = playlist_content[current_index].song_src;
    
    audio.play().catch(error => {

        console.log("Nothing Important, Inshallah");
        
    });
}

const previous_song = () => {

    current_index = (current_index - 1 + playlist_content.length) % playlist_content.length;
    audio.src = playlist_content[current_index].song_src;
    
    audio.play().catch(error => {

        console.log("Nothing Important, Inshallah");
        
    });
}

// Created By Dark Knight:-