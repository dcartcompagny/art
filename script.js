/* ========================= */
/* ONGLETS PRINCIPAL */
/* ========================= */

const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

let currentTab = "accueil";

function activateTab(target, pushState = true) {

    if (target === currentTab) return;

    currentTab = target;

    /* reset boutons */
    buttons.forEach(btn => btn.classList.remove("active"));

    /* reset sections */
    contents.forEach(sec => sec.classList.remove("active"));

    /* activer section */
    const section = document.getElementById(target);
    if (section) section.classList.add("active");

    /* activer bouton */
    const btn = document.querySelector(`.tab-btn[data-tab="${target}"]`);
    if (btn) btn.classList.add("active");

    /* URL hash */
    if (pushState) {
        history.pushState({ tab: target }, "", `#${target}`);
    }
}

/* click navbar */
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        activateTab(btn.dataset.tab);
    });
});

/* boutons hero */
document.querySelectorAll("[data-tab]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        activateTab(btn.dataset.tab);
    });
});

/* back/forward browser */
window.addEventListener("popstate", (e) => {
    const tab = e.state?.tab || "accueil";
    activateTab(tab, false);
    currentTab = tab;
});

/* init page */
window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.replace("#", "");
    activateTab(hash || "accueil", false);
});
