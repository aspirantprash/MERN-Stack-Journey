// Prashant Sharma Portfolio — Vanilla JavaScript

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = document.querySelectorAll("#site-nav a");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const visibleCount = document.querySelector("#visible-count");
const projectStatus = document.querySelector("#project-status");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");

// Keep the footer year current.
document.querySelector("#current-year").textContent = new Date().getFullYear();

// Mobile navigation: open/close and close after selecting a section.
function closeMenu() {
  siteNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

// Project filters.
function filterProjects(category) {
  let count = 0;

  projectCards.forEach((card) => {
    const matches = category === "all" || card.dataset.category === category;
    card.hidden = !matches;
    if (matches) count += 1;
  });

  visibleCount.textContent = count;
  projectStatus.setAttribute("aria-label", `Showing ${count} projects`);
  emptyState.hidden = count !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    filterProjects(selectedFilter);
  });
});

// Subtle reveal animation, with a fallback for browsers without IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Placeholder links show a useful reminder rather than jumping to the top of the page.
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Replace this placeholder with your real GitHub, demo, or social profile URL in index.html.");
  });
});

// The email address is intentionally a placeholder. Warn the owner if it has not been replaced.
const emailLink = document.querySelector("#email-link");
emailLink.addEventListener("click", (event) => {
  if (emailLink.getAttribute("href").includes("YOUR_EMAIL@example.com")) {
    event.preventDefault();
    showToast("Add your real email address to the mailto link in index.html first.");
  }
});
