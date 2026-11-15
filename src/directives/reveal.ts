import type { Directive } from "vue";

/**
 * v-reveal : fondu léger quand l'élément entre à l'écran. v-reveal="120" décale de 120 ms.
 * Le HTML pré-rendu reste visible sans JavaScript ; les éléments déjà à l'écran au chargement
 * ne sont pas masqués, et rien ne bouge si le visiteur a demandé moins d'animations.
 */

let observer: IntersectionObserver | undefined;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer!.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  return observer;
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal");
    if (value) el.style.transitionDelay = `${value}ms`;
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};

declare module "vue" {
  interface GlobalDirectives {
    vReveal: typeof vReveal;
  }
}
