let chapters = [];
let bgmEnabled = false;
let currentBgm = null;

const toggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

// Listen for clicks
toggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');  // add/remove class
});


// Load chapters.json and add titles to sidebar
async function loadChapters() {
  try {
    const res = await fetch('data/chapters.json');  // load JSON file
    chapters = await res.json();              // parse JSON

    const list = document.querySelector('.chapter-list');
    list.innerHTML = ""; // clear anything before adding

    // Add each chapter title to sidebar
    chapters.forEach(chapter => {
      const item = document.createElement('div');
      item.textContent = chapter.title;
      item.classList.add('chapter-item');
      item.addEventListener('click', () => {
        loadChapter(chapter.id);
      });
      list.appendChild(item);
    });
  } catch (err) {
    console.error("Failed to load chapters:", err);
  }
}

async function loadChapter(id) {
  const chapter = chapters.find(c => c.id === id);
  const content = document.getElementById('chapter-content');
  console.log("Loading chapter:", chapter);
  if (chapter) {
    try {
      // Fetch text from external file
      const res = await fetch(chapter.textFile);
      const text = await res.text();

      // Update page
      content.innerHTML = `
        <h1>${chapter.title}</h1>
        <pre>${text}</pre>
      `;

      if (chapter.bgm && bgmEnabled) {
        playBgm(chapter.bgm);
      }
    } catch (err) {
      console.error("Failed to load text file:", err);
      content.innerHTML = `<h1>${chapter.title}</h1><p>(Text file missing)</p>`;
    }
  }
}

function playBgm(trackUrl) {
  if (!bgmEnabled) return;

  if (currentBgm && currentBgm._src === trackUrl) return;

  // If something is playing, fade it out and stop it
  if (currentBgm) {
    const oldBgm = currentBgm;  // keep reference to old one
    oldBgm.fade(oldBgm.volume(), 0, 1000);
    setTimeout(() => oldBgm.stop(), 1000);
  }

  // Start the new track
  currentBgm = new Howl({
    src: [trackUrl],
    loop: true,
    volume: 0
  });
  currentBgm.play();
  currentBgm.fade(0, 1, 1000);
}

document.querySelector('.sidebar-header').addEventListener('click', () => {
  const content = document.getElementById('chapter-content');
  content.innerHTML = `
    <h1>my novel</h1>
    <p> dfdfd</p>
  `;

  // Play same BGM as Chapter 1 for welcome page
  const firstChapter = chapters.find(c => c.id === 1);
  if (firstChapter && firstChapter.bgm && bgmEnabled) {
    playBgm(firstChapter.bgm);
  }
});

const musicIcon = document.querySelector('.music-icon');

musicIcon.addEventListener('click', () => {
  bgmEnabled = !bgmEnabled; // flip the state

  if (bgmEnabled) {
    musicIcon.textContent = "🎵";  // show music note

    const contentTitle = document.querySelector('#chapter-content h1');
    if (contentTitle) {
      const chapter = chapters.find(c => c.title === contentTitle.textContent);
      if (chapter && chapter.bgm) {
        playBgm(chapter.bgm); // start from the beginning
      }
      else {
        const firstChapter = chapters.find(c => c.id === 1);
        playBgm(firstChapter.bgm);
      }
    }
  } 
  
  else {
    musicIcon.textContent = "🔇";  // show mute icon
    if (currentBgm) {
      currentBgm.stop(); // fully stop current track
      currentBgm = null; // reset reference
    }
  }
});

// Run it once page loads
loadChapters();


