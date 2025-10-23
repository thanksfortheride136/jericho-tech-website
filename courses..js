// keeps your mobile hamburger + footer year consistent with the rest of the site
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links  = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
