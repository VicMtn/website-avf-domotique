import { globalIgnores } from "eslint/config";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default defineConfigWithVueTs(
  { name: "app/files", files: ["**/*.{ts,mts,vue}"] },
  globalIgnores(["dist/**", ".vite-ssg-temp/**", "node_modules/**"]),
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  {
    name: "app/rules",
    rules: {
      // Noms de pages et de sections en un mot (HomePage, AppHeader…) déjà explicites
      "vue/multi-word-component-names": "off",
    },
  },
  // La mise en forme est confiée à Prettier
  skipFormatting,
);
