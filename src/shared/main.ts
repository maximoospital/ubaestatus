import Lenis from "lenis";
import Toastify from 'toastify-js';
import { scroll } from "motion";

// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
});

// Interacciones Header
const header = document.getElementById("header-bar");
const inner = document.getElementById("header-inner");
const logo = document.getElementById("header-logo");
const links = document.querySelectorAll("nav ul li a");

if (header && inner && logo) {
    function updateNavLinks(targetId: string) {
        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${targetId}`) {
                link.classList.remove("text-offwhite/70", "decoration-transparent");
                link.classList.add("text-teal", "decoration-teal", "underline");
            } else if (href?.startsWith("#") && link.getAttribute("id") !== "share") {
                link.classList.add("text-offwhite/70", "decoration-transparent");
                link.classList.remove("text-teal", "decoration-teal", "underline");
            }
        });
    }

    const sectionElements = Array.from(links)
        .map((link) => {
            const href = link.getAttribute("href");
            if (!href?.startsWith("#") || link.getAttribute("id") === "share" || href === "#share-modal") return null;
            return document.getElementById(href.substring(1));
        })
        .filter((el): el is HTMLElement => el !== null);

    let currentActiveId = "";

    scroll((progress, { y }) => {
        const hero = document.getElementById("hero");
        const threshold = hero ? hero.offsetHeight - 80 : 100;

        if (y.current > threshold) {
            header.classList.replace("bg-transparent", "bg-dark");
            header.classList.replace("border-transparent", "border-rule");
            inner.classList.replace("py-8", "py-4");
            logo.classList.replace("opacity-0", "opacity-100");
        } else {
            header.classList.replace("bg-dark", "bg-transparent");
            header.classList.replace("border-rule", "border-transparent");
            inner.classList.replace("py-4", "py-8");
            logo.classList.replace("opacity-100", "opacity-0");
        }

        // Active link tracking
        const center = y.current + window.innerHeight * 0.4;
        let activeSectionId = "";

        for (const section of sectionElements) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (top <= center && bottom > center) {
                activeSectionId = section.id;
            }
        }

        if (activeSectionId && activeSectionId !== currentActiveId) {
            currentActiveId = activeSectionId;
            updateNavLinks(activeSectionId);
        }
    });

    // Smooth scroll for anchor links using Lenis
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href?.startsWith("#")) return;
        const sectionId = href.substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
            link.addEventListener("click", (e) => {
                const isShareButton = link.getAttribute('id') === 'share' || link.getAttribute('href') === '#share-modal';
                if (!isShareButton) {
                    e.preventDefault();
                    lenis.scrollTo(section);
                }
            });
        }
    });
}

// Hero CTA smooth scroll
const heroCta = document.getElementById("hero-cta");
if (heroCta) {
    heroCta.addEventListener("click", (e) => {
        e.preventDefault();
        const section = document.getElementById("bento");
        if (section) {
            lenis.scrollTo(section);
        }
    });
}

// modal Share Toast Notifications
const copyButton = document.getElementById("copy-share-url");
const shareInput = document.getElementById("share-url");

function showToast(text: string) {
    Toastify({
        text,
        duration: 3000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "#2abcb4", // Teal
            color: "#063330",      // Navy contrast
            borderRadius: "6px",
            fontWeight: "600",
            padding: "12px 24px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
    }).showToast();
}

if (copyButton instanceof HTMLButtonElement && shareInput instanceof HTMLInputElement) {
    copyButton.addEventListener("click", async () => {
        const url = shareInput.value;
        try {
            await navigator.clipboard.writeText(url);
            showToast("¡Enlace copiado al portapapeles!");
        } catch {
            shareInput.select();
            const copied = document.execCommand("copy");
            showToast(copied ? "¡Enlace copiado al portapapeles!" : "Fallo al copiar manualmente.");
        }
    });
}

const socialLinks = document.querySelectorAll("#share-modal a[target='_blank']");
socialLinks.forEach(link => {
    link.addEventListener("click", () => {
        const platform = link.querySelector("span:last-child")?.textContent || "la plataforma";
        showToast(`Abriendo ${platform}...`);
    });
});

// Boton footer back to top
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        lenis.scrollTo(0);
    });
}

// Reloj flipclock.js

import { elapsedTime, css, flipClock, theme } from "flipclock";

const parent = document.querySelector("#flip")!;

flipClock({
    parent,
    face: elapsedTime({
        from: new Date("2026-03-16T00:00:00"),
        format: "[DD]:[hh]:[mm]:[ss]",
    }),
    theme: theme({
        dividers: ":",
        css: css({
            fontSize: "clamp(3.25rem, 5vw, 5rem)",
        }),
    }),
});