// ============================
// Mobile menu toggle + footer year
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links  = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ============================
  // Hero video rotation
  // ============================
  const v = document.getElementById("heroVideo");
  if (!v) return; // only run on pages that have the hero video

  // IMPORTANT: paths reflect the new /videos/ folder
  const vids = [
    "videos/banner1.MOV",
    "videos/banner2.MOV",
    "videos/banner3.MOV"
  ];

  let i = 0;

  function setAndPlay(n) {
    v.src = vids[n];
    v.load(); // ensures the new source is picked up
    const p = v.play();
    // Ignore autoplay promise rejections (e.g., browser policy)
    if (p && typeof p.catch === "function") p.catch(() => {});
  }

  // Loop to the next video when one ends
  v.addEventListener("ended", () => {
    i = (i + 1) % vids.length;
    setAndPlay(i);
  });

  // If the tab regains focus, try to resume playback
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  });

  // Kick things off
  setAndPlay(0);
});
