import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("@/pages/HomePage.vue") },
  { path: "/mentions-legales", name: "legal", component: () => import("@/pages/LegalPage.vue") },
  { path: "/confidentialite", name: "privacy", component: () => import("@/pages/PrivacyPage.vue") },
  { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("@/pages/NotFoundPage.vue") },
];
