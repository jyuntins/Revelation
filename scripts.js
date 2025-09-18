let chapters = [];
let currentBgm = null;
let bgmEnabled = true;

// Load user preference from localStorage
if(localStorage.getItem('bgmEnabled') !== null){
    bgmEnabled = localStorage.getItem('bgmEnabled') === 'true';
    const musicButton = document.querySelector('.music-toggle');
    if (bgmEnabled) {
        musicButton.textContent = "🎵 Music On";
    } 
    else {
        musicButton.textContent = "🔇 Music Off";
    }
}

// Load chapters JSON
fetch('data/chapters.json')
  .then(res => res.json())
  .then(data => {
    chapters = data;
    buildSidebar();
    loadChapter(1); // Load first chapter by default
  });

function buildSidebar() {
  const sidebar = document.querySelector('.sidebar');
  chapters.forEach(ch => {
    const a = document.createElement('a');
    a.textContent = ch.title;
    a.onclick = () => loadChapter(ch.id);
    sidebar.insertBefore(a, sidebar.querySelector('.music-toggle'));
  });
}

function toggleMusic() {
  bgmEnabled = !bgmEnabled;
  localStorage.setItem('bgmEnabled', bgmEnabled);
  document.querySelector('.music-toggle').textContent = bgmEnabled ? "🎵 Music On" : "🔇 Music Off";

  if(!bgmEnabled && currentBgm){
    currentBgm.fade(currentBgm.volume(), 0, 1000);
    setTimeout(()=> currentBgm.stop(), 1000);
  }
}

function playBgm(trackUrl) {
  if(!bgmEnabled) return;

  if(currentBgm && currentBgm._src === trackUrl) return;

  if(currentBgm){
    currentBgm.fade(currentBgm.volume(), 0, 1000);
    setTimeout(()=> currentBgm.stop(), 1000);
  }

  currentBgm = new Howl({
    src: [trackUrl],
    loop: true,
    volume: 0
  });
  currentBgm.play();
  currentBgm.fade(0,1,1000);
}

function loadChapter(id){
  const chapter = chapters.find(c => c.id === id);
  document.getElementById('chapter-content').innerHTML = `<h1>${chapter.title}</h1><p>${chapter.text}</p>`;
  playBgm(chapter.bgm);
}
