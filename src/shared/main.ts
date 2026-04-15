import Lenis from "lenis";
import Toastify from "toastify-js";
import { animate, inView, scroll, stagger } from "motion";

// Initialize Lenis with smoothWheel disabled — native trackpad/wheel scrolling stays
// fully native (especially important on macOS where the OS already provides momentum).
// Lenis is kept only for programmatic scrollTo() calls (anchor links, back-to-top).
const lenis = new Lenis({
  autoRaf: true,
  smoothWheel: false,
});
// Expose globally so Alpine components can pause/resume scroll
(window as any).lenis = lenis;

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
      if (
        !href?.startsWith("#") ||
        link.getAttribute("id") === "share" ||
        href === "#share-modal"
      )
        return null;
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
        const isShareButton =
          link.getAttribute("id") === "share" ||
          link.getAttribute("href") === "#share-modal";
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
      color: "#063330", // Navy contrast
      borderRadius: "6px",
      textAlign: "center",
      fontWeight: "600",
      padding: "12px 24px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
  }).showToast();
}

if (
  copyButton instanceof HTMLButtonElement &&
  shareInput instanceof HTMLInputElement
) {
  copyButton.addEventListener("click", async () => {
    const url = shareInput.value;
    try {
      await navigator.clipboard.writeText(url);
      showToast("¡Enlace copiado al portapapeles!");
    } catch {
      shareInput.select();
      const copied = document.execCommand("copy");
      showToast(
        copied
          ? "¡Enlace copiado al portapapeles!"
          : "Fallo al copiar manualmente.",
      );
    }
  });
}

const socialLinks = document.querySelectorAll(
  "#share-modal a[target='_blank']",
);
socialLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const platform =
      link.querySelector("span:last-child")?.textContent || "la plataforma";
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

// ── Scroll-triggered entrance animations ────────────────────────────────────

// Hero: stagger children of the content wrapper on load
const heroContent = document.querySelector("#hero .relative.z-10");
if (heroContent) {
  animate(
    Array.from(heroContent.children) as HTMLElement[],
    { opacity: [0, 1], y: [28, 0] },
    { delay: stagger(0.12), duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  );
}

// Bento: stagger cards as the grid scrolls into view
const bentoGrid = document.querySelector(".bento-grid");
if (bentoGrid) {
  const cards = bentoGrid.querySelectorAll<HTMLElement>(".card");
  animate(cards, { opacity: 0, y: 36 }, { duration: 0 });
  inView(
    bentoGrid as HTMLElement,
    () => {
      animate(cards, { opacity: 1, y: 0 }, { delay: stagger(0.06), duration: 0.55, ease: [0.16, 1, 0.3, 1] });
    },
    { amount: 0.05 },
  );
}

// Calendar / Action / Contact: fade-up the section inner wrapper
(["#calendar", "#action", "#contact"] as const).forEach((id) => {
  const section = document.querySelector(id);
  if (!section) return;
  const inner = section.querySelector<HTMLElement>(":scope > div");
  if (!inner) return;
  animate(inner, { opacity: 0, y: 36 }, { duration: 0 });
  inView(
    section as HTMLElement,
    () => {
      animate(inner, { opacity: 1, y: 0 }, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    },
    { amount: 0.1 },
  );
});

// Reloj flipclock.js

import { elapsedTime, css, flipClock, theme } from "flipclock";

document.querySelectorAll<HTMLElement>(".flip-clock-widget").forEach((parent) => {
  const timerStatus = parent.dataset.timer ?? "active";
  const timerDate = parent.dataset.date
    ? new Date(parent.dataset.date)
    : new Date("2026-03-16T00:00:00");
  const timerMode = parent.dataset.mode ?? "countup";

  const fontSize = parent.dataset.fontsize ?? "clamp(1.5rem, 5.5vw, 4.5vw)";

  const fc = flipClock({
    parent,
    autoStart: timerStatus === "active",
    face: elapsedTime(
      timerMode === "countdown"
        ? { to: timerDate, format: "[DD]:[hh]:[mm]:[ss]" }
        : { from: timerDate, format: "[DD]:[hh]:[mm]:[ss]" }
    ),
    theme: theme({
      dividers: ":",
      css: css({ fontSize }),
    }),
  });

  if (timerStatus !== "active") {
    fc.stop();
  }

  // Scale clock down if it overflows its container (Chrome mobile)
  const wrapper = parent.parentElement;
  if (wrapper) {
    const scaleToFit = () => {
      parent.style.zoom = "1";
      const ratio = wrapper.clientWidth / parent.scrollWidth;
      if (ratio < 1) parent.style.zoom = String(ratio.toFixed(4));
    };
    requestAnimationFrame(scaleToFit);
    window.addEventListener("resize", scaleToFit, { passive: true });
  }
});
