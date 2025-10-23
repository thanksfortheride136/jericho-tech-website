// ----- Data (add as many as you want) -----
const COURSES = [
  { title: "Robotics 3", cat: "robotics", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    text: "Design process, rapid prototyping, CAD fundamentals, laser cutting, and 3D printing." },

  { title: "Robotics 4", cat: "robotics", img: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=1200&auto=format&fit=crop",
    text: "Mechanisms, materials, and product development. Team capstone prototype & showcase." },

  { title: "Robotics 5", cat: "robotics", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    text: "Computational thinking, data & the Internet, plus a creative programming project." },

  { title: "Technology 6", cat: "computerscience", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    text: "Foundations of coding with Python & JavaScript: variables, logic, functions, and mini-apps." },

  { title: "Technology 7", cat: "engineering", img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1200&auto=format&fit=crop",
    text: "Maker skills, safety, and design challenges using hand tools, laser cutters, and 3D printers." },

  { title: "Gadgets & Gizmos 7", cat: "engineering", img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1200&auto=format&fit=crop",
    text: "Maker skills, safety, and design challenges using hand tools, laser cutters, and 3D printers." },

  { title: "Technology 8", cat: "design", img: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1200&auto=format&fit=crop",
    text: "Parametric CAD, slicing, CAM workflows, and rapid iteration with 3D printers & laser cutters." },

  { title: "World of Technology 8", cat: "design", img: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1200&auto=format&fit=crop",
    text: "Parametric CAD, slicing, CAM workflows, and rapid iteration with 3D printers & laser cutters." },

  { title: "Video Production 8", cat: "research", img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200&auto=format&fit=crop",
    text: "Embedded systems with Arduino: sensors, data logging, automation, and product prototypes." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  { title: "MS Research: Ukulele Sound Lab", cat: "research", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    text: "Acoustics, instrumentation, and data analysis with custom laser-cut instruments." },

  // add more…
];

// ----- Rendering / Filtering / Paging -----
const PAGE_SIZE = 9;
let currentPage = 1;
let currentCat = "all";
let currentQuery = "";

const $grid = document.getElementById("coursesGrid");
const $loadMore = document.getElementById("loadMore");
const $count = document.getElementById("resultCount");
const $chips = document.querySelectorAll(".chip");
const $search = document.getElementById("searchInput");

// quick keyboard focus for search with "/"
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    $search?.focus();
  }
});

function filteredData() {
  const q = currentQuery.trim().toLowerCase();
  return COURSES.filter(c => {
    const matchesCat = currentCat === "all" || c.cat === currentCat;
    const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.text.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });
}

function render() {
  const data = filteredData();
  const total = data.length;
  const end = Math.min(currentPage * PAGE_SIZE, total);
  const visible = data.slice(0, end);

  // grid
  $grid.innerHTML = visible.map(cardHTML).join("");

  // controls
  if (end >= total || total === 0) {
    $loadMore.style.display = "none";
  } else {
    $loadMore.style.display = "inline-block";
  }
  $count.textContent = total
    ? `${end} of ${total} courses`
    : `No courses found`;
}

function cardHTML(c) {
  // optionally link the card to a details page later (e.g., course.html?slug=...)
  return `
    <article class="card">
      <img src="${c.img}" alt="">
      <div class="card-body">
        <h3>${c.title}</h3>
        <p>${c.text}</p>
      </div>
    </article>
  `;
}

// events
$chips.forEach(chip => {
  chip.addEventListener("click", () => {
    $chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    currentCat = chip.dataset.cat;
    currentPage = 1;
    render();
  });
});

$search.addEventListener("input", (e) => {
  currentQuery = e.target.value || "";
  currentPage = 1;
  render();
});

$loadMore.addEventListener("click", () => {
  currentPage += 1;
  render();
});

// first render
render();
