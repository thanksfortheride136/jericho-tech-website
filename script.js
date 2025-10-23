// ============================
// Mobile menu toggle
// ============================
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ============================
// Footer year
// ============================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================
// Hero video rotation
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const vids = [
    "banner1.MOV",
    "banner2.MOV",
    "banner3.MOV"
  ];

  const v = document.getElementById("heroVideo");
  if (!v) return; // only run this on index.html

  let i = 0;

  function setAndPlay(n) {
    v.src = vids[n];
    v.load();
    const p = v.play();
    if (p && p.catch) p.catch(() => {}); // ignore autoplay promise errors
  }

  v.addEventListener("ended", () => {
    i = (i + 1) % vids.length;
    setAndPlay(i);
  });

  // Resume playback when tab refocuses
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) v.play();
  });

  setAndPlay(0);
});
