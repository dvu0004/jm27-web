document.addEventListener("DOMContentLoaded", () => {
  const observeOnce = (elements, className, options = {}) => {
    const elementList =
      elements instanceof NodeList ? elements : document.querySelectorAll(elements);

    if (!elementList.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
        ...options,
      }
    );

    elementList.forEach((element) => observer.observe(element));
  };

  const observeSection = (selector, className, threshold = 0.22) => {
    const section = document.querySelector(selector);

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          section.classList.add(className);
          observer.unobserve(section);
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(section);
  };

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);
    const prefix = counter.dataset.prefix || "";
    const suffix = counter.dataset.suffix || "";
    const duration = 1500;
    const startTime = performance.now();

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(target * easeOut(progress));

      counter.textContent = `${prefix}${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = `${prefix}${target}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  };

  /* Métricas */
  const metricsSection = document.querySelector(".metrics-section");
  const counters = document.querySelectorAll(".count-up");

  if (metricsSection && counters.length) {
    const metricsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          metricsSection.classList.add("metrics-visible");
          counters.forEach((counter) => animateCounter(counter));

          metricsObserver.unobserve(metricsSection);
        });
      },
      {
        threshold: 0.35,
      }
    );

    metricsObserver.observe(metricsSection);
  }

  /* Servicios */
  observeSection(".services-section", "services-visible", 0.2);
  observeOnce(".service-row", "is-visible", {
    threshold: 0.24,
  });

  /* Proyectos */
  observeSection(".projects-section", "projects-visible", 0.2);
  observeOnce(".project-featured, .project-card", "is-visible", {
    threshold: 0.22,
  });

  /* Proceso */
  observeSection(".process-section", "process-visible", 0.22);
  observeOnce(".process-step", "is-visible", {
    threshold: 0.32,
  });

  /* Contacto */
  observeSection(".contact-section", "contact-visible", 0.2);

  /* Footer */
  observeSection(".footer", "footer-visible", 0.18);
});
// Header compacto al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-absolute");

  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 80) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader);
});
// Menú móvil premium
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  if (!menuButton || !mobileMenu) return;

  const openMenu = () => {
    menuButton.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    menuButton.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});