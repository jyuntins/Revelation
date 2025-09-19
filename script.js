const toggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

// Listen for clicks
toggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');  // add/remove class
});

// let chapters = [];

// Load chapters JSON
// async function loadChapters() {
//     try {
//         const res = await fetch('data/chapters.json');
//         const data = await res.json();
//         chapters = data;
//         buildSidebar();
//         loadChapter(1); // Load first chapter
//     } catch (error) {
//         console.error("Failed to load chapters:", error);
//     }
// }
// loadChapters();

// Build sidebar with chapter links
// function buildSidebar() {
//     const linksContainer = document.querySelector('.chapter-links');
//     linksContainer.innerHTML = "";

//     chapters.forEach(ch => {
//         const a = document.createElement('a');
//         a.textContent = ch.title;
//         a.onclick = () => loadChapter(ch.id);
//         linksContainer.appendChild(a);
//     });
// }

// Load chapter into content area
// function loadChapter(id) {
//     const chapter = chapters.find(c => c.id === id);
//     document.getElementById('chapter-content').innerHTML =
//       `<h1>${chapter.title}</h1><p>${chapter.text}</p>`;

//     // Highlight active link
//     const links = document.querySelectorAll('.chapter-links a');
//     links.forEach(a => {
//         a.classList.toggle('active', a.textContent === chapter.title);
//     });
// }

// Toggle sidebar collapse/expand
// function toggleSidebar() {
//   const sidebar = document.querySelector('.sidebar');
//   const btn = document.querySelector('.sidebar-toggle');

//   sidebar.classList.toggle('collapsed');

//   // Update icon
//   btn.textContent = sidebar.classList.contains('collapsed') ? "☰" : "✖";
// }
