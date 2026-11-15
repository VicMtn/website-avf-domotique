import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./routes";
import { vReveal } from "./directives/reveal";
import "./assets/main.css";

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, saved) {
      if (saved) return saved;
      // Le décalage sous l'en-tête collant est géré par scroll-padding-top (main.css)
      if (to.hash) return { el: to.hash, behavior: "smooth" };
      return { top: 0 };
    },
  },
  ({ app }) => {
    app.directive("reveal", vReveal);
  },
);
