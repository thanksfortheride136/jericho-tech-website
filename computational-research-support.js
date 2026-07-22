"use strict";


// ======================================================
// FOOTER YEAR
// ======================================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ======================================================
// MOBILE NAVIGATION
// ======================================================

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  navLinks.addEventListener("click", (event) => {
    const selectedLink = event.target.closest("a");

    if (!selectedLink) {
      return;
    }

    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}


// ======================================================
// STEP ACCORDIONS
// Only one step remains open in each individual card.
// ======================================================

const pathwayCards = document.querySelectorAll(".pathway-card");

pathwayCards.forEach((card) => {
  const steps = card.querySelectorAll(".step-item");

  steps.forEach((step) => {
    step.addEventListener("toggle", () => {
      if (!step.open) {
        return;
      }

      // Close other open steps only within this card.
      steps.forEach((otherStep) => {
        if (otherStep !== step && otherStep.open) {
          otherStep.open = false;
        }
      });

      /*
        On narrow screens, gently bring the opened row
        into view after the browser finishes expanding it.
      */
      if (window.innerWidth <= 820) {
        window.requestAnimationFrame(() => {
          step.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      }
    });
  });
});


// ======================================================
// PLACEHOLDER RESOURCE LINKS
// Prevent unfinished links from jumping to the page top.
// Remove the placeholder-link class after adding a URL.
// ======================================================

const placeholderLinks = document.querySelectorAll(".placeholder-link");

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });

  link.setAttribute(
    "aria-label",
    `${link.textContent.trim()} - link coming soon`
  );
});


// ======================================================
// CLOSE OPEN STEP WITH ESCAPE
// ======================================================

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const openStep = document.querySelector(".step-item[open]");

  if (!openStep) {
    return;
  }

  const summary = openStep.querySelector("summary");

  openStep.open = false;

  if (summary) {
    summary.focus();
  }
});
