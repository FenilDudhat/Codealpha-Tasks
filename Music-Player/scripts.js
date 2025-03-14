/* script.js */
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const playlistContainer = document.getElementById('playlist-container');
const searchBar = document.getElementById('search-bar');
const seekSlider = document.getElementById('seek-slider');
const timeDisplay = document.getElementById('time-display');

let currentTrackIndex = 0;
let isPlaying = false;

// Sample music data (replace with your own)
const musicData = [
    { title: 'Aarambh', artist: 'Piyush Mishra', file: 'E:/Web Development/music/Aarambh.mp3', category: 'Energetic / Motivational' },
    { title: 'Saudebaazi', artist: 'Pritam, Javed Ali', file: 'E:/Web Development/music/saudebaazi.mp3', category: 'Soulful / Emotional' },
    { title: 'Ve Kamleya', artist: 'Pritam, Arijit Singh,Shreya Ghoshal', file: 'E:/Web Development/music/ve_kamleya.mp3', category: 'Romantic' },
    { title: 'Tum Se Teri Baaton Mein', artist: '', file: 'E:/Web Development/music/Tum_Se_Teri_Baaton_Mein.mp3', category: 'Romantic'},
    { title: 'Tere_Hawaale', artist: 'Pritam, Arijit Singh, Shilpa Rao', file: 'E:/Web Development/music/tere_hawaale.mp3', category: 'Romantic'},
    { title: 'Saaiyaan', artist: '', file: 'E:/Web Development/music/Saaiyaan.mp3', category: 'Soulful / Emotional'},
    { title: 'Namo Namo Ji Shankara', artist: 'Amit Trivedi', file: 'E:/Web Development/music/Namo_Namo_Ji_Shankara.mp3', category: 'Energetic / Motivational'},
    { title: 'Qaafirana', artist: 'Arijit Singh, Nikhita Gandhi', file: 'E:/Web Development/music/Qaafirana.mp3', category: 'Romantic'}
];

function loadTrack(index) {
    if (index >= 0 && index < musicData.length) {
        audioPlayer.src = musicData[index].file;
        audioPlayer.load();
        currentTrackIndex = index;
        if (isPlaying) {
            audioPlayer.play();
        }
    }
}

function playPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicData.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + musicData.length) % musicData.length;
    loadTrack(currentTrackIndex);
}

function updateVolume() {
    audioPlayer.volume = volumeSlider.value;
}

function renderPlaylist(data) {
    playlistContainer.innerHTML = '';
    data.forEach((song, index) => {
        const item = document.createElement('div');
        item.classList.add('playlist-item');
        item.innerHTML = `
            <span>${song.title} - ${song.artist} (${song.category})</span>
        `;
        item.addEventListener('click', () => {
            loadTrack(index);
            if(isPlaying == false){
                playPause();
            }
        });
        playlistContainer.appendChild(item);
    });
}

function searchMusic() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredData = musicData.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.category.toLowerCase().includes(searchTerm)
    );
    renderPlaylist(filteredData);
}

function updateSeekSlider() {
    seekSlider.max = audioPlayer.duration;
    seekSlider.value = audioPlayer.currentTime;
    updateTimeDisplay();
}

function seekTo() {
    audioPlayer.currentTime = seekSlider.value;
    updateTimeDisplay();
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function updateTimeDisplay() {
    const currentTime = formatTime(audioPlayer.currentTime);
    const duration = formatTime(audioPlayer.duration);
    timeDisplay.textContent = `${currentTime} / ${duration}`;
}

audioPlayer.addEventListener('timeupdate', updateSeekSlider);
seekSlider.addEventListener('input', seekTo);
audioPlayer.addEventListener('loadedmetadata', updateTimeDisplay);

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
volumeSlider.addEventListener('input', updateVolume);
searchBar.addEventListener('input', searchMusic);

loadTrack(currentTrackIndex);
renderPlaylist(musicData); // Initial playlist render