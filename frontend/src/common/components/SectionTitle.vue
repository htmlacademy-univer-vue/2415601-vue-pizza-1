<template>
  <h1 v-if="size === 'big'" class="title title--big">
    <slot />
  </h1>
  <h2 v-else class="title title--small">
    <slot />
  </h2>
</template>

<script setup>
defineProps({
  size: { type: String, default: "small" },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}
</style>
