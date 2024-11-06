<template>
  <div class="app_layout">
    <app-header></app-header>
    <app-side-bar></app-side-bar>
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
import AppSideBar from "./AppSideBar.vue";
</script>

<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
