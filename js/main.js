document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  function toggleMobileMenu() {
    if (!navLinks || !overlay || !mobileMenuBtn) return;
    mobileMenuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }
  if (overlay) {
    overlay.addEventListener("click", toggleMobileMenu);
  }

  // Handle dropdowns in mobile view
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      }
    });
  });

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-links a");
  if (navLinks && navItems.length) {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Close mobile menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
      if (navLinks) navLinks.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Toggle "Selengkapnya" for Explore Services
  function initExploreToggle() {
    const exploreGrid = document.getElementById("exploreGrid") || document.querySelector(".explore-services .explore-grid");
    const toggleExplore = document.getElementById("toggleExplore") || document.querySelector(".show-more-container a");
    if (!exploreGrid || !toggleExplore) return;

    // Pastikan state awal collapsed
    if (!exploreGrid.classList.contains("collapsed")) {
      exploreGrid.classList.add("collapsed");
    }
    toggleExplore.setAttribute("role", "button");
    toggleExplore.setAttribute("aria-expanded", "false");

    toggleExplore.addEventListener("click", function (e) {
      e.preventDefault();
      const nowCollapsed = exploreGrid.classList.toggle("collapsed");
      toggleExplore.textContent = nowCollapsed ? "Selengkapnya" : "Tutup";
      toggleExplore.setAttribute("aria-expanded", nowCollapsed ? "false" : "true");
    });
  }

  initExploreToggle();
});
