// ============================
// Course Data
// ============================
const COURSES = [
  { 
    title: "Robotics 3", 
    cat: ["robot"], 
    img: "pictures/edison.png",
    text: "Design process, rapid prototyping, CAD fundamentals, laser cutting, and 3D printing."
  },

  { 
    title: "Robotics 4", 
    cat: ["robot"], 
    img: "pictures/spike.png",
    text: "Mechanisms, materials, and product development. Team capstone prototype & showcase."
  },

  { 
    title: "Robotics 5", 
    cat: ["robot"], 
    img: "pictures/spike2.jpg",
    text: "Computational thinking, data & the Internet, plus a creative programming project."
  },

  { 
    title: "Technology 6", 
    cat: ["middle"], 
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    text: "Foundations of coding with Python & JavaScript: variables, logic, functions, and mini-apps."
  },

  { 
    title: "Technology 7", 
    cat: ["middle"], 
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1200&auto=format&fit=crop",
    text: "Maker skills, safety, and design challenges using hand tools, laser cutters, and 3D printers."
  },

  { 
    title: "Gadgets & Gizmos 7", 
    cat: ["middle"], 
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1200&auto=format&fit=crop",
    text: "Maker skills, safety, and design challenges using hand tools, laser cutters, and 3D printers."
  },

  { 
    title: "Technology 8", 
    cat: ["middle"], 
    img: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1200&auto=format&fit=crop",
    text: "Parametric CAD, slicing, CAM workflows, and rapid iteration with 3D printers & laser cutters."
  },

  { 
    title: "World of Technology 8", 
    cat: ["middle"], 
    img: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1200&auto=format&fit=crop",
    text: "Parametric CAD, slicing, CAM workflows, and rapid iteration with 3D printers & laser cutters."
  },

  { 
    title: "Video Production 8", 
    cat: ["video", "middle"],   // ✅ supports multiple categories
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200&auto=format&fit=crop",
    text: "Camera basics, editing, and storytelling with studio workflow and production roles."
  },

  { 
    title: "MS Research: Engineering", 
    cat: ["middle"], 
    img: "pictures/trebuchet.jpg",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments."
  },

  { 
    title: "MS Research: Ukulele Sound Lab", 
    cat: ["middle"], 
    img: "pictures/uke.jpg",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments."
  },

  { 
    title: "Video Game Development", 
    cat: ["comp"], 
    img: "pictures/unity.png",
    text: "Game loops, sprites, and level design — create and publish a playable project."
  },

  { 
    title: "Design & Drawing for Production (DDP)", 
    cat: ["engineering"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Sketching, CAD, and fabrication; turn concepts into manufacturable designs."
  },

  { 
    title: "Introduction to Engineering Design (IED)", 
    cat: ["engineering"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Design process, modeling, and documentation for real-world engineering problems."
  },

  { 
    title: "Computer Integrated Manufacturing (CIM)", 
    cat: ["engineering"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "CNC, robotics, and automation workflows from CAD to production."
  },

  { 
    title: "Principles of Engineering (POE)", 
    cat: ["engineering"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Mechanics, circuits, and systems — breadth-first tour of core engineering fields."
  },

  { 
    title: "Civil Engineering & Architecture (CEA)", 
    cat: ["engineering"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Site planning, structures, and architectural modeling."
  },

  { 
    title: "Robotics (HS)", 
    cat: ["robot"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Advanced mechanisms, sensors, and controls with competition-style builds."
  },

  { 
    title: "Video Production", 
    cat: ["video"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Editing, directing, and studio management for advanced student productions."
  },

  { 
    title: "Advanced Video Production", 
    cat: ["video"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Cinematography, lighting, and sound design for short films and broadcast media."
  },
];

// ============================
// Filtering / Paging / Render
// ============================
const PAGE_SIZE = 9;
let currentPage = 1;
let currentCat = "all";
let currentQuery = "";

const $grid = document.getElementById("coursesGrid");
const $loadMore = document.getElementById("loadMore");
const $count = document.getElementById("resultCount");
const $chips = document.querySelectorAll(".chip");
const $search = document.getElementById("searchInput");

// Focus search quickly with "/"
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    $search?.focus();
  }
});

// Generate slugs automatically
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
COURSES.forEach((c) => (c.slug ??= slugify(c.title)));

// Filter courses
function filteredData() {
  const q = currentQuery.trim().toLowerCase();
  return COURSES.filter((c) => {
    const categories = Array.isArray(c.cat) ? c.cat : [c.cat];
    const matchesCat = currentCat === "all" || categories.includes(currentCat);
    const matchesQuery =
      !q || c.title.toLowerCase().includes(q) || c.text.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });
}

// Create clickable cards
function cardHTML(c) {
  return `
    <a class="card card-link" href="${c.slug}.html" aria-label="${c.title}">
      <img src="${c.img}" alt="">
      <div class="card-body">
        <h3>${c.title}</h3>
        <p>${c.text}</p>
      </div>
    </a>
  `;
}


// Render visible courses
function render() {
  const data = filteredData();
  const total = data.length;
  const end = Math.min(currentPage * PAGE_SIZE, total);
  const visible = data.slice(0, end);

  $grid.innerHTML = visible.map(cardHTML).join("");

  if (end >= total || total === 0) {
    $loadMore.style.display = "none";
  } else {
    $loadMore.style.display = "inline-block";
  }

  $count.textContent = total ? `${end} of ${total} courses` : `No courses found`;
}

// Chip filters
$chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    $chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    currentCat = chip.dataset.cat;
    currentPage = 1;
    render();
  });
});

// Search filter
$search.addEventListener("input", (e) => {
  currentQuery = e.target.value || "";
  currentPage = 1;
  render();
});

// Load more button
$loadMore.addEventListener("click", () => {
  currentPage += 1;
  render();
});

// Initial render
render();
