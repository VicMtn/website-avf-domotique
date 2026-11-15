import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * Identifiant de la section visible au milieu de l'écran, pour signaler
 * l'entrée correspondante dans la navigation.
 */
export function useActiveSection(ids: Ref<string[]>) {
  const active = ref<string | null>(null);
  let observer: IntersectionObserver | undefined;

  function observe() {
    observer?.disconnect();
    active.value = null;
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) active.value = e.target.id;
      },
      // Bande horizontale fine au centre de l'écran
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids.value) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  }

  onMounted(observe);
  onBeforeUnmount(() => observer?.disconnect());

  return { active, refresh: observe };
}
