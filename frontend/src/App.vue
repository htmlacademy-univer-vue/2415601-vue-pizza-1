<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { useDataStore, useAuthStore } from "./stores";

const dataStore = useDataStore();
const authStore = useAuthStore();

dataStore.fetchdata();

authStore.whoAmI();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
