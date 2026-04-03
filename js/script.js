/* ================================================= */
/* DETECTAR RUTA BASE DINÁMICA */
/* ================================================= */

function getBasePath() {
    const path = window.location.pathname;

    // Si estamos dentro de /paginas/
    if (path.includes("/paginas/")) {
        return "../";
    }

    // Si estamos en raíz
    return "./";
}

/* ================================================= */
/* INICIALIZAR CUANDO EL DOM ESTÉ LISTO */
/* ================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeader();
    await loadFooter();

    initHamburgerMenu();
    initSearchToggle();
    initScrollAnimations();
    initNewsletter();
    initResourceFilters();

    document.body.classList.add("loaded");
});

window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});

/* ================================================= */
/* MENÚ HAMBURGUESA */
/* ================================================= */

function initHamburgerMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".h_menu");

    if (!menuToggle || !menu) return;

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}

/* ================================================= */
/* DETECTAR PÁGINA ACTIVA EN EL MENÚ */
/* ================================================= */

function setActiveMenu() {
    const currentPath = window.location.pathname.split("/").pop();

    const menuLinks = document.querySelectorAll(".h_menu a");

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();

        if (linkPath === currentPath) {
            link.parentElement.classList.add("active");
        }
    });
}

/* ================================================= */
/* BUSCADOR */
/* ================================================= */

function initSearchToggle() {
    const searchToggle = document.querySelector(".search-toggle");
    const searchBox = document.querySelector(".h_search");

    if (!searchToggle || !searchBox) return;

    searchToggle.addEventListener("click", () => {
        searchBox.classList.toggle("active");
    });
}

/* ================================================= */
/* ANIMACIONES DE SCROLL */
/* ================================================= */

function initScrollAnimations() {
    const elements = document.querySelectorAll(".reveal, .fade-section, .value-box");

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active", "visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach((el) => observer.observe(el));
}

/* ================================================= */
/* NEWSLETTER */
/* ================================================= */

function initNewsletter() {
    const form = document.getElementById("newsletter-form");
    const message = document.getElementById("form-message");

    if (!form || !message) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" },
            });

            if (response.ok) {
                showMessage(message, "Gracias por unirte 💚 Pronto recibirás contenido.");
                form.reset();
            } else {
                showMessage(message, "Hubo un error. Inténtalo nuevamente.");
            }
        } catch (error) {
            console.error("Newsletter error:", error);
            showMessage(message, "Error de conexión. Inténtalo más tarde.");
        }
    });
}

/* ================================================= */
/* MENSAJE FORM */
/* ================================================= */

function showMessage(element, text) {
    element.textContent = text;
    element.classList.add("show");
}

/* ================================================= */
/* CARGAR HEADER GLOBAL */
/* ================================================= */

async function loadHeader() {
    const container = document.getElementById("header-container");
    if (!container) return;

    const base = getBasePath();

    try {
        const response = await fetch(`${base}html/header.html`);
        const data = await response.text();

        container.innerHTML = data;

        initHamburgerMenu();
        initSearchToggle();

        setActiveMenu();

    } catch (error) {
        console.error("Error cargando header:", error);
    }
}

/* ================================================= */
/* CARGAR FOOTER GLOBAL */
/* ================================================= */

async function loadFooter() {
    const container = document.getElementById("footer-container");
    if (!container) return;

    const base = getBasePath();

    try {
        const response = await fetch(`${base}html/footer.html`);
        const data = await response.text();

        container.innerHTML = data;

    } catch (error) {
        console.error("Error cargando footer:", error);
    }
}

/* ================================================= */
/* FILTROS DE RECURSOS */
/* ================================================= */

function initResourceFilters() {
    const botones = document.querySelectorAll(".filtro-btn");
    const recursos = document.querySelectorAll(".recurso-card");

    if (!botones.length) return;

    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const edad = btn.dataset.edad;

            botones.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            recursos.forEach((card) => {
                card.style.display =
                    (edad === "all" || card.dataset.edad === edad)
                        ? "block"
                        : "none";
            });
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const leon = document.querySelector(".leon-frase");

    function mostrarLeon() {
        const rect = leon.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {
            leon.classList.add("visible");
        }
    }

    function parallaxLeon() {
        const scrollY = window.scrollY;
        leon.style.transform = `translateY(${scrollY * 0.08}px)`;
    }

    window.addEventListener("scroll", () => {
        mostrarLeon();
        parallaxLeon();
    });

    mostrarLeon(); // por si ya está visible
});