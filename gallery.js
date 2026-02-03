// ======== PROJECT DATA (edit this only) ========
const projects = [
  {
    title: "Laser-Cut Ukulele",
    course: "MS Sound",
    tags: ["Laser", "Wood", "Sound"],
    img: "pictures/uke1.jpg"
  },
  {
    title: "Robotics Challenge Bot",
    course: "Robotics 3–5",
    tags: ["Robotics", "Code"],
    img: "pictures/robot1.jpg"
  },
  {
    title: "3D Printed Mechanism Prototype",
    course: "Engineering",
    tags: ["3D Print", "CAD"],
    img: "pictures/print1.jpg"
  }
];

// ======== DOM ========
const pinboard = document.getElementById("pinboard");
const year = document.getElementById("year");
const search = document.getElementById("search");
const chips = document.getElementById("chips");

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxSub = document.getElementById("lightboxSub");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

year.textContent = new Date().getFullYear();

let activeTag = "All";
let currentList = [...projects];
let currentIndex = 0;

// ======== TAG CHIPS ========
const allTags = ["All", ...Array.from(new Set(projects.flatMap(p => p.tags || [])))];

function renderChips() {
  chips.innerHTML = "";
  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "chip" + (tag === activeTag ? " active" : "");
    btn.textContent = tag;

    btn.addEventListener("click", () => {
      activeTag = tag;
      renderChips();
      renderGrid();
    });

    chips.appendChild(btn);
  });
}

// ======== FILTERING ========
function filtered() {
  const q = (search?.value || "").trim().toLowerCase();

  return projects.filter(p => {
    const matchesTag = activeTag === "All" || (p.tags || []).includes(activeTag);

    const matchesSearch =
      !q ||
      (p.title || "").toLowerCase().includes(q) ||
      (p.course || "").toLowerCase().includes(q) ||
      (p.tags || []).join(" ").toLowerCase().includes(q);

    return matchesTag && matchesSearch;
  });
}

// ======== HELPER: subtle variation ========
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// ======== RENDER GRID ========
function renderGrid() {
  currentList = filtered();
  pinboard.innerHTML = "";

  currentList.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "pin";

    // Rotate card slightly
    card.style.setProperty("--tilt", `${rand(-1.1, 1.1).toFixed(2)}deg`);

    // Tape tint + angle variation (keeps it from looking copy/paste)
    // Keep hue in warm range so it reads like masking tape: 35–55
    card.style.setProperty("--tape-h", `${Math.round(rand(35, 55))}`);
    card.style.setProperty("--tape-s", `${Math.round(rand(35, 55))}%`);
    card.style.setProperty("--tape-l", `${Math.round(rand(86, 92))}%`);
    card.style.setProperty("--tape-a", `${rand(0.85, 0.98).toFixed(2)}`);
    card.style.setProperty("--tape-rot-l", `${rand(-12, -4).toFixed(1)}deg`);
    card.style.setProperty("--tape-rot-r", `${rand(4, 12).toFixed(1)}deg`);

    card.innerHTML = `
      <div class="photo">
        <img src="${p.img}" alt="${p.title}">
      </div>
      <div class="pin-body">
        <h3>${p.title}</h3>
        <div class="meta-row">
          <span class="badge">${p.course}</span>
          <span class="badge ghost">${(p.tags || []).join(" • ")}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(i));
    pinboard.appendChild(card);
  });
}

// ======== LIGHTBOX ========
function openLightbox(index) {
  currentIndex = index;
  loadLightbox(currentIndex);

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function loadLightbox(index) {
  const p = currentList[index];
  if (!p) return;

  lightboxImg.src = p.img;
  lightboxImg.alt = p.title || "";
  lightboxTitle.textContent = p.title || "";
  lightboxSub.textContent = p.course ? `${p.course} • ${(p.tags || []).join(" • ")}` : (p.tags || []).join(" • ");
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  lightboxImg.src = "";
}

function prevImage() {
  if (!currentList.length) return;
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  loadLightbox(currentIndex);
}

function nextImage() {
  if (!currentList.length) return;
  currentIndex = (currentIndex + 1) % currentList.length;
  loadLightbox(currentIndex);
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

// Click outside image closes
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "ArrowRight") nextImage();
});

search?.addEventListener("input", renderGrid);

// INIT
renderChips();
renderGrid();
