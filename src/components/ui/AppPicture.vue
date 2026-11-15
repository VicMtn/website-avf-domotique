<script setup lang="ts">
import type { Picture } from "vite-imagetools";

/** Image responsive générée par vite-imagetools (import « …?w=…&picture ») */
withDefaults(
  defineProps<{
    picture: Picture;
    alt: string;
    /** Largeur affichée, pour que le navigateur choisisse la bonne taille */
    sizes: string;
    eager?: boolean;
    imgClass?: string;
  }>(),
  { eager: false, imgClass: "" },
);

const mime = (format: string) => `image/${format === "jpg" ? "jpeg" : format}`;
</script>

<template>
  <picture class="contents">
    <source
      v-for="(srcset, format) in picture.sources"
      :key="format"
      :type="mime(format)"
      :srcset="srcset"
      :sizes="sizes"
    />
    <img
      :src="picture.img.src"
      :width="picture.img.w"
      :height="picture.img.h"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      :class="imgClass"
    />
  </picture>
</template>
