// Select HTML elements
const searchInput = document.querySelector("#project-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const visibleCount = document.querySelector("#visible-count");
const projectCount = document.querySelector("#project-count");
const emptyState = document.querySelector("#empty-state");
const resetButton = document.querySelector("#reset-search");
const currentYear = document.querySelector("#current-year");

let activeFilter = "all";

// Display current year
currentYear.textContent = new Date().getFullYear();

// Set total number of projects
projectCount.textContent = String(projectCards.length).padStart(2, "0");

// Search and filter projects
function filterProjects() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleProjects = 0;

    projectCards.forEach((card) => {
        const projectName = card.dataset.name.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = projectName.includes(searchTerm);
        const matchesCategory =
            activeFilter === "all" || category === activeFilter;

        const shouldShow = matchesSearch && matchesCategory;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleProjects++;
        }
    });

    // Update visible project count
    visibleCount.textContent = visibleProjects;

    // Show empty state when no projects match
    emptyState.hidden = visibleProjects !== 0;
}

// Category filter buttons
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            const isActive = item === button;

            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        filterProjects();
    });
});

// Search as the user types
searchInput.addEventListener("input", filterProjects);

// Reset search and filters
function resetFilters() {
    searchInput.value = "";
    activeFilter = "all";

    filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === "all";

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    filterProjects();
}

resetButton.addEventListener("click", resetFilters);

// Keyboard shortcut: Ctrl + K or Cmd + K
document.addEventListener("keydown", (event) => {
    const isSearchShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k";

    if (isSearchShortcut) {
        event.preventDefault();
        searchInput.focus();
    }

    // Escape clears search
    if (event.key === "Escape" && document.activeElement === searchInput) {
        searchInput.value = "";
        filterProjects();
        searchInput.blur();
    }
});

// Initial display
filterProjects();