// ============================
// Course Data
// ============================
const COURSES = [
  { 
    title: "Robotics 3", 
    cat: ["robot"], 
    img: "pictures/edison.png",
    text: "Introductory robotics course using Edison robots and Scratch. In this introductory class students will learn about how people communicate and code robots."
  },

  { 
    title: "Robotics 4", 
    cat: ["robot"], 
    img: "pictures/spike.png",
    text: "Robotics course introducing students to Spike Prime robots. Students are able to further their knowledge about robotics using more complex robots, giving them more practice with robotics and computer science."
  },

  { 
    title: "Robotics 5", 
    cat: ["robot"], 
    img: "pictures/spike2.jpg",
    text: "The final course in the elementary school robotics program, builds upon the previous skills students have learned using Spike Prime robots."
  },

  { 
    title: "Technology 6", 
    cat: ["middle"], 
    img: "pictures/tech6.jpg",
    text: "The introductory middle school technology course focusing an introduction to design, woodworking and digital tools."
  },

  { 
    title: "Technology 7", 
    cat: ["middle"], 
    img: "pictures/tech7.jpg",
    text: "Technology 7 builds on the previous years, furthering skills in 3-D printing, design, lasercutting and computer science."
  },

  { 
    title: "Gadgets & Gizmos 7", 
    cat: ["middle"], 
    img: "pictures/gadgets.png",
    text: "Maker skills, safety, and design challenges using hand tools, laser cutters, and 3D printers."
  },

  { 
    title: "Technology 8", 
    cat: ["middle"], 
    img: "pictures/tech8.jpg",
    text: "The final technology class in the middle school, builds on skills learned in the prior years, deepening students knowledge of technology & engineering."
  },

  { 
    title: "World of Technology 8", 
    cat: ["middle"], 
    img: "pictures/mousecar.png",
    text: "Parametric CAD, slicing, CAM workflows, and rapid iteration with 3D printers & laser cutters."
  },

  { 
    title: "Video Production 8", 
    cat: ["video", "middle"],   // ✅ supports multiple categories
    img: "pictures/finalcut.png",
    text: "Camera basics, editing, and storytelling with studio workflow and production roles."
  },

  { 
    title: "MS Research: Engineering", 
    cat: ["middle"], 
    img: "pictures/trebuchet.jpg",
    text: "Students explore how the engineering design process can help them research a problem, create a design and go from an idea in their head to a real world prototype."
  },

  { 
    title: "MS Research: The Science of Sound", 
    cat: ["middle"], 
    img: "pictures/uke.jpg",
    text: "Students explore the science of sound by creating a custom ukulele that functions as an instrument but also a tool for testing sound waves."
  },

  { 
    title: "Video Game Development", 
    cat: ["comp", "high"], 
    img: "pictures/unity.png",
    text: "Students utilize Unity 3-D, Adobe illustrator, Blender & the C# programming language to contruct video games."
  },

  { 
    title: "Design & Drawing for Production (DDP)", 
    cat: ["engineering", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "In Design and Drawing for Production, students turn ideas into reality through sketching, technical drawing, and 3D modeling. They apply the engineering design process to create and refine products, building problem-solving and design skills through hands-on projects."
  },

  { 
    title: "Introduction to Engineering Design (IED)", 
    cat: ["engineering", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Students dig deep into the engineering design process, applying math, science, and engineering standards to hands-on projects like designing a new toy or improving an existing product."
  },

  { 
    title: "Computer Integrated Manufacturing (CIM)", 
    cat: ["engineering", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Students discover and explore manufacturing processes, product design, robotics, and automation, and then they apply what they have learned to design solutions for real-world manufacturing problems."
  },

  { 
    title: "Principles of Engineering (POE)", 
    cat: ["engineering", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Students explore how modern engineers help improve the world through diverse engineering fields, such as product design, mechanical design, infrastructure, and sustainability. Students learn and use some of the cutting edge tools engineers use in robotics, 3D modeling, programming, and prototyping. "
  },

  { 
    title: "Civil Engineering & Architecture (CEA)", 
    cat: ["engineering", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Students learn important aspects of building and site design and development, and then they apply what they know to design a commercial building."
  },

  { 
    title: "Robotics (High School)", 
    cat: ["robot", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Students learn the basics about robotics, sensors, computer science and mechanics."
  },

  { 
    title: "Video Production (High School)", 
    cat: ["video", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Introductory level high school video production class."
  },

  { 
    title: "Advanced Video Production", 
    cat: ["video", "high"], 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Advanced level high school video production class."
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
