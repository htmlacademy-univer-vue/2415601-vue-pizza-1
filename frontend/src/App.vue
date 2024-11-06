<template>
  <div class="main__wrapper">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script setup>
import AppLayout from "./layouts/AppLayout.vue";
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
