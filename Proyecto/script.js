function getBasePath() {
    return location.pathname.includes("/paginas/") ? "../" : "./";
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeader();
    await loadFooter();

    initMenu();
    initScroll();
    initFilters();

    document.body.classList.add("loaded");
});

async function loadHeader() {
    const el = document.getElementById("header-container");
    if (!el) return;

    const res = await fetch("header.html");
    el.innerHTML = await res.text();

    setActiveMenu();
}

async function loadFooter() {
    const el = document.getElementById("footer-container");
    if (!el) return;

    const res = await fetch("footer.html");
    el.innerHTML = await res.text();
}

function initMenu() {
    document.addEventListener("click", e => {
        if (e.target.closest(".menu-toggle")) {
            document.querySelector(".h_menu")?.classList.toggle("active");
        }
    });
}

function setActiveMenu() {
    const current = location.pathname.split("/").pop();

    document.querySelectorAll(".h_menu a").forEach(link => {
        if (link.getAttribute("href").includes(current)) {
            link.parentElement.classList.add("active");
        }
    });
}

function initScroll() {
    const els = document.querySelectorAll(".reveal");

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add("active");
        });
    });

    els.forEach(el => obs.observe(el));
}

function initFilters() {
    const btns = document.querySelectorAll(".filtro-btn");
    const cards = document.querySelectorAll(".recurso-card");

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const edad = btn.dataset.edad;

            cards.forEach(c => {
                c.style.display =
                    edad === "all" || c.dataset.edad === edad
                        ? "block"
                        : "none";
            });
        });
    });
}