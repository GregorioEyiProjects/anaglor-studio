import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SmoothExperience = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const precisePointer = window.matchMedia("(pointer: fine)").matches;

    const revealElements = document.querySelectorAll("[data-reveal]");
    let revealObserver;
    let mutationObserver;
    let lenis;
    let navigationTimer;

    if (!reduceMotion && "IntersectionObserver" in window) {
      document.documentElement.classList.add("motion-enabled");
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7%" },
      );
      const observar = (element) => {
        if (!element.classList.contains("is-visible")) {
          revealObserver.observe(element);
        }
      };

      revealElements.forEach(observar);
      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            if (node.matches("[data-reveal]")) observar(node);
            node.querySelectorAll?.("[data-reveal]").forEach(observar);
          });
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    } else {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    let parallaxFrame;
    let parallaxElements = [];
    if (!reduceMotion && precisePointer) {
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        overscroll: true,
        stopInertiaOnNavigate: true,
      });

      parallaxElements = [...document.querySelectorAll("[data-parallax]")];
      const actualizarParallax = () => {
        parallaxElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const distancia = rect.top + rect.height / 2 - window.innerHeight / 2;
          const desplazamiento = Math.max(-24, Math.min(24, distancia * -0.025));
          element.style.setProperty("--parallax-y", `${desplazamiento}px`);
        });
        parallaxFrame = window.requestAnimationFrame(actualizarParallax);
      };
      parallaxFrame = window.requestAnimationFrame(actualizarParallax);
    }

    const navegarASeccion = (event) => {
      if (!(event.target instanceof Element)) return;
      const enlace = event.target.closest('a[href^="#"]');
      if (!enlace) return;

      const href = enlace.getAttribute("href");
      const destino = href ? document.querySelector(href) : null;
      if (!destino) return;

      event.preventDefault();
      window.history.pushState(null, "", href);
      window.clearTimeout(navigationTimer);
      navigationTimer = window.setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(destino, { duration: 0.9 });
          return;
        }

        const offset = href === "#top" ? 0 : -80;
        const top = destino.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({
          top,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }, 60);
    };

    document.addEventListener("click", navegarASeccion);

    return () => {
      document.removeEventListener("click", navegarASeccion);
      window.clearTimeout(navigationTimer);
      revealObserver?.disconnect();
      mutationObserver?.disconnect();
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      parallaxElements.forEach((element) =>
        element.style.removeProperty("--parallax-y"),
      );
      lenis?.destroy();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);

  return null;
};

export default SmoothExperience;
